import React, { Suspense, lazy, useState, useCallback } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import Header from './components/Header';
import Notification from './components/Notification';

// Lazy load components for better performance (code splitting).
// This means these components will only be loaded when they are first needed.
const Home = lazy(() => import('./components/Home'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const CartPage = lazy(() => import('./components/CartPage'));
const Checkout = lazy(() => import('./components/Checkout'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  // State to manage the notification message.
  const [notification, setNotification] = useState('');

  // Callback to show a notification.
  // useCallback is used to memoize the function so it doesn't get recreated on every render.
  const showNotification = useCallback((msg) => {
    setNotification(msg);
  }, []);

  // Callback to close the notification.
  const handleCloseNotification = useCallback(() => setNotification(''), []);

  return (
    // Provider makes the Redux store available to any nested components that need to access the Redux store.
    <Provider store={store}>
      {/* Router component to enable routing in the application. */}
      <Router>
        {/* The Header component will be displayed on all pages. */}
        <Header />
        {/* The Notification component is displayed when there's a message. */}
        <Notification message={notification} onClose={handleCloseNotification} />
        {/* Suspense is used for lazy-loaded components, showing a fallback UI while they load. */}
        <Suspense fallback={<div>Loading...</div>}>
          {/* Routes component defines the different routes in the application. */}
          <Routes>
            {/* Route for the home page. It passes the showNotification function as a prop. */}
            <Route path="/" element={<Home onAddToCart={showNotification} />} />
            {/* Route for the product detail page, with a dynamic 'id' parameter. */}
            <Route path="/product/:id" element={<ProductDetail onAddToCart={showNotification} />} />
            {/* Route for the cart page. */}
            <Route path="/cart" element={<CartPage />} />
            {/* Route for the checkout page. */}
            <Route path="/checkout" element={<Checkout />} />
            {/* A catch-all route for any other path, showing a "Not Found" page. */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
