import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../NotFound.css';

/**
 * NotFound component displays a user-friendly "404 - Page Not Found" message.
 * It shows the invalid route the user tried to access and provides a link back to the homepage.
 * It is rendered when a user navigates to a route that does not exist.
 */
function NotFound() {
  const location = useLocation();

  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 - Page Not Found</h1>
      <p>
        The page you are looking for at{' '}
        <code className="not-found-path">{location.pathname}</code> does not
        exist.
      </p>
      <Link to="/" className="not-found-link">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound; 