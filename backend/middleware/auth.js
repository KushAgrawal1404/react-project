// Import required modules
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const auth = async (req, res, next) => {
  try {
    // Extract token from the 'Authorization' header.
    // The header format is expected to be 'Bearer <token>'.
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // If no token is provided, deny access.
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify the token using the secret key.
    // This will throw an error if the token is invalid or expired.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user associated with the token's ID.
    // Exclude the password field from the returned user object for security.
    const user = await User.findById(decoded.userId).select('-password');
    
    // If no user is found for the token's ID, the token is invalid.
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.'
      });
    }


    req.user = user;

    next();
  } catch (error) {
    // Handle specific JWT errors for more informative responses.
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
    // Handle expired token error.
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired.'
      });
    }
    // Handle any other unexpected errors.
    res.status(500).json({
      success: false,
      message: 'Server error.'
    });
  }
};

module.exports = auth; 