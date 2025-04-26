// socket.js
import { io } from "socket.io-client";

const socket = io(process.env.VITE_REACT_APP_HOSTED_URL, {
  transports: ["websocket"], // best practice for stability
  autoConnect: false, // we will manually connect when needed
});

export default socket;
