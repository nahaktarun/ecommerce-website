import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";


export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async({name, email, password}, {rejectWithValue} ) => {
        try{
            const {data} = await API.post('/auth/register',{
                name,
                email,
                password
            })
            return data
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)
export const loginUser = createAsyncThunk(
    "auth/login",
    async({ email, password}, {rejectWithValue} ) => {
        try{
            const {data} = await API.post('/auth/login',{
                email,
                password
            })
            return data
        }catch(error){
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        logoutUser(state){
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        loadUserFromStorage(state){
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if(token && user){
                state.token = token
                state.user = user
            }
        }
    }, // sync operation code.
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state)=> {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state)=> {
                state.loading=false
            })
            .addCase(registerUser.rejected,(state, action)=>{
                state.loading = false;
                state.error = action.payload
            })
            .addCase(loginUser.pending, (state)=> {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action)=> {
               state.loading = false;
               state.token = action.payload.token
               state.user = action.payload.user

               localStorage.setItem("token", action.payload.token)
               localStorage.setItem("user", JSON.stringify(action.payload.user))
            })
            .addCase(loginUser.rejected,(state, action)=>{
                state.loading = false;
                state.error = action.payload
            })
    }
})

export const {logoutUser, loadUserFromStorage} = authSlice.actions;

export default authSlice.reducer;