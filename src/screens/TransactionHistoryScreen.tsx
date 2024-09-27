import React, { Component } from 'react';
import { Platform, FlatList, Text, Keyboard, BackHandler, View, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from "moment";
import { interpolate } from "react-native-reanimated";
import { ThousandSeparator } from '../utilitis/utilities.ts';

import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';

import ButtomNav from '../components/ButtomNav.tsx';
import { getTransactionHistory } from '../api/Api.tsx';

import AsyncStorage from '@react-native-async-storage/async-storage';
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
    History: any[];
}
interface myProps {
    navigation: any;
    router: any;
}

const scale = 0.8;
const PAGE_WIDTH = screenWidth * scale;
const PAGE_HEIGHT = 240 * scale;

class TransactionHistoryScreen extends Component<myProps, myStates> {
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
            History: [],
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

        this.getTransactionHistory();

        // return () => clearInterval(interval);
    }

    handleBackPress
        = () => {
            // Handle back button press logic here
            return true; // Prevent default back behavior
        };

    async getTransactionHistory() {

        this.setState({ isLoading: true });
        try {

            const MID = await AsyncStorage.getItem('MID') as string;
            const result: any = await getTransactionHistory(MID);
            if (result.strRturnRes) {

                this.setState({
                    isLoading: false,
                    History: result.History,
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


    renderItem = ({ item }: { item: any }) => {
        return (
            <View style={{ alignItems: 'center', margin: 10, marginBottom: 10 }}>
                <View style={{ borderWidth: 1, borderColor: 'gold', padding: 5, borderRadius: 5, width: '100%' }}>

                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginTop: 5, marginStart: 5, marginEnd: 5 }}>

                        <Text style={{ color: 'white', fontSize: 18, flex: 1 }}>{moment(item.RedeemDate).format('DD MMM YYYY')}</Text>
                        <View style={{ backgroundColor: 'gold', padding: 5, borderRadius: 5 }} >
                            <Text style={{ color: 'black', fontSize: 18 }}>{item.TransType}</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', flex: 1, marginTop: 5, marginStart: 5, marginEnd: 5 }}>

                        <Text style={{ color: 'gold', fontSize: 18, flex: 1, fontWeight: '500' }}>Total Rewards Redeemed</Text>
                        <Text style={{ color: 'gold', fontSize: 18 }}>{ThousandSeparator(item.RedeemAmount)}</Text>

                    </View>

                    <View style={{ flexDirection: 'row', flex: 1, marginTop: 5, marginStart: 5, marginEnd: 5 }}>

                        <Text style={{ color: 'white', fontSize: 18, flex: 1, fontWeight: '500' }}>Ballance Bally's Coins</Text>
                        <Text style={{ color: 'white', fontSize: 18 }}>{ThousandSeparator(item.NonCash)}</Text>

                    </View>

                    <View style={{ flexDirection: 'row', flex: 1, marginTop: 5, marginBottom: 5, marginStart: 5, marginEnd: 5 }}>

                        <Text style={{ color: 'white', fontSize: 18, flex: 1, fontWeight: '500' }}>Balance Sri Lankan Rupees</Text>
                        <Text style={{ color: 'white', fontSize: 18 }}>{ThousandSeparator(item.ShopCredit)}</Text>

                    </View>




                </View>

            </View >
        );
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
                            <TopNav navigation={this.props.navigation} BackToHome={true} titel={'TRANSACTION\nHISTORY'} />
                        </View>


                        {/* <ScrollView style={styles.container}> */}

                        <FlatList
                            style={{ marginBottom: Platform.OS === 'ios' ? 120 : 150 }}
                            data={this.state.History}
                            renderItem={this.renderItem} />

                        {/* </ScrollView> */}
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



export default TransactionHistoryScreen;