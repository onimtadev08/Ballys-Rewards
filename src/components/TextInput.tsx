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
            {/* <View style={{ flexDirection: 'row', marginTop: 20, width: '100%', marginLeft: 30 }}>
                <Text style={{ flex: 2.5, color: 'white', fontSize: 14, fontWeight: 'bold', textAlign: 'left' }}>{props.fieldName}</Text>
            </View> */}
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                    <NativeTextInput
                        placeholderTextColor={'black'}
                        placeholder={props.fieldName}
                        editable={props.editable === undefined ? true : false}
                        style={{ width: '100%', color: 'black', height: 50, textAlign: 'center'}}
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
        margin: 10,
        width: '90%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FFCE6C',
    },
});

//make this component available to the app
export default TextInput;
