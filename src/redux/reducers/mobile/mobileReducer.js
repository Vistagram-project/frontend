import { createReducer } from "@reduxjs/toolkit";
import { FETCH_MOBILE_THEME } from "../../constant/mobileConstant";

const initialState = {
    theme:"light",
}

export const mobileReducer = createReducer(initialState , (builder)=>{
    builder.addCase(FETCH_MOBILE_THEME, (state, action) => {
        state.theme = action.payload;
    })
});