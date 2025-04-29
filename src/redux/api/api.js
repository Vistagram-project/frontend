import {VITE_REACT_APP_HOSTED_URL} from "@env";
// User Route
export const getUserDetailsApi = `${VITE_REACT_APP_HOSTED_URL}/api/v1/user/getUserDetails`;
export const LoginApi = `${VITE_REACT_APP_HOSTED_URL}/api/v1/user/login`;
export const logoutApi = `${VITE_REACT_APP_HOSTED_URL}/api/v1/user/logout`;
export const registerApi = `${VITE_REACT_APP_HOSTED_URL}/api/v1/user/register`;

// Chat
export const getAllUsersAPI = `${VITE_REACT_APP_HOSTED_URL}/api/v1/chat/getAllUsers`;
export const getChatHistoryAPI = `${VITE_REACT_APP_HOSTED_URL}/api/v1/chat/messages`;
