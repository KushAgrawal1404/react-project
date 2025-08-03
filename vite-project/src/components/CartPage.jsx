import React from 'react';
import Cart from './Cart';

/**
 * CartPage component serves as a dedicated page for the shopping cart.
 * It simply renders the Cart component, acting as a route-level container.
 */
function CartPage() {
  try {
    return <Cart />;
  } catch (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Error Loading Cart Page</h2>
        <p>Something went wrong while loading the cart.</p>
        <p>Error: {error.message}</p>
      </div>
    );
  }
}

export default CartPage; 