import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async(_ , {rejectWithValue}) => {
        try{
            const response = await API.get("/products");
            return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {}, // all the add mutiple reducer filters reducers (product filter reducer)
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state)=> {
            state.loading = true;
            state.error= null;
        })
        .addCase(fetchProducts.fulfilled, (state,action)=> {
            state.loading = false;
            state.items = action.payload; // arrray of products
        })
        .addCase(fetchProducts.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload
        })
    },
})

export default productSlice.reducer;

