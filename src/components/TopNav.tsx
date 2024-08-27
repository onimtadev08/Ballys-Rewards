import React, { FC, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, Text, Animated, Easing, Dimensions } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from '@react-native-community/blur';
import DrawerMenu from './DrawerMenu';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Marquee } from '@animatereactnative/marquee';

interface propsData {
    navigation: any;
    titel: string;
    BackButton?: boolean;
    isMarquee?: boolean;
    Tags?: any[];

}


const TopNav: React.FC<propsData> = ({
    navigation,
    titel,
    BackButton,
    isMarquee,
    Tags,
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
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }}
                        blurAmount={5}
                        blurType='dark'
                        reducedTransparencyFallbackColor='white'
                    >


                        <DrawerMenu
                            navigation={navigation}
                            onPress={() => {
                                if (openCard) {
                                    setopenCard(false);
                                } else {
                                    setopenCard(true);
                                }
                            }} />

                    </BlurView >

                </Animated.View> : null
                }

                <View style={{ marginStart: openCard ? 30 : 20, zIndex: 2 }} >

                    <TouchableOpacity
                        style={{

                            borderRadius: 40,
                            width: '40%',
                            alignItems: 'center',
                        }}
                        onPress={async () => {
                            // const MID = await AsyncStorage.getItem('MID');
                            // navigation.navigate('MenuScreen', { 'PlayerID': MID });

                            if (BackButton) {
                                navigation.goBack();
                            } else {

                                if (openCard) {
                                    setopenCard(false);
                                } else {
                                    setopenCard(true);
                                }
                            }
                        }}
                    >
                        {BackButton ?
                            <Ionicons name='chevron-back-outline' size={40} color={'#f8d888'} />
                            :
                            <Image source={require('../images/svgtopng/menubar.png')} style={{ width: 30, height: 30 }} height={30} width={30} resizeMode='contain'></Image>
                        }
                    </TouchableOpacity>

                </View>

                {isMarquee ?

                    <View style={{ marginStart: 10, marginEnd: 10, flex: 1, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                        <Marquee>

                            <View style={{ flexDirection: 'row' }}>
                                {Tags?.map((tag, index) => (

                                    <Text
                                        key={index}
                                        style={{
                                            color: 'gold',
                                            fontSize: 25,
                                            fontFamily: 'SFPRODISPLAYREGULAR',
                                            fontWeight: 'bold',
                                        }}> {tag} | </Text>

                                ))}
                            </View>
                        </Marquee>
                    </View>

                    :

                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 20,
                            textAlign: 'center'
                        }}>{titel}</Text>
                    </View>
                }




                <View style={{ marginEnd: 20, alignItems: 'flex-end' }} >

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