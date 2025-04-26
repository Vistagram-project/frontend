import axios from "axios";
import { getAllUsersAPI } from "../api/user_api";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { START_CHAT_REDUCER_LOADING } from "../constant/chatConstant";


export const getAllUsers = ()=>async (dispatch)=>{
    try {
        const token = await AsyncStorage.getItem("token");
        dispatch({ type: START_CHAT_REDUCER_LOADING });
        const {data} = await axios(getAllUsersAPI , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log("getAllUsersAPI => ",data)
        if(data.success == true){
            dispatch({
                type: "GET_ALL_USERS",
                payload: data.users,
            })
        }else{
            dispatch({
                type: "GET_ALL_USERS_FAIL"
            })
        }
    } catch (error) {
            console.log("error =>", error)
            dispatch({
                type: "GET_ALL_USERS_FAIL"
            })
    } 
}