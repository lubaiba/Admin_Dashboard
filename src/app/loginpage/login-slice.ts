import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login } from "../models/login";
import { ProductService } from "../services/product-service";

export interface LoginState{
    isLoggedIn:boolean;
    user:Login[];
    error:any;
}

const initialState:LoginState={
    isLoggedIn:false,
    user:[],
    error:null
};

export const loginUser = createAsyncThunk(
    "login/loginUser",
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        const response = await ProductService.userLogin(email,password);
        return response;
    }
  );

export const loginSlice=createSlice({
    name:'login',
    initialState:initialState,
    reducers:{
       setisLoggedIn:(state,action)=>{
           state.isLoggedIn=action.payload;
       },
    },
    extraReducers:(builder)=> {
        builder.addCase(loginUser.pending,(state,action)=>{
            state.isLoggedIn=true;
            state.user=[];
        });
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoggedIn=false;
            state.user=action.payload.user;
        });
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.error=action.error;
            state.isLoggedIn=false;
        });
        
    },
});
export const {setisLoggedIn}=loginSlice.actions;
export default loginSlice.reducer;