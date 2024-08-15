import React from 'react';
import { TouchableOpacity, Text, View, ViewStyle, TextStyle, Dimensions, Image } from 'react-native';
import MyCard from '../images/svgs/MyCard.js';
import MyBookings from '../images/svgs/MyBookings.js';
import MyHost from '../images/svgs/MyHost.js';
import MyWallet from '../images/svgs/MyWallet.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeButton from 'react-native-really-awesome-button';



const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');



interface ButtomNavProps {
    navigation: any;
}

const ButtomNav: React.FC<ButtomNavProps> = ({
    navigation
}) => {
    return (
        <View style={{ marginStart: 20, height: '9%', flexDirection: 'row', marginBottom: 30 }}>

            <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: 10, marginLeft: -15 }}>
                <AwesomeButton
                    backgroundColor='transparent'
                    raiseLevel={15}
                    backgroundDarker='transparent'
                    backgroundShadow='transparent'
                    backgroundActive='transparent'
                    width={(screenWidth / 100) * 24}
                    height={(screenHeight / 100) * 10}
                    onPress={async () => {
                        const MID = await AsyncStorage.getItem('MID');
                        console.log('MID : ' + MID);
                        navigation.navigate('Home', { 'PlayerID': MID });
                    }}
                >
                    <View style={{ flexDirection: 'column', backgroundColor: 'transparent', paddingBottom: 10, marginTop: 10, minWidth: '100%' }}>

                        <Image source={require('../images/svgtopng/HOME.png')} resizeMode='contain' style={{ height: 50, width: 100 }} />

                        <Text
                            style={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 10,
                                color: 'white',
                                fontFamily: 'SFPRODISPLAYBOLD',
                                marginTop: 5,
                            }}
                        >HOME</Text>
                    </View>
                </AwesomeButton>
            </View>

            <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: 10, marginLeft: -5 }}>
                <AwesomeButton
                    backgroundColor='transparent'
                    raiseLevel={15}
                    backgroundDarker='transparent'
                    backgroundShadow='transparent'
                    backgroundActive='transparent'
                    width={(screenWidth / 100) * 24}
                    height={(screenHeight / 100) * 10}
                    onPress={async () => {
                        const MID = await AsyncStorage.getItem('MID');
                        console.log('MID : ' + MID);
                        navigation.navigate('MyCard', { 'PlayerID': MID });
                    }}
                >
                    <View style={{ flexDirection: 'column', backgroundColor: 'transparent', paddingBottom: 10, marginTop: 10, minWidth: '100%' }}>
                        <MyCard />
                        <Text
                            style={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 10,
                                color: 'white',
                                fontFamily: 'SFPRODISPLAYBOLD',
                                marginTop: 5,
                            }}
                        >MY CARD</Text>
                    </View>
                </AwesomeButton>
            </View>


            <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: 10, marginLeft: -5 }}>
                <AwesomeButton
                    backgroundColor='transparent'
                    raiseLevel={15}
                    backgroundDarker='transparent'
                    backgroundShadow='transparent'
                    backgroundActive='transparent'
                    width={(screenWidth / 100) * 24}
                    height={(screenHeight / 100) * 10}
                    onPress={async () => {
                        const MID = await AsyncStorage.getItem('MID');
                        console.log('MID : ' + MID);
                        navigation.navigate('MyBookings', { 'PlayerID': MID });
                    }}
                >
                    <View style={{
                        flexDirection: 'column',
                        backgroundColor: 'transparent',
                        paddingBottom: 10,
                        marginTop: 10,
                        minWidth: '100%'
                    }}>
                        {/* <MyBookings /> */}

                        <Image source={require('../images/svgtopng/MyBookingPng.png')} resizeMode='contain' style={{ height: 50, width: 100 }} />


                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 10,
                                color: 'white',
                                fontFamily: 'SFPRODISPLAYBOLD',
                                marginTop: 5,
                            }}
                        >MY BOOKING</Text>
                    </View>
                </AwesomeButton>
            </View>

            <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: 10, marginLeft: -5 }}>
                <AwesomeButton
                    backgroundColor='transparent'
                    raiseLevel={15}
                    backgroundDarker='transparent'
                    backgroundShadow='transparent'
                    backgroundActive='transparent'
                    width={(screenWidth / 100) * 24}
                    height={(screenHeight / 100) * 10}
                    onPress={async () => {
                        const MID = await AsyncStorage.getItem('MID');
                        console.log('MID : ' + MID);
                        navigation.navigate('MyHost', { 'PlayerID': MID });
                    }}
                >
                    <View style={{
                        flexDirection: 'column',
                        backgroundColor: 'transparent',
                        paddingBottom: 10,
                        marginTop: 10,
                        minWidth: '100%'
                    }}>
                        {/* <MyHost /> */}
                        <Image source={require('../images/svgtopng/MyHost.png')} resizeMode='contain' style={{ height: 50, width: 100 }} />

                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 10,
                                color: 'white',
                                fontFamily: 'SFPRODISPLAYBOLD',
                                marginTop: 5,
                            }}
                        >MY HOST</Text>
                    </View>
                </AwesomeButton>
            </View>

            <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: 10, marginLeft: -5, marginEnd: 10 }}>
                <AwesomeButton
                    backgroundColor='transparent'
                    raiseLevel={15}
                    backgroundDarker='transparent'
                    backgroundShadow='transparent'
                    backgroundActive='transparent'
                    width={(screenWidth / 100) * 24}
                    height={(screenHeight / 100) * 10}
                    onPress={async () => {
                        const MID = await AsyncStorage.getItem('MID');
                        console.log('MID : ' + MID);
                        navigation.navigate('MyWallet', { 'PlayerID': MID });
                    }}
                >
                    <View style={{
                        flexDirection: 'column',
                        backgroundColor: 'transparent',
                        paddingBottom: 10,
                        marginTop: 10,
                        minWidth: '100%'
                    }}>
                        {/* <MyWallet /> */}
                        <Image source={require('../images/svgtopng/MyWalletPng.png')} resizeMode='contain' style={{ height: 50, width: 100 }} />
                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 10,
                                color: 'white',
                                fontFamily: 'SFPRODISPLAYBOLD',
                                marginTop: 5,
                            }}
                        >MY WALLET</Text>
                    </View>
                </AwesomeButton>
            </View>
        </View >
    );
};

export default ButtomNav;
