import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LogoutUser } from '../redux/action/userAction';
import LoadingScreen from './Loading';
import customColor from '../../android/app/src/utils/customColor';

const Profile = ({navigation}) => {
  const dispatch = useDispatch()
  const {loading , userDetails} = useSelector((state) => state.user);
  // Handle Logout
  const HandleLogout = () => {
     dispatch(LogoutUser())
  };

  return (
    <>
    {loading ? (
      <LoadingScreen></LoadingScreen>
    ):(
      <View>
      <Text style={styles.footerText}>
        Want to {' '}
        <Text style={styles.link} onPress={HandleLogout}>
        Logout
        </Text>
      </Text>
        <Text style={{padding:25 , color:customColor.PRUSSIAN_70 , fontSize:24}} onPress={HandleLogout}>
        {userDetails?.name}
        </Text>
      </View>
    )}

    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  footerText: {
    marginTop: 24,
    textAlign: 'center',
    color: '#666',
  },
  link: {
    color: '#007bff',
    fontWeight: '600',
    fontSize:20
  },
})