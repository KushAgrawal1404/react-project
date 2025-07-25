import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { clearCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

/**
 * Cart component displays the items in the shopping cart.
 * It allows users to see the total price, clear the cart, or proceed to checkout.
 */
function Cart() {
  // Get cart items from the Redux store.
  const items = useSelector(state => state.cart.items);
  // Get the dispatch function to send actions to the Redux store.
  const dispatch = useDispatch();
  // Calculate the total price of all items in the cart.
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // If the cart is empty, display a message and stop rendering the rest of the component.
  if (items.length === 0) {
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
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      {/* Display the calculated total price, formatted to two decimal places. */}
      <div className="cart-total">Total: ${total.toFixed(2)}</div>
      {/* Container for action buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        {/* Button to dispatch the clearCart action, removing all items from the cart. */}
        <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        {/* Link that navigates the user to the checkout page. */}
        <Link to="/checkout" style={{ textDecoration: 'none' }}>
          <button className="checkout-btn">Checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart; 