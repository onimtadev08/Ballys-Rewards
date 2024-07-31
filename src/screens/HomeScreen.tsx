import React, { Component } from 'react';
import { Keyboard, BackHandler, View, Text, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, ImageBackground, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using a class-based navigation solution
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
import TAnimationStyle from "react-native-reanimated-carousel"
import Entypo from 'react-native-vector-icons/Entypo'
import { SvgUri } from 'react-native-svg';


import MyAccount from '../images/svgs/MyAccount.js'
import MyOffer from '../images/svgs/MyOffer.js'
import Tournament from '../images/svgs/Tournament.js';
import Dining from '../images/svgs/Dining.js';
import Entertainment from '../images/svgs/Entertainment.js';
import BallysBet from '../images/svgs/BallysBet.js';
import Packages from '../images/svgs/Packages.js';
import Rewards from '../images/svgs/Rewards.js';
import ContactUs from '../images/svgs/ContactUs.js';
import MyMassage from '../images/svgs/MyMassage.js';
import FeedBack from '../images/svgs/FeedBack.js';
import MyRide from '../images/svgs/MyRide.js';
import MyCard from '../images/svgs/MyCard.js';
import MyBookings from '../images/svgs/MyBookings.js';
import MyHost from '../images/svgs/MyHost.js';
import MyWallet from '../images/svgs/MyWallet.js';
import Spa from '../images/svgs/Spa.js';

const { width: screenWidth } = Dimensions.get('window');

// const images = [
//     require('../images/ballys.png'),
//     require('../images/wha.jpg'),
//     require('../images/meg.jpg'),
//     require('../images/sms.jpg'),
//     require('../images/pon.jpg'),
//     // Add more local image paths as needed
// ];
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

        console.log(props.route.params);


    }
    // Fetches navigation reference and sets up interval on mount
    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', () => true);

        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution

        // const interval = setInterval(() => {
        //     const nextIndex = (this.state.currentIndex + 1) % this.state.Images.length;
        //     if (this.scrollRef) {
        //         this.scrollRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
        //     }
        //     this.setState({ currentIndex: nextIndex });
        // }, 2000);

        this.MainHomeLoad();

        // return () => clearInterval(interval);
    }

    async MainHomeLoad() {

        this.setState({ isLoading: true });
        try {
            const result: any = await Home(this.state.PlayerID);
            console.log('val : ', result);
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
            console.log(error);
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

        });


        return (
            <LinearGradient
                colors={['#fd0925', '#ff0909', '#ff6603']}
                style={styles.container} >

                <SafeAreaView style={styles.safeArea}>

                    <LinearGradient
                        colors={['#fd0925', '#ff0909', '#ff6603']}
                        style={styles.container}>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%'
                        }} >

                            <View style={{ marginStart: 10, flex: 1 }} >

                                <TouchableOpacity
                                    style={{

                                        borderRadius: 40,
                                        width: '25%',
                                        alignItems: 'center',
                                    }}>
                                    <Entypo name='menu' size={30} color={'white'} style={{ margin: 10 }} />
                                </TouchableOpacity>

                            </View>

                            <View style={{ marginEnd: 10, flex: 1, alignItems: 'flex-end' }} >

                                <TouchableOpacity
                                    style={{

                                        borderRadius: 40,
                                        width: '25%',
                                        alignItems: 'center',
                                    }}>
                                    <Entypo name='message' size={30} color={'white'} style={{ margin: 10 }} />
                                </TouchableOpacity>

                            </View>

                        </View>
                        <ScrollView style={styles.container}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <CardView style={{ flex: 1, flexDirection: 'column', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
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
                                flexDirection: 'row', width: screenWidth, alignItems: 'center', justifyContent: 'space-around'
                            }}>



                                <MainMenuButton svg={<MyAccount width={'100%'} height={'100%'} />} title={'My Account \n '}
                                    onPress={async () => {
                                        const MID = await AsyncStorage.getItem('MID');

                                        console.log('MID : ' + MID);

                                        this.navigation.navigate('Profile', { 'PlayerID': MID });

                                    }} />

                                <MainMenuButton svg={<MyOffer width={'100%'} height={'100%'} />} title={'My Offer \n '} />

                                <MainMenuButton svg={<Tournament width={'100%'} height={'100%'} />} title={'Tournament & \n Drawer'} />

                            </View>


                            <View style={{
                                flexDirection: 'row', width: screenWidth, alignItems: 'center', justifyContent: 'space-around'
                            }}>

                                <MainMenuButton svg={<Spa width={'100%'} height={'100%'} />} title={'Dining'} />

                                <MainMenuButton svg={<Entertainment width={'100%'} height={'100%'} />} title={'Entertainment'} />

                                <MainMenuButton svg={<BallysBet width={'100%'} height={'100%'} />} title={'Online Casino'} />

                            </View>


                            <View style={{
                                flexDirection: 'row', width: screenWidth, alignItems: 'center', justifyContent: 'space-around'
                            }}>

                                <MainMenuButton svg={<Packages width={'100%'} height={'100%'} />} title={'Packages'}
                                    onPress={() => (
                                        this.navigation.navigate('PackagesScreen')
                                    )}
                                />

                                <MainMenuButton svg={<Rewards width={'100%'} height={'100%'} />} title={'Rewards Circle'} />

                                <MainMenuButton svg={<ContactUs width={'100%'} height={'100%'} />} title={'Contact Us'} />

                            </View>


                            <View style={{
                                flexDirection: 'row', width: screenWidth, alignItems: 'center', justifyContent: 'space-around'
                            }}>

                                <MainMenuButton svg={<MyMassage width={'100%'} height={'100%'} />} title={'Messaging\n \n '} />

                                <MainMenuButton svg={<FeedBack width={'100%'} height={'100%'} />} title={'Feedback &\nFollow Us \n '} />

                                <MainMenuButton svg={<MyRide width={'100%'} height={'100%'} />} title={'My Ride\n \n '} />

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
                    </LinearGradient>
                </SafeAreaView >
                <View style={{ height: '10%', flexDirection: 'row', marginBottom: 20 }}>
                    <TouchableOpacity style={{ margin: 10, flex: 1 }}>
                        <MyCard />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ margin: 10, flex: 1 }}>
                        <MyBookings />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ margin: 10, flex: 1 }}>
                        <MyHost />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ margin: 10, flex: 1 }}>
                        <MyWallet />
                    </TouchableOpacity>
                </View>
            </LinearGradient >
        );
    }
}



export default HomeScreen;