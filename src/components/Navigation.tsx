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
import { Image, TouchableOpacity, View } from 'react-native';
import AntDesing from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import ProfileScreen from '../screens/ProfileScreen';
import PackagesScreen from '../screens/PackagesScreen';
import MenuScreen from '../screens/MenuScreen'
import EntertainmentScreen from '../screens/EntertainmentScreen'
import MyBooking from '../screens/MyBookings';
import MyHost from '../screens/MyHost';
import MyWalletScreen from '../screens/MyWalletScreen';
import MyCard from '../screens/MyCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactUsScreen from '../screens/ContactUsScreen';
import { ColorFirst } from '../data/data';
import MyOfferScreen from '../screens/MyOfferScreen';
import NotificationScreen from '../screens/NotificationScreen';

type RootStack = {
    Login: undefined
    Home: undefined
    Signin: undefined
    PackagesScreen: PackagesScreen
    Profile: PackagesScreen
    SignUp: {
        onGoBack: (Img: string, ImgApi: string) => void
    }
    EyeDetectScreen: undefined

}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<RootStack>();
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
                    options={{ headerShown: false, gestureEnabled: false }}
                    component={HomeScreen} />

                <Stack.Screen
                    name='Profile'
                    options={({ navigation }) => ({
                        title: '',
                        headerStyle: {
                            backgroundColor: ColorFirst,
                        },
                        headerTintColor: 'black',
                        headerLeft: () => (
                            <TouchableOpacity
                                style={{ marginLeft: 20, marginRight: 10 }}
                                onPress={async () => {
                                    const MID = await AsyncStorage.getItem('MID');

                                    navigation.navigate('Home',
                                        { 'PlayerID': String | MID });
                                }}>
                                <Entypo name="chevron-thin-left" color={'white'} size={25} />
                            </TouchableOpacity>

                        ),
                    })
                    }
                    component={ProfileScreen} />

                <Stack.Screen
                    name='Signin'
                    options={({ navigation }) => ({
                        title: '',
                        headerStyle: {
                            backgroundColor: ColorFirst,
                        },
                        headerTintColor: 'black',
                        headerLeft: () => (
                            <TouchableOpacity
                                style={{ marginLeft: 20, marginRight: 10 }}
                                onPress={() => {
                                    navigation.goBack();
                                }}>
                                <Entypo name="chevron-thin-left" color={'white'} size={25} />
                            </TouchableOpacity>

                        ),
                    })
                    }
                    component={SigninScreen} />

                <Stack.Screen
                    name='SignUp'
                    options={({ navigation }) => ({
                        title: '',
                        headerStyle: {
                            backgroundColor: ColorFirst,
                        },
                        headerTintColor: 'black',
                        headerLeft: () => (
                            <TouchableOpacity
                                style={{ marginLeft: 20, marginRight: 10 }}
                                onPress={() => {
                                   navigation.goBack();
                                }}>
                                <Entypo name="chevron-thin-left" color={'white'} size={25} />
                            </TouchableOpacity>

                        ),
                    })
                    }
                    component={SignupScreen} />

                <Stack.Screen
                    name='EyeDetectScreen'
                    options={({ navigation }) => ({
                        title: '',
                        headerStyle: {
                            backgroundColor: '#FF0024',
                        },
                        headerTintColor: 'black',
                        headerLeft: () => (
                            <TouchableOpacity
                                style={{ marginLeft: 20, marginRight: 10 }}
                                onPress={() => {
                                    navigation.goBack();
                                }}>
                                <Entypo name="chevron-thin-left" color={'white'} size={25} />
                            </TouchableOpacity>

                        ),
                    })
                    }
                    component={EyeDetect} />


                <Stack.Screen
                    name='PackagesScreen'
                    options={{ headerShown: false }}
                    component={PackagesScreen}
                />

                <Stack.Screen
                    name='MenuScreen'
                    options={{ headerShown: false }}
                    component={MenuScreen}
                />

                <Stack.Screen
                    name='EntertainmentScreen'
                    options={{ headerShown: false }}
                    component={EntertainmentScreen}
                />

                <Stack.Screen
                    name='MyBookings'
                    options={{ headerShown: false }}
                    component={MyBooking}
                />

                <Stack.Screen
                    name='MyHost'
                    options={{ headerShown: false }}
                    component={MyHost}
                />

                <Stack.Screen
                    name='MyWallet'
                    options={{ headerShown: false }}
                    component={MyWalletScreen}
                />

                <Stack.Screen
                    name='MyCard'
                    options={{ headerShown: false }}
                    component={MyCard}
                />

                <Stack.Screen
                    name='ContactUsScreen'
                    options={{ headerShown: false }}
                    component={ContactUsScreen}
                />

                <Stack.Screen
                    name='MyOfferScreen'
                    options={{ headerShown: false }}
                    component={MyOfferScreen}
                />

                <Stack.Screen
                    name='NotificationScreen'
                    options={{ headerShown: false }}
                    component={NotificationScreen}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

//make this component available to the app
export default Navigation;
