import React from 'react';
import { Platform, Linking, Text, Keyboard, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, processColor } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { interpolate, isColor } from "react-native-reanimated";

import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';

import ButtomNav from '../components/ButtomNav.tsx';
import { GetEvents } from '../api/Api.tsx';
import MainManuButton from '../components/MainManuButton.tsx';

import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import GradientButton from '../components/GradientButton.tsx';
import TopNav from '../components/TopNav.tsx';
import { fetchGiftAndGoodWill } from '../api/Api.tsx';
import { ThousandSeparator } from '../utilitis/utilities';

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
    Gift: string;
    Birthday: string;
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



class MyOfferScreen extends React.Component<myProps, myStates> {
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
            Gift: '0',
            Birthday: '0',
            Img_Url_1: '',
            Img_Url_2: '',
            M_Name_1: '',
            M_Language_1: '',
            M_Mobile_1: '',
            M_Name_2: '',
            M_Language_2: '',
            M_Mobile_2: '',
        };

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
    async getData() {
        try {

            this.setState({ isLoading: true });

            const MID = await AsyncStorage.getItem('MID') as string;

            console.log(MID);


            const result: any = await fetchGiftAndGoodWill(MID);

            console.log(result);


            if (result.strRturnRes) {

                this.setState({
                    Gift: result.GiftandGoodwill,
                    Birthday: result.BirthdayAmount,
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

    handleBackPress
        = () => {
            // Handle back button press logic here
            return true; // Prevent default back behavior
        };

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
                            <TopNav navigation={this.props.navigation} BackButton={true} titel={'MY OFFER'} />
                        </View>

                        <ScrollView style={styles.container}>
                            <View style={{ marginBottom: -50, marginTop: 20 }}>
                                <View style={{ borderWidth: 2, borderColor: 'white', marginTop: 30, marginBottom: 50, margin: 20, borderRadius: 20, alignItems: 'center' }}>

                                    <View style={{ backgroundColor: 'white', borderRadius: 10, height: 30, justifyContent: 'center', top: -20 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginStart: 10, marginEnd: 10 }}>GIFT AND GOODWILL</Text>
                                    </View>

                                    <Text style={{ color: 'white', fontSize: 30, fontWeight: '500', marginTop: -10, marginBottom: 10 }}>LKRc {ThousandSeparator(this.state.Gift)}</Text>

                                </View>
                            </View>


                            <View style={{ margin: 20, justifyContent: 'center' }}>
                                <GradientButton
                                    title="REDEEM"
                                    onPress={() => { }}
                                    colors={['transparent', 'transparent', 'transparent']}
                                    buttonStyle={{}}
                                    textStyle={{ fontSize: 20 }} borderColor={''} />
                            </View>


                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={[ColorFirst, 'white', ColorFirst]}
                                style={{ width: '100%', height: 2 }} />

                            <View style={{ marginBottom: -60 }}>
                                <View style={{ borderWidth: 2, borderColor: 'white', marginTop: 30, marginBottom: 50, margin: 20, borderRadius: 20, alignItems: 'center' }}>

                                    <View style={{ backgroundColor: 'white', borderRadius: 10, height: 30, justifyContent: 'center', top: -20 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginStart: 10, marginEnd: 10 }}>BIRTHDAY GIFT</Text>
                                    </View>

                                    <Text style={{ color: 'white', fontSize: 30, fontWeight: '500', marginTop: -10, marginBottom: 10 }}>LKRc {ThousandSeparator(this.state.Birthday)}</Text>

                                </View>
                            </View>


                            <View style={{ margin: 20, justifyContent: 'center' }}>
                                <GradientButton
                                    title="REDEEM"
                                    onPress={() => { }}
                                    colors={['transparent', 'transparent', 'transparent']}
                                    buttonStyle={{}}
                                    textStyle={{ fontSize: 20 }} borderColor={''} />
                            </View>


                            <View style={{
                                flexDirection: 'row', width: screenWidth, alignItems: 'center', justifyContent: 'space-around'
                            }}>

                                <MainManuButton Url={require('../images/svgtopng/dining.png')} title={'DINING'} />

                                <MainManuButton Url={require('../images/svgtopng/spa.png')} title={"SPA'S"}
                                    onPress={() => {
                                        this.props.navigation.navigate('SpaScreen');
                                    }}
                                />

                                <MainManuButton Url={require('../images/svgtopng/packages.png')} title={'PACKAGES'}
                                    onPress={() => {
                                        this.props.navigation.navigate('PackagesScreen');
                                    }}
                                />

                            </View>


                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={[ColorFirst, 'white', ColorFirst]}
                                style={{ width: '100%', height: 2, top: 40, marginBottom: 30 }} />


                            <View>
                                <Text style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    marginTop: 20,
                                    fontSize: 16,
                                    marginBottom: 20,
                                    fontWeight: 'bold',
                                    fontFamily: 'SFPRODISPLAYREGULAR.OTF'
                                }}>MAKE MY TRIP</Text>

                                <View style={{ borderColor: 'white', borderWidth: 1, margin: 20, borderRadius: 10, alignItems: 'center', }}>


                                    <View style={{
                                        backgroundColor: 'white',
                                        borderRadius: 10, width: '75%', height: 50, justifyContent: 'center', marginTop: -25
                                    }}>
                                        <Text style={{
                                            color: 'black',
                                            textAlign: 'center',
                                            fontSize: 16,
                                        }}>COMPLIMENTAR BENIFITS</Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            color: 'white',
                                            textAlign: 'left',
                                            marginTop: 10,
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}>• AIR TICKETS</Text>
                                        <Text style={{
                                            color: 'white',
                                            textAlign: 'left',

                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}>• HOTEL ACCOMMODATION</Text>
                                        <Text style={{
                                            color: 'white',
                                            textAlign: 'left',

                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}>• TRANSPORTATIONS</Text>
                                        <Text style={{
                                            color: 'white',
                                            textAlign: 'left',
                                            marginBottom: 10,
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}>• FOOD AND BEVERAGES</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={{ flexDirection: 'row', flex: 1, marginBottom: Platform.OS === 'ios' ? 110 : 150 }}>
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
}



export default MyOfferScreen;


