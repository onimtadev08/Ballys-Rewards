import React, { Component } from 'react';
import { Text, Keyboard, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
    Tags: string[];
    Images: string[];
    time: string;
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
            Tags: ["European dancing", "Belly dancing", "Pole dancing", "Body building show", "Traditional dancing"],
            Images: [],
            time: new Date().toLocaleString(),
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

    }

    handleBackPress
        = () => {
            // Handle back button press logic here
            return true; // Prevent default back behavior
        };

    async MainHomeLoad() {

        this.setState({ isLoading: true });
        try {


            const result: any = await GetEvents();

            if (result.strRturnRes) {

                let img: string[] = [];

                for (let index = 0; index < result.data.length; index++) {
                    const element = result.data[index].Url;
                    img.push(element);
                }

                this.setState({
                    isLoading: false,
                    Images: img,
                });


            } else {
                Keyboard.dismiss();
                this.setState({
                    isLoading: false,
                    showApiError: true,
                    showApiErrorMsg: 'Please try again'
                });
            }
        } catch (error) {

            this.setState({
                isLoading: false,
                showApiError: true,
                showApiErrorMsg: 'Server Connection error',
            });
        } finally {

        }

    }


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
            scrollView: {
                width: screenWidth,
            },
            image: {
                width: screenWidth,
                height: screenWidth * 1.1,
                resizeMode: 'cover',
            },
            backgroundContainer: {
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
            overlay: {
                opacity: 1,
                // top: 60,
                // right: 29,
            },
            logo: {

                resizeMode: 'stretch',
                backgroundColor: 'rgba(0,0,0,0)',
                width: screenWidth,
                height: '100%',
                // top:50,
                // bottom: 70,
            },
            backdrop: {
                height: screenHeight,
                width: screenWidth,
                resizeMode: 'cover',
            },
            headline: {
                fontSize: 18,
                textAlign: 'center',
                backgroundColor: 'black',
                color: 'white'
            },
            slider: { backgroundColor: '#000', height: 350 },
            content1: {
                width: '100%',
                height: 50,
                marginBottom: 10,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
            },
            content2: {
                width: '100%',
                height: 100,
                marginTop: 10,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
            },
            contentText: { color: '#fff' },
            buttons: {
                zIndex: 1,
                height: 15,
                marginTop: -25,
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
            },
            button: {
                margin: 3,
                width: 15,
                height: 15,
                opacity: 0.9,
                alignItems: 'center',
                justifyContent: 'center',
            },
            buttonSelected: {
                opacity: 1,
                color: 'red',
            },
            customSlide: {
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center',
            },
            customImage: {
                width: 100,
                height: 100,
            },
            tagContainer: {
                marginStart: 20,
                marginEnd: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 10,
            },
            tagWrapper: {
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
                marginRight: 5,
            },
            tag: {
                backgroundColor: '#FFCE6C',
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
            },
            tagText: {
                color: 'black',
                fontSize: 16,
                margin: 10,
                fontFamily: 'SFPRODISPLAYREGULAR'
            }
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
                            <TopNav navigation={this.props.navigation} titel={'MY CARD'} />
                        </View>

                        <ScrollView style={styles.container}>
                            <View style={{ alignItems: 'center', marginBottom: 110, flexDirection: 'column' }}>







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
                                            source={{ uri: 'https://i.imgur.com/G2nHqSr.png' }}
                                            style={{
                                                height: 180,
                                                width: 300,
                                            }}
                                            resizeMode='stretch' />
                                    </AnimatedBorderViewCus>
                                </View>


                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                                        {/* <Image
                                                source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/026/164/709/small_2x/businessman-portrait-elegant-man-in-business-suit-employee-of-business-institution-in-uniform-man-office-worker-business-avatar-profile-picture-illustration-vector.jpg' }}
                                                style={{
                                                    height: 180,
                                                    width: 130,
                                                    borderRadius: 20,
                                                    borderColor: 'gold',
                                                    borderWidth: 5,
                                                }}
                                            /> */}


                                        <AnimatedBorderBox></AnimatedBorderBox>


                                        {/* <AnimatedBorderView width={100}></AnimatedBorderView> */}

                                        {/* 
                                        <CardViewGlow> */}
                                        {/* </CardViewGlow>  */}

                                        {/* <AnimatedBorderView></AnimatedBorderView> */}

                                        {/* <AnimatedBorderView
                                            width={150}
                                            height={150} 
                                            // borderRadius={75}
                                            // sliderWidth={60}
                                            // sliderHeight={6}
                                            // delayInAnimation={5000}
                                            // pathColor='#B0E0E6' // Light Steel Blue
                                            // sliderColor='#FF4500' // Deep Sky Blue
                                            // innerContainerColor='#4682B4' // Steel Blue
                                        >
                                            {/* <View style={{ width: '100%', height: '100%' }}>
                                                <Text style={{ color: 'red' }}>asd</Text>
                                            </View> */}
                                        {/* </AnimatedBorderView> */}




                                        {/* <View style={{ flexDirection: 'column', width: '55%', backgroundColor: 'white', height: 100, borderEndEndRadius: 20, borderTopEndRadius: 20 }}>
                                            <Text style={{ marginStart: 10k, fontSize: 18, marginTop: 10 }}>BALLYS MEMBER</Text>
                                            <View style={{ borderWidth: 1, borderColor: 'red', marginStart: 10, marginEnd: 20 }}></View>

                                            <View style={{ flexDirection: 'row', marginStart: 10, flex: 1 }}>
                                                <Text style={{ flex: 1, fontSize: 16 }}>MEMBER # : </Text>
                                                <Text style={{ flex: 1, fontSize: 16 }}>BM15125</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', flex: 1, marginStart: 10 }}>
                                                <Text style={{ flex: 1, fontSize: 16 }}>EXPIRES : </Text>
                                                <Text style={{ flex: 1, fontSize: 16 }}>2024-12-31</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', flex: 1, marginStart: 10, marginBottom: 10 }}>
                                                <Text style={{ flex: 1, fontSize: 16 }}>CARD TIER : </Text>
                                                <Text style={{ flex: 1, fontSize: 16 }}>INFINITY</Text>
                                            </View>
                                        </View> */}


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



                                {/* <AnimatedBorderBox></AnimatedBorderBox> */}



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