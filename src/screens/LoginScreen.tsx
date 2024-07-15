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

        console.log('Token : ', Token);


        if (Token !== null && (Token !== '' && Token !== undefined)) {
            const MID = await AsyncStorage.getItem('MID');

            console.log('MID : ' + MID);


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

        navigation.navigate('SignUp');

    };

    const handleLogin2 = (val: any) => {
        const checkPassword = checkPasswordValidity(password);
        console.log(val);

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
            colors={['#FF0024', '#FFB061', '#FFCE6C']}>
            <View style={styles.container}>
                <View style={styles.wrapper}>

                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../images/logo.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={{ marginStart: 10, marginTop: -80 }}>
                        <Text style={[styles.buttonText2, { fontSize: getFontSize() }]}>
                            BALLY'S MEMBER
                        </Text>
                        <Text style={[styles.buttonText2, { fontSize: getFontSize() }]} >
                            LOGIN
                        </Text>
                    </View>

                    <View style={styles.mainTextContainer}>
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
            <View style={{ width: '75%', alignItems: 'center', marginBottom: 40 }}>
                <View style={{ width: '100%', marginTop: 20 }}>
                    <GradientButtonWithBorder
                        title="SIGN IN"
                        onPress={() => handleLogin2('SIGN')}
                        colors={['transparent', 'transparent', 'transparent']}
                        borderColor="#FF0024"
                        buttonStyle={{}}
                        textStyle={styles.buttonText}
                    />
                </View>
                <Text style={{ textAlign: 'center', color: 'black', fontSize: 16, marginTop: 10 }}>NEW MEMBER LOGIN</Text>
                <Text style={{ textAlign: 'center' }}>If you are a first time user, please go through the sign up process</Text>
                <View style={{ marginTop: 20, width: '100%' }}>
                    <GradientButton
                        title="SIGN UP"
                        onPress={handleLogin}
                        colors={['#FF0024', '#FF0024', '#FF0024']}
                        textStyle={styles.buttonText}
                    />
                </View>
                <Text style={{ textAlign: 'center', color: 'black', fontSize: 16, marginTop: 10 }}>OR</Text>
                <Text style={{ textAlign: 'center' }}>If you are with a temporary ID, sign in here</Text>
                <View style={{ width: '100%', marginTop: 20 }}>
                    <GradientButtonWithBorder
                        title="TEMPORARY SIGN IN"
                        onPress={() => handleLogin2('TEMP')}
                        colors={['transparent', 'transparent', 'transparent']}
                        borderColor="#FF0024"
                        buttonStyle={{}}
                        textStyle={styles.buttonText}
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
        width: wp('55%'),
        height: hp('45%'),
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
        marginTop: -50,
        left: width * 0.1,
    },

    mainTextContainer: {
        margin: 10,
        marginTop: 5,
        marginBottom: 20
    },

    gradient: {
        borderRadius: 10,
    },
    buttonText2: {
        color: '#ffffff',
        fontSize: 50,
        textAlign: 'left',
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
    },

    buttonText3: {
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'left',
        fontFamily: 'Helvetica',
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 16,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },

});

//make this component available to the app
export default LoginScreen;
