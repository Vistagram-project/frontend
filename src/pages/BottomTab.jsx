import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import customColor from '../../android/app/src/utils/customColor';
import Profile from './profile';
import Home from './home';
import ChatDashboard from './chatDashboard/chatDashboard';

const BottomTab = () => {
    const Tab = createBottomTabNavigator();
    const user = true;
    function TabNavigation() {
        return (
            <Tab.Navigator screenOptions={{ tabBarLabel: () => null }}>
                <Tab.Screen
                    name="𝒗𝒊𝒔𝒕𝒂𝒈𝒓𝒂𝒎"
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name="home"
                                size={30}
                                color={focused ? customColor.PRUSSIAN_60 : customColor.Dark}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="chatScreen"
                    component={ChatDashboard}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name="chat"
                                size={30}
                                color={focused ? customColor.PRUSSIAN_60 : customColor.Dark}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="profile"
                    component={Profile}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name="user"
                                size={30}
                                color={focused ? customColor.PRUSSIAN_60 : customColor.Dark}
                            />
                        )
                    }}
                />
            </Tab.Navigator>

        );
    }
    return (

        <NavigationContainer initialState={{ index: 0, routes: [{ name: 'Home' }] }}>
            <TabNavigation />
        </NavigationContainer>

    )
}

export default BottomTab

const styles = StyleSheet.create({})