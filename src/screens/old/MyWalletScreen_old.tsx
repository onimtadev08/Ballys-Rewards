import React, { Component } from 'react';
import { Text, Keyboard, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, processColor } from 'react-native';
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';

import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import Entypo from 'react-native-vector-icons/Entypo'

import SuccsessMsg from '../../components/SuccsessMsg.tsx';
import InfoMsg from '../../components/InfoMsg.tsx';
import ErrorMsg from '../../components/errorMsg.tsx';
import Loader from '../../components/Loader.tsx';

import ButtomNav from '../../components/ButtomNav.tsx';
import { GetEvents } from '../../api/Api.tsx';

import { Marquee } from '@animatereactnative/marquee';
import MyWallet from '../../images/svgs/MyWallet.js';
import AwesomeButton from 'react-native-really-awesome-button';

import { ColorFirst, ColorSecond, ColorTherd } from '../../data/data.tsx';
import { PieChart } from 'react-native-charts-wrapper';

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

            }
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

        this.MainHomeLoad();

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
                                }}>MY WALLET</Text>
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

                            <Text style={{
                                marginTop: 20,
                                color: 'white',
                                fontSize: 20,
                                textAlign: 'center'
                            }}>ACCOUNT SUMMARY</Text>

                            <PieChart
                                style={styles.chart}
                                // logEnabled={true}
                                // chartBackgroundColor={processColor('transparent')}
                                // chartDescription={this.state.description}
                                data={this.state.data}
                                legend={this.state.legend}
                                // highlights={this.state.highlights}

                                // extraOffsets={{ left: 5, top: 5, right: 5, bottom: 5 }}

                                entryLabelColor={processColor('transparent')}
                                entryLabelTextSize={15}
                                // entryLabelFontFamily={'HelveticaNeue-Medium'}
                                drawEntryLabels={true}

                                rotationEnabled={false}
                                rotationAngle={145}
                                usePercentValues={false}
                                // styledCenterText={{ text: 'Pie center text!', color: processColor('pink'), fontFamily: 'HelveticaNeue-Medium', size: 20 }}
                                centerTextRadiusPercent={100}
                                holeRadius={80}
                                holeColor={processColor('transparent')}
                                transparentCircleRadius={0}
                                transparentCircleColor={processColor('transparent')}
                                maxAngle={250}
                                onSelect={() => { }}
                                onChange={(event: { nativeEvent: any; }) => console.log(event.nativeEvent)}
                            />

                            <Text style={{
                                top: -50,
                                color: 'white',
                                fontSize: 16,
                                textAlign: 'center'
                            }}>TOTAL DEPOSIT</Text>
                            <Text style={{
                                top: -50,
                                color: 'white',
                                fontSize: 30,
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}>1,100,000</Text>



                            <Text style={{
                                top: -20,
                                color: 'white',
                                fontSize: 20,
                                textAlign: 'center'
                            }}>NEED A FIXED DEPOSIT ?</Text>

                            <Text style={{
                                top: -20,
                                color: 'white',
                                fontSize: 16,
                                textAlign: 'center'
                            }}>WE WILL HELP YOU OPEN IT INSTANLY</Text>


                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={{ borderColor: 'black', borderWidth: 1, borderRadius: 5, top: -10, backgroundColor: 'white', width: '50%', alignItems: 'center' }}>
                                    <Text style={{
                                        margin: 10,
                                        color: '#fd0925',
                                        fontSize: 16,
                                        textAlign: 'center'
                                    }}>OPEN NOW</Text>
                                </TouchableOpacity>
                            </View>


                            <LinearGradient
                                colors={['#FFCE6C', '#ffb162', '#fd0925']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    borderRadius: 10,
                                    margin: 20,
                                    alignItems: 'center',
                                    borderColor: 'black',
                                    borderWidth: 0
                                }}
                            >





                                <View style={{ marginLeft: 100, alignItems: 'flex-start' }}>
                                    <Image style={{ position: 'absolute', height: 100, width: 100 }} source={require('../images/coins.png')}></Image>
                                </View>

                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    marginLeft: 20,
                                    marginTop: 20,
                                    width: '100%',
                                    textAlign: 'left',
                                    fontFamily: 'SFPRODISPLAYBOLD'
                                }}>Bally's Coins</Text>
                                <Text style={{
                                    width: '100%',
                                    fontSize: 18,
                                    marginLeft: 20,
                                    marginBottom: 20,
                                    textAlign: 'left',
                                    fontFamily: 'SFPRODISPLAYBOLD'
                                }}>10,000</Text>
                            </LinearGradient>

                            <View style={{ flexDirection: 'row', flex: 1 }}>

                                <View style={{ borderRadius: 10, backgroundColor: '#FFCE6C', flex: 1, marginEnd: 10, marginStart: 20 }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 20,
                                        width: '100%',
                                        textAlign: 'left',
                                        fontFamily: 'SFPRODISPLAYBOLD'
                                    }}>Available{'\n'}Coins</Text>
                                    <Text style={{
                                        width: '100%',
                                        fontSize: 18,
                                        marginLeft: 20,
                                        marginBottom: 20,
                                        textAlign: 'left',
                                        fontFamily: 'SFPRODISPLAYBOLD'
                                    }}>10,000</Text>
                                </View>



                                <View style={{ borderRadius: 10, backgroundColor: '#FFCE6C', flex: 1, marginStart: 10, marginEnd: 20 }}>
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 20,
                                        width: '100%',
                                        textAlign: 'left',
                                        fontFamily: 'SFPRODISPLAYBOLD'
                                    }}>Bally's{'\n'}Rupees</Text>
                                    <Text style={{
                                        width: '100%',
                                        fontSize: 18,
                                        marginLeft: 20,
                                        marginBottom: 20,
                                        textAlign: 'left',
                                        fontFamily: 'SFPRODISPLAYBOLD'
                                    }}>10,000</Text>
                                </View>

                            </View>

                            <Text style={{
                                textShadowOffset: { width: -1, height: -1 },
                                textShadowColor: 'rgba(0,0,0,0.99)',
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginLeft: 20,
                                marginTop: 20,
                                width: '100%',
                                textAlign: 'left',
                                fontFamily: 'SFPRODISPLAYBOLD'
                            }}>Quick Actions</Text>


                            <View style={{
                                borderRadius: 10,
                                backgroundColor: '#FFCE6C',
                                flex: 1,
                                marginStart: 20,
                                marginEnd: 20,
                                marginTop: 20,
                            }}>


                                <AwesomeButton
                                    height={120}
                                    backgroundColor='transparent'
                                    raiseLevel={15}
                                    backgroundDarker='transparent'
                                    backgroundShadow='transparent'
                                    backgroundActive='transparent'
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

                                        <Image source={require('../images/onlineCards.png')} style={{ width: 100, height: 100, margin: 10 }}></Image>
                                        <View>
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                marginLeft: 20,
                                                marginTop: 20,
                                                width: '100%',
                                                textAlign: 'left',
                                                fontFamily: 'SFPRODISPLAYBOLD'
                                            }}>Bally's Online</Text>
                                            <Text style={{
                                                width: '100%',
                                                fontSize: 16,
                                                marginLeft: 20,
                                                marginBottom: 20,
                                                textAlign: 'left',
                                                fontFamily: 'SFPRODISPLAYBOLD'
                                            }}>Online Pay! This convenient{'\n'}and secure platform allows{'\n'}you to make payments{'\n'}online with ease</Text>
                                        </View>
                                    </View>
                                </AwesomeButton>
                            </View>



                            <View style={{ flexDirection: 'row', flex: 1 }}>

                                <View style={{ flex: 1 }}>
                                    <View style={{
                                        borderRadius: 10,
                                        backgroundColor: '#FFCE6C',
                                        flex: 1,
                                        marginStart: 20,
                                        marginEnd: 20,
                                        marginTop: 20,
                                    }}>


                                        <AwesomeButton
                                            height={270}
                                            backgroundColor='transparent'
                                            raiseLevel={15}
                                            backgroundDarker='transparent'
                                            backgroundShadow='transparent'
                                            backgroundActive='transparent'
                                        >
                                            <View style={{ flexDirection: 'column', alignItems: 'flex-end', marginTop: 30 }}>

                                                <Image source={require('../images/cashs.png')} resizeMode='stretch' style={{ width: 80, height: 70, marginTop: 20 }}></Image>
                                                <View>
                                                    <Text style={{
                                                        fontSize: 20,
                                                        fontWeight: 'bold',
                                                        marginLeft: 20,
                                                        marginStart: -1,
                                                        marginTop: 20,
                                                        width: '100%',
                                                        textAlign: 'left',
                                                        fontFamily: 'SFPRODISPLAYBOLD'
                                                    }}>Add Cash</Text>
                                                    <Text style={{
                                                        width: '100%',
                                                        fontSize: 16,
                                                        marginLeft: 20,
                                                        marginBottom: 20,
                                                        marginStart: -1,
                                                        textAlign: 'left',
                                                        fontFamily: 'SFPRODISPLAYBOLD'
                                                    }}>Online Pay!{'\n'}This convenient{'\n'}and secure{'\n'}platform allows{'\n'}you to make{'\n'}payments{'\n'}online with ease</Text>
                                                </View>
                                            </View>
                                        </AwesomeButton>



                                    </View>
                                </View>

                                <View style={{ flex: 1 }}>

                                    <View style={{
                                        borderRadius: 10,
                                        backgroundColor: '#FFCE6C',
                                        flex: 1,
                                        marginTop: 20,
                                        marginStart: 10,
                                        marginEnd: 20,
                                        justifyContent: 'center',

                                    }}>
                                        <AwesomeButton
                                            backgroundColor='transparent'
                                            height={80}
                                            raiseLevel={15}
                                            backgroundDarker='transparent'
                                            backgroundShadow='transparent'
                                            backgroundActive='transparent'
                                        >
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                marginLeft: 20,
                                                width: '100%',
                                                textAlign: 'left',
                                                fontFamily: 'SFPRODISPLAYBOLD'
                                            }}>Credit{'\n'}Request</Text>
                                        </AwesomeButton>
                                    </View>

                                    <View style={{
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        backgroundColor: '#FFCE6C',
                                        flex: 1,
                                        marginTop: 20,
                                        marginStart: 10,
                                        marginEnd: 20
                                    }}>

                                        <AwesomeButton
                                            backgroundColor='transparent'
                                            height={80}
                                            raiseLevel={15}
                                            backgroundDarker='transparent'
                                            backgroundShadow='transparent'
                                            backgroundActive='transparent'
                                        >
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                marginLeft: 20,
                                                width: '100%',
                                                textAlign: 'left',
                                                fontFamily: 'SFPRODISPLAYBOLD'
                                            }}>Chips{'\n'}Buying</Text>
                                        </AwesomeButton>
                                    </View>



                                </View>

                            </View>

                            <View style={{ flexDirection: 'row', marginStart: 10 }}>
                                <View style={{ borderRadius: 10, backgroundColor: '#FFCE6C', flex: 1, marginTop: 20, marginStart: 10, marginEnd: 20 }}>

                                    <AwesomeButton
                                        height={200}
                                        backgroundColor='transparent'
                                        raiseLevel={15}
                                        backgroundDarker='transparent'
                                        backgroundShadow='transparent'
                                        backgroundActive='transparent'
                                    >
                                        <View>
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                // marginLeft: 20,
                                                marginTop: 20,
                                                width: '100%',
                                                textAlign: 'left',
                                                fontFamily: 'SFPRODISPLAYBOLD'
                                            }}>Bally's{'\n'}Member</Text>
                                            <Text style={{
                                                width: '100%',
                                                fontSize: 18,
                                                // marginLeft: 20,
                                                marginBottom: 20,
                                                textAlign: 'left',
                                                fontFamily: 'SFPRODISPLAYBOLD'
                                            }}>Experience the{'\n'}simplicity of{'\n'}member to{'\n'}member{'\n'}money transfers</Text>
                                        </View>
                                    </AwesomeButton>
                                </View>

                                <View style={{ borderRadius: 10, backgroundColor: '#FFCE6C', flex: 1, marginTop: 20, marginStart: 10, marginEnd: 20 }}>

                                    <AwesomeButton
                                        height={200}
                                        backgroundColor='transparent'
                                        raiseLevel={15}
                                        backgroundDarker='transparent'
                                        backgroundShadow='transparent'
                                        backgroundActive='transparent'
                                    >
                                        <View>

                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                // marginLeft: 20,
                                                marginTop: 20,
                                                width: '100%',
                                                textAlign: 'left',
                                                fontFamily: 'SFPRODISPLAYBOLD'
                                            }}>Bally's{'\n'}Deposit</Text>
                                            <Text style={{
                                                width: '100%',
                                                fontSize: 18,
                                                // marginLeft: 20,
                                                marginBottom: 20,
                                                textAlign: 'left',
                                                fontFamily: 'SFPRODISPLAYBOLD'
                                            }}>Keep your cash{'\n'}safe and{'\n'}organized with{'\n'}our convenient{'\n'}money deposit</Text>
                                        </View>
                                    </AwesomeButton>
                                </View>
                            </View>

                            <Text style={{
                                textShadowOffset: { width: -1, height: -1 },
                                textShadowColor: 'rgba(0,0,0,0.99)',
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginLeft: 20,
                                marginTop: 20,
                                width: '100%',
                                textAlign: 'left',
                                fontFamily: 'SFPRODISPLAYBOLD'
                            }}>Collecting methods</Text>


                            <View style={{ borderRadius: 10, backgroundColor: '#FFCE6C', flex: 1, marginTop: 20, marginStart: 20, marginEnd: 20 }}>

                                <AwesomeButton
                                    height={120}
                                    backgroundColor='transparent'
                                    raiseLevel={15}
                                    backgroundDarker='transparent'
                                    backgroundShadow='transparent'
                                    backgroundActive='transparent'
                                >
                                    <View>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            marginLeft: 10,
                                            marginTop: 30,
                                            width: '100%',
                                            textAlign: 'left',
                                            fontFamily: 'SFPRODISPLAYBOLD'
                                        }}>Scan</Text>
                                        <Text style={{
                                            marginStart: 10,
                                            width: '100%',
                                            fontSize: 18,
                                            // marginLeft: 20,
                                            marginBottom: 20,
                                            textAlign: 'left',
                                            fontFamily: 'SFPRODISPLAYBOLD'
                                        }}>Whether you'r looking to access exclusive{'\n'}content, make payments, or retrieve{'\n'}important information, the scan QR has{'\n'}got you coverd</Text>
                                    </View>
                                </AwesomeButton>
                            </View>



                            <View style={{ borderRadius: 10, backgroundColor: '#FFCE6C', flex: 1, marginTop: 20, marginStart: 20, marginEnd: 20 }}>

                                <AwesomeButton
                                    height={120}
                                    backgroundColor='transparent'
                                    raiseLevel={15}
                                    backgroundDarker='transparent'
                                    backgroundShadow='transparent'
                                    backgroundActive='transparent'
                                >
                                    <View>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            // marginLeft: 20,
                                            marginTop: 20,
                                            width: '100%',
                                            textAlign: 'left',
                                            fontFamily: 'SFPRODISPLAYBOLD'
                                        }}>Collect</Text>
                                        <Text style={{
                                            width: '100%',
                                            fontSize: 18,
                                            // marginLeft: 20,
                                            marginBottom: 20,
                                            textAlign: 'left',
                                            fontFamily: 'SFPRODISPLAYBOLD'
                                        }}>Whether you're a seasoned colloector{'\n'}or just starting out, our wide range{'\n'}of coins will surely captivate you</Text>
                                    </View>
                                </AwesomeButton>
                            </View>



                            <View style={{
                                borderRadius: 10,
                                backgroundColor: '#FFCE6C',
                                flex: 1,
                                marginTop: 20,
                                marginStart: 20,
                                marginEnd: 20,
                                marginBottom: 10,
                            }}>

                                <AwesomeButton
                                    height={120}
                                    backgroundColor='transparent'
                                    raiseLevel={15}
                                    backgroundDarker='transparent'
                                    backgroundShadow='transparent'
                                    backgroundActive='transparent'
                                >
                                    <View>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            // marginLeft: 20,
                                            marginTop: 20,
                                            width: '100%',
                                            textAlign: 'left',
                                            fontFamily: 'SFPRODISPLAYBOLD'
                                        }}>Pay</Text>
                                        <Text style={{
                                            width: '100%',
                                            fontSize: 18,
                                            // marginLeft: 20,
                                            marginBottom: 20,
                                            textAlign: 'left',
                                            fontFamily: 'SFPRODISPLAYBOLD'
                                        }}>Simply pour in your coins and watch{'\n'}as the are converted into digital{'\n'}currency for seamless trasantions</Text>
                                    </View>
                                </AwesomeButton>
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
