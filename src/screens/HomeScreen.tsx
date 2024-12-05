import React, { Component } from 'react';
import { Keyboard, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView } from 'react-native';
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';
import MainMenuButton from '../components/MainManuButton'
import SuccsessMsg from '../components/SuccsessMsg';
import ErrorMsg from '../components/errorMsg';
import InfoMsg from '../components/InfoMsg';
import Loader from '../components/Loader';
import { Home } from '../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';

import ButtomNav from '../components/ButtomNav.tsx';
import TopNav from '../components/TopNav.tsx';

const { width: screenWidth } = Dimensions.get('window');
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
    PlayerID: string;
    Images: string[];
}
interface myProps {
    navigation: any;
    router: any;
}

interface CustomSlideProps {
    index: number;
    item: string;
    style: any; // Replace with appropriate type if known
    width: number;
}

class HomeScreen extends Component<myProps, myStates> {
    // Assuming navigation is passed as a prop
    navigation: any;
    scrollRef: React.RefObject<ScrollView>
    unsubscribe: any;

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
            PlayerID: props.route.params.PlayerID,
            Images: [],
        };



    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        this.unsubscribe();
    }

    // Fetches navigation reference and sets up interval on mount
    componentDidMount() {

        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            console.log('focus');
            this.MainHomeLoad();
        });

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution


    }

    handleBackPress
        = () => {
            // Handle back button press logic here
            return true; // Prevent default back behavior
        };

    async MainHomeLoad() {

        this.setState({ isLoading: true });
        try {
            const result: any = await Home(this.state.PlayerID);
            console.log(result);

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


    animationStyle: TAnimationStyle = (value: number) => {
        "worklet";

        const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
        const scale = interpolate(value, [-1, 0, 1], [1.25, 1, 0.25]);
        const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0]);

        return {
            transform: [{ scale }],
            zIndex,
            opacity,
        };
    };


    render(): React.ReactNode {

        const styles = StyleSheet.create({
            safeArea: {
                backgroundColor: 'rgba(0,0,0,0.0)',
                flex: 1,
            },
            container: {
                flexDirection: 'column',
                backgroundColor: 'red',
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
                resizeMode: 'contain',
                backgroundColor: 'rgba(0,0,0,0)',
                width: screenWidth,
                height: screenWidth / 1.4,
            },
            backdrop: {
                height: screenWidth * 1.1,
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
                            <TopNav navigation={this.props.navigation} titel={'HOME'} />
                        </View>
                        <ScrollView style={{ zIndex: 1 }}>


                            <View style={{ flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', borderRadius: 20, margin: 10 }}
                                    cornerRadius={20}>
                                    <View style={{ flexDirection: 'column', borderRadius: 10 }}>

                                        <Carousel
                                            autoPlay={true}
                                            autoPlayInterval={2000}
                                            loop
                                            style={{
                                                left: -10,
                                                width: screenWidth,
                                                height: screenWidth / 1.4,
                                                borderRadius: 3,
                                            }}
                                            width={screenWidth}
                                            height={screenWidth * 1.1}
                                            data={this.state.Images}
                                            renderItem={({ index }) => {
                                                return (
                                                    <View key={index} style={{ width: screenWidth }}>
                                                        <View style={styles.backgroundContainer}>
                                                            <Image blurRadius={6} source={{ uri: this.state.Images[index] }} style={styles.backdrop} />
                                                        </View>

                                                        <View style={styles.overlay}>
                                                            <Image style={styles.logo} source={{ uri: this.state.Images[index] }} />
                                                        </View>

                                                    </View>
                                                );
                                            }}
                                            customAnimation={this.animationStyle}
                                        />


                                    </View>
                                </CardView>

                            </View>

                            <View style={{
                                marginTop: -20,
                                flexDirection: 'row',
                                width: screenWidth,
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                flex: 1,
                                zIndex: -1,
                            }}>



                                <MainMenuButton Url={require('../images/svgtopng/MyWalletPng.png')} title={'My WALLET'}
                                    onPress={async () => {
                                        const MID = await AsyncStorage.getItem('MID');
                                        this.props.navigation.navigate('MyWallet', { 'PlayerID': MID });

                                    }} />

                                <MainMenuButton Url={require('../images/svgtopng/MyOfferPng.png')} title={'My Offer'}
                                    onPress={async () => {
                                        const MID = await AsyncStorage.getItem('MID');
                                        this.props.navigation.navigate('MyOfferScreen', { 'PlayerID': MID });

                                    }}
                                />

                                <MainMenuButton Url={require('../images/svgtopng/luckyGamePng.png')} title={'LUCKY GAME'}
                                    onPress={async () => {
                                        const MID = await AsyncStorage.getItem('MID');
                                        this.props.navigation.navigate('GameHomeScreen', { 'PlayerID': MID });

                                    }}
                                />
                            </View>


                            <View style={{
                                flexDirection: 'row',
                                width: screenWidth,
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                flex: 1,
                                marginBottom: 30,
                                marginTop: -5
                            }}>

                                <MainMenuButton Url={require('../images/svgtopng/MyTaxiPng.png')} title={'MY TAXI'}
                                    onPress={() => {
                                        this.props.navigation.navigate('TaxiScreen');
                                    }}
                                />

                                <MainMenuButton Url={require('../images/svgtopng/ENTERTAINMENT.png')} title={'Entertainment'}
                                    onPress={() => {
                                        this.props.navigation.navigate('EntertainmentScreen');
                                    }}
                                />

                                <MainMenuButton Url={require('../images/svgtopng/ONLINE.png')} title={'Online'} />

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
                            // left: 0,
                            // bottom: 0,
                            // right: 0,
                            // position: 'absolute',
                            height: '15%',
                            backgroundColor: 'transparent'
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



export default HomeScreen;