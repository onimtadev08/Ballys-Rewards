import React, { FC, useEffect, useRef, useState } from 'react';
import { ImageBackground, BackHandler, View, TouchableOpacity, Image, Text, Animated, Easing, Dimensions } from 'react-native';
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
    BackButtonNew?: boolean;
}

//const Mname = await AsyncStorage.getItem('strMName');

const TopNav: React.FC<propsData> = ({
    navigation,
    titel,
    BackButton,
    isMarquee,
    Tags,
    BackButtonNew,
}) => {

    const { width: screenWidth } = Dimensions.get('window');
    const { height: screenHeight } = Dimensions.get('window');

    const [openCard, setopenCard] = useState<boolean>(false);
    const [showCard, setshowCard] = useState<boolean>(false);

    const [Mname, setMname] = useState<string>('');

    const animationRef = useRef(new Animated.Value(openCard ? 0 : -screenWidth)).current;


    const handleBackPress
        = () => {
            // Handle back button press logic here
            if (showCard) {
                setopenCard(false);
                setTimeout(() => {
                    setshowCard(false);
                }, 300);
            }
            return true; // Prevent default back behavior
        };


    useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        // Defining the target value for the animation based on the ‘openCard’ prop
        //     const Mname = AsyncStorage.getItem('strMName');

        // async function name() {
        //     const Mname = await AsyncStorage.getItem('strMName');
        //     return Mname;
        // }

        //     setMname(name());

        const targetValue = openCard ? 0 : -screenWidth;
        // Choosing the easing function for the animation based on the ‘openCard’ prop

        const easingFunction = openCard ? Easing.inOut(Easing.ease) : Easing.out(Easing.ease);
        // Configuring the animation using the Animated.timing method

        Animated.timing(animationRef, {
            toValue: targetValue, // Setting the target value for the animation
            duration: 300, // Setting the duration of the animation in milliseconds
            easing: easingFunction, // Applying the chosen easing function
            useNativeDriver: true, // Using the native driver for improved performance
        }).start(); // Starting the animation

    }, [openCard, animationRef]);




    return (
        <View style={{ zIndex: 1,marginTop:10 }}>


            {showCard ?
                <Animated.View style={{
                    zIndex: 3,
                    transform: [{ translateX: animationRef }],
                    width: screenWidth,
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                }}>

                    {/* <BlurView style={{
                            zIndex: 3,
                            position: 'absolute',
                            width: screenWidth,
                            height: screenWidth * 1.9,
                        }}
                            blurAmount={5}
                            blurType='dark'
                            reducedTransparencyFallbackColor='white'
                        > */}

                    <ImageBackground source={require('../images/meg.jpg')}
                        blurRadius={100}
                        resizeMode='stretch'
                        style={{
                            zIndex: 3,
                            width: '100%',
                            height: '100%',
                            opacity: 1,
                        }}>

                        <DrawerMenu
                            navigation={navigation}
                            onPress={() => {
                                if (showCard) {
                                    setopenCard(false);
                                    setshowCard(false)
                                } else {
                                    setopenCard(true);
                                    setshowCard(true);
                                }
                            }}
                            onClose={() => {

                                setopenCard(false);
                                setTimeout(() => {
                                    setshowCard(false);
                                }, 300);

                                //          setshowCard(false);
                                //           setopenCard(true);

                            }}
                        />

                    </ImageBackground>



                    {/* </BlurView > */}

                </Animated.View> : null
            }

            <View style={{
                flexDirection: 'row',
                width: '100%',
                height: 50,
                alignItems: 'center',
            }} >



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
                            if (BackButtonNew) {
                                const MID = await AsyncStorage.getItem('MID');
                                navigation.replace('GamingScreen', { 'PlayerID': MID });

                                if (BackButton) {
                                    navigation.goBack();
                                } else {

                                    // if (showCard) {
                                    //     setopenCard(false);
                                    // } else {
                                    setopenCard(true);
                                    setshowCard(true);
                                    // }
                                }
                            } else {
                                if (BackButton) {
                                    navigation.goBack();
                                } else {

                                    // if (showCard) {
                                    //     setopenCard(false);
                                    // } else {
                                    setopenCard(true);
                                    setshowCard(true);
                                    // }
                                }
                            }
                        }}
                    >

                        {BackButtonNew ?
                            <Ionicons name='chevron-back-outline' size={40} color={'#f8d888'} style={{ width: 30 }} />
                            : BackButton ?
                                <Ionicons name='chevron-back-outline' size={40} color={'#f8d888'} style={{ width: 30 }} />
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