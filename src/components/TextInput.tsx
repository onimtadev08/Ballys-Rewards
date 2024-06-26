//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput as NativeTextInput } from 'react-native';

// create a component
const TextInput = () => {
    return (
        <View style={styles.container}>
            <NativeTextInput />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        margin: 5,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
        backgroundColor: '#FFCE6C',
    },
});

//make this component available to the app
export default TextInput;
