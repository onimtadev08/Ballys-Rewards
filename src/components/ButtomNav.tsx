import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import MyCard from '../images/svgs/MyCard.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeButton from 'react-native-really-awesome-button';
import { ColorTherd } from '../data/data.js';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

interface ButtomNavProps {
    navigation: any;
}


const ButtomNav: React.FC<ButtomNavProps> = ({
    navigation
}) => {
    return (
        <View style={{ zIndex: -1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>


            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', height: '100%', marginTop: 30 }}>
                <AwesomeButton
                    paddingHorizontal={0}
                    paddingBottom={0}
                    paddingTop={0}
                    backgroundColor='transparent'
                    raiseLevel={15}
                    backgroundDarker='transparent'
                    backgroundShadow='transparent'
                    backgroundActive='transparent'
                    height={parseInt('100%', 10)}
                    width={parseInt('100%', 10)}
                    onPress={async () => {
                        const MID = await AsyncStorage.getItem('MID');

                        navigation.navigate('Home', { 'PlayerID': MID });
                    }}
                >
                    <View style={{ flexDirection: 'column', backgroundColor: 'transparent', height: '100%', width: '100%', alignItems: 'center' }}>



                        <Image source={require('../images/svgtopng/HOME.png')} resizeMode='contain' style={{ height: '50%', width: '50%' }} />


                        <Text
                            style={{
                                marginTop: 5,
                                backgroundColor: 'transparent',
                                width: '100%',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 10,
                                color: 'white',
                                fontFamily: 'SFPRODISPLAYBOLD',
                            }}
                        >HOME</Text>
                    </View>
                </AwesomeButton>
            </View>



            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', height: '100%', marginTop: 30 }}>
                <AwesomeButton
                    paddingHorizontal={0}
                    paddingBottom={0}
                    paddingTop={0}
                    backgroundColor='transparent'
                    raiseLevel={15}
                    backgroundDarker='transparent'
                    backgroundShadow='transparent'
                    backgroundActive='transparent'
                    height={parseInt('100%', 10)}
                    width={parseInt('100%', 10)}
                    onPress={async () => {
                        const MID = await AsyncStorage.getItem('MID');

                        navigation.navigate('MyCard', { 'PlayerID': MID });
                    }}
                >
                    <View style={{ flexDirection: 'column', backgroundColor: 'transparent', height: '100%', width: '100%', alignItems: 'center' }}>



                        <Image source={require('../images/svgtopng/myCard.png')} resizeMode='contain' style={{ height: '50%', width: '50%' }} />


                        <Text
                            style={{
                                marginTop: 5,
                                backgroundColor: 'transparent',
                                width: '100%',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 10,
                                color: 'white',
                                fontFamily: 'SFPRODISPLAYBOLD',
                            }}
                        >MY CARD</Text>
                    </View>
                </AwesomeButton>
            </View>


            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', height: '100%', marginTop: 10 }}>
                <AwesomeButton
                    paddingHorizontal={0}
                    paddingBottom={0}
                    paddingTop={0}
                    backgroundColor='transparent'
                    raiseLevel={15}
                    backgroundDarker='transparent'
                    backgroundShadow='transparent'
                    backgroundActive='transparent'
                    height={parseInt('100%', 10)}
                    width={parseInt('100%', 10)}
                    onPress={async () => {
                        const MID = await AsyncStorage.getItem('MID');

                        navigation.navigate('MyWallet', { 'PlayerID': MID });
                    }}
                >
                    <View style={{ flexDirection: 'column', backgroundColor: 'transparent', height: '100%', width: '100%', alignItems: 'center' }}>



                        <Image source={require('../images/svgtopng/MyWalletPng.png')} resizeMode='contain' style={{ height: '70%', width: '70%' }} />


                        <Text
                            style={{
                                marginTop: 5,
                                backgroundColor: 'transparent',
                                width: '100%',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 10,
                                color: 'white',
                                fontFamily: 'SFPRODISPLAYBOLD',
                            }}
                        >MY WALLET</Text>
                    </View>
                </AwesomeButton>
            </View>



            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', height: '100%', marginTop: 30 }}>
                <AwesomeButton
                    paddingHorizontal={0}
                    paddingBottom={0}
                    paddingTop={0}
                    backgroundColor='transparent'
                    raiseLevel={15}
                    backgroundDarker='transparent'
                    backgroundShadow='transparent'
                    backgroundActive='transparent'
                    height={parseInt('100%', 10)}
                    width={parseInt('100%', 10)}
                    onPress={async () => {
                        const MID = await AsyncStorage.getItem('MID');

                        navigation.navigate('MyBookings', { 'PlayerID': MID });
                    }}
                >
                    <View style={{ flexDirection: 'column', backgroundColor: 'transparent', height: '100%', width: '100%', alignItems: 'center' }}>



                        <Image source={require('../images/svgtopng/MyBookingPng.png')} resizeMode='contain' style={{ height: '50%', width: '50%' }} />


                        <Text
                            style={{
                                marginTop: 5,
                                backgroundColor: 'transparent',
                                width: '100%',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 10,
                                color: 'white',
                                fontFamily: 'SFPRODISPLAYBOLD',
                            }}
                        >MY BOOKING</Text>
                    </View>
                </AwesomeButton>
            </View>



            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', height: '100%', marginTop: 30 }}>
                <AwesomeButton
                    paddingHorizontal={0}
                    paddingBottom={0}
                    paddingTop={0}
                    backgroundColor='transparent'
                    raiseLevel={15}
                    backgroundDarker='transparent'
                    backgroundShadow='transparent'
                    backgroundActive='transparent'
                    height={parseInt('100%', 10)}
                    width={parseInt('100%', 10)}
                    onPress={async () => {
                        const MID = await AsyncStorage.getItem('MID');

                        navigation.navigate('MyHost', { 'PlayerID': MID });
                    }}
                >
                    <View style={{ flexDirection: 'column', backgroundColor: 'transparent', height: '100%', width: '100%', alignItems: 'center' }}>



                        <Image source={require('../images/svgtopng/MyHost.png')} resizeMode='contain' style={{ height: '50%', width: '50%' }} />


                        <Text
                            style={{
                                marginTop: 5,
                                backgroundColor: 'transparent',
                                width: '100%',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: 10,
                                color: 'white',
                                fontFamily: 'SFPRODISPLAYBOLD',
                            }}
                        >MY HOST</Text>
                    </View>
                </AwesomeButton>
            </View>


        </View >
    );
};

export default ButtomNav;
