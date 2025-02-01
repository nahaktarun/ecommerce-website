import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

export const getHomePageData = createAsyncThunk(
    'homepage/getHomepageData',
    async(_ , {rejectWithValue}) => {
        try{
            const response = await API.get("/homepage");
            return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

const homepageSlice = createSlice({
    name: 'homepage',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHomePageData.pending,(state)=> {
                state.loading=true;
                state.error= null;
            })
            .addCase(getHomePageData.fulfilled,(state, action)=>{
                state.loading = false;
                state.data = action.payload
            })
            .addCase(getHomePageData.rejected, (state, action)=> {
                state.loading= false;
                state.error = action.payload;
            })
    }
})
export default homepageSlice.reducer;