import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const {loading , userDetails} = useSelector((state) => state.user);

  useEffect(() => {
    console.log(loading);
    console.log(" userDetails", userDetails);
  }
  , [])
  return (
    <View style={{backgroundColor:"white",flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>home</Text>
    </View>
  )
}

export default Home