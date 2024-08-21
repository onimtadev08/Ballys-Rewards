import React, { Component } from 'react';
import { Text, Keyboard, BackHandler, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import MyDatePicker from '../components/MyDatePicker';

import { interpolate } from "react-native-reanimated";
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';

import ButtomNav from '../components/ButtomNav.tsx';
import { GetEvents } from '../api/Api.tsx';
import { SocialIcon, SocialIconProps } from '@rneui/themed';

const { width: screenWidth } = Dimensions.get('window');

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

class ContactUsScreen extends Component<myProps, myStates> {
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
                flex: 1,
                fontSize: 16,
            },
            customButton: {
                width: '75%'
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
                                }}>SOCIAL MEDIA</Text>
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

                            <View style={{ flexDirection: 'row', flex: 1, margin: 20 }}>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-start',
                                    flexDirection: 'row',
                                    backgroundColor: '#FFCE6C',
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    marginEnd: 10
                                }}>
                                    <SocialIcon
                                        type={'facebook'}
                                        iconType={'font-awesome'}
                                    />
                                    <View style={{ marginStart: 10, justifyContent: 'center', height: '100%' }}>
                                        <Text style={{}}>FACEBOOK</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-start',
                                    flexDirection: 'row',
                                    backgroundColor: '#FFCE6C',
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    marginStart: 10
                                }}>
                                    <SocialIcon
                                        type={'youtube'}
                                        iconType={'font-awesome'}
                                    />
                                    <View style={{ marginStart: 10, justifyContent: 'center', height: '100%' }}>
                                        <Text style={{}}>YOUTUBE</Text>
                                    </View>

                                </View>
                            </View>



                            <View style={{ flexDirection: 'row', flex: 1, margin: 20 }}>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-start',
                                    flexDirection: 'row',
                                    backgroundColor: '#FFCE6C',
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    marginEnd: 10
                                }}>
                                    <SocialIcon
                                        type={'instagram'}
                                        iconType={'font-awesome'}
                                    />
                                    <View style={{ marginStart: 10, justifyContent: 'center', height: '100%' }}>
                                        <Text style={{}}>INSTAGRAM</Text>
                                    </View>
                                </View>

                            </View>


                            <View style={{ flexDirection: 'row', flex: 1, margin: 20 }}>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-start',
                                    flexDirection: 'row',
                                    backgroundColor: '#FFCE6C',
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    marginEnd: 10
                                }}>
                                    <SocialIcon
                                        type={'linkedin'}
                                        iconType={'font-awesome'}
                                    />
                                    <View style={{ marginStart: 10, justifyContent: 'center', height: '100%' }}>
                                        <Text style={{}}>LINKEDIN</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-start',
                                    flexDirection: 'row',
                                    backgroundColor: '#FFCE6C',
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    marginStart: 10
                                }}>
                                    <SocialIcon
                                        type={'twitter'}
                                        iconType={'font-awesome'}
                                    />
                                    <View style={{ marginStart: 10, justifyContent: 'center', height: '100%' }}>
                                        <Text style={{}}>TWITTER</Text>
                                    </View>

                                </View>
                            </View>

                            {/* <View style={{ flexDirection: 'row', flex: 1, margin: 20 }}>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-start',
                                    flexDirection: 'row',
                                    backgroundColor: '#FFCE6C',
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    marginEnd: 10
                                }}>
                                    <SocialIcon
                                        type={'facebook'}
                                        iconType={'font-awesome'}
                                    />
                                    <View style={{ marginStart: 10, justifyContent: 'center', height: '100%' }}>
                                        <Text style={{}}>TRIP ADVISOR</Text>
                                    </View>
                                </View>

                            </View> */}



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
                    </LinearGradient>
                </SafeAreaView >
                <ButtomNav navigation={this.props.navigation}
                ></ButtomNav>
            </LinearGradient >
        );
    }
}



export default ContactUsScreen;