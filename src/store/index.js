import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import homepageReducer from '../features/homepageSlice';
import authReducer from '../features/authSlice';
import cartReducer from '../features/cartSlice'
export const store = configureStore({
  reducer: {
    products: productReducer,
    homepage: homepageReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});
