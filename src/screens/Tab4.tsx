//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// create a component
const Tab4 = () => {
    return (
        <View style={styles.container}>
            <View style={styles.topcontainer}>
                <Image
                    source={require('../images/social.png')}
                    style={styles.image}
                    resizeMode="contain"
                />

                <View style={{
                    position: 'absolute',
                    top:50,
                    left: 10,
                    padding: 5,
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 30,
                        fontWeight: 'bold',
                    }}>Social Media</Text>

                    <Text style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                    }}>By liking our page, you'll unlock a world of exciting updates, exclusive offers, and engaging content.</Text>
                </View>

            </View>

            <View style={styles.bottomcontainer}>

                <View style={{flex:1,flexDirection:'row',backgroundColor:'red'}}>

                </View>

                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>

                </View>

                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'black' }}>

                </View>
                
            </View>
        </View>


    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },

    topcontainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#077FF7',
    },

    bottomcontainer: {
        flex: 1.5,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: wp('100%'),
        height: hp('100%'),
        resizeMode: 'stretch',
    },
});

//make this component available to the app
export default Tab4;
