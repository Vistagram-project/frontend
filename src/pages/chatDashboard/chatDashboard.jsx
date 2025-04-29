import { StyleSheet, View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import socket from "../../socket.js";
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import UsersScreen from './UsersScreen.jsx';
import customColor from '../../../android/app/src/utils/customColor.js';
import { getAllUsers } from '../../redux/action/chatAction.js';
import ChatScreen from './ChatScreen.jsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatHeader from '../../components/chatCompo/ChatHeader.jsx';
const Stack = createNativeStackNavigator(); // ✅ Move outside component

const ChatDashboard = () => {
  const { theme } = useSelector((state) => state.mobile);
  const {currentChatUser} = useSelector((state)=> state.chat)
  const dispatch = useDispatch();
  
  // User Effect to Get all users
  useFocusEffect(
    useCallback(() => {
      dispatch(getAllUsers());
    }, [dispatch])
  );

  const getThemeColor = (theme) =>
    theme === "dark" ? customColor.Dark : customColor.Light;

  const getTextColor = (theme) =>
    theme === "dark" ? customColor.Light : customColor.Dark;

  const BottomIcon = ({ IconText }) => {
    return (
      <View style={[styles.header, { backgroundColor: getThemeColor(theme) }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.logoText, { color: getTextColor(theme) }]}>
            {IconText}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: getThemeColor(theme) },
      ]}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Users"
          component={UsersScreen}
          options={{
            headerShown: true,
            header: () => <BottomIcon IconText="Chats" />,
          }}
        />
       <Stack.Screen
        name="ChatScreen"
        options={{
          headerShown: true,
          tabBarStyle: { display: 'none' },
          header: () => (
            <ChatHeader currentChatUser={currentChatUser} />
          ),
        }}
        >
          {props => <ChatScreen {...props} socket={socket} />}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
};

export default ChatDashboard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: "center",
    paddingLeft: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4, // for Android
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: customColor.PRUSSIAN_60,
    fontFamily: "serif",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
});
