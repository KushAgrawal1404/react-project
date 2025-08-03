import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useCartContext } from '../contexts/CartContext';

// This component represents a single item within the shopping cart.
// It displays the item's details and provides controls to update its quantity or remove it.
function CartItem({ item, onRemove }) {
  const { updateQuantity } = useCartContext();
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  // Debounced quantity update
  const debouncedUpdate = useCallback(
    (() => {
      let timeoutId;
      return (productId, quantity) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          setIsUpdating(true);
          await updateQuantity(productId, quantity);
          setIsUpdating(false);
        }, 300); // 300ms delay
      };
    })(),
    [updateQuantity]
  );

  // Handler to remove the item from cart
  const handleRemove = async () => {
    if (onRemove) {
      onRemove();
    } else {
      await updateQuantity(item.id, 0); // Set quantity to 0 to remove
    }
  };

  // Handler for the quantity input field.
  const handleChange = (e) => {
    const qty = parseInt(e.target.value, 10);
    setLocalQuantity(qty);
    
    // Only update if the new quantity is a positive number.
    if (qty > 0) {
      debouncedUpdate(item.id, qty);
    }
  };

  // Update local quantity when item quantity changes from parent
  React.useEffect(() => {
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

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
            value={localQuantity}
            onChange={handleChange}
            disabled={isUpdating}
            style={{ opacity: isUpdating ? 0.7 : 1 }}
          />
          <button onClick={handleRemove} disabled={isUpdating}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem; 