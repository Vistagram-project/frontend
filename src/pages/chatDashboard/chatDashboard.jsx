import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import socket from "../../socket.js";

const ChatDashboard = () => {
  const userId = "user1"; // Replace with dynamic user ID if you have auth
  const toUserId = "user2";
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected with socket ID:", socket.id);
      socket.emit("add-user", userId); // Tell backend who we are
    });

    socket.on("receive-message", ({ from, message }) => {
      console.log("📩 Received message from", from, ":", message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const sendMessage = () => {
    const message = "Hello from frontend at " + new Date().toLocaleTimeString();
    socket.emit("send-message", {
      from: userId,
      to: toUserId,
      message,
    });
    console.log("📤 Sent message:", message);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>chatDashboard</Text>
      <Text>Socket Connected!</Text>

      <TextInput
        style={styles.input}
        placeholder="Chat"
        placeholderTextColor="#888"
        value={message}
        onChangeText={setMessage}
        color="#000"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const toUserId = "TO_USER_ID";
          sendMessage;
        }}
      >
        <Text style={{ color: '#fff' }}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatDashboard;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#0a84ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});
