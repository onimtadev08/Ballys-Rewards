import React from 'react';
import { Linking, Animated, Text, Keyboard, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, processColor } from 'react-native';
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
    Val: number;
    fadeAnim: Animated.Value;

}

interface datas {
    dataSets: any[];
}



interface myProps {
    navigation: any;
    router: any;
}

const PackageData = [
    {
        "Name": "QUTUB MINAR A",
        "1_value": "REQUIRED COUPONS 1500",
        "2_value": "COMPLIMENTARY 3 NIGHT'S ACCOMMODATION AT 5 STAR HOTEL (STANDARD ROOM)",
        "3_value": "AIR TICKET REIMBURSEMENT ON 3RD DAY - INR 25,000 NON-CASH CHIPS",
        "4_value": "FOOD & BEVERAGES\N(FROM BALLY'S CASINO RESTAURANT)",
        "ImgUrl": 'https://live.staticflickr.com/2785/4355802963_650319e682_b.jpg',
        "Amount": 'INR 500,000',

    },
    {
        "Name": "QUTUB MINAR B",
        "1_value": "REQUIRED COUPONS 1500",
        "2_value": "COMPLIMENTARY 3 NIGHT'S ACCOMMODATION AT 5 STAR HOTEL (STANDARD ROOM)",
        "3_value": "AIR TICKET REIMBURSEMENT ON 3RD DAY - INR 25,000 NON-CASH CHIPS",
        "4_value": "FOOD & BEVERAGES\N(FROM BALLY'S CASINO RESTAURANT)",
        "ImgUrl": 'https://www.holidify.com/images/bgImages/SIGIRIYA.jpg',
        "Amount": 'INR 500,000',
    },
    {
        "Name": "QUTUB MINAR C",
        "1_value": "REQUIRED COUPONS 1500",
        "2_value": "COMPLIMENTARY 3 NIGHT'S ACCOMMODATION AT 5 STAR HOTEL (STANDARD ROOM)",
        "3_value": "AIR TICKET REIMBURSEMENT ON 3RD DAY - INR 25,000 NON-CASH CHIPS",
        "4_value": "FOOD & BEVERAGES\N(FROM BALLY'S CASINO RESTAURANT)",
        "ImgUrl": 'https://c.myholidays.com/blog/blog/content/images/2021/04/Ella.webp',
        "Amount": 'INR 500,000',
    },
    {
        "Name": "QUTUB MINAR D",
        "1_value": "REQUIRED COUPONS 1500",
        "2_value": "COMPLIMENTARY 3 NIGHT'S ACCOMMODATION AT 5 STAR HOTEL (STANDARD ROOM)",
        "3_value": "AIR TICKET REIMBURSEMENT ON 3RD DAY - INR 25,000 NON-CASH CHIPS",
        "4_value": "FOOD & BEVERAGES\N(FROM BALLY'S CASINO RESTAURANT)",
        "ImgUrl": 'https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/11/20172113/mirissa.jpg',
        "Amount": 'INR 500,000',
    },
    {
        "Name": "QUTUB MINAR E",
        "1_value": "REQUIRED COUPONS 1500",
        "2_value": "COMPLIMENTARY 3 NIGHT'S ACCOMMODATION AT 5 STAR HOTEL (STANDARD ROOM)",
        "3_value": "AIR TICKET REIMBURSEMENT ON 3RD DAY - INR 25,000 NON-CASH CHIPS",
        "4_value": "FOOD & BEVERAGES\N(FROM BALLY'S CASINO RESTAURANT)",
        "ImgUrl": 'https://frugalfrolicker.com/wp-content/uploads/2023/11/sri-lanka-beautiful-places-8.jpg',
        "Amount": 'INR 500,000',
    },
    {
        "Name": "QUTUB MINAR F",
        "1_value": "REQUIRED COUPONS 1500",
        "2_value": "COMPLIMENTARY 3 NIGHT'S ACCOMMODATION AT 5 STAR HOTEL (STANDARD ROOM)",
        "3_value": "AIR TICKET REIMBURSEMENT ON 3RD DAY - INR 25,000 NON-CASH CHIPS",
        "4_value": "FOOD & BEVERAGES\N(FROM BALLY'S CASINO RESTAURANT)",
        "ImgUrl": 'https://www.latexforless.com/cdn/shop/articles/Sri_Lanka_1400x.progressive.jpg?v=1571077290',
        "Amount": 'INR 500,000',
    },
];


class MyOfferScreen extends React.Component<myProps, myStates> {
    // Assuming navigation is passed as a prop
    navigation: any;
    scrollRef: React.RefObject<ScrollView>
    fadeAnim: Animated.Value;

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
            }],
            Val: 0,
            fadeAnim: new Animated.Value(1),
        };
        this.fadeAnim = this.state.fadeAnim;


    }


    fadeIn = () => {
        Animated.timing(this.fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    fadeOut = () => {
        Animated.timing(this.fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
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

                        <View style={{ zIndex: 10 }}>
                            <TopNav navigation={this.props.navigation} titel={'PACKAGES'} BackButton={true} />
                        </View>



                        <ScrollView style={styles.container}>


                            <View style={{
                                flexDirection: 'row', width: screenWidth, alignItems: 'center', justifyContent: 'space-around'
                            }}>

                                <MainManuButton Url={require('../images/svgtopng/INR.png')} title={''} />


                                <MainManuButton Url={require('../images/svgtopng/USD.png')} title={''}
                                    onPress={() => {
                                        //   this.props.navigation.navigate('PackagesScreen');
                                    }}
                                />

                            </View>


                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginTop: 20 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.fadeOut();
                                        setTimeout(() => {
                                            this.setValMin(this.state.Val);
                                            this.fadeIn();
                                        }, 500);
                                    }}
                                >
                                    <Image source={require('../images/svgtopng/arrow.png')} style={{ width: 40, height: 40, margin: 10, transform: [{ rotate: '180deg' }] }} />
                                </TouchableOpacity>
                                <View style={{ flex: 1 }}>

                                    <Animated.View
                                        style={{
                                            flex: 1,
                                            opacity: this.fadeAnim,
                                        }}
                                    >

                                        <View style={{ borderWidth: 1, borderColor: 'white' }}>
                                            <View style={{ width: '100%', height: 300 }}>
                                                <Image source={{ uri: PackageData[this.state.Val].ImgUrl }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} resizeMode={'center'} />
                                            </View>


                                            <Text style={{ color: 'white', marginStart: 20, fontSize: 20, marginTop: 20, fontWeight: 'bold' }}>{PackageData[this.state.Val].Name}</Text>

                                            <Text style={{ color: 'white', marginStart: 20, fontSize: 16, marginTop: 20 }}>{'\u25cf '}{PackageData[this.state.Val]['1_value']}</Text>
                                            <Text style={{ color: 'white', marginStart: 20, fontSize: 16 }}>{'\u25cf '}{PackageData[this.state.Val]['2_value']}</Text>
                                            <Text style={{ color: 'white', marginStart: 20, fontSize: 16 }}>{'\u25cf '}{PackageData[this.state.Val]['3_value']}</Text>
                                            <Text style={{ color: 'white', marginStart: 20, fontSize: 16 }}>{'\u25cf '}{PackageData[this.state.Val]['4_value']}</Text>

                                            <Text style={{ color: 'white', marginStart: 20, fontSize: 16, marginTop: 20 }}>MINIMUM BUY-IN AMOUNT</Text>
                                            <Text style={{ color: 'white', marginStart: 20, fontSize: 30, fontWeight: 'bold' }}>{PackageData[this.state.Val]['Amount']}</Text>
                                            <Text style={{ color: 'white', marginStart: 20, fontSize: 16, marginBottom: 20 }}>(PLAYING CHIPS ISSUED TO THE SAME VALUE)</Text>
                                        </View>
                                    </Animated.View>

                                </View>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.fadeOut();
                                        setTimeout(() => {
                                            this.setVal(this.state.Val);
                                            this.fadeIn();
                                        }, 500);
                                    }}
                                >
                                    <Image source={require('../images/svgtopng/arrow.png')} style={{ width: 40, height: 40, margin: 10 }} />
                                </TouchableOpacity>


                            </View>

                            <View style={{ flexDirection: 'row', flex: 1, marginTop: 20 }}>
                                <View style={{ alignItems: 'center', margin: 10, marginBottom: 20, flex: 1 }}>
                                    <Image source={{ uri: 'https://image.lexica.art/full_jpg/f9ad1af8-721b-4233-872f-194f54a22310' }} style={{ height: 150, width: 150, borderColor: 'gold', borderWidth: 3, borderRadius: 20 }}></Image>
                                    <Text style={{ color: 'white', marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>TELLES LOY</Text>
                                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>MARKETING MANAGER INTERNATIONAL</Text>
                                    <Text style={{ color: 'white', marginBottom: 10, fontSize: 20, textAlign: 'center' }}>MOBILE : 94774771234</Text>
                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                        <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginEnd: 10, marginTop: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL('whatsapp://send?text=&phone={94774771234}');
                                                }}
                                            >
                                                <Ionicons name='logo-whatsapp' size={40} color={'white'} style={{ margin: 10 }} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginStart: 10, marginTop: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL('tel:${94774771234}');
                                                }}
                                            >
                                                <Ionicons name='call-outline' size={40} color={'white'} style={{ margin: 10 }} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    {/* <View style={{ borderWidth: 2, borderColor: 'white', width: '90%', marginTop: 20 }} /> */}
                                </View>



                                <View style={{ alignItems: 'center', margin: 10, marginBottom: 20, flex: 1 }}>
                                    <Image source={{ uri: 'https://image.lexica.art/full_jpg/f9ad1af8-721b-4233-872f-194f54a22310' }} style={{ height: 150, width: 150, borderColor: 'gold', borderWidth: 3, borderRadius: 20 }}></Image>
                                    <Text style={{ color: 'white', marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>TELLES LOY</Text>
                                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>MARKETING MANAGER INTERNATIONAL</Text>
                                    <Text style={{ color: 'white', marginBottom: 10, fontSize: 20, textAlign: 'center' }}>MOBILE : 94774771234</Text>
                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                        <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginEnd: 10, marginTop: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL('whatsapp://send?text=&phone={94774771234}');
                                                }}
                                            >
                                                <Ionicons name='logo-whatsapp' size={40} color={'white'} style={{ margin: 10 }} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginStart: 10, marginTop: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL('tel:${94774771234}');
                                                }}
                                            >
                                                <Ionicons name='call-outline' size={40} color={'white'} style={{ margin: 10 }} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    {/* <View style={{ borderWidth: 2, borderColor: 'white', width: '90%', marginTop: 20 }} /> */}
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
                        <View style={{
                            zIndex: 1,
                            left: 0,
                            bottom: 0,
                            right: 0
                            , position: 'absolute',
                            height: '12%',
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
    setValMin(Val: number) {
        if (0 < Val) {
            this.setState({ Val: Val - 1 });
        }
    }
    setVal(Val: number) {
        if ((PackageData.length - 1) > Val) {
            this.setState({ Val: Val + 1 });
        }

    }
}



export default MyOfferScreen;


