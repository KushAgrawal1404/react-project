import { useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const useCart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart({ items: [] });
      return;
    }

    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      setCart(response.data);
      setError(null);
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
      setLoading(true);
      const response = await cartAPI.addToCart(productId, quantity);
      // Update cart state with the response from backend
      setCart(response.data);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error adding to cart:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated) {
      setError('Please login to update cart');
      return false;
    }

    try {
      setLoading(true);
      const response = await cartAPI.updateQuantity(productId, quantity);
      // Update cart state with the response from backend
      setCart(response.data);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error updating cart:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (!isAuthenticated) {
      setError('Please login to remove items from cart');
      return false;
    }

    try {
      setLoading(true);
      const response = await cartAPI.removeFromCart(productId);
      // Update cart state with the response from backend
      setCart(response.data);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error removing from cart:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Calculate total items
  const getTotalItems = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cart.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  };

  // Fetch cart when authentication status changes
  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    refreshCart: fetchCart,
  };
}; 