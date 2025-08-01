import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * A simple notification component that displays a message and automatically
 * disappears after a short duration.
 */
function Notification({ message, onClose }) {
  // This effect sets a timer to automatically close the notification.
  useEffect(() => {
    // Only set the timer if there is a message to display.
    if (message) {
      // Set a timeout to call the onClose function after 2000 milliseconds (2 seconds).
      const timer = setTimeout(onClose, 2000);
      // Return a cleanup function to clear the timeout if the component unmounts
      // or if the message/onClose props change before the timeout completes.
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  // If there's no message, don't render anything.
  if (!message) return null;

  return (
    <div className="notification">
      {message}
    </div>
  );
}


export default Notification; 