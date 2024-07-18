//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput as NativeTextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// create a component
const TextInput = (props: any) => {

    React.useEffect(() => {
        setTimeout(() => {

        }, 500);
    }, [props.showError]);


    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', marginTop: 20, width: '65%' }}>
                <Text style={{ flex: 2.5, color: 'white', fontSize: 14, fontWeight: 'bold', textAlign: 'left' }}>{props.fieldName}</Text>
            </View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                    <NativeTextInput
                        editable={props.editable === undefined ? true : false}
                        style={{ width: '88%', color: 'black' }}
                        keyboardType={props.keyboardType === undefined ? 'default' : props.keyboardType}
                        onChangeText={(text) => {
                            props.onChangeText(text);
                        }}
                        value={props.value === null ? '' : props.value}
                    />
                    {props.showError ? <MaterialIcons name='error-outline' size={25} color={'red'} /> : null}
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingStart: 20,
        width: '75%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#FFCE6C',
    },
});

//make this component available to the app
export default TextInput;
