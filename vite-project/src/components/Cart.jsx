import React from 'react';
import { useCartContext } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

/**
 * Cart component displays the items in the shopping cart.
 * It allows users to see the total price, clear the cart, or proceed to checkout.
 */
function Cart() {
  try {
    const { cart, loading, error, getTotalPrice, removeFromCart } = useCartContext();
    const { isAuthenticated } = useAuth();

    // If user is not authenticated, show login prompt
    if (!isAuthenticated) {
      return (
        <div className="cart-empty-container">
          <h2>Please Login</h2>
          <p>You need to be logged in to view your cart.</p>
          <Link to="/login" className="continue-shopping-btn">
            Login
          </Link>
        </div>
      );
    }

    // Show loading state
    if (loading) {
      return (
        <div className="cart-empty-container">
          <h2>Loading Cart...</h2>
        </div>
      );
    }

    // Show error state
    if (error) {
      return (
        <div className="cart-empty-container">
          <h2>Error Loading Cart</h2>
          <p>{error}</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      );
    }

    // If the cart is empty, display a message
    if (cart.items.length === 0) {
      return (
        <div className="cart-empty-container">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      );
    }
    
    // Filter out items with null products
    const validItems = cart.items.filter(item => {
      if (!item.product) {
        return false;
      }
      return true;
    });

    if (validItems.length === 0) {
      return (
        <div className="cart-empty-container">
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      );
    }

    return (
      <div className="cart">
        <h2>Your Cart</h2>
        {/* Map through the items and render a CartItem component for each one. */}
        {validItems.map(item => (
          <CartItem 
            key={item.product._id} 
            item={{
              id: item.product._id,
              title: item.product.name,
              price: item.product.price,
              thumbnail: item.product.image,
              quantity: item.quantity
            }}
            onRemove={() => removeFromCart(item.product._id)}
          />
        ))}
        {/* Display the calculated total price, formatted to two decimal places. */}
        <div className="cart-total">Total: ${getTotalPrice().toFixed(2)}</div>
        {/* Container for action buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {/* Link that navigates the user to the checkout page. */}
          <Link to="/checkout" style={{ textDecoration: 'none' }}>
            <button className="checkout-btn">Checkout</button>
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="cart-empty-container">
        <h2>Error Loading Cart</h2>
        <p>Something went wrong while loading the cart.</p>
        <p>Error: {error.message}</p>
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }
}

export default Cart; 