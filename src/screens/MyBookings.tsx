import React, { Component } from 'react';
import { Platform, Linking, Text, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MyDatePicker from '../components/MyDatePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Evillcons from 'react-native-vector-icons/EvilIcons.js'
import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';
import GradientButtonWithBorder from '../components/GradientButton.tsx'
import ButtomNav from '../components/ButtomNav.tsx';
import moment from 'moment';
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import TopNav from '../components/TopNav.tsx';
import AnimatedBorderBox from '../components/AnimatedBorderBox.tsx';

import { fetchMyBooking } from '../api/Api.tsx';

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
    Images: string[];
    openDatePicker: boolean;
    arrival: string;
    depatcher: string;
    TempPIN: Date;
    picker: number;
    MemberImg: string;
    CardTier: string;
    MemberName: string;
    ExpireData: string;
    Img_Url_1: string;
    Img_Url_2: string;
    M_Name_1: string;
    M_Language_1: string;
    M_Mobile_1: string;
    M_Name_2: string;
    M_Language_2: string;
    M_Mobile_2: string;
}

interface packages {
    label: string;
    value: string;
}

interface Paxs {
    label: string;
    value: string;
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

class MyBookings extends Component<myProps, myStates> {
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
            Images: [],
            arrival: '',
            depatcher: '',
            openDatePicker: false,
            TempPIN: new Date(),
            picker: 0,
            MemberImg: '',
            CardTier: '',
            MemberName: '',
            ExpireData: '',
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
        this.getMyBooking();

    }

    handleBackPress
        = () => {
            // Handle back button press logic here
            return true; // Prevent default back behavior
        };
    handleLogin = () => {
        this.navigation.navigate('SignUp');
    };

    async getMyBooking() {
        try {

            this.setState({ isLoading: true });

            const MID = await AsyncStorage.getItem('MID') as string;

            const result: any = await fetchMyBooking(MID);

            console.log(result);


            if (result.strRturnRes) {

                this.setState({
                    isLoading: false,
                    ExpireData: moment(result.Exp).format('DD/MM/YYYY'),
                    MemberImg: result.MImage === '' ? 'https://i.sstatic.net/y9DpT.jpg' : `data:image/png;base64,${result.MImage}`,
                    MemberName: await AsyncStorage.getItem('strMName') as string,
                    CardTier: result.Current_R,
                    Img_Url_1: result.Img_Url_1,
                    Img_Url_2: result.Img_Url_2,
                    M_Name_1: result.M_Name_1,
                    M_Language_1: result.M_Language_1,
                    M_Mobile_1: result.M_Mobile_1,
                    M_Name_2: result.M_Name_2,
                    M_Language_2: result.M_Language_2,
                    M_Mobile_2: result.M_Mobile_2,
                })

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
                            <TopNav navigation={this.props.navigation} BackButton={true} titel={'MY BOOKING'} />
                        </View>


                        <ScrollView style={styles.container}>

                            {/* <View style={{ alignItems: 'center' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                    <View style={{ backgroundColor: 'gold', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>

                                        <Image
                                            source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/026/164/709/small_2x/businessman-portrait-elegant-man-in-business-suit-employee-of-business-institution-in-uniform-man-office-worker-business-avatar-profile-picture-illustration-vector.jpg' }}
                                            style={{
                                                height: 180,
                                                width: 130,
                                                borderRadius: 20,
                                                borderBottomLeftRadius: 0,
                                                borderBottomRightRadius: 0,
                                                marginLeft: 5,
                                                marginRight: 5,
                                                marginTop: 5

                                            }}
                                        />
                                    </View>
                                    <View style={{ borderColor: 'gold', borderWidth: 5, flexDirection: 'column', width: '70%', backgroundColor: 'white', height: 100, borderRadius: 20 }}>
                                        <Text style={{ marginStart: 10, fontSize: 18, marginTop: 10 }}>BALLYS MEMBER</Text>
                                        <View style={{ borderWidth: 1, borderColor: 'black', marginStart: 10, marginEnd: 20 }}></View>

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
                            </View> */}

                            <View style={{ alignItems: 'center', marginBottom: 30, marginTop: 20 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                    <AnimatedBorderBox
                                        MemberImg={this.state.MemberImg}
                                        CardTier={this.state.CardTier}
                                        MemberName={this.state.MemberName}
                                        ExpireData={this.state.ExpireData}
                                    />

                                </View>
                            </View>


                            <View style={{ flexDirection: 'row', marginEnd: 10, marginStart: 10 }}>
                                <TouchableOpacity style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: 50,
                                    marginTop: 20,
                                    marginEnd: 10,
                                }}
                                    onPress={() => {

                                        this.setState({ openDatePicker: true, picker: 1 });
                                    }}
                                >
                                    <View pointerEvents='none' style={{ width: '100%', height: '100%' }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            backgroundColor: 'white',
                                            borderColor: 'gold',
                                            borderWidth: 2,
                                            borderRadius: 5, height: '100%', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Text style={{ textAlign: 'center', flex: 1, color: 'black', fontSize: 16 }}>{this.state.arrival === '' ? 'ARRIVAL\nDATE' : this.state.arrival}</Text>
                                            <Evillcons name='calendar' color={'black'} size={45} />
                                        </View>

                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    marginStart: 10,
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: 50,
                                    marginTop: 20,
                                }}
                                    onPress={() => {

                                        this.setState({ openDatePicker: true, picker: 2 });
                                    }}
                                >
                                    <View pointerEvents='none' style={{ width: '100%', height: '100%' }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            backgroundColor: 'white',
                                            borderColor: 'gold',
                                            borderWidth: 2,
                                            borderRadius: 5, height: '100%', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <Text style={{ textAlign: 'center', flex: 1, color: 'black', fontSize: 16 }}>{this.state.depatcher === '' ? 'DEPARTURE\nDATE' : this.state.depatcher}</Text>
                                            <Evillcons name='calendar' color={'black'} size={45} />
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ margin: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <GradientButtonWithBorder
                                    title="SUBMIT"
                                    onPress={() => { }}
                                    colors={['transparent', 'transparent', 'transparent']}
                                    buttonStyle={{}}
                                    textStyle={{}} borderColor={''} />
                            </View>

                            <View style={{ borderColor: 'white', borderWidth: 1, margin: 20, borderRadius: 10 }}>

                                <Text style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    marginTop: 10,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    fontFamily: 'SFPRODISPLAYREGULAR.OTF'
                                }}>MY BOOKING DETAILS</Text>

                                <View style={{ margin: 20, justifyContent: 'center' }}>
                                    <GradientButtonWithBorder
                                        title="CHECK"
                                        onPress={() => { }}
                                        colors={['transparent', 'transparent', 'transparent']}
                                        buttonStyle={{}}
                                        textStyle={{}} borderColor={''} />
                                </View>
                            </View>


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
                        {this.state.openDatePicker ?
                            <MyDatePicker
                                date={this.state.TempPIN}
                                onDateChange={(date: Date): void => {
                                    this.setState({ TempPIN: date });
                                }}
                                format='DD/MM/YYYY'
                                mode='date'
                                onPressCancel={(): void => {
                                    this.setState({ openDatePicker: false });
                                }}
                                onDone={(data: string): void => {
                                    if (this.state.picker === 1) {
                                        this.setState({ openDatePicker: false, arrival: data });
                                    } else {
                                        this.setState({ openDatePicker: false, depatcher: data });
                                    }

                                }} />
                            : null}
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



export default MyBookings;