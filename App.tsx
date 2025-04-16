import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BottomTab from './src/pages/BottomTab'
import SignUp from './src/pages/userAuth/SignUp';

const App = () => {
 const user = true;

  return (
      user? <SignUp /> : <BottomTab/>
      
    
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