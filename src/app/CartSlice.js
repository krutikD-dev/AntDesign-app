import { createSlice } from "@reduxjs/toolkit";
import { ShowToaster } from "../UI/ShowToaster";
import Item from "antd/es/list/Item";

const initialState = {
  items: [],
};



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );  
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
        ShowToaster(`${import.meta.env.VITE_QUANTITY_UPDATE}`, 'success')
        // console.log(`Quantity Updated of Item(${action.payload.title})`)
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
        ShowToaster(`${import.meta.env.VITE_SUCCESS_MSG}`, 'success')
        // console.log(`${action.payload.title} is Added to the Cart`)
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
        // console.log(`Quantity Updated of Item(${action.payload.title})`)

      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      ShowToaster(`${import.meta.env.VITE_REMOVED_MSG}`, 'success')
              // console.log(`${action.payload.title} is removed from the Cart!!`)
    },

    clearCart: (state) => {
      state.items = [];
              // console.log(`Clear Cart!!`)
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
