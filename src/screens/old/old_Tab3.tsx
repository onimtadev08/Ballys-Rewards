//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


// create a component
const Tab3 = () => {
    return (
        <View style={styles.container}>
            <View style={styles.cardcontainer}>
                <Text>Box 1</Text>
            </View>

            <View style={styles.bottomcontainer}>
                <Text>Box 1</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity style={{flex:0.4}}onPress={() => (
                 )} >
                <View style={{ flex: 1, backgroundColor: 'red', borderRadius: 20, margin: 10 }}>
                    

                </View>
                </TouchableOpacity>

                <View style={{ flex: 1, backgroundColor: '#222942', flexDirection: 'column' }}>

                    <TouchableOpacity style={{ flex:1 }} onPress={() => (
                     )} >
                        <View style={{ flex: 1, backgroundColor: 'green', borderRadius: 20, margin: 10 }}>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1 }} onPress={() => (
                     )} >
                        <View style={{ flex: 1, backgroundColor: 'black', borderRadius: 20, margin: 10 }}>

                        </View>
                    </TouchableOpacity>
                   
                    

                </View>

            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardcontainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222942',
    },
    bottomcontainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    box: {
        width: 500,
        height: 300,
        margin: 5,
        justifyContent: 'center',
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: 'lightblue',
    },
});

//make this component available to the app
export default Tab3;
