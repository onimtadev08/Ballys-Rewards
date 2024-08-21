//import liraries
import React, { Component, useContext, useState } from 'react';
import { BackHandler, View, Text, StyleSheet, TextInput, Button, Touchable, TouchableOpacity, Alert, ImageBackground, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import GradientButtonWithBorder from '../components/GradientButton';
import GradientButton from '../components/GradientButtonfull';
const { width, height } = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data'

// create a component
const LoginScreen = ({ }) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigation = useNavigation();

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);

        CheckLogin();

    });

    const CheckLogin = async () => {
        const Token = await AsyncStorage.getItem('Token');

  


        if (Token !== null && (Token !== '' && Token !== undefined)) {
            const MID = await AsyncStorage.getItem('MID');

          


            navigation.navigate('Home',
                { 'PlayerID': String | MID });

        }

    }

    const checkPasswordValidity = (value: any) => {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {

            return 'dd';
        }
        return null;
    };

    const handleLogin = () => {
        const checkPassword = checkPasswordValidity(password);

        navigation.navigate('SignUp', { 'Img': '', 'ImgApi': '' });

    };

    const handleLogin2 = (val: any) => {
        const checkPassword = checkPasswordValidity(password);
   

        navigation.navigate('Signin', {
            "Method": val,
        });

    };

    const getFontSize = () => {
        // Calculate font size based on screen width
        const screenWidth = width < height ? width : height; // Get the smaller dimension
        return screenWidth * 0.08; // 5% of the screen width
    };
    return (
        <LinearGradient
            style={styles.container}
            colors={[ColorFirst, ColorSecond, ColorTherd]}
        >

            <View style={{ flexDirection: 'column', flex: 1 }}>

                <View >
                    <View >

                        <View style={{ alignItems: 'center' }} >
                            <Image
                                source={require('../images/logo.png')}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={{ marginStart: 10, marginTop: -30 }}>
                            <Text style={[styles.buttonText2, { fontSize: 30 }]}>
                                BALLY'S MEMBER
                            </Text>
                            <Text style={[styles.buttonText2, { fontSize: 30 }]} >
                                LOGIN
                            </Text>
                        </View>

                        <View >
                            <Text style={styles.buttonText3} >
                                Now you can enjoy all the
                            </Text>
                            <Text style={styles.buttonText3} >
                                excitement of the casino right at
                            </Text>
                            <Text style={styles.buttonText3} >
                                your fingertips.
                            </Text>
                        </View>


                    </View>
                </View>

                <View style={{ margin: 20, justifyContent: 'center' }}>
                    <GradientButtonWithBorder
                        title="SIGN IN"
                        onPress={() => handleLogin2('SIGN')}
                        colors={['transparent', 'transparent', 'transparent']}
                        borderColor="#FFCE6C"
                        buttonStyle={{}}
                        textStyle={styles.buttonText}
                    />
                </View>



                <View style={{ width: '100%', alignItems: 'center' }}>

                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold' }}>NEW MEMBER LOGIN</Text>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>If you are a first time user, please go through the sign up process</Text>
                </View>
                <View style={{ margin: 20, justifyContent: 'center' }}>
                    <GradientButtonWithBorder
                        title="SIGN UP"
                        onPress={handleLogin}
                        colors={['transparent', 'transparent', 'transparent']}
                        borderColor="#FFCE6C"
                        buttonStyle={{}}
                        textStyle={styles.buttonText}
                    />
                </View>

                <View style={{ alignItems: 'center' }}>

                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold' }}>OR</Text>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'white', }}>If you are with a temporary ID, sign in here</Text>

                </View>


                <View style={{ margin: 20, justifyContent: 'center' }}>
                    <GradientButtonWithBorder
                        title={'TEMPORARY\nSIGN IN'}
                        onPress={() => handleLogin2('TEMP')}
                        colors={['transparent', 'transparent', 'transparent']}
                        borderColor="#FFCE6C"
                        buttonStyle={{}}
                        textStyle={styles.buttonText4}
                    />
                </View>

            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    wrapper: {
        position: 'relative',
        width: width * 0.9,
    },
    image: {
        marginTop: 20,
        width: wp('55%'),
        height: hp('35%'),
        resizeMode: 'contain',
    },

    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        paddingHorizontal: 14,
    },

    imageContainer: {
        marginStart: 30,
    },

    mainTextContainer: {
        marginLeft: 10,
    },

    gradient: {
        borderRadius: 10,
    },
    buttonText2: {
        color: '#ffffff',
        fontSize: 50,
        textAlign: 'center',
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
    },

    buttonText3: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Helvetica',
    },
    buttonText4: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 16,
        textAlign: 'center',
    }, buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 18,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },

});

//make this component available to the app
export default LoginScreen;
