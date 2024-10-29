import React, { Component } from 'react';
import { Animated, LayoutChangeEvent, Text, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageModal from 'react-native-image-modal'
import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';

import ButtomNav from '../components/ButtomNav.tsx';


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
    CardImg: any;
    MemberImg: string;
    CardTier: string;
    MemberName: string;
    ExpireData: string;
    ImgWidth: number;
    MemberID: string;
    modalVisible: boolean;
}
interface myProps {
    navigation: any;
    router: any;
}


const scale = 0.8;
const PAGE_WIDTH = screenWidth * scale;
const PAGE_HEIGHT = 240 * scale;

class MyCard extends Component<myProps, myStates> {

    private anim: Animated.Value;
    navigation: any;
    scrollRef: React.RefObject<ScrollView>
    IntervalID: any;

    constructor(props: any) {
        super(props)

        this.anim = new Animated.Value(0);
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
            CardImg: require('../images/Cards/gold.png'),
            MemberImg: '',
            CardTier: '',
            MemberName: '',
            ExpireData: '',
            ImgWidth: 0,
            MemberID: '',
            modalVisible: false,
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



        this.getMyCard();

    }
    async getMyCard() {
        try {

            this.setState({ isLoading: true });

            const MID = await AsyncStorage.getItem('MID') as string;

            console.log(MID);

            const result: any = await fetchMyCard(MID);

            console.log('vv : ', result.MImage, ' : img');


            if (result.strRturnRes) {

                let crdImg = '';
                if (result.Current_R.toLowerCase() === 'infinity') {
                    crdImg = require('../images/Cards/infinity.png');
                } else if (result.Current_R.toLowerCase() === 'gold') {
                    crdImg = require('../images/Cards/gold.png');
                } else if (result.Current_R.toLowerCase() === 'platinum') {
                    crdImg = require('../images/Cards/plat.png');
                } else if (result.Current_R.toLowerCase() === 'diamond') {
                    crdImg = require('../images/Cards/diamond.png');
                } else if (result.Current_R.toLowerCase() === 'classic') {
                    crdImg = require('../images/Cards/classic.png');
                } else if (result.Current_R.toLowerCase() === 'silver') {
                    crdImg = require('../images/Cards/silver.png');
                }








                this.setState({
                    MemberID: MID,
                    isLoading: false,
                    CardTier: result.Current_R,
                    ExpireData: moment(result.Exp).format('DD/MM/YYYY'),
                    MemberImg: result.MImage === '' ? 'https://i.sstatic.net/y9DpT.jpg' : `data:image/png;base64,${result.MImage}`,
                    CardImg: crdImg,
                    MemberName: await AsyncStorage.getItem('strMName') as string,
                }, () => {
                    console.log('img : ', this.state.MemberImg);
                })


            } else {
                this.setState({
                    isLoading: false,
                    showApiError: true,
                    showApiErrorMsg: 'Server Connection error',
                });
            }
        } catch (error) {
            console.error(error);
            this.setState({
                isLoading: false,
                showApiError: true,
                showApiErrorMsg: 'Server Connection error',
            });
        } finally {
            // this.IntervalID = setInterval(() => {
            //     this.setState({ time: new Date().toLocaleString() })
            // }, 1000);
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



    shake = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.anim, {
                    toValue: -5,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(this.anim, {
                    toValue: 5,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(this.anim, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]),
            { iterations: 2 }
        ).start();
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

                                <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 30 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                        <AnimatedBorderBox
                                            MemberImg={this.state.MemberImg}
                                            CardTier={this.state.CardTier}
                                            MemberName={this.state.MemberName}
                                            ExpireData={this.state.ExpireData}
                                        />

                                    </View>
                                </View>

                                <View style={{
                                    borderRadius: 20,
                                    marginTop: 20,
                                    marginBottom: 20,
                                    borderColor: 'rgba(0,0,0,0.0)',
                                    borderWidth: 10
                                }}
                                    onLayout={(event: LayoutChangeEvent) => {
                                        this.setState({ ImgWidth: event.nativeEvent.layout.width });
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
                                        <ImageModal
                                            onTap={this.shake}
                                            onOpen={() => {
                                                this.setState({ modalVisible: true });
                                            }}
                                            onClose={() => {
                                                this.setState({ modalVisible: false });
                                            }}
                                            modalImageStyle={{ maxWidth: '80%' }}
                                            overlayBackgroundColor="rgba(0,0,0,0.8)"
                                            modalImageResizeMode='contain'
                                            swipeToDismiss={true}
                                            resizeMode="cover"
                                            imageBackgroundColor="rgba(0,0,0,0.0)"
                                            style={{
                                                height: 180,
                                                width: 300,
                                            }}
                                            source={this.state.CardImg}
                                            renderImageComponent={({ source, resizeMode, style }) => (
                                                <Animated.View style={{ transform: [{ translateX: this.anim }] }}>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                                                        <Image
                                                            source={source}
                                                            style={style}
                                                            resizeMode={resizeMode} />
                                                        {this.state.modalVisible ?
                                                            <View style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                position: 'absolute',
                                                                alignItems: 'flex-end',
                                                                justifyContent: 'center',
                                                            }}>

                                                                <Text
                                                                    style={{
                                                                        marginBottom: -140,
                                                                        marginEnd: 60,
                                                                        color: 'white',
                                                                        fontSize: 18,
                                                                        fontFamily: 'SFPRODISPLAYREGULAR',
                                                                        fontWeight: 'bold'
                                                                    }}>{this.state.MemberID}</Text>

                                                            </View>
                                                            :
                                                            <View style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                position: 'absolute',
                                                                alignItems: 'flex-end',
                                                                justifyContent: 'flex-end',
                                                            }}>

                                                                <Text
                                                                    style={{
                                                                        marginBottom: 20,
                                                                        marginEnd: 20,
                                                                        color: 'white',
                                                                        fontSize: 18,
                                                                        fontFamily: 'SFPRODISPLAYREGULAR',
                                                                        fontWeight: 'bold'
                                                                    }}>{this.state.MemberID}</Text>

                                                            </View>
                                                        }

                                                    </View>
                                                </Animated.View>
                                            )}
                                        />
                                        {/* <Image
                                            source={this.state.CardImg}
                                            style={{
                                                height: 180,
                                                width: 300,
                                            }}
                                            resizeMode='cover' /> */}
                                    </AnimatedBorderViewCus>
                                </View>

                                {/* <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 18,
                                        fontFamily: 'SFPRODISPLAYREGULAR',
                                        marginTop: 20,
                                        fontWeight: 'bold'
                                    }}
                                >{this.state.time}</Text> */}


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