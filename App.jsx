import { StyleSheet, useColorScheme } from 'react-native';
import React, { useEffect } from 'react';
import BottomTab from './src/pages/BottomTab';
import SignUp from './src/pages/userAuth/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from './src/redux/action/userAction';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/pages/userAuth/LoginScreen';
import { getAllUsers } from './src/redux/action/chatAction';
import socket from './src/socket';

const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userDetails } = useSelector((state) => state.user);
  const theme = useColorScheme();

  // Set theme from mobile device
  useEffect(() => {
    dispatch({ type: 'FETCH_MOBILE_THEME', payload: theme });
  }, [theme]);

  // Fetch user details and all users after authentication
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserDetails());
      dispatch(getAllUsers());
    }
  }, [isAuthenticated, dispatch]);

  // Connect to socket after userDetails are available
  useEffect(() => {
    if (isAuthenticated && userDetails?._id) {
      socket.connect();

      socket.on('connect', () => {
        console.log('Connected with socket ID:', socket.id);
        socket.emit('add-user', userDetails._id);
      });
    }

    return () => {
      socket.off('receive-message');
      socket.disconnect();
    };
  }, [isAuthenticated, userDetails]);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <BottomTab />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  textColor: {
    color: 'red',
  },
});
