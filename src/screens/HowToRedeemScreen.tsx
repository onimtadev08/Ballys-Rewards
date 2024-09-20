import React, { Component } from 'react';
import { BackHandler, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';
import ButtomNav from '../components/ButtomNav.tsx'
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import TopNav from '../components/TopNav.tsx';


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
    page_title: string;
    page_description: any[];
    banner_img: string;
    Partners: Partner[];
    ShoppingCredit: string;

}
interface myProps {
    navigation: any;
    route: any;
    Page: number;
}

interface Partner {
    hp: string;
    Des: string;
    URL: string;
}

class HowToRedeemScreen extends Component<myProps, myStates> {
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
            page_title: '',
            page_description: [],
            banner_img: '',
            Partners: [],
            ShoppingCredit: '0.0',
        };



    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution
    }




    handleBackPress
        = () => {
            return true;
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


                        <View style={{ zIndex: 10, backgroundColor: ColorFirst }}>
                            <TopNav navigation={this.props.navigation} titel={'HOW TO REDEEM'} />
                        </View>
                        <View style={{ marginBottom: 130, flex: 1 }}>


                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={[ColorFirst, 'gold', ColorFirst]}
                                style={{ width: '90%', height: 1, alignSelf: 'center', marginBottom: 10, marginTop: 10 }} />

                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>How to redeem your vouchers</Text>

                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={[ColorFirst, 'gold', ColorFirst]}
                                style={{ width: '90%', height: 1, alignSelf: 'center', marginTop: 10, marginBottom: 10 }} />


                            <ScrollView style={{ flex: 1 }}>



                                <View style={{ flexDirection: 'row', paddingStart: 20, paddingEnd: 20, paddingBottom: 10, paddingTop: 10, width: '100%' }}>
                                    <Text style={{ color: 'white', textAlign: 'left', fontSize: 18, width: '20%', marginEnd: 20 }}>Step 01</Text>
                                    <Text style={{ color: 'white', textAlign: 'left', fontSize: 18, flex: 1, width: '80%' }}>Select the preferred Partner you want to redeem your voucher at</Text>
                                </View>

                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={[ColorFirst, 'gold', ColorFirst]}
                                    style={{ width: '90%', height: 1, alignSelf: 'center', marginTop: 10, marginBottom: 10 }} />


                                <View style={{ flexDirection: 'row', paddingStart: 20, paddingEnd: 20, paddingBottom: 10, paddingTop: 10, width: '100%' }}>
                                    <Text style={{ color: 'white', textAlign: 'left', fontSize: 18, width: '20%', marginEnd: 20 }}>Step 02</Text>
                                    <Text style={{ color: 'white', textAlign: 'left', fontSize: 18, flex: 1, width: '80%' }}>Present your ballys voucher at time of payment by showing the voucher and number appearing on your mobile</Text>
                                </View>

                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={[ColorFirst, 'gold', ColorFirst]}
                                    style={{ width: '90%', height: 1, alignSelf: 'center', marginTop: 10, marginBottom: 10 }} />

                                <View style={{ flexDirection: 'row', paddingStart: 20, paddingEnd: 20, paddingBottom: 10, paddingTop: 10, width: '100%' }}>
                                    <Text style={{ color: 'white', textAlign: 'left', fontSize: 18, width: '20%', marginEnd: 20 }}>Step 03</Text>
                                    <Text style={{ color: 'white', textAlign: 'left', fontSize: 18, flex: 1, width: '80%' }}>Indicate the number and value of the voucher you want to pay with</Text>
                                </View>

                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={[ColorFirst, 'gold', ColorFirst]}
                                    style={{ width: '90%', height: 1, alignSelf: 'center', marginTop: 10, marginBottom: 10 }} />

                                <View style={{ flexDirection: 'row', paddingStart: 20, paddingEnd: 20, paddingBottom: 10, paddingTop: 10, width: '100%' }}>
                                    <Text style={{ color: 'white', textAlign: 'left', fontSize: 18, width: '20%', marginEnd: 20 }}>Step 04</Text>
                                    <Text style={{ color: 'white', textAlign: 'left', fontSize: 18, flex: 1, width: '80%' }}>You will receive a message to your app indicating a successful transaction</Text>
                                </View>

                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={[ColorFirst, 'gold', ColorFirst]}
                                    style={{ width: '90%', height: 1, alignSelf: 'center', marginTop: 10, marginBottom: 10 }} />

                                <View style={{ flexDirection: 'row', paddingStart: 20, paddingEnd: 20, paddingBottom: 10, paddingTop: 10, width: '100%' }}>
                                    <Text style={{ color: 'white', textAlign: 'left', fontSize: 18, width: '20%', marginEnd: 20 }}>Step 05</Text>
                                    <Text style={{ color: 'white', textAlign: 'left', fontSize: 18, flex: 1, width: '80%' }}>The transaction voucher will get deleted from your Voucher</Text>
                                </View>

                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={[ColorFirst, 'gold', ColorFirst]}
                                    style={{ width: '90%', height: 1, alignSelf: 'center', marginTop: 10, marginBottom: 10 }} />

                            </ScrollView>

                        </View>
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

export default HowToRedeemScreen;