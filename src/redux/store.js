import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user/userReducer";

const  store = configureStore({
    reducer:{
        user:userReducer,
    },
    devTools: process.env.VITE_REACT_APP_NODE_ENV !== "DEV",
});

export default store;