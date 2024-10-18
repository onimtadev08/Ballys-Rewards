import React, { Component } from 'react';
import { Text, Keyboard, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { interpolate } from "react-native-reanimated";

import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';

import ButtomNav from '../components/ButtomNav.tsx';
import { GetEvents } from '../api/Api.tsx';


import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import TopNav from '../components/TopNav.tsx';

import AnimatedBorderBox from '../components/AnimatedBorderBox.tsx';
import AnimatedBorderViewCus from '../components/AnimatedBorderViewCus.tsx';
import { fetchMyCard } from '../api/Api.tsx';
import moment from 'moment';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');


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
    time: string;
    CardImg: string;
    MemberImg: string;
    CardTier: string;
    MemberName: string;
    ExpireData: string;
}
interface myProps {
    navigation: any;
    router: any;
}


const scale = 0.8;
const PAGE_WIDTH = screenWidth * scale;
const PAGE_HEIGHT = 240 * scale;

class MyCard extends Component<myProps, myStates> {
    // Assuming navigation is passed as a prop
    navigation: any;
    scrollRef: React.RefObject<ScrollView>
    IntervalID: any;

    constructor(props: any) {
        super(props)
        this.scrollRef = React.createRef<ScrollView>();
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
            time: new Date().toLocaleString(),
            CardImg: '',
            MemberImg: '',
            CardTier: '',
            MemberName: '',
            ExpireData: '',
        };


    }

    componentWillUnmount() {
        clearInterval(this.IntervalID);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    // Fetches navigation reference and sets up interval on mount
    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution

        this.IntervalID = setInterval(() => {
            this.setState({ time: new Date().toLocaleString() })
        }, 1000);

        this.getMyCard();

    }
    async getMyCard() {
        try {

            this.setState({ isLoading: true });

            const MID = await AsyncStorage.getItem('MID') as string;

            const result: any = await fetchMyCard(MID);

            console.log(result);


            if (result.strRturnRes) {

                this.setState({
                    isLoading: false,
                    CardTier: result.Current_R,
                    ExpireData: moment(result.Exp).format('DD/MM/YYYY'),
                    MemberImg: result.MImage === '' ? 'https://i.sstatic.net/y9DpT.jpg' : result.MImage,
                    CardImg: result.CImage,
                    MemberName: await AsyncStorage.getItem('strMName') as string,
                })


            }
        } catch (error) {
            console.error(error);
            this.setState({
                isLoading: false,
                showApiError: true,
                showApiErrorMsg: 'Server Connection error',
            });
        } finally {

        }
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
                            <TopNav navigation={this.props.navigation} BackButton={true} titel={'MY CARD'} />
                        </View>

                        <ScrollView style={styles.container}>
                            <View style={{ alignItems: 'center', marginBottom: 130, flexDirection: 'column' }}>







                                <View style={{
                                    borderCurve: 'continuous',
                                    borderRadius: 20,
                                    marginTop: 20,
                                    marginBottom: 20,
                                    borderColor: 'rgba(0,0,0,0.0)',
                                    borderWidth: 10
                                }}>

                                    <AnimatedBorderViewCus
                                        width={310}
                                        height={190}
                                        borderRadius={20}
                                        sliderWidth={100}
                                        sliderHeight={5}
                                        delayInAnimation={3500}
                                        pathColor='trasparent' // Light Steel Blue
                                        sliderColor='#FFD700' // Deep Sky Blue
                                        innerContainerColor={ColorSecond}
                                    >

                                        <Image
                                            source={require('../images/Cards/diamond.png')}
                                            style={{
                                                height: 180,
                                                width: 300,
                                            }}
                                            resizeMode='cover' />
                                    </AnimatedBorderViewCus>
                                </View>


                                <View style={{ alignItems: 'center' ,marginBottom: 30}}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                        <AnimatedBorderBox
                                            CardImg={this.state.CardImg}
                                            MemberImg={this.state.MemberImg}
                                            CardTier={this.state.CardTier}
                                            MemberName={this.state.MemberName}
                                            ExpireData={this.state.ExpireData}
                                        />

                                    </View>
                                </View>


                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 18,
                                        fontFamily: 'SFPRODISPLAYREGULAR',
                                        marginTop: 20,
                                        fontWeight: 'bold'
                                    }}
                                >{this.state.time}</Text>


                                <Image style={{ height: 200, width: 200, marginTop: 20 }} source={require('../images/whatAppMsg.png')}></Image>


                                <Text style={{ color: 'white', marginTop: 20 }}>24 HOURS GAMBLING COUNSELING HOTLINE</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL('tel:${94112460460}');
                                    }}
                                >
                                    <Text style={{ color: 'white', marginBottom: 20, fontSize: 20, fontWeight: 'bold' }}>+94 112 460 460</Text>
                                </TouchableOpacity>



                            </View>
                        </ScrollView>
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



export default MyCard;