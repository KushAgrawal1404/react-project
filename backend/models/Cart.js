// Import the Mongoose library for creating schemas and models.
const mongoose = require('mongoose');


const cartItemSchema = new mongoose.Schema({
  // Reference to the Product model. This links the cart item to a specific product.
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // The model to use for population
    required: true
  },

  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  }

});


const cartSchema = new mongoose.Schema({
  // Reference to the User model. Each cart belongs to a unique user.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // The model to use for population
    required: true,
    unique: true // Ensures that each user can only have one cart.
  },
  // An array of cart items, using the cartItemSchema defined above.
  items: [cartItemSchema]
}, {
  // Automatically add `createdAt` and `updatedAt` timestamp fields.
  timestamps: true
});

// Create and export the Cart model.
module.exports = mongoose.model('Cart', cartSchema); 