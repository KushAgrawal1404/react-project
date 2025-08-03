import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCartContext } from '../contexts/CartContext';
import logo from '../assets/logo.png';

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCartContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  
  // Get cart count from the new cart hook
  const cartCount = getTotalItems();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleRegisterClick = () => {
    navigate('/login?mode=register');
  };

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
        
        {/* Authentication section */}
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* User menu */}
            <div style={{ position: 'relative' }} ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem'
                }}
              >
                <span role="img" aria-label="user">👤</span>
                {user?.name || 'User'}
                <span role="img" aria-label="dropdown">▼</span>
              </button>
              
              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  padding: '0.5rem 0',
                  minWidth: '150px',
                  zIndex: 1000
                }}>
                  <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #eee' }}>
                    <div style={{ fontWeight: 'bold' }}>{user?.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{user?.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '0.5rem 1rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: '#d32f2f'
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            
            {/* Cart link */}
            <Link to="/cart" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', fontSize: 24 }}>
              <span role="img" aria-label="cart">🛒</span>
              {/* Conditionally render the cart count if it's greater than 0. */}
              {cartCount > 0 && <span style={{ marginLeft: 4, fontSize: 16 }}>({cartCount})</span>}
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', fontSize: '1rem' }}>
              Login
            </Link>
            <button
              onClick={handleRegisterClick}
              style={{ 
                textDecoration: 'none', 
                color: 'white', 
                fontSize: '1rem',
                background: '#667eea',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header; 