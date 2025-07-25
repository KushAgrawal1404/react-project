import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/cartSlice';

// This component represents a single item within the shopping cart.
// It displays the item's details and provides controls to update its quantity or remove it.
function CartItem({ item }) {
  // Get the dispatch function from the Redux store to send actions.
  const dispatch = useDispatch();

  // Handler to dispatch the removeItem action when the remove button is clicked.
  const handleRemove = () => dispatch(removeItem(item.id));

  // Handler for the quantity input field.
  const handleChange = e => {
    // Parse the input value to an integer.
    const qty = parseInt(e.target.value, 10);
    // Only dispatch the updateQuantity action if the new quantity is a positive number.
    if (qty > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: qty }));
    }
  };

  return (
    // The main container for a single cart item.
    <div className="cart-item">
      <div className="cart-item-content">
        {/* Section for displaying the item's image and title. */}
        <div className="cart-item-info">
          <img src={item.thumbnail} alt={item.title} width={50} />
          <div>{item.title}</div>
        </div>
        {/* Section for the item's price and user controls (quantity, remove). */}
        <div className="cart-item-controls">
          <span className="cart-item-price">${item.price}</span>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleChange}
          />
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem; 