import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import App from './App'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import socket from './src/socket'


const main = () => {
  socket.connect();

  useEffect(()=>{
    socket.on("connect", () => {
      console.log("Connected with socket ID:", socket.id);
      socket.emit("add-user", userId); // Tell backend who we are
    });

    socket.on("receive-message", ({ from, message }) => {
      console.log("📩 Received message from", from, ":", message);
    });

  },[])
  return (
    <Provider store={store}>
        <App />
    </Provider>
  )
}

export default main

const styles = StyleSheet.create({})