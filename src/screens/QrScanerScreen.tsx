import React, { Component } from 'react';
import { BackHandler, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';

import ButtomNav from '../components/ButtomNav.tsx';

import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import TopNav from '../components/TopNav.tsx';
import { Linking } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';


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
}
interface myProps {
    navigation: any;
    router: any;
}

const scale = 0.8;
const PAGE_WIDTH = screenWidth * scale;
const PAGE_HEIGHT = 240 * scale;

class QrScanerScreen extends Component<myProps, myStates> {
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
        };



    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    // Fetches navigation reference and sets up interval on mount
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution
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
            }, centerText: {
                flex: 1,
                fontSize: 18,
                padding: 32,
                color: '#777'
            },
            textBold: {
                fontWeight: '500',
                color: '#000'
            },
            buttonText: {
                fontSize: 21,
                color: 'rgb(0,122,255)'
            },
            buttonTouchable: {
                padding: 16
            }
        });

        const onSuccess = (e: { data: string; }) => {
            Linking.openURL(e.data).catch(err =>
                console.error('An error occured', err)
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
                            <TopNav navigation={this.props.navigation} BackButton={true} titel={'QR SCANNER'} />
                        </View>


                        {/* <ScrollView style={styles.container}> */}

                        <QRCodeScanner
                            onRead={onSuccess}
                            flashMode={RNCamera.Constants.FlashMode.torch}
                            topContent={
                                <Text style={styles.centerText}>
                                    Go to{' '}
                                    <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                                    your computer and scan the QR code.
                                </Text>
                            }
                            bottomContent={
                                <TouchableOpacity style={styles.buttonTouchable}>
                                    <Text style={styles.buttonText}>OK. Got it!</Text>
                                </TouchableOpacity>
                            }
                        />




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



export default QrScanerScreen;