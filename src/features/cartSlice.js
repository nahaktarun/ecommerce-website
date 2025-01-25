import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import { act } from "react";

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async(_, {getState, rejetWithValue}) => {
        try {
            const token = getState().auth.token;
            const config = {
                header: {Authorization: `Bearer ${token}`},
            };
            const {data} = await API.get('/cart', config);
            return data
        } catch (error) {
            return rejetWithValue(error.response?.data?.message || error.message)
        }
    }
);
export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async({productId, quantity=1}, {getState, rejetWithValue}) => {
        try {
            const token = getState().auth.token;
            const config = {
                header: {Authorization: `Bearer ${token}`},
            };
             const body = {productId, quantity};
             const {data} = API.post("/cart", body, config);
             return data
           
        } catch (error) {
            return rejetWithValue(error.response?.data?.message || error.message)
        }
    }
);


export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async({productId}, {getState, rejetWithValue}) => {
        try {
            const token = getState().auth.token;
            const config = {
                header: {Authorization: `Bearer ${token}`},
            };
             const {data} = API.delete(`/cart/${productId}`, config);
             return data
           
        } catch (error) {
            return rejetWithValue(error.response?.data?.message || error.message)
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
        clearLocalCart(state){
            state.items =[];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state)=> {
            state.loading.true;
            state.error = null;
        });
        builder.addCase(fetchCart.fulfilled,(state,action)=> {
            state.loading = false;
            state.items = action.payload;
        })
        builder.addCase(fetchCart.rejected, (state, action)=> {
            state.loading= false;
            state.error = action.payload;
        })

        builder.addCase(addItemToCart.fulfilled, (state,action)=> {
            state.items = action.payload;
        });

        builder.addCase(removeItemFromCart.fulfilled, (state, action)=> {
            state.items = action.payload
        })
    }
})

export const {clearLocalCart} = cartSlice.actions;
export default cartSlice.reducer