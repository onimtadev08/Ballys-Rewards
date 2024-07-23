//import liraries
import React, { Component, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Image, Dimensions, Alert, BackHandler, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import GradientButtonWithBorder from '../components/GradientButton';
import GradientButton from '../components/GradientButtonfull';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextInput from '../components/TextInput';
import LinearGradient from 'react-native-linear-gradient';
import Navigation from '../components/Navigation';
import { Domain } from '../data/data';
const { width, height } = Dimensions.get('window');
import ErrorMsg from '../components/errorMsg';
import Loader from '../components/Loader';
import InfoMsg from '../components/InfoMsg';
import OtpMsg from '../components/OtpMsg';
import { ResendOTP, TempLogin, VaidateOTP } from '../api/Api';
import MyDatePicker from '../components/MyDatePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccsessMsg from '../components/SuccsessMsg';

interface BallysLoginState {
    PlayerID: string;
    PIN: string;
    Token: string;
    showError: boolean;
    isLoading: boolean;
    Method: string;
    showApiError: boolean;
    showApiErrorMsg: string;
    showApiInfo: boolean;
    showApiInfoMsg: string;
    showOtpMsg: boolean;
    openDatePicker: boolean;
    TempPIN: Date;
    VerifyOTP: string;
    showApiSuccsess: boolean;
    showApiSuccsessMsg: string;
}
interface myProps {
    Method: string;
    route: any;
    navigation: any;
}
class SigninScrenn extends React.PureComponent<myProps, BallysLoginState> {

    constructor(props: any) {
        super(props);
        this.state = {
            PlayerID: '',
            PIN: '',
            Token: '',
            showError: false,
            isLoading: false,
            Method: this.props.route.params.Method,
            showApiError: false,
            showApiErrorMsg: '',
            showApiInfo: false,
            showApiInfoMsg: '',
            showOtpMsg: false,
            openDatePicker: false,
            TempPIN: new Date(),
            VerifyOTP: '',
            showApiSuccsess: false,
            showApiSuccsessMsg: '',
        }


    }

    componentDidMount(): void {
        this.setState({ PlayerID: '', PIN: '' });
        //      BackHandler.addEventListener('hardwareBackPress', () => true);
    }

    VaidateOTP = async (otp: string) => {
        this.setState({ isLoading: true });
        try {
            const result = await VaidateOTP(this.state.PlayerID, otp);
            console.log(result);
            if (result.strRturnRes) {

                this.setState({
                    isLoading: false,
                    showOtpMsg: false,
                });

                this.handleNavigate();

            } else {
                Keyboard.dismiss();
                this.setState({
                    isLoading: false,
                    showApiError: true,
                    showApiErrorMsg: 'Please try again'
                });
            }
        } catch (error) {
            console.log(error);
            this.setState({
                isLoading: false,
                showApiError: true,
                showApiErrorMsg: 'Server Connection error',
            });
        } finally {

        }
    }


    handleNavigate = () => {
        const { navigation } = this.props; // Destructure navigation prop
        navigation.navigate('Home',
            { 'PlayerID': this.state.PlayerID }
        );

        this.setState({ isLoading: false });
    };

    Login = async () => {
        this.setState({ showError: false, isLoading: true }, async () => {


            if (this.state.PlayerID === '') {
                this.setState({ showError: true, isLoading: false });
            }

            if (this.state.PIN === '') {
                this.setState({ showError: true, isLoading: false });
            }

            console.log(!this.state.showError, this.state.PlayerID !== '', this.state.PIN !== '');

            if (!this.state.showError && (this.state.PlayerID !== '' && this.state.PIN !== '')) {

                try {
                    const result = await TempLogin(this.state.PlayerID, this.state.PIN, this.state.Token, this.state.Method);
                    console.log(result);
                    if (result.strRturnRes) {

                        AsyncStorage.setItem('Token', result.strToken.access_token);
                        AsyncStorage.setItem('MID', this.state.PlayerID);

                        this.setState({
                            isLoading: false,
                            showOtpMsg: true,
                        });

                        //    this.getOtp();

                    } else {
                        Keyboard.dismiss();
                        this.setState({
                            isLoading: false,
                            showApiError: true,
                            showApiErrorMsg: this.state.Method === 'TEMP' ?
                                result.strMName === '' ? result.strToken.error_description : 'Invalid Credentials, Please try again'
                                : result.strToken.error_description
                        });
                    }
                } catch (error) {
                    console.log(error);
                    this.setState({
                        isLoading: false,
                        showApiError: true,
                        showApiErrorMsg: 'Server Connection error'
                    });
                } finally {

                }
            }
        });
    }

    ResendOtp = async () => {

        try {
            const result = await ResendOTP(this.state.PlayerID);

            if (result.strRturnRes) {

                this.setState({ showApiSuccsess: true, showApiSuccsessMsg: 'Resend OTP Sucssesfull' });

            } else {
                Keyboard.dismiss();
                this.setState({
                    isLoading: false,
                    showApiError: true,
                    showApiErrorMsg: 'Resend OTP Fails',
                });
            }
        } catch (error) {
            console.log(error);
            this.setState({
                isLoading: false,
                showApiError: true,
                showApiErrorMsg: 'Server Connection error'
            });
        } finally {

        }

    }

    render(): React.ReactNode {

        return (
            <View style={{ flex: 1 }}>
                <LinearGradient
                    style={{ flex: 1 }}
                    colors={['#FF0024', '#FF6648', '#FFCE6C']}>

                    <ScrollView >
                        <View style={{ height: '100%' }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Sign in</Text>
                                <Image
                                    source={require('../images/logo.png')}
                                    style={{ width: width / 1.2, height: width / 1.2 }}
                                    resizeMode="contain"
                                />
                            </View>
                            {this.state.Method === 'TEMP' ?
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -40, marginBottom: 20 }}>
                                    <Text style={{ color: 'white', fontSize: 14, }}>if this is your First time logging in please note</Text>
                                    <Text style={{ color: 'white', fontSize: 14, }}>the passport No, you used is your Player ID #</Text>
                                    <Text style={{ color: 'white', fontSize: 14, }}>and your Password is your birthday is</Text>
                                    <Text style={{ color: 'white', fontSize: 14, }}>DD/MM/YY YY format</Text>
                                </View>
                                : null}
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>

                                <TextInput
                                    value={this.state.PlayerID}
                                    onChangeText={(text: string) => {
                                        this.setState({ PlayerID: text });
                                    }}
                                    showError={this.state.PlayerID === '' && this.state.showError}
                                    fieldName={this.state.Method === 'TEMP' ? 'Player ID (Passport No.)' : 'Player ID'}
                                    fieldErrorMsg={'Field empty'}
                                />

                                {this.state.Method === 'TEMP' ?
                                    <TouchableOpacity style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%'
                                    }}
                                        onPress={() => {
                                            this.setState({ openDatePicker: true });
                                        }}
                                    >
                                        <TextInput
                                            editable={false}
                                            value={this.state.PIN}
                                            onChangeText={(text: string) => {
                                                this.setState({ PIN: text });
                                            }}
                                            showError={this.state.PIN === '' && this.state.showError}
                                            fieldName={'PIN (Date of Birth)'}
                                            fieldErrorMsg={'Field empty'}
                                        />
                                    </TouchableOpacity>
                                    :
                                    <TextInput
                                        value={this.state.PIN} onChangeText={(text: string) => {
                                            this.setState({ PIN: text });
                                        }}
                                        showError={this.state.PIN === '' && this.state.showError}
                                        fieldName={'PIN'}
                                        fieldErrorMsg={'Field empty'}
                                    />
                                }


                                <View style={{ width: '75%', alignItems: 'center', marginTop: 40 }}>
                                    <GradientButton
                                        title="SIGN IN"
                                        onPress={() => { this.Login(); }}
                                        colors={['#FF0024', '#FF0024', '#FF0024']}
                                    />
                                    {this.state.Method === 'TEMP' ? null :
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    showApiInfo: true,
                                                    showApiInfoMsg: 'To change your PIN number you should\nvisit the Ballys front office or\nCALL XXX-XXX XXXX'
                                                });
                                            }}
                                        >
                                            <Text style={{ marginTop: 20, color: 'black', fontSize: 16, borderBottomWidth: 2 }}>FORGET PASSWORD</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                    {this.state.showOtpMsg ?
                        <OtpMsg msg={'We have sent you OTP number, Enter the OTP you have received to continue'}
                            onPressCancel={() => {
                                this.setState({ showOtpMsg: false });
                            }} onReturnOtp={(otp: string): void => {
                                console.log(otp);
                                if (otp !== '') {
                                    this.VaidateOTP(otp);
                                }
                            }} onResendOtp={(): void => {
                                this.ResendOtp();
                            }} onPressDone={function (otp: string): void {
                                console.log(otp);
                            }} />
                        : null}
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
                            }} onDone={(data: string): void => {
                                console.log(data);
                                this.setState({ openDatePicker: false, PIN: data });
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
            </View >
        );
    }
}

//make this component available to the app
export default SigninScrenn;
