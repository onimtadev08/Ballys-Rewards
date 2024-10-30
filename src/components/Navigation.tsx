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
import MenuScreen from '../screens/old/MenuScreen'
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
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import SplashScreen from '../screens/SplashScreen';
import TaxiScreen from '../screens/TaxiScreen';
import TaxiDetailsScreen from '../screens/TaxiDetailsScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import ChangePinScreen from '../screens/ChangePinScreen';
import ChangeEmailScreen from '../screens/ChangeEmailScreen';
import SinglePageDetailsScreen from '../screens/SinglePageDetailsScreen';
import GamingScreen from '../screens/GamingScreen';
import WhereToRedeemScreen from '../screens/WhereToRedeemScreen';
import HowToRedeemScreen from '../screens/HowToRedeemScreen';
import RewardLoyalityScreen from '../screens/RewardLoyalityScreen';
import TableLimitsScreen from '../screens/TableLimitsScreen';
import MemberBenifitScreen from '../screens/MemberBenifitsScreen';
import QrScanerScreen from '../screens/QrScanerScreen';
import SpaScreen from '../screens/SpaScreen';

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
    SplashScreen: SplashScreen;
    MenuScreen: MenuScreen
    MyBooking: undefined
    MyHost: undefined
    EntertainmentScreen: undefined
    MyWalletScreen: undefined
    MyCard: undefined
    ContactUsScreen: undefined
    MyOfferScreen: undefined
    NotificationScreen: undefined
    TransactionHistoryScreen: undefined
    TaxiScreen: undefined
    TaxiDetailsScreen: undefined
    AccountSettingsScreen: undefined
    ChangePinScreen: undefined
    ChangeEmailScreen: undefined
    SinglePageDetailsScreen: undefined
    GamingScreen: undefined
    WhereToRedeemScreen: undefined
    HowToRedeemScreen: undefined
    RewardLoyalityScreen: undefined
    TableLimitsScreen: undefined
    MemberBenifitScreen: undefined
    QrScanerScreen: undefined
    MyBookings: undefined
    MyHosts: undefined
    MyWallet: undefined
    SpaScreen: undefined

}

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<RootStack>();
// create a component
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='SplashScreen'
                    options={{ headerShown: false }}
                    component={SplashScreen} />
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
                                        { 'PlayerID': MID });
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

                <Stack.Screen
                    name='TransactionHistoryScreen'
                    options={{ headerShown: false }}
                    component={TransactionHistoryScreen}
                />

                <Stack.Screen
                    name='TaxiScreen'
                    options={{ headerShown: false }}
                    component={TaxiScreen}
                />

                <Stack.Screen
                    name='TaxiDetailsScreen'
                    options={{ headerShown: false }}
                    component={TaxiDetailsScreen}
                />

                <Stack.Screen
                    name='AccountSettingsScreen'
                    options={{ headerShown: false }}
                    component={AccountSettingsScreen}
                />

                <Stack.Screen
                    name='ChangePinScreen'
                    options={{ headerShown: false }}
                    component={ChangePinScreen}
                />

                <Stack.Screen
                    name='ChangeEmailScreen'
                    options={{ headerShown: false }}
                    component={ChangeEmailScreen}
                />

                <Stack.Screen
                    name='SinglePageDetailsScreen'
                    options={{ headerShown: false }}
                    component={SinglePageDetailsScreen}
                />

                <Stack.Screen
                    name='GamingScreen'
                    options={{ headerShown: false }}
                    component={GamingScreen}
                />

                <Stack.Screen
                    name='WhereToRedeemScreen'
                    options={{ headerShown: false }}
                    component={WhereToRedeemScreen}
                />

                <Stack.Screen
                    name='HowToRedeemScreen'
                    options={{ headerShown: false }}
                    component={HowToRedeemScreen}
                />

                <Stack.Screen
                    name='RewardLoyalityScreen'
                    options={{ headerShown: false }}
                    component={RewardLoyalityScreen}
                />

                <Stack.Screen
                    name='TableLimitsScreen'
                    options={{ headerShown: false }}
                    component={TableLimitsScreen}
                />

                <Stack.Screen
                    name='MemberBenifitScreen'
                    options={{ headerShown: false }}
                    component={MemberBenifitScreen}
                />

                <Stack.Screen
                    name='QrScanerScreen'
                    options={{ headerShown: false }}
                    component={QrScanerScreen}
                />

                <Stack.Screen
                    name='SpaScreen'
                    options={{ headerShown: false }}
                    component={SpaScreen}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

//make this component available to the app
export default Navigation;
