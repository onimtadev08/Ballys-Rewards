//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import GradientButtonWithBorder from '../components/GradientButton';
import GradientButton from '../components/GradientButtonfull';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextInput from '../components/TextInput';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');

// create a component
const SigninScrenn = () => {

    const navigation = useNavigation();


    const handleLogin = () => {
        navigation.navigate('SignUp');

    };
    const handleChangeText = (inputText: any) => {
        setText(inputText);
    };

    const [text, setText] = useState('');
    return (
        <LinearGradient
            style={styles.container}
            colors={['#FF0024', '#FF6648', '#FFCE6C']}>
            <View style={styles.container}>
                <View style={styles.wrapper}>

                    <Text style={styles.buttonText}>
                        Sign In
                    </Text>

                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../images/logo.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>

                    <TextInput />

                    <TextInput />


                    <GradientButton
                        title="SIGN IN"
                        onPress={handleLogin}
                        colors={['#FF0024', '#FF0024', '#FF0024']}
                        buttonStyle={styles.customButton}
                        textStyle={styles.buttonText}
                    />
                    <GradientButtonWithBorder
                        title="SIGN UP"
                        onPress={handleLogin}
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

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    wrapper: {
        position: 'relative',
        width: width * 0.9,
    },
    image: {
        width: wp('35%'),
        height: hp('35%'),
        resizeMode: 'contain',
    },
    imageContainer: {
        position: 'absolute',
        left: width * 0.25,
        bottom: height * 0.3,
    },
    customButton: {
        top: 150,
        margin: 10,
        padding: 15,
        borderRadius: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
    },
});

//make this component available to the app
export default SigninScrenn;
