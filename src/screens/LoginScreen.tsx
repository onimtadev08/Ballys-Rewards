//import liraries
import React, { Component, useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Touchable, TouchableOpacity, Alert, ImageBackground, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import GradientButtonWithBorder from '../components/GradientButton';
import GradientButton from '../components/GradientButtonfull';
const { width, height } = Dimensions.get('window');
import LottieView from 'lottie-react-native';


// create a component
const LoginScreen = ({ }) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigation = useNavigation();



    const checkPasswordValidity = (value: any) => {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {

            return 'dd';
        }
        return null;
    };

    const handleLogin = () => {
        const checkPassword = checkPasswordValidity(password);

        navigation.navigate('Home');

    };

    const handleLogin2 = () => {
        const checkPassword = checkPasswordValidity(password);

        navigation.navigate('Signin');

    };

    const getFontSize = () => {
        // Calculate font size based on screen width
        const screenWidth = width < height ? width : height; // Get the smaller dimension
        return screenWidth * 0.08; // 5% of the screen width
    };
    return (
        <LinearGradient
            style={styles.container}
            colors={['#FF0024', '#FF6648', '#FFCE6C']}>
            <View style={styles.container}>
                <View style={styles.wrapper}>

                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../images/logo.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.mainTextContainer}>
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

                    <GradientButton
                        title="SIGN UP"
                        onPress={handleLogin}
                        colors={['#FF0024', '#FF0024', '#FF0024']}
                        buttonStyle={styles.customButton}
                        textStyle={styles.buttonText}
                    />
                    <GradientButtonWithBorder
                        title="SIGN IN"
                        onPress={handleLogin2}
                        colors={['transparent', 'transparent', 'transparent']}
                        borderColor="#FF0024"
                        buttonStyle={styles.customButton}
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
        width: wp('65%'),
        height: hp('55%'),
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
        position: 'absolute',
        left: width * 0.1,
        bottom: height * 0.2,
        // alignItems: 'flex-end',
    },

    mainTextContainer: {
        margin: 10,
        marginTop: 5,
        marginBottom: 20
    },

    gradient: {
        borderRadius: 10,
    },
    customButton: {
        top: 150,
        margin: 10,
        padding: 15,
        borderRadius: 20,
    },
    buttonText2: {
        top: height * 0.2,
        color: '#ffffff',
        fontSize: 50,
        textAlign: 'left',
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
    },

    buttonText3: {
        top: 140,
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'left',
        fontFamily: 'Helvetica',
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },

});

//make this component available to the app
export default LoginScreen;
