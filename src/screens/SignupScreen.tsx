//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Keyboard } from 'react-native';
import { Checkbox } from 'react-native-paper';
import TextInput from '../components/TextInput';
import LinearGradient from 'react-native-linear-gradient';
import GradientButtonWithBorder from '../components/GradientButton';
import GradientButton from '../components/GradientButtonfull';
import { useNavigation } from '@react-navigation/native';
import { CameraOptions, launchCamera } from 'react-native-image-picker';
import ErrorMsg from '../components/errorMsg';
import Loader from '../components/Loader';
import { permissionStatus } from '../utilitis/utilities';
import { Domain } from '../data/data';
import SuccsessMsg from '../components/SuccsessMsg';
import OtpMsg from '../components/OtpMsg';
import { FirstTimeSignIn, getOtp, VaidateOTP } from '../api/Api';
import MyDatePicker from '../components/MyDatePicker';
import { CountryItem, CountryPicker } from "react-native-country-codes-picker";
import { getBase64ImageFromUrl } from '../utilitis/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign'
// import ImagePicker from 'react-native-image-picker';

const { width, height } = Dimensions.get('window');
interface BallysLoginState {
    PlayerID: string;
    PIN: string;
    fname: string;
    lname: string;
    mnumber: string;
    email: string;
    Token?: string;
    showError: boolean;
    isLoading: boolean;
    checked: boolean;
    selectedImage: any;
    showApiError: boolean;
    showApiErrorMsg: string;
    showApiSuccsess: boolean;
    showApiSuccsessMsg: string;
    showOtpMsg: boolean;
    showApiInfo: string;
    openDatePicker: boolean;
    TempPIN: Date;
    VerfyOtp: string;
    CountryCode: string;
    CountryPicker: boolean;
    ShowCountryCode: string;
    base64Image: string;
}
interface myProps {
    navigation: any;
}
// create a component
class SignupScreen extends React.PureComponent<myProps, BallysLoginState> {

    constructor(props: any) {
        super(props);
        this.state = {
            PlayerID: '',
            PIN: '',
            lname: '',
            fname: '',
            email: '',
            mnumber: '',
            Token: '',
            showError: false,
            isLoading: false,
            checked: false,
            selectedImage: '',
            showApiError: false,
            showApiErrorMsg: '',
            showApiSuccsess: false,
            showApiSuccsessMsg: '',
            showApiInfo: '',
            showOtpMsg: false,
            openDatePicker: false,
            TempPIN: new Date(),
            VerfyOtp: '',
            CountryCode: '+94',
            CountryPicker: false,
            ShowCountryCode: '🇱🇰 LK +94',
            base64Image: '',

        }

        console.log(props.route.params);

    }

    async componentDidMount() {
        await permissionStatus();
    }

    handleCameraLaunch = () => {
        const options: CameraOptions = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, this.handleResponse);
    };

    handleResponse = (response: any) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('Image picker error: ', response.error);
        } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;

            getBase64ImageFromUrl(imageUri)
                .then(result => {
                    this.setState({ selectedImage: imageUri, base64Image: result });
                })
                .catch(err => console.error(err));

        }
    };

    handleNavigate = () => {
        const { navigation } = this.props; // Destructure navigation prop
        navigation.navigate('Home',
            { 'PlayerID': this.state.PlayerID }
        );

        this.setState({ isLoading: false });
    };

    VaidateOTP = async (otp: string) => {
        this.setState({ isLoading: true });
        try {
            const result = await VaidateOTP(this.state.PlayerID, otp);
            console.log(result);
            if (result.strRturnRes) {

                if (result.strToken.access_token !== undefined) {
                    AsyncStorage.setItem('Token', result.strToken.access_token);
                }

                AsyncStorage.setItem('MID', this.state.PlayerID);

                this.setState({
                    isLoading: false,
                    showOtpMsg: true,
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

    handleLogin = async () => {


        var tempShowError = false;

        if (this.state.fname === '') {
            tempShowError = true;
        }

        if (this.state.lname === '') {
            tempShowError = true;
        }

        if (this.state.mnumber === '') {
            tempShowError = true;
        }

        if (this.state.email === '') {
            tempShowError = true;
        }

        if (this.state.PlayerID === '') {
            tempShowError = true;
        }

        if (this.state.PIN === '') {
            tempShowError = true;
        }

        if (this.state.base64Image === '') {
            tempShowError = true;
        }

        this.setState({ showError: tempShowError });

        if (!tempShowError && this.state.checked) {

            this.setState({ showError: false, isLoading: true });


            try {

                const result: any = await FirstTimeSignIn(
                    this.state.fname,
                    this.state.lname,
                    this.state.CountryCode + '' + this.state.mnumber,
                    this.state.email,
                    this.state.PlayerID,
                    this.state.PIN,
                    this.state.base64Image,
                );

                if (result.strRturnRes) {

                    this.setState({
                        isLoading: false,
                        showApiSuccsess: true,
                        showApiSuccsessMsg: 'Sign Up Succsess'
                    });

                } else {
                    this.setState({
                        isLoading: false,
                        showApiError: true,
                        showApiErrorMsg: 'Sign Up Fail',
                    });
                }

            } catch (error) {
                console.log(error);
                this.setState({
                    isLoading: false,
                    showApiError: true,
                    showApiErrorMsg: 'Error in Sign Up'
                });
            } finally {

            }

        } else {
            if (!this.state.checked) {
                this.setState({
                    showApiError: true,
                    showApiErrorMsg: 'Please Agree to the Terms & Conditions'
                });
            }
        }

    };


    // getOtp() {


    getOtp = async () => {
        this.setState({ isLoading: true });
        try {
            const result = await getOtp(this.state.PlayerID, '');
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
        } catch (error) {
            console.log(error);
            this.setState({
                isLoading: false,
                showApiError: true,
                showApiErrorMsg: 'Error in Login'
            });
        } finally {

        }
    };



    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     const raw: string = JSON.stringify({
    //         strMID: this.state.PlayerID,
    //         strClientID: '',
    //     });

    //     const requestOptions: RequestInit = {
    //         method: "POST",
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: "follow",
    //     };

    //     fetch(Domain + '/api/Ballys/GetOTP', requestOptions)
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((result) => {
    //             console.log(result);
    //             if (result.strRturnRes) {

    //                 this.setState({
    //                     isLoading: false,
    //                     showOtpMsg: true,
    //                 });

    //             } else {
    //                 this.setState({
    //                     isLoading: false,
    //                     showApiError: true,
    //                     showApiErrorMsg: 'Please try again'
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             this.setState({
    //                 isLoading: false,
    //                 showApiError: true,
    //                 showApiErrorMsg: 'Error in Login'
    //             });
    //         });

    //     //    this.handleNavigate();
    // }

    refresh({ Img, ImgApi }: { Img: string, ImgApi: string }) {
        console.log("ININI", Img);

        this.setState({ selectedImage: Img, base64Image: ImgApi })
    }

    render(): React.ReactNode {

        return (
            <LinearGradient
                style={{ flex: 1 }}
                colors={['#FF0024', '#FF6648', '#FFCE6C']}>
                <ScrollView >
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ alignItems: 'center', marginBottom: 20 }} >

                            <Text style={{ marginTop: 50, color: 'white', fontSize: 20, fontWeight: '500' }}>Sign Up</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    //      this.handleCameraLaunch();
                                    // this.props.navigation.navigate('EyeDetectScreen', { "aa": '' });
                                    this.props.navigation.navigate('EyeDetectScreen', {
                                        onGoBack: (value: { Img: string, ImgApi: string }) => this.refresh({ Img: value.Img, ImgApi: value.ImgApi }),
                                    });
                                }}
                            >
                                <Image source={this.state.selectedImage === '' ? require('../images/user.png') : { uri: this.state.selectedImage }} resizeMode='cover' style={{ width: 200, height: 200, borderRadius: 100, marginTop: 30 }} />
                            </TouchableOpacity>

                            <TextInput
                                value={this.state.fname} onChangeText={(text: string) => {
                                    this.setState({ fname: text });
                                }}
                                showError={this.state.fname === '' && this.state.showError}
                                fieldName={'First Name'}
                                fieldErrorMsg={'Field empty'}
                            />

                            <TextInput
                                value={this.state.lname} onChangeText={(text: string) => {
                                    this.setState({ lname: text });
                                }}
                                showError={this.state.lname === '' && this.state.showError}
                                fieldName={'Last Name'}
                                fieldErrorMsg={'Field empty'}
                            />

                            <View style={{ flexDirection: 'row', height: 100, marginRight: 10, marginLeft: 12, marginBottom: -25 }}>
                                <TouchableOpacity
                                    style={{ flex: 0.6 }}
                                    onPress={() => {
                                        console.log('kk');

                                        this.setState({ CountryPicker: true });
                                    }}
                                >
                                    <View pointerEvents='none'>
                                        <TextInput
                                            editable={false}
                                            value={this.state.ShowCountryCode}
                                            showError={this.state.mnumber === '' && this.state.showError}
                                            fieldName={'Country Code'}
                                            fieldErrorMsg={'Field empty'}
                                        />

                                        <CountryPicker
                                            style={{
                                                modal: {
                                                    height: 350,
                                                    minHeight: 350,
                                                }
                                            }}
                                            initialState='+94'
                                            show={this.state.CountryPicker}
                                            pickerButtonOnPress={(item: CountryItem) => {
                                                console.log(item.flag);

                                                this.setState({
                                                    ShowCountryCode: item.flag + ' ' + item.code + ' ' + item.dial_code,
                                                    CountryCode: item.dial_code
                                                });
                                                this.setState({ CountryPicker: false });
                                            }}
                                            lang={'en'} />
                                    </View>
                                </TouchableOpacity>

                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        value={this.state.mnumber} onChangeText={(text: string) => {
                                            this.setState({ mnumber: text });
                                        }}
                                        showError={this.state.mnumber === '' && this.state.showError}
                                        fieldName={'Mobile Number'}
                                        fieldErrorMsg={'Field empty'}
                                        keyboardType='phone-pad'
                                    />
                                </View>
                            </View>



                            <TextInput
                                value={this.state.email} onChangeText={(text: string) => {
                                    this.setState({ email: text });
                                }}
                                showError={this.state.email === '' && this.state.showError}
                                fieldName={'Email'}
                                fieldErrorMsg={'Field empty'}
                                keyboardType='email-address'
                            />

                            <TextInput
                                value={this.state.PlayerID} onChangeText={(text: string) => {
                                    this.setState({ PlayerID: text });
                                }}
                                showError={this.state.PlayerID === '' && this.state.showError}
                                fieldName={'Passport No (Member ID)'}
                                fieldErrorMsg={'Field empty'}
                            />

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
                                    value={this.state.PIN} onChangeText={(text: string) => {
                                        this.setState({ PIN: text });
                                    }}
                                    showError={this.state.PIN === '' && this.state.showError}
                                    fieldName={'Date Of Birth (DD/MM/YYYY -Pin No.)'}
                                    fieldErrorMsg={'Field empty'}
                                />
                            </TouchableOpacity>

                            <Text style={{ color: 'red', fontWeight: '500', fontSize: 16, marginTop: 10 }}>All Above Fields are Madndatory</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ checked: !this.state.checked })
                                }} style={{ margin: 20 }}>
                                    <AntDesign name={this.state.checked ? 'checkcircle' : 'checkcircleo'} size={25} />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                                    <Text style={{ fontWeight: '500', fontSize: 16 }}>I have read and agreed to the Terms &</Text>
                                    <Text style={{ fontWeight: '500', fontSize: 16 }}>Conditions</Text>
                                </View>
                            </View>
                            <View style={{ width: '75%', marginTop: 20, marginBottom: 20 }}>
                                <GradientButton
                                    title="SIGN IN"
                                    onPress={this.handleLogin}
                                    colors={['#FF0024', '#FF0024', '#FF0024']}
                                    buttonStyle={styles.customButton}
                                    textStyle={styles.buttonText}
                                />
                            </View>
                            <Text style={{ color: 'black' }}>Sign Up and receive 2000 Bally's</Text>
                            <Text style={{ marginBottom: 30, color: 'black' }}>Rewards points</Text>
                        </View>
                    </View>
                </ScrollView>

                {this.state.showOtpMsg ?
                    <OtpMsg msg={'We have sent you OTP number, Enter the OTP you have received to continue'}
                        onPressCancel={() => {
                            this.setState({ showOtpMsg: false });
                        }} onReturnOtp={(otp: string): void => {
                            if (otp !== '') {
                                this.VaidateOTP(otp);
                            }
                        }} onResendOtp={(): void => {
                            this.getOtp();
                        }} onPressDone={(otp: string): void => {
                            console.log(otp);
                            this.setState({ showOtpMsg: false });
                        }} />
                    : null}
                {this.state.isLoading ? (
                    <Loader />
                ) : null}
                {this.state.showApiError ?
                    <ErrorMsg msg={this.state.showApiErrorMsg} onPress={() => {
                        this.setState({ showApiError: false });
                    }} />
                    : null}
                {this.state.showApiSuccsess ?
                    <SuccsessMsg msg={this.state.showApiSuccsessMsg} onPress={() => {
                        this.setState({ showApiSuccsess: false, showOtpMsg: true });
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
            </LinearGradient >

        );
    }
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
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

//make this component available to the app
export default SignupScreen;
