//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TextInput from '../components/TextInput';
import { useNavigation } from '@react-navigation/native';
import GradientButtonWithBorder from '../components/GradientButton';

// create a component
const Tab2 = () => {

    const navigation = useNavigation();

    const handleLogin2 = () => {


        // navigation.navigate('Signin');

    };
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                    <GradientButtonWithBorder
                        title="Gaming"
                        onPress={handleLogin2}
                        colors={['#2c3e50', '#2c3e50', '#2c3e50']}
                        borderColor="#004FD4"
                        buttonStyle={styles.customButton}
                        textStyle={styles.buttonText}
                    />

                    <GradientButtonWithBorder
                        title="Table Limits"
                        onPress={handleLogin2}
                        colors={['#2c3e50', '#2c3e50', '#2c3e50']}
                        borderColor="#004FD4"
                        buttonStyle={styles.customButton}
                        textStyle={styles.buttonText}
                    />

                    <GradientButtonWithBorder
                        title="Responsible Gaming"
                        onPress={handleLogin2}
                        colors={['#2c3e50', '#2c3e50', '#2c3e50']}
                        borderColor="#004FD4"
                        buttonStyle={styles.customButton}
                        textStyle={styles.buttonText}
                    />

                    <GradientButtonWithBorder
                        title="Term & Conditions"
                        onPress={handleLogin2}
                        colors={['#2c3e50', '#2c3e50', '#2c3e50']}
                        borderColor="#004FD4"
                        buttonStyle={styles.customButton}
                        textStyle={styles.buttonText}
                    />

                <GradientButtonWithBorder
                    title="My Profile"
                    onPress={handleLogin2}
                    colors={['#2c3e50', '#2c3e50', '#2c3e50']}
                    borderColor="#004FD4"
                    buttonStyle={styles.customButton}
                    textStyle={styles.buttonText}
                />


                <GradientButtonWithBorder
                    title="Account Settings"
                    onPress={handleLogin2}
                    colors={['#2c3e50', '#2c3e50', '#2c3e50']}
                    borderColor="#004FD4"
                    buttonStyle={styles.customButton}
                    textStyle={styles.buttonText}
                />

                <GradientButtonWithBorder
                    title="Transaction History"
                    onPress={handleLogin2}
                    colors={['#2c3e50', '#2c3e50', '#2c3e50']}
                    borderColor="#004FD4"
                    buttonStyle={styles.customButton}
                    textStyle={styles.buttonText}
                />

                <GradientButtonWithBorder
                    title="Membership Benifits"
                    onPress={handleLogin2}
                    colors={['#2c3e50', '#2c3e50', '#2c3e50']}
                    borderColor="#004FD4"
                    buttonStyle={styles.customButton}
                    textStyle={styles.buttonText}
                />

            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        marginTop:-600,
    },
    wrapper: {
        width: '80%',
    },
    customButton: {
        top: 300,
        margin: 10,
        padding: 15,
        borderRadius: 20,
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center',
    },
});

//make this component available to the app
export default Tab2;
