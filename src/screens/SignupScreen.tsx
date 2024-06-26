//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import TextInput from '../components/TextInput';
import LinearGradient from 'react-native-linear-gradient';
import GradientButtonWithBorder from '../components/GradientButton';
import GradientButton from '../components/GradientButtonfull';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

// create a component
const SignupScreen = () => {

    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('SignUp');

    };
    return (
        <LinearGradient
            style={styles.container}
            colors={['#FF0024', '#FF6648', '#FFCE6C']}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <TextInput />
                    <TextInput />
                    <TextInput />
                    <TextInput />
                    <TextInput />
                    <TextInput />

                    <GradientButton
                        title="SIGN IN"
                        onPress={handleLogin}
                        colors={['#FF0024', '#FF0024', '#FF0024']}
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        position: 'relative',
        width: width * 0.8,
    },
    customButton: {
        top: 150,
        margin: 10,
        padding: 15,
        borderRadius: 20,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
    },

});

//make this component available to the app
export default SignupScreen;
