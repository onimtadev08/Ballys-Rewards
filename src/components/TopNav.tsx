import React, { FC, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, Text, Animated, Easing, Dimensions } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from '@react-native-community/blur';

interface propsData {
    navigation: any;
    titel: string;
    //  openCard: boolean;
}


const TopNav: React.FC<propsData> = ({
    navigation,
    titel,
    //   openCard,
}) => {

    const { width: screenWidth } = Dimensions.get('window');
    const { height: screenHeight } = Dimensions.get('window');

    const [openCard, setopenCard] = useState<boolean>(false);


    const animationRef = useRef(new Animated.Value(openCard ? 0 : -screenWidth)).current;

    useEffect(() => {
        // Defining the target value for the animation based on the ‘openCard’ prop

        const targetValue = openCard ? 0 : -screenWidth;
        // Choosing the easing function for the animation based on the ‘openCard’ prop

        const easingFunction = openCard ? Easing.inOut(Easing.ease) : Easing.out(Easing.ease);
        // Configuring the animation using the Animated.timing method

        Animated.timing(animationRef, {
            toValue: targetValue, // Setting the target value for the animation
            duration: 500, // Setting the duration of the animation in milliseconds
            easing: easingFunction, // Applying the chosen easing function
            useNativeDriver: true, // Using the native driver for improved performance
        }).start(); // Starting the animation

    }, [openCard, animationRef]);




    return (
        <View style={{ zIndex: 1 }}>

            <View style={{
                flexDirection: 'row',
                width: '100%',
                height: 50,
                alignItems: 'center'
            }} >

                {openCard ? <Animated.View style={{ transform: [{ translateX: animationRef }], width: screenWidth, height: screenHeight * 2 }}>

                    <BlurView style={{
                        zIndex: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }}
                        blurAmount={5}
                        blurType='dark'
                        reducedTransparencyFallbackColor='white'
                    >
                        <View
                            style={{
                                position: 'absolute',
                                width: screenWidth,
                                height: screenHeight,
                                overflow: 'hidden',
                                backgroundColor: 'rgba(0,0,0,0.0)',
                                // backgroundColor: 'red',
                                justifyContent: 'center',
                                alignItems: 'center',

                                // left: '36%',
                                borderRadius: 10,
                            }}>
                            <TouchableOpacity
                                style={{ width: 100, height: 100, backgroundColor: 'black' }}
                                onPress={() => {
                                    if (openCard) {
                                        setopenCard(false);
                                    } else {
                                        setopenCard(true);
                                    }
                                }}
                            ></TouchableOpacity>
                            <Text style={{ marginTop: 20, color: 'white', fontSize: 20 }}>
                                Please wait
                            </Text>
                        </View>
                    </BlurView >

                </Animated.View> : null
                }

                <View style={{ marginStart: openCard ? 30 : 10, flex: 1, zIndex: 2 }} >

                    <TouchableOpacity
                        style={{

                            borderRadius: 40,
                            width: '40%',
                            alignItems: 'center',
                        }}
                        onPress={async () => {
                            // const MID = await AsyncStorage.getItem('MID');
                            // navigation.navigate('MenuScreen', { 'PlayerID': MID });

                            if (openCard) {
                                setopenCard(false);
                            } else {
                                setopenCard(true);
                            }

                        }}
                    >
                        <Image source={require('../images/svgtopng/menubar.png')} style={{ width: 30, height: 30 }} height={30} width={30} resizeMode='contain'></Image>
                    </TouchableOpacity>

                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 20,
                        textAlign: 'center'
                    }}>{titel}</Text>
                </View>


                <View style={{ marginEnd: 10, flex: 1, alignItems: 'flex-end' }} >

                    <TouchableOpacity
                        style={{

                            borderRadius: 40,
                            width: '40%',
                            alignItems: 'center',
                        }}
                        onPress={async () => {
                            const MID = await AsyncStorage.getItem('MID');
                            navigation.navigate('NotificationScreen', { 'PlayerID': MID });
                        }}
                    >
                        <Image source={require('../images/svgtopng/NOTIFICATION.png')} style={{ width: 30, height: 30 }} height={30} width={30} resizeMode='contain'></Image>
                    </TouchableOpacity>

                </View>

            </View>
        </View >
    );
};

export default TopNav;