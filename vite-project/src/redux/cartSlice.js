import { createSlice } from '@reduxjs/toolkit';

// The initial state for the cart slice.
const initialState = {
  items: [],
};

// Create a slice of the Redux store for the cart.
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Adds an item to the cart. If the item already exists, it increases its quantity.
     * Otherwise, it adds the new item to the cart.
     */
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        // If item exists, increment its quantity.
        existing.quantity += item.quantity || 1;
      } else {
        // If item doesn't exist, add it to the cart with a quantity of 1.
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    /**
     * Removes an item from the cart entirely, based on its ID.
     */
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    /**
     * Updates the quantity of a specific item in the cart.
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    /**
     * Clears all items from the cart, resetting it to an empty array.
     */
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Export the action creators for use in components.
export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
// Export the reducer to be included in the Redux store.
export default cartSlice.reducer; 