import React from 'react';
import { Linking, Animated, Text, Keyboard, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, processColor, FlatList, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { interpolate } from "react-native-reanimated";

import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';

import ButtomNav from '../components/ButtomNav.tsx';
import { GetEvents } from '../api/Api.tsx';
import MainManuButton from '../components/MainManuButton.tsx';

import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';


import Ionicons from 'react-native-vector-icons/Ionicons';

import TopNav from '../components/TopNav.tsx';

import SmallButton from '../components/SmallButton.tsx';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

// const images = [
//     require('../images/ballys.png'),
//     require('../images/wha.jpg'),
//     require('../images/meg.jpg'),
//     require('../images/sms.jpg'),
//     require('../images/pon.jpg'),
//     // Add more local image paths as needed
// ];∆
interface myStates {
    currentIndex: number;
    isLoading: boolean;
    showApiError: boolean;
    showApiErrorMsg: string;
    showApiInfo: boolean;
    showApiInfoMsg: string;
    showOtpMsg: boolean;
    showApiSuccsess: boolean;
    showApiSuccsessMsg: string;
    SpaData: spa[]
}

interface spa {
    Name: string
    NameColor: string
    Image: any
    Descripetion: string
}


interface myProps {
    navigation: any;
    router: any;
}



class SpaScreen extends React.Component<myProps, myStates> {
    // Assuming navigation is passed as a prop
    navigation: any;

    constructor(props: any) {
        super(props)
        this.state = {
            currentIndex: 0,
            isLoading: false,
            showApiError: false,
            showApiErrorMsg: '',
            showApiInfo: false,
            showApiInfoMsg: '',
            showOtpMsg: false,
            showApiSuccsess: false,
            showApiSuccsessMsg: '',
            SpaData: [
                {
                    Name: 'AYU BELLINESE SPA',
                    NameColor: 'pink',
                    Image: require('../../src/spa/ayu-spa.jpg'),
                    Descripetion: '20% Discount\nat Ramada Hotel Spa'
                },
                {
                    Name: '12 STAR SPA',
                    NameColor: 'gold',
                    Image: require('../../src/spa/12-star-spa.jpg'),
                    Descripetion: '25% Discount\nOnly to Ballys Colombo\nMembers'
                },
                {
                    Name: 'BELLINESE SPA',
                    NameColor: 'white',
                    Image: require('../../src/spa/galleface-spa.jpg'),
                    Descripetion: '25% Discount\nOnly to Ballys Colombo\nMembers'
                },
                {
                    Name: 'SENSES SPA',
                    NameColor: '#F78100',
                    Image: require('../../src/spa/sense-spa.jpg'),
                    Descripetion: '20% Discount\nOnly to Ballys Colombo\nMembers'
                }
            ]


        }


    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    // Fetches navigation reference and sets up interval on mount
    componentDidMount() {



        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution

    }

    handleBackPress
        = () => {
            // Handle back button press logic here
            return true; // Prevent default back behavior
        };



    // Handles login button press and navigates to 'SignUp' screen
    handleLogin = () => {
        this.navigation.navigate('SignUp');
    };
    renderSpaItem = ({ item, index }: { item: spa, index: number }) => {
        return (
            <View key={index} style={{ margin: 20 }}>
                <View style={{ flexDirection: 'row', borderRadius: 10, borderWidth: 2, borderColor: 'white' }}>
                    <Image source={item.Image}
                        style={{
                            width: 120,
                            height: 120,
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                        }}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: item.NameColor, textAlign: 'center', marginTop: 10, fontSize: 18 }}>{item.Name}</Text>
                        <Text style={{ textAlign: 'center', color: 'white', marginTop: 10 }}>{item.Descripetion}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: -17 }}>
                    <View style={{ width: 120 }} />
                    <View style={{ flex: 1 }}>
                        <SmallButton title={'REDEEM'} onPress={() => { }} />
                    </View>
                </View>
            </View>
        )
    }


    render(): React.ReactNode {

        const styles = StyleSheet.create({
            safeArea: {
                backgroundColor: 'rgba(0,0,0,0.0)',
                flex: 1,
            },
            container: {
                flex: 1,
                width: screenWidth,
            },
        });




        return (
            <LinearGradient
                colors={[ColorFirst, ColorSecond, ColorTherd]}
                style={styles.container} >

                <SafeAreaView style={styles.safeArea}>

                    <LinearGradient
                        colors={[ColorFirst, ColorSecond, ColorTherd]}
                        style={styles.container}>

                        <View style={{ zIndex: 10 }}>
                            <TopNav navigation={this.props.navigation} titel={'SPA'} BackButton={true} />
                        </View>


                        <FlatList
                            style={{ marginBottom: Platform.OS === 'ios' ? 110 : 110 }}
                            data={this.state.SpaData}
                            renderItem={this.renderSpaItem}
                        />

                        {this.state.showApiSuccsess ?
                            <SuccsessMsg msg={this.state.showApiSuccsessMsg} onPress={() => {
                                this.setState({ showApiSuccsess: false });
                            }} />
                            : null}
                        {this.state.showApiError ?
                            <ErrorMsg msg={this.state.showApiErrorMsg} onPress={() => {
                                this.setState({ showApiError: false });
                            }} />
                            : null}
                        {this.state.showApiInfo ?
                            <InfoMsg msg={this.state.showApiInfoMsg} onPress={() => {
                                this.setState({ showApiInfo: false });
                            }} />
                            : null}
                        {this.state.isLoading ? (
                            <Loader />
                        ) : null}
                        <View style={{
                            zIndex: 1,
                            left: 0,
                            bottom: 0,
                            right: 0
                            , position: 'absolute',
                            height: '15%',
                            backgroundColor: ColorTherd
                        }}>
                            <ButtomNav navigation={this.props.navigation}
                            ></ButtomNav>
                        </View>
                    </LinearGradient>
                </SafeAreaView >

            </LinearGradient >
        );
    }

}



export default SpaScreen;


