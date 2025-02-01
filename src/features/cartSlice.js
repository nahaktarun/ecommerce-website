import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../api';
// GET cart items
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // from auth slice
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await API.get('/cart', config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// POST add item to cart
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ productId, quantity = 1 }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const body = { productId, quantity };
      const { data } = await  API.post('/cart', body, config);
      return data; // updated cart array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// DELETE remove item from cart
export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (product, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      console.log(product.productId)
      const { data } = await API.delete(
        `/cart/${product.productId}`,
        config
      );
      return data; // updated cart array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    clearLocalCart(state) {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    // fetchCart
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // addItemToCart
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.items = action.payload; // entire updated cart array
    });

    // removeItemFromCart
    builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { clearLocalCart } = cartSlice.actions;
export default cartSlice.reducer;