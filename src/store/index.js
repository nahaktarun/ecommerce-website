import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import homepageReducer from '../features/homepageSlice';
export const store = configureStore({
  reducer: {
    products: productReducer,
    homepage: homepageReducer
  },
});
