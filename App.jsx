import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import BottomTab from './src/pages/BottomTab'
import SignUp from './src/pages/userAuth/SignUp';
import {  useSelector } from 'react-redux';
import { getUserDetails } from './src/redux/action/userAction'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/pages/userAuth/LoginScreen';
const App = () => {
 const {userDetails} = useSelector((state)=> state.user)
  const Stack = createNativeStackNavigator();
  return (
    <>
    {userDetails?.token ? (
      <BottomTab />
    ) : (
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
      </NavigationContainer> 
    )}
    </>
      
    
  )
}

export default App

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,

  },
  textColor:{
    color: "red",
  }
})

// rnfes