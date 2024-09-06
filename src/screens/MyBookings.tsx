import React, { Component } from 'react';
import { Linking, Text, Keyboard, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';
import TextInput from '../components/TextInput';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyDatePicker from '../components/MyDatePicker';

import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Evillcons from 'react-native-vector-icons/EvilIcons.js'
import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';
import GradientButtonWithBorder from '../components/GradientButton.tsx'
import ButtomNav from '../components/ButtomNav.tsx';
import { GetEvents } from '../api/Api.tsx';

import { Marquee } from '@animatereactnative/marquee';
import { Dropdown } from 'react-native-element-dropdown';
import GradientButton from '../components/GradientButtonfull.tsx';
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
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
    Tags: string[];
    Images: string[];
    openDatePicker: boolean;
    arrival: string;
    depatcher: string;
    TempPIN: Date;
    picker: number;
    packeageData: packages[];
    PaxData: Paxs[];
    PackeageValue: string,
    PaxValue: string;
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
            Tags: ["European dancing", "Belly dancing", "Pole dancing", "Body building show", "Traditional dancing"],
            Images: [],
            arrival: '',
            depatcher: '',
            openDatePicker: false,
            TempPIN: new Date(),
            picker: 0,
            packeageData: [
                { label: 'Package 1', value: '1' },
                { label: 'Package 2', value: '2' },
                { label: 'Package 3', value: '3' }
            ],
            PaxData: [
                { label: 'Pax 1', value: '1' },
                { label: 'Pax 2', value: '2' },
                { label: 'Pax 3', value: '3' }
            ],
            PackeageValue: '',
            PaxValue: '',
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

        //      this.MainHomeLoad();

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
            placeholderStyle: {
                fontSize: 16,
            },
            selectedTextStyle: {
                fontSize: 16,
            },
            iconStyle: {
                width: 20,
                height: 20,
            },
            inputSearchStyle: {
                height: 40,
                fontSize: 16,
            },
            dropdown: {
                marginTop: 20,
                margin: 10,
                height: 50,
                backgroundColor: '#FFCE6C',
                borderRadius: 5,
                padding: 12,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                borderWidth: 1,
                borderColor: 'black',
                elevation: 2,
            },
            icon: {
                marginRight: 5,
            },
            item: {
                padding: 17,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            textItem: {
                fontSize: 16,
            },
            customButton: {
                width: '100%'
            },
            buttonText: {
                fontWeight: 'bold',
                color: '#000000',
                fontSize: 20,
                textAlign: 'center',
            },
        });


        const renderItem = (item: { label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; value: any; }) => {
            return (
                <View style={styles.item}>
                    <Text style={styles.textItem}>{item.label}</Text>
                    {item.value === this.state.PackeageValue && (
                        <AntDesign
                            style={styles.icon}
                            color="black"
                            name="Safety"
                            size={20}
                        />
                    )}
                </View>
            );
        };

        return (
            <LinearGradient
                colors={[ColorFirst, ColorSecond, ColorTherd]}
                style={styles.container} >

                <SafeAreaView style={styles.safeArea}>

                    <LinearGradient
                        colors={[ColorFirst, ColorSecond, ColorTherd]}
                        style={styles.container}>


                        <View style={{ zIndex: 10 }}>
                            <TopNav navigation={this.props.navigation} titel={'MY BOOKING'} />
                        </View>


                        <ScrollView style={styles.container}>

                            <View style={{ alignItems: 'center' }}>
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


                            {/* <View>

                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={this.state.packeageData}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Package"
                                    searchPlaceholder="Search..."
                                    value={this.state.PackeageValue}
                                    onChange={item => {
                                        this.setState({ PaxValue: item.label })
                                    }}
                                    renderLeftIcon={() => (
                                        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                                    )}
                                    renderItem={renderItem}
                                />


                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={this.state.PaxData}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Pax"
                                    searchPlaceholder="Search..."
                                    value={this.state.PaxValue}
                                    onChange={item => {
                                        this.setState({ PaxValue: item.label })
                                    }}
                                    renderLeftIcon={() => (
                                        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                                    )}
                                    renderItem={renderItem}
                                />

                            </View> */}


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
                            <View style={{ flexDirection: 'row', flex: 1, marginBottom: 120 }}>
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