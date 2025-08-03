// Import the Mongoose library for creating schemas and models.
const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },

  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  // A detailed description of the product.
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  // The available stock quantity for the product.
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  // URL or path to the product's image.
  image: {
    type: String,
    default: ''
  },
  // The category to which the product belongs.
  category: {
    type: String,
    default: 'General' // Defaults to 'General' if no category is specified.
  }
}, {

  timestamps: true
});

// Create and export the Product model based on the productSchema.
module.exports = mongoose.model('Product', productSchema); 