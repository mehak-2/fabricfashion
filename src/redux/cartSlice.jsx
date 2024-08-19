import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage or set to an empty array if not present
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add an item to the cart
 addToCart(state, action){
            state.push(action.payload)            
        },      
        // Remove an item from the cart
        deleteFromCart(state, action) {
            return state.filter(item => item.id !== action.payload.id);
        },
        // Update the quantity of an item in the cart
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },  
              
             
    }
});

// Export actions for use in components
export const { addToCart, deleteFromCart, updateQuantity } = cartSlice.actions;

// Export the reducer to be used in the Redux store
export default cartSlice.reducer;
