// Import required modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },

  email: {
    type: String,
    required: [true, 'Email is required'], // Email is mandatory.
    unique: true, // Ensures each user has a unique email.
    lowercase: true, 
    trim: true, 
    // Regex to validate the email format.
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  // The user's password. It will be hashed before being saved to the database.
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  }
}, {

  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // If the password has not been modified (e.g., during an email update), skip hashing.
  if (!this.isModified('password')) return next();
  
  try {
    // Generate a salt with a cost factor of 10.
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt.
    this.password = await bcrypt.hash(this.password, salt);
    // Proceed to the next middleware or save operation.
    next();
  } catch (error) {
    // Pass any errors to the next middleware.
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model based on the userSchema.
module.exports = mongoose.model('User', userSchema); 