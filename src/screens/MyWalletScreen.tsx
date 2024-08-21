import React, { Component } from 'react';
import { Text, Keyboard, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, processColor } from 'react-native';
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import MyWallet from '../images/svgs/MyWallet.js';
import AwesomeButton from 'react-native-really-awesome-button';

import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import { PieChart } from 'react-native-charts-wrapper';
import GradientButton from '../components/GradientButton.tsx';
import TopNav from '../components/TopNav.tsx';
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
    data: datas;
    legend: any;
    description: {};
    highlights: any[];
    Accounts: any[];

}

interface datas {
    dataSets: any[];
}

interface legends {
    enabled: boolean;
    textSize: number;
    form: string;
    horizontalAlignment: string;
    verticalAlignment: string;
    orientation: string;
    wordWrapEnabled: boolean;
}

interface chat {
    value: number;
    displayValue: string;
    text: string;
    color: string;
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

class MyWalletScreen extends React.Component<myProps, myStates> {
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
            legend: {
                enabled: true,
                textColor: processColor('white'),
                textSize: 15,
                form: 'CIRCLE',
                horizontalAlignment: "CENTER",
                verticalAlignment: "CENTER",
                orientation: "VERTICAL",
                wordWrapEnabled: true
            },
            data: {
                dataSets: [{
                    values: [
                        { value: 45, label: 'ACCOUNT' },
                        { value: 21, label: 'FIXED DEPOSIT' }],
                    label: '',
                    config: {
                        colors: [processColor('#8CEAFF'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
                        valueTextSize: 20,
                        valueTextColor: processColor('transparent'),
                        sliceSpace: 5,
                        selectionShift: 13,
                        // xValuePosition: "OUTSIDE_SLICE",
                        // yValuePosition: "OUTSIDE_SLICE",
                        valueFormatter: "#.#'%'",
                        valueLineColor: processColor('transparent'),
                        valueLinePart1Length: 0.5
                    }
                }],
            },
            highlights: [{ x: 2 }],
            description: {
                text: 'This is Pie chart description',
                textSize: 15,
                textColor: processColor('darkgray'),

            },
            Accounts: [{
                Account: 'LKRc',
                AccountValue: '1,000,000',
                FixedDeposit: '100,000',
                Total: '1,100,000'
            }, {
                Account: 'INRc',
                AccountValue: '300,000',
                FixedDeposit: '33,000',
                Total: '333,000'
            }, {
                Account: 'USDc',
                AccountValue: '3,000',
                FixedDeposit: '300',
                Total: '33,000'
            }]
        };

      


    }

    componentWillUnmount() {
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

        //       this.MainHomeLoad();

        // return () => clearInterval(interval);
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
            },
            chart: {
                flex: 1,
                height: 300,
                width: '100%'
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
                     
                     <TopNav navigation={this.props.navigation} titel={'MY WALLET'} />


                           <ScrollView style={styles.container}>

                            <Text style={{
                                marginTop: 20,
                                color: 'white',
                                fontSize: 20,
                                textAlign: 'center'
                            }}>ACCOUNT SUMMARY</Text>

                            {this.state.Accounts.map((item) => {
                                return (
                                    <View>
                                        <View style={{ borderWidth: 2, borderColor: 'white', marginTop: 30, marginBottom: 50, margin: 20, borderRadius: 20, alignItems: 'center' }}>

                                            <View style={{ backgroundColor: 'white', borderRadius: 10, height: 50, justifyContent: 'center', top: -20 }}>
                                                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginStart: 10, marginEnd: 10 }}>{item.Account}</Text>
                                            </View>

                                            <View style={{ top: -10, width: '70%' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: 'white', fontSize: 15 }}>{'\u25cf '}</Text>
                                                    <Text style={{ color: 'white' }}>ACCOUNT</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginStart: 10, marginEnd: 10, justifyContent: 'center', flex: 1 }}>
                                                    <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: 'white', flex: 1 }}>{item.AccountValue}</Text>
                                                    <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>{item.Account}</Text>
                                                </View>
                                            </View>


                                            <LinearGradient
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                colors={[ColorFirst, 'white', ColorFirst]}
                                                style={{ width: '100%', height: 2 }} />



                                            <View style={{ top: 15, width: '70%' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: 'red', fontSize: 15 }}>{'\u25cf '}</Text>
                                                    <Text style={{ color: 'white' }}>FIXED DEPOSIT</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginStart: 10, marginEnd: 10, justifyContent: 'center', flex: 1 }}>
                                                    <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: 'white', flex: 1 }}>{item.FixedDeposit}</Text>
                                                    <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>{item.Account}</Text>
                                                </View>
                                            </View>



                                            <View style={{ backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', bottom: -30 }}>
                                                <Text style={{ fontSize: 18, textAlign: 'center' }}>{item.Account}</Text>

                                                <View style={{ flexDirection: 'row', marginStart: 10, marginEnd: 10 }}>
                                                    <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>{item.Total}</Text>
                                                    <Text style={{ fontSize: 18, textAlign: 'center' }}>{item.Account}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                );
                            })}


                            <View style={{ top: 3 }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 20,
                                    textAlign: 'center'
                                }}>NEED A FIXED DEPOSIT ?</Text>

                                <Text style={{
                                    color: 'white',
                                    fontSize: 16,
                                    textAlign: 'center'
                                }}>WE WILL HELP YOU OPEN IT INSTANLY</Text>


                                <View style={{ margin: 20, justifyContent: 'center' }}>
                                    <GradientButton
                                        title="OPEN NOW"
                                        onPress={() => { }}
                                        colors={['transparent', 'transparent', 'transparent']}
                                        buttonStyle={{}}
                                        textStyle={{}} borderColor={''} />
                                </View>

                            </View>


                            <View style={{ marginTop: 20 }}>
                                <View style={{ borderWidth: 2, borderColor: 'white', marginTop: 30, marginBottom: 50, margin: 20, borderRadius: 20, alignItems: 'center' }}>

                                    <Image source={require('../images/svgtopng/GOLD.png')} style={{ width: 80, height: 80, top: -40 }} />
                                    <View style={{ top: -30, width: '100%', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}>BALLYS COIN</Text>

                                        <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>
                                            <Text style={{ flex: 1, color: 'white', fontSize: 18, textAlign: 'center' }}>TODAY</Text>
                                            <Text style={{ flex: 1, color: 'white', fontSize: 18, textAlign: 'center' }}>BALANCE</Text>
                                        </View>

                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={[ColorFirst, 'white', ColorFirst]}
                                            style={{ width: '100%', height: 2, top: 10 }} />

                                        <View style={{ flexDirection: 'row', flex: 1, top: 20 }}>
                                            <Text style={{ flex: 1, color: 'white', fontSize: 20, textAlign: 'center' }}>100</Text>
                                            <View style={{ backgroundColor: 'white', width: 1 }} />
                                            <Text style={{ flex: 1, color: 'white', fontSize: 20, textAlign: 'center' }}>3000</Text>
                                        </View>

                                    </View>

                                </View>
                            </View>


                            <View style={{ marginTop: 20 }}>
                                <View style={{ borderWidth: 2, borderColor: 'white', marginTop: 30, marginBottom: 50, margin: 20, borderRadius: 20, alignItems: 'center' }}>

                                    <Image source={require('../images/svgtopng/SILVER.png')} style={{ width: 80, height: 80, top: -40 }} />
                                    <View style={{ top: -30, width: '100%', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}>BALLYS RUPEES</Text>

                                        <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>
                                            <Text style={{ flex: 1, color: 'white', fontSize: 18, textAlign: 'center' }}>TODAY</Text>
                                            <Text style={{ flex: 1, color: 'white', fontSize: 18, textAlign: 'center' }}>BALANCE</Text>
                                        </View>

                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={[ColorFirst, 'white', ColorFirst]}
                                            style={{ width: '100%', height: 2, top: 10 }} />

                                        <View style={{ flexDirection: 'row', flex: 1, top: 20 }}>
                                            <Text style={{ flex: 1, color: 'white', fontSize: 20, textAlign: 'center' }}>100</Text>
                                            <View style={{ backgroundColor: 'white', width: 1 }} />
                                            <Text style={{ flex: 1, color: 'white', fontSize: 20, textAlign: 'center' }}>3000</Text>
                                        </View>

                                    </View>

                                </View>
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



export default MyWalletScreen;

function handleSelect(event: any) {
    throw new Error('Function not implemented.');
}
