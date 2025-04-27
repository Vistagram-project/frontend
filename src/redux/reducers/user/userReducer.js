import { createReducer } from "@reduxjs/toolkit";
import { 
    CLEAR_USER_MESSAGES,
    LOAD_USER_INFO_FAIL, LOAD_USER_INFO_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, START_LOADING, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_SUCCESS

} from "../../constant/userConstant";

const initialState = {
    userDetails:{},
    loading: false,
    message:"",
    error:"",
    isAuthenticated:false,
    userRegister:true
}

export const userReducer = createReducer(initialState , (builder)=>{
    builder
    .addCase(START_LOADING, (state, action) => {
        state.loading = true;
    })
    .addCase(USER_REGISTER_SUCCESS, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.userRegister = true
        state.error = "";
    })
    .addCase(USER_REGISTER_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = "";
        state.userRegister = false
    })
    .addCase(LOAD_USER_INFO_SUCCESS, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userDetails = action.payload;
        state.error = "";
    })
    .addCase(LOAD_USER_INFO_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.message=""
    })
    .addCase(LOGOUT_USER_SUCCESS, (state, action) => {
        state.loading = false;
        state.userDetails = {};
        state.isAuthenticated = false;
        state.error = "";
    })
    .addCase(LOGOUT_USER_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message="";
    })
    .addCase(CLEAR_USER_MESSAGES, (state, action) => {
        state.error = ""
        state.message="";
    })
});