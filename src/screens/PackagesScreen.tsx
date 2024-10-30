import React from 'react';
import { Platform, Linking, Animated, Text, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchGiftAndGoodWill } from '../api/Api.tsx';

import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';

import ButtomNav from '../components/ButtomNav.tsx';
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
    Val: number;
    fadeAnim: Animated.Value;
    type: string;
    Img_Url_1: string;
    Img_Url_2: string;
    M_Name_1: string;
    M_Language_1: string;
    M_Mobile_1: string;
    M_Name_2: string;
    M_Language_2: string;
    M_Mobile_2: string;

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
        "ImgUrl": 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Lotus_tower_and_Beira_lake_at_night_2023.jpg',
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

const PackageDataUsd = [
    {
        "Name": "QUTUB MINAR A",
        "1_value": "REQUIRED COUPONS 1500",
        "2_value": "COMPLIMENTARY 3 NIGHT'S ACCOMMODATION AT 5 STAR HOTEL (STANDARD ROOM)",
        "3_value": "AIR TICKET REIMBURSEMENT ON 3RD DAY - INR 25,000 NON-CASH CHIPS",
        "4_value": "FOOD & BEVERAGES\N(FROM BALLY'S CASINO RESTAURANT)",
        "ImgUrl": 'https://www.shutterstock.com/shutterstock/photos/2395557739/display_1500/stock-photo-bahirawakanda-sri-maha-bodhi-viharaya-is-a-theravada-buddhist-temple-in-kandy-sri-lanka-november-2395557739.jpg',
        "Amount": 'USD 500,000',

    },
    {
        "Name": "QUTUB MINAR B",
        "1_value": "REQUIRED COUPONS 1500",
        "2_value": "COMPLIMENTARY 3 NIGHT'S ACCOMMODATION AT 5 STAR HOTEL (STANDARD ROOM)",
        "3_value": "AIR TICKET REIMBURSEMENT ON 3RD DAY - INR 25,000 NON-CASH CHIPS",
        "4_value": "FOOD & BEVERAGES\N(FROM BALLY'S CASINO RESTAURANT)",
        "ImgUrl": 'https://www.planetware.com/wpimages/2020/01/sri-lanka-colombo-best-places-to-visit-gangaramaya-temple.jpg',
        "Amount": 'USD 500,000',
    },
    {
        "Name": "QUTUB MINAR C",
        "1_value": "REQUIRED COUPONS 1500",
        "2_value": "COMPLIMENTARY 3 NIGHT'S ACCOMMODATION AT 5 STAR HOTEL (STANDARD ROOM)",
        "3_value": "AIR TICKET REIMBURSEMENT ON 3RD DAY - INR 25,000 NON-CASH CHIPS",
        "4_value": "FOOD & BEVERAGES\N(FROM BALLY'S CASINO RESTAURANT)",
        "ImgUrl": 'https://nexttravelsrilanka.com/wp-content/uploads/2023/02/Badulla-1.jpg',
        "Amount": 'USD 500,000',
    },
    {
        "Name": "QUTUB MINAR D",
        "1_value": "REQUIRED COUPONS 1500",
        "2_value": "COMPLIMENTARY 3 NIGHT'S ACCOMMODATION AT 5 STAR HOTEL (STANDARD ROOM)",
        "3_value": "AIR TICKET REIMBURSEMENT ON 3RD DAY - INR 25,000 NON-CASH CHIPS",
        "4_value": "FOOD & BEVERAGES\N(FROM BALLY'S CASINO RESTAURANT)",
        "ImgUrl": 'https://www.placestostay.lk/wp-content/uploads/2023/12/Nine-Raches-Bridge-in-Ella-Sri-Lanka-1080x628.jpg',
        "Amount": 'USD 500,000',
    },
    {
        "Name": "QUTUB MINAR E",
        "1_value": "REQUIRED COUPONS 1500",
        "2_value": "COMPLIMENTARY 3 NIGHT'S ACCOMMODATION AT 5 STAR HOTEL (STANDARD ROOM)",
        "3_value": "AIR TICKET REIMBURSEMENT ON 3RD DAY - INR 25,000 NON-CASH CHIPS",
        "4_value": "FOOD & BEVERAGES\N(FROM BALLY'S CASINO RESTAURANT)",
        "ImgUrl": 'https://frugalfrolicker.com/wp-content/uploads/2023/11/sri-lanka-beautiful-places-8.jpg',
        "Amount": 'USD 500,000',
    },
    {
        "Name": "QUTUB MINAR F",
        "1_value": "REQUIRED COUPONS 1500",
        "2_value": "COMPLIMENTARY 3 NIGHT'S ACCOMMODATION AT 5 STAR HOTEL (STANDARD ROOM)",
        "3_value": "AIR TICKET REIMBURSEMENT ON 3RD DAY - INR 25,000 NON-CASH CHIPS",
        "4_value": "FOOD & BEVERAGES\N(FROM BALLY'S CASINO RESTAURANT)",
        "ImgUrl": 'https://i0.wp.com/blog.worldholidayvibes.com/wp-content/uploads/2024/09/Mihintale-peakVavuniya-Tourist-Places-World-Holiday-Vibes-Blog.jpg?resize=1024%2C580&ssl=1',
        "Amount": 'USD 500,000',
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
            fadeAnim: new Animated.Value(1),
            Val: 0,
            type: 'INR',
            Img_Url_1: '',
            Img_Url_2: '',
            M_Name_1: '',
            M_Language_1: '',
            M_Mobile_1: '',
            M_Name_2: '',
            M_Language_2: '',
            M_Mobile_2: '',
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

        this.getData();
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

    async getData() {
        try {

            this.setState({ isLoading: true });

            const MID = await AsyncStorage.getItem('MID') as string;

            console.log(MID);


            const result: any = await fetchGiftAndGoodWill(MID);

            console.log(result);


            if (result.strRturnRes) {

                this.setState({
                    isLoading: false,
                    Img_Url_1: result.Img_Url_1,
                    Img_Url_2: result.Img_Url_2,
                    M_Name_1: result.M_Name_1,
                    M_Language_1: result.M_Language_1,
                    M_Mobile_1: result.M_Mobile_1,
                    M_Name_2: result.M_Name_2,
                    M_Language_2: result.M_Language_2,
                    M_Mobile_2: result.M_Mobile_2,
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

        }
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

                                <MainManuButton Url={this.state.type === 'INR' ? require('../images/svgtopng/INR2.png') : require('../images/svgtopng/INR.png')} title={''}
                                    onPress={() => {
                                        this.setState({ type: 'INR' });
                                    }} />


                                <MainManuButton
                                    Url={this.state.type === 'USD' ? require('../images/svgtopng/USD2.png') : require('../images/svgtopng/USD.png')}
                                    title={''}
                                    onPress={() => {
                                        this.setState({ type: 'USD' });
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

                                        {
                                            this.state.type === 'INR' ?
                                                <View style={{ borderWidth: 1, borderColor: 'white' }}>
                                                    <View style={{ width: '100%', height: 300 }}>
                                                        <Image source={{ uri: PackageData[this.state.Val].ImgUrl }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} resizeMode={'contain'} />
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
                                                :
                                                <View style={{ borderWidth: 1, borderColor: 'white' }}>
                                                    <View style={{ width: '100%', height: 300 }}>
                                                        <Image source={{ uri: PackageDataUsd[this.state.Val].ImgUrl }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} resizeMode={'contain'} />
                                                    </View>


                                                    <Text style={{ color: 'white', marginStart: 20, fontSize: 20, marginTop: 20, fontWeight: 'bold' }}>{PackageDataUsd[this.state.Val].Name}</Text>

                                                    <Text style={{ color: 'white', marginStart: 20, fontSize: 16, marginTop: 20 }}>{'\u25cf '}{PackageDataUsd[this.state.Val]['1_value']}</Text>
                                                    <Text style={{ color: 'white', marginStart: 20, fontSize: 16 }}>{'\u25cf '}{PackageDataUsd[this.state.Val]['2_value']}</Text>
                                                    <Text style={{ color: 'white', marginStart: 20, fontSize: 16 }}>{'\u25cf '}{PackageDataUsd[this.state.Val]['3_value']}</Text>
                                                    <Text style={{ color: 'white', marginStart: 20, fontSize: 16 }}>{'\u25cf '}{PackageDataUsd[this.state.Val]['4_value']}</Text>

                                                    <Text style={{ color: 'white', marginStart: 20, fontSize: 16, marginTop: 20 }}>MINIMUM BUY-IN AMOUNT</Text>
                                                    <Text style={{ color: 'white', marginStart: 20, fontSize: 30, fontWeight: 'bold' }}>{PackageDataUsd[this.state.Val]['Amount']}</Text>
                                                    <Text style={{ color: 'white', marginStart: 20, fontSize: 16, marginBottom: 20 }}>(PLAYING CHIPS ISSUED TO THE SAME VALUE)</Text>
                                                </View>
                                        }
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

                            <View style={{ flexDirection: 'row', flex: 1, marginBottom: Platform.OS === 'ios' ? 110 : 150, marginTop: 20 }}>
                                <View style={{ alignItems: 'center', margin: 10, marginBottom: 20, flex: 1 }}>
                                    <Image source={{ uri: this.state.Img_Url_1 }} style={{ height: 150, width: 150, borderColor: 'gold', borderWidth: 3, borderRadius: 20 }}></Image>
                                    <Text style={{ color: 'white', marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>{this.state.M_Name_1}</Text>
                                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>MARKETING MANAGER INTERNATIONAL</Text>
                                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>{this.state.M_Language_1}</Text>
                                    <Text style={{ color: 'white', marginBottom: 10, fontSize: 20, textAlign: 'center' }}>MOBILE :{'\n'}{this.state.M_Mobile_1}</Text>
                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                        <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginEnd: 10, marginTop: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL(`whatsapp://send?text=&phone={${this.state.M_Mobile_1}}`);
                                                }}
                                            >
                                                <Ionicons name='logo-whatsapp' size={40} color={'white'} style={{ margin: 10 }} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginStart: 10, marginTop: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL(`tel:${this.state.M_Mobile_1}`);
                                                }}
                                            >
                                                <Ionicons name='call-outline' size={40} color={'white'} style={{ margin: 10 }} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    {/* <View style={{ borderWidth: 2, borderColor: 'white', width: '90%', marginTop: 20 }} /> */}
                                </View>



                                <View style={{ alignItems: 'center', margin: 10, marginBottom: 20, flex: 1 }}>
                                    <Image source={{ uri: this.state.Img_Url_2 }} style={{ height: 150, width: 150, borderColor: 'gold', borderWidth: 3, borderRadius: 20 }}></Image>
                                    <Text style={{ color: 'white', marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>{this.state.M_Name_2}</Text>
                                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>MARKETING MANAGER INTERNATIONAL</Text>
                                    <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>{this.state.M_Language_2}</Text>
                                    <Text style={{ color: 'white', marginBottom: 10, fontSize: 20, textAlign: 'center' }}>MOBILE :{'\n'}{this.state.M_Mobile_2}</Text>
                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                        <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginEnd: 10, marginTop: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL(`whatsapp://send?text=&phone={${this.state.M_Mobile_2}}`);
                                                }}
                                            >
                                                <Ionicons name='logo-whatsapp' size={40} color={'white'} style={{ margin: 10 }} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginStart: 10, marginTop: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL(`tel:${this.state.M_Mobile_2}`);
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


