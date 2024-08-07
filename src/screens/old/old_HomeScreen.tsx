import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Tab4';
import ProfileScreen from '../ProfileScreen';

// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 300);
    }, []);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#FFFFFF',
                tabBarStyle: {
                    backgroundColor: '#000000', 
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Tab1}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={'white'} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Updates"
                component={Tab2}
                options={{
                    tabBarLabel: 'Updates',
                    tabBarIcon: ({ color }) => (
                        <Icon name="windows" color={'#FFFFFF'} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Tab3}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Icon name="star" color={'#FFFFFF'} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Settings"
                component={Tab4}
                options={{
                    tabBarLabel: 'Social',
                    tabBarIcon: ({ color }) => (
                        <Fontisto name="like" color={'#FFFFFF'} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile1"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="people" color={'#FFFFFF'} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default HomeScreen;
