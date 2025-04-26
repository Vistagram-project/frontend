import { createReducer, current } from "@reduxjs/toolkit";
import { GET_ALL_USERS, GET_ALL_USERS_FAIL, SET_CURRENT_CHAT_USER, START_CHAT_REDUCER_LOADING } from "../../constant/chatConstant";

const initialState = {
    getAllUsers:{},
    chatReducer_loading:false,
    currentChatUser:{}
}

export const chatReducer = createReducer(initialState , (builder)=>{
    builder.addCase(GET_ALL_USERS , (state , action)=>{
        state.getAllUsers = action.payload;
        state.chatReducer_loading = false;
    })
    .addCase(START_CHAT_REDUCER_LOADING , (state , action)=>{
        state.chatReducer_loading = true;
    })
    
    .addCase(GET_ALL_USERS_FAIL , (state , action)=>{
        state.chatReducer_loading = false;
    })
    .addCase(SET_CURRENT_CHAT_USER , (state , action)=>{
        state.currentChatUser = action.payload;
    })
});