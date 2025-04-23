import { io } from "socket.io-client";

const socket = io(process.env.VITE_REACT_APP_HOSTED_URL);

export default socket;