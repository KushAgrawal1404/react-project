import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

function Header() {
  // useSelector is a hook to extract data from the Redux store state.
  // Here, we're calculating the total number of items in the cart.
  const cartCount = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  return (
    // The header element serves as a container for the navigation.
    <header className="header">
      {/* The nav element contains the main navigation links. */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem', width: '100%', padding: '0.5rem 2rem' }}>
        {/* Link to the home page, wrapping the logo image. */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="ShoppyGlobe Logo" style={{ height: 56 }} />
        </Link>
        {/* Link to the home page. */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.1rem', marginBottom: '8px' }}>Home</Link>
        {/* This div acts as a flexible spacer to push the cart icon to the right. */}
        <div style={{ flex: 1 }} />
        {/* Link to the cart page. */}
        <Link to="/cart" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', fontSize: 24 }}>
          <span role="img" aria-label="cart">🛒</span>
          {/* Conditionally render the cart count if it's greater than 0. */}
          {cartCount > 0 && <span style={{ marginLeft: 4, fontSize: 16 }}>({cartCount})</span>}
        </Link>
      </nav>
    </header>
  );
}

export default Header; 