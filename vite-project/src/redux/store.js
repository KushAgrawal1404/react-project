import { configureStore } from '@reduxjs/toolkit';
// Import the reducer from the cart slice.
import cartReducer from './cartSlice';

// Create the Redux store.
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Export the configured store so it can be used by the Provider in the main application file.
export default store; 