import React, { Component } from 'react';
import { Text, Keyboard, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';

import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import Entypo from 'react-native-vector-icons/Entypo'

import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';

import ButtomNav from '../components/ButtomNav.tsx';
import { GetEvents } from '../api/Api.tsx';

import { Marquee } from '@animatereactnative/marquee';


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
    Tags: string[];
    Images: string[];
    time: string;
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

        console.log(props.route.params);


    }

    componentWillUnmount() {
        clearInterval(this.IntervalID);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    // Fetches navigation reference and sets up interval on mount
    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution


        // this.navigation.addListener('beforeRemove', (e: any) => {
        //     e.preventDefault();
        // });

        // const interval = setInterval(() => {
        //     const nextIndex = (this.state.currentIndex + 1) % this.state.Images.length;
        //     if (this.scrollRef) {
        //         this.scrollRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
        //     }
        //     this.setState({ currentIndex: nextIndex });
        // }, 2000);

        //    this.MainHomeLoad();

        // return () => clearInterval(interval);

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


    // animationStyle: TAnimationStyle = (value: number) => {
    //     "worklet";

    //     const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    //     const scale = interpolate(value, [-1, 0, 1], [1.25, 1, 0.25]);
    //     const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0]);

    //     return {
    //         transform: [{ scale }],
    //         zIndex,
    //         opacity,
    //     };
    // };


    animationStyle: TAnimationStyle = (value: number) => {
        "worklet";

        const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
        const rotateZ = `${interpolate(
            value,
            [-1, 0, 1],
            [-45, 0, 45],
        )}deg`;
        const translateX = interpolate(
            value,
            [-1, 0, 1],
            [-screenWidth, 0, screenWidth + 100],
        );

        return {
            transform: [{ rotateZ }, { translateX }],
            zIndex,
        };
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
                colors={['#fd0925', '#ff0909', '#fd0925']}
                style={styles.container} >

                <SafeAreaView style={styles.safeArea}>

                    <LinearGradient
                        colors={['#fd0925', '#ff0909', '#ff6603']}
                        style={styles.container}>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%'
                        }} >

                            <View style={{ backgroundColor: 'transparent', flex: 0.5, alignItems: 'flex-start', marginStart: 10 }} >

                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center',
                                    }}
                                    onPress={() => {
                                        this.navigation.goBack();
                                    }}
                                >
                                    <Entypo name="chevron-thin-left" size={30} color={'white'} style={{ margin: 10 }} />
                                </TouchableOpacity>

                            </View>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 20,
                                    textAlign: 'center'
                                }}>MY CARD</Text>
                            </View>

                            <View style={{ flex: 0.5, alignItems: 'flex-end', backgroundColor: 'transparent', marginEnd: 10 }} >

                                <TouchableOpacity
                                    style={{
                                        alignItems: 'center',
                                    }}>
                                    <Entypo name='message' size={30} color={'white'} style={{ margin: 10 }} />
                                </TouchableOpacity>

                            </View>

                        </View>
                        <ScrollView style={styles.container}>
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={{ uri: 'https://i.imgur.com/G2nHqSr.png' }}
                                    style={{
                                        marginTop: 20,
                                        marginBottom: 20,
                                        height: 180,
                                        width: 300
                                    }}
                                    resizeMode='stretch' />

                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View>

                                            <Image
                                                source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/026/164/709/small_2x/businessman-portrait-elegant-man-in-business-suit-employee-of-business-institution-in-uniform-man-office-worker-business-avatar-profile-picture-illustration-vector.jpg' }}
                                                style={{
                                                    height: 180,
                                                    width: 130,
                                                    borderRadius: 20,
                                                    borderColor: 'white',
                                                    borderWidth: 5,
                                                }}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'column', width: '55%', backgroundColor: 'white', height: 100, borderEndEndRadius: 20, borderTopEndRadius: 20 }}>
                                            <Text style={{ marginStart: 10, fontSize: 18, marginTop: 10 }}>BALLYS MEMBER</Text>
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
                                        </View>
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
                    </LinearGradient>
                </SafeAreaView >
                <ButtomNav navigation={this.props.navigation}
                ></ButtomNav>
            </LinearGradient >
        );
    }
}



export default MyCard;