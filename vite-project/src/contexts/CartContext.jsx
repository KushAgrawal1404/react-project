import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

// Create a React Context for the shopping cart.
const CartContext = createContext();


export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};


export const CartProvider = ({ children }) => {
  // State to hold the cart object, which includes an array of items.
  const [cart, setCart] = useState({ items: [] });
  // State to track loading status for asynchronous cart operations.
  const [loading, setLoading] = useState(false);
  // State to hold any error messages from API calls.
  const [error, setError] = useState(null);
  // Get authentication status from AuthContext to determine if a cart should be fetched.
  const { isAuthenticated } = useAuth();

  // Fetches the user's cart from the backend if authenticated.
  // Clears the local cart state if the user is not authenticated.
  const fetchCart = async () => {
    // If the user is not logged in, reset the cart and exit.
    if (!isAuthenticated) {
      setCart({ items: [] });
      return;
    }

    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      // Populate the cart state with data from the server.
      setCart(response.data);
      setError(null); // Clear previous errors on success.
    } catch (err) {
      setError(err.message);
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      setError('Please login to add items to cart');
      return false;
    }

    try {
      const response = await cartAPI.addToCart(productId, quantity);
      // Update the cart state with the new cart from the server.
      setCart(response.data);
      setError(null); // Clear previous errors on success.
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error adding to cart:', err);
      return false;
    }
  };

  // Update item quantity with optimistic updates
  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated) {
      setError('Please login to update cart');
      return false;
    }

    // Optimistic update - update UI immediately
    setCart(prevCart => {
      // Map through items to find the one to update.
      const updatedItems = prevCart.items.map(item => {
        if (item.product && item.product._id === productId) {
          return { ...item, quantity };
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove the item if its quantity is set to 0 or less.

      return { ...prevCart, items: updatedItems };
    });

    try {
      const response = await cartAPI.updateQuantity(productId, quantity);
      // Sync with the server's response to ensure data consistency.
      setCart(response.data);
      setError(null); // Clear previous errors on success.
      return true;
    } catch (err) {
      // Revert optimistic update on error
      fetchCart();
      setError(err.message);
      console.error('Error updating cart:', err);
      return false;
    }
  };

  // Remove item from cart with optimistic update
  const removeFromCart = async (productId) => {
    if (!isAuthenticated) {
      setError('Please login to remove items from cart');
      return false;
    }

    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.filter(item => item.product && item.product._id !== productId)
    }));

    try {
      const response = await cartAPI.removeFromCart(productId);
      // Sync with the server's response.
      setCart(response.data);
      setError(null); // Clear previous errors on success.
      return true;
    } catch (err) {
      // Revert optimistic update on error
      fetchCart();
      setError(err.message);
      console.error('Error removing from cart:', err);
      return false;
    }
  };

  // Calculate total items
  const getTotalItems = () => {
    // Reduce the items array to sum up the quantities.
    return cart.items.reduce((sum, item) => {
      if (!item.product) return sum; // Skip items with null products
      return sum + item.quantity;
    }, 0);
  };

  // Calculate total price
  const getTotalPrice = () => {
    // Reduce the items array to sum up the price of each item multiplied by its quantity.
    return cart.items.reduce((sum, item) => {
      if (!item.product) return sum; // Skip items with null products
      return sum + (item.product.price * item.quantity);
    }, 0);
  };

  // This effect re-fetches the cart whenever the user's authentication status changes.
  // This ensures the cart is loaded on login and cleared on logout.
  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  // The value object provided to consuming components via the context provider.
  const value = {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    refreshCart: fetchCart, // Expose fetchCart as refreshCart for manual refreshing.
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 