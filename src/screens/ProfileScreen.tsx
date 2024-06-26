//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// create a component
const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../images/home.jpg')}
                style={styles.image}
                resizeMode="contain"
            />
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
    },
    image: {
        width: wp('100%'),
        height: hp('90%'),
        resizeMode: 'contain',
    },
});

//make this component available to the app
export default ProfileScreen;
