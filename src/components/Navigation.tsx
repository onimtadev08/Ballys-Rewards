//import liraries
import React, { Component } from 'react';
// import {SimpleLineIcons,MaterialIcons,MaterialCommunityIcons,FontAwesome} from 'react-native-vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
// import Tab1 from '../screens/Tab1';
// import Tab2 from '../screens/Tab2';
// import Tab3 from '../screens/Tab3';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import EyeDetect from '../screens/EyeDetect';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
// create a component
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Login'
                    options={{ headerShown: false }}
                    component={LoginScreen} />
                <Stack.Screen
                    name='Home'
                    options={{ headerShown: false }}
                    component={HomeScreen} />
                <Stack.Screen
                    name='Signin'
                    options={{ headerShown: false }}
                    component={SigninScreen} />

                <Stack.Screen
                    name='SignUp'
                    options={{ headerShown: false }}
                    component={SignupScreen} />

                <Stack.Screen
                    name='EyeDetectScreen'
                    options={{ headerShown: false }}
                    component={EyeDetect} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

//make this component available to the app
export default Navigation;
