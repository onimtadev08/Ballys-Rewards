//import liraries
import React, { Component, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Image, Dimensions, Alert, BackHandler, TouchableOpacity } from 'react-native';
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
interface BallysLoginState {
    PlayerID: string;
    PIN: string;
    Token?: string;
    showError: boolean;
    isLoading: boolean;
    Method: string;
    showApiError: boolean;
    showApiErrorMsg: string;
    showApiInfo: boolean;
    showApiInfoMsg: string;
    showOtpMsg: boolean;
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
            showOtpMsg: true,
        }


    }

    componentDidMount(): void {
        this.setState({ PlayerID: 'BM69328', PIN: '1234' });
        //      BackHandler.addEventListener('hardwareBackPress', () => true);
    }


    getOtp() {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw: string = JSON.stringify({
            strMID: this.state.PlayerID,
            strClientID: '',
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch(Domain + '/api/Ballys/GetOTP', requestOptions)
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                console.log(result);
                if (result.strRturnRes) {

                    this.setState({
                        isLoading: false,
                        showOtpMsg: true,
                    });

                } else {
                    this.setState({
                        isLoading: false,
                        showApiError: true,
                        showApiErrorMsg: 'Please try again'
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    isLoading: false,
                    showApiError: true,
                    showApiErrorMsg: 'Error in Login'
                });
            });

        //    this.handleNavigate();
    }

    handleNavigate = () => {
        const { navigation } = this.props; // Destructure navigation prop
        navigation.navigate('Home');
        this.setState({ isLoading: false });
    };

    Login() {
        this.setState({ showError: false, isLoading: true }, () => {


            if (this.state.PlayerID === '') {
                this.setState({ showError: true, isLoading: false });
            }

            if (this.state.PIN === '') {
                this.setState({ showError: true, isLoading: false });
            }

            console.log(!this.state.showError, this.state.PlayerID !== '', this.state.PIN !== '');


            if (!this.state.showError && (this.state.PlayerID !== '' && this.state.PIN !== '')) {

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw: string = JSON.stringify({
                    strMID: this.state.PlayerID,
                    strPIN: this.state.PIN,
                    strToken: this.state.Token,
                });

                const requestOptions: RequestInit = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };

                let method = this.state.Method === 'TEMP' ? 'CheckFirstTimeLogin' : 'CheckPIN';
                let url = Domain + '/api/Ballys/' + method;

                fetch(url, requestOptions)
                    .then((response) => {
                        return response.json();
                    })
                    .then((result) => {
                        console.log(result);
                        if (result.strRturnRes) {

                            if (this.state.Method === 'TEMP') {
                                this.handleNavigate();
                            } else {
                                this.getOtp();
                            }


                        } else {
                            this.setState({
                                isLoading: false,
                                showApiError: true,
                                showApiErrorMsg: this.state.Method === 'TEMP' ?
                                    result.strMName === '' ? result.strToken.error_description : 'Invalid Credentials, Please try again'
                                    : result.strToken.error_description
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({
                            isLoading: false,
                            showApiError: true,
                            showApiErrorMsg: 'Error in Login'
                        });
                    });
            }
        });
    }

    render(): React.ReactNode {

        return (
            <View style={{ flex: 1 }}>
                <LinearGradient
                    style={{ flex: 1 }}
                    colors={['#FF0024', '#FF6648', '#FFCE6C']}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>

                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Sign in</Text>
                        <Image
                            source={require('../images/logo.png')}
                            style={{ width: '50%', marginTop: -50 }}
                            resizeMode="contain"
                        />
                        {this.state.Method === 'TEMP' ?
                            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: -150 }}>
                                <Text style={{ color: 'white', fontSize: 14, marginTop: -70 }}>if this is your First time logging in please note</Text>
                                <Text style={{ color: 'white', fontSize: 14, }}>the passport No, you used is your Player ID #</Text>
                                <Text style={{ color: 'white', fontSize: 14, }}>and your Password is your birthday is</Text>
                                <Text style={{ color: 'white', fontSize: 14, }}>DD/MM/YY YY format</Text>
                            </View>
                            : null}
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: -150, width: '100%' }}>

                            <TextInput value={this.state.PlayerID} onChangeText={(text: string) => {
                                this.setState({ PlayerID: text });
                            }}
                                showError={this.state.PlayerID === '' && this.state.showError}
                                fieldName={this.state.Method === 'TEMP' ? 'Player ID (Passport No.)' : 'Player ID'}
                                fieldErrorMsg={'Field empty'}
                            />
                            <TextInput
                                value={this.state.PIN} onChangeText={(text: string) => {
                                    this.setState({ PIN: text });
                                }}
                                showError={this.state.PIN === '' && this.state.showError}
                                fieldName={this.state.Method === 'TEMP' ? 'PIN (Date of Birth)' : 'PIN'}
                                fieldErrorMsg={'Field empty'}
                            />

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
                    {this.state.isLoading ? (
                        <Loader />
                    ) : null}
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
                    {this.state.showOtpMsg ?
                        <OtpMsg msg={this.state.showApiInfoMsg} onPress={() => {
                            this.setState({ showApiInfo: false });
                        }} />
                        : null}
                </LinearGradient>
            </View>
        );
    }
}

//make this component available to the app
export default SigninScrenn;
