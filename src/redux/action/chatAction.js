import axios from "axios";
import { getAllUsersAPI, getChatHistoryAPI } from "../api/api.js";

import { keychainStorage } from "../../keychainStorage.js"; 

import { START_CHAT_REDUCER_LOADING } from "../constant/chatConstant";


export const getAllUsers = ()=>async (dispatch)=>{
    try {
        const token = await keychainStorage.getItem('token');;
        dispatch({ type: START_CHAT_REDUCER_LOADING });
        const {data} = await axios(getAllUsersAPI , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
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

export const fetchChatHistory =(userId, otherUserId)=> async (dispatch) => {
    try {
        dispatch({type:"START_CHAT_REDUCER_LOADING"})
        const response = await axios.get(`${getChatHistoryAPI}/${userId}/${otherUserId}`);
        console.log(response.data);
        if(response.data?.success){
            dispatch({type:"CURRENT_CHAT_USER_HISTORY_MESSAGE" , payload:response?.data.messages})
        }else{
            dispatch({type:"CURRENT_CHAT_USER_HISTORY_MESSAGE_FAIL", payload:response.data.messages})
        }
        return response.data;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      dispatch({type:"CURRENT_CHAT_USER_HISTORY_MESSAGE_FAIL", payload:error.messages})
    }
  };