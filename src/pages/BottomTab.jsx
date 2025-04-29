import { StyleSheet, Text,  View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import customColor from '../../android/app/src/utils/customColor';
import Profile from './profile';
import Home from './home';
import ChatDashboard from './chatDashboard/chatDashboard';
import { useSelector } from 'react-redux';
import { getTextColor, getThemeColor } from '../helper';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


// BottomTab Component
const BottomTab = () => {
    
    const { theme } = useSelector((state) => state.mobile); 
    const Tab = createBottomTabNavigator(); 

    // Custom headers for different screens
    const HomeHeader = () => (
        <View style={[styles.header, { backgroundColor: getThemeColor(theme) }]}>
            <Text style={[styles.logoText , {color : getTextColor(theme)}]}>𝒗𝒊𝒔𝒕𝒂𝒈𝒓𝒂𝒎</Text>
        </View>
    );
   
    const BottomIcon = ({IconText}) => {
        return (
            <View style={[styles.header, { backgroundColor: getThemeColor(theme) }]}>
            <View style={styles.headerRow}>
                <Text style={[styles.logoText , {color : getTextColor(theme)}]}>{IconText}</Text>
            </View>
        </View>
        )
    };

    const getIconColor = (focused, theme) => {
        if (focused) {
          return theme === "dark" ? customColor.PRUSSIAN_60 : customColor.Dark;
        } else {
          return theme === "dark" ? customColor.Light : customColor.GREY_60; 
        }
    }

    return (
        <>
        
            <Tab.Navigator
                screenOptions={{
                    tabBarLabel: () => null, 
                    headerShown: false,
                    tabBarStyle: [
                        styles.tabBar,
                        {
                            backgroundColor: getThemeColor(theme),
                        },
                    ],
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name="home"
                                size={24}
                                color={getIconColor(focused, theme)}
                            />
                        ),
                        // Custom header for Home screen
                        headerShown: true,
                        header: () => <HomeHeader />,
                    }}
                />
               <Tab.Screen
                name="Chat"
                component={ChatDashboard}
                options={({ route }) => {
                    // this will get current screen
                    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Users'; 
                    return {
                    // remove bottom tab navigation for chatScreen
                    tabBarStyle: routeName === 'ChatScreen' ? { display: 'none' } : [styles.tabBar, { backgroundColor: getThemeColor(theme) }],
                    tabBarIcon: ({ focused }) => (
                        <Icon
                        name="chat"
                        size={24}
                        color={getIconColor(focused, theme)}
                        />
                    ),
                    headerShown: false,
                    };
                }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name="user"
                                size={24}
                                color={getIconColor(focused, theme)}
                            />
                        ),
                        // Custom header for Chat screen
                        headerShown: true,
                        header: () => <BottomIcon IconText="Profile" />,
                        style: [styles.logoText, { backgroundColor: theme === "dark" ? customColor.Dark : customColor.Light  }],

                    }}
                />
            </Tab.Navigator>
        </>
        
    );
};

export default BottomTab;

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "start",
        // elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        padding: 10,
        paddingLeft: 30,
    },
    logoText: {
        fontSize: 20,
        fontWeight: "bold",
        color: customColor.PRUSSIAN_60,
        fontFamily: "serif", // Elegant font
    },
    tabBar: {
        elevation: 8,
        height: 65,
        paddingBottom: 10,
        paddingTop: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 10,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
    },
});
