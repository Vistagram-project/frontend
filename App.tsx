import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BottomTab from './src/pages/BottomTab'

const App = () => {
 
  return (
      
      <BottomTab/>
    
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