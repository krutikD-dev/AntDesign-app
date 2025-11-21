import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import logger from "redux-logger";
import productsReducer from "./ProductSlice.js";


const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
});

export default store;
