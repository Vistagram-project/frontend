import axios from "axios";

import{
    LOGOUT_USER_SUCCESS,
    START_LOADING,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS
} from "../constant/userConstant";
import { getUserDetailsApi, LoginApi, logoutApi, registerApi } from "../api/user_api";
import { LOAD_USER_INFO_FAIL, LOAD_USER_INFO_SUCCESS } from "../constant/userConstant";
import AsyncStorage from '@react-native-async-storage/async-storage';



export const registerUser = (formData) => async (dispatch) => {
    try {
      dispatch({
        type: START_LOADING,
      });
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(registerApi, formData, config);
      console.log("Register =>:", data);
      if (data.success) {
        console.log("Registration API Response:", data);
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: data.message,
        });
        Snackbar.show({
            text: data.message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor : customColor.GREEN_70,
            textColor:customColor.Light,
          });
      } else {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: data.message || 'Registration failed',
        });
        Snackbar.show({
            text: data.message,
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor : customColor.RED_70,
            textColor:customColor.Light,
        });
      }
    } catch (error) {
        console.log("error =>:", error.response.data.message);
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response?.data?.message || 'Something went wrong',
          });

          if (error.response?.data?.message) {
            Snackbar.show({
                text: error.response.data.message,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor : customColor.RED_70,
                textColor:customColor.Light,
            });
          }
    }
  };

export const LoginUser = (userData) => async (dispatch) => {
    try {
      const { email, password } = userData;
      console.log("LoginApi=>>>", LoginApi)
      dispatch({ type: START_LOADING });
      const { data } = await axios.post(LoginApi, { email, password });
      
      if (data?.success && data.user?.token) {
        await AsyncStorage.setItem('token', data.user.token);
  
        dispatch({
          type: LOAD_USER_INFO_SUCCESS,
          payload: data.user,
        });
  
        console.log("✅ Login Successful!");
      } else {
        const message = data?.message || 'Invalid credentials';
        console.warn("❌ Login Failed:", message);
  
        dispatch({
          type: LOAD_USER_INFO_FAIL,
          payload: message,
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Something went wrong';
      console.error("❌ Login Error:", errorMsg);
  
      dispatch({
        type: LOAD_USER_INFO_FAIL,
        payload: errorMsg,
      });
    }
};

export const getUserDetails = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const token = await AsyncStorage.getItem("token");
        console.log("token =>", token)
        const response = await axios.get(`${getUserDetailsApi}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.success === true) {
            dispatch({
                type: LOAD_USER_INFO_SUCCESS,
                payload: response.data.user,
            });
        } else {
            dispatch({
                type: LOAD_USER_INFO_FAIL,
                payload: response.data.message || "Something went wrong",
            });
        }

    } catch (error) {
        dispatch({
            type: LOAD_USER_INFO_FAIL,
            payload: error.response?.data?.message || error.message || "Unexpected error",
        });
    }
};

export const LogoutUser = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const response = await axios.get(logoutApi);
  
      if (response.data.success) {
        await AsyncStorage.removeItem('token');
  
        dispatch({
          type: LOGOUT_USER_SUCCESS,
        });
  
        console.log("✅ User logged out successfully!");
      } else {
        console.warn("⚠️ Logout failed:", response.data.message || "Something went wrong");
        
        dispatch({
          type: LOGOUT_USER_FAIL,
          payload: response.data.message || 'Logout failed',
        });
      }
    } catch (error) {
      console.log("error =>", error)
      dispatch({
        type: LOGOUT_USER_FAIL,
        payload: errorMsg,
      });
      const errorMsg = error.response?.data?.message || error.message || 'Unexpected error';
  
      console.error("❌ Error during logout:", errorMsg);
  
    }
};
  
