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
const { width, height } = Dimensions.get('window');

interface BallysLoginState {
    PlayerID: string;
    PIN: string;
    Token?: string;
    showError: boolean;
    isLoading: boolean;
    Method: string;
}
interface myProps {
    Method: string;
    route: any;
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
        }


    }

    componentDidMount(): void {
        this.setState({ PlayerID: 'BM69328', PIN: '1234' });
        //      BackHandler.addEventListener('hardwareBackPress', () => true);
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

                fetch("https://api.ballyscolombo.com/api/Ballys/CheckPIN", requestOptions)
                    .then((response) => {
                        return response.json();
                    })
                    .then((result) => {
                        console.log(result);
                        if (result.strRturnRes) {
                            this.handleNavigate();
                        } else {
                            this.setState({ isLoading: false });
                            Alert.alert(
                                'ERROR in Login',
                                result.strToken.error_description,
                            );
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({ isLoading: false });
                        Alert.alert(
                            'ERROR in Login',
                            error.TypeError,
                        );

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
                                fieldName={'Player ID'}
                                fieldErrorMsg={'Field empty'}
                            />
                            <TextInput
                                value={this.state.PIN} onChangeText={(text: string) => {
                                    this.setState({ PIN: text });
                                }}
                                showError={this.state.PIN === '' && this.state.showError}
                                fieldName={'PIN'}
                                fieldErrorMsg={'Field empty'}
                            />

                            <View style={{ width: '75%', alignItems: 'center', marginTop: 40 }}>
                                <GradientButton
                                    title="SIGN IN"
                                    onPress={() => { this.Login(); }}
                                    colors={['#FF0024', '#FF0024', '#FF0024']}
                                />
                                {this.state.Method === 'TEMP' ? null :
                                    <TouchableOpacity>
                                        <Text style={{ marginTop: 20, color: 'black', fontSize: 16, borderBottomWidth: 2 }}>FORGET PASSWORD</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                    {this.state.isLoading ? (
                        <View
                            style={{
                                backgroundColor: 'black',
                                position: 'absolute',
                                width: 120,
                                height: 100,
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                top: '50%',
                                bottom: 0,
                                left: '36%',
                                borderRadius: 10,
                            }}>
                            <ActivityIndicator
                                animating={true}
                                size={'large'}
                                color={'white'}
                                style={{ top: 20 }}
                            />
                            <Text style={{ left: '18%', marginTop: 20, color: 'white' }}>
                                Please wait
                            </Text>
                        </View>
                    ) : null}
                </LinearGradient>
            </View>
        );
    }
}

//make this component available to the app
export default SigninScrenn;
