import React, { Component } from 'react';
import { BackHandler, StyleSheet, Dimensions, View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TempLogin } from '../api/Api.tsx';
import * as Progress from 'react-native-progress';


import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import { LocationPermissionStatus } from '../utilitis/utilities.ts';


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
    indeterminate: boolean;
    progress: number;
    isLoading: boolean;
    showApiError: boolean;
    showApiErrorMsg: string;
}
interface myProps {
    navigation: any;
    router: any;
}

const scale = 0.8;
const PAGE_WIDTH = screenWidth * scale;
const PAGE_HEIGHT = 240 * scale;

class SplashScreen extends Component<myProps, myStates> {

    navigation: any;
    constructor(props: any) {
        super(props)
        this.state = {
            indeterminate: true,
            progress: 0,
            isLoading: false,
            showApiError: false,
            showApiErrorMsg: '',
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.navigation = this.props.navigation;

        // setTimeout(() => {
        //     this.CheckLogin();
        // }, 3000);
        LocationPermissionStatus();
        this.progressBar();

    }
    progressBar() {
        let interval: ReturnType<typeof setInterval>;
        const timer = setTimeout(() => {
            this.setState({ indeterminate: false });
            interval = setInterval(() => {
                this.setState(prevProgress => ({ progress: Math.min(1, prevProgress.progress + Math.random() / 5) }), () => {
                    if (this.state.progress === 1) {
                        clearTimeout(timer);
                        clearInterval(interval);
                        this.CheckLogin();
                    }
                });


            }, 100);
        }, 3000);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }

    handleBackPress
        = () => {
            return true;
        };

    CheckLogin = async () => {

        const MID = await AsyncStorage.getItem('MID') as string;
        const PIN = await AsyncStorage.getItem('PIN') as string;

        try {

            if (!MID || !PIN) {
                this.navigation.replace('Login');

            } else {

                const result = await TempLogin(MID, PIN, 'F');

                if (result.strRturnRes) {

                    AsyncStorage.setItem('Token', result.strToken.access_token);
                    AsyncStorage.setItem('MID', result.strReturnMID);
                    AsyncStorage.setItem('strMName', result.strMName);
                    AsyncStorage.setItem('PIN', PIN);




                    this.setState({
                        isLoading: false,
                    });


                    this.navigation.replace('Home', { 'PlayerID': MID });


                } else {
                    this.navigation.replace('Login');
                    this.setState({
                        isLoading: false,
                        showApiError: true,
                        showApiErrorMsg: 'Invalid Credentials, Please try again'
                    });
                }
            }
        } catch (error) {

            this.setState({
                isLoading: false,
                showApiError: true,
                showApiErrorMsg: 'Server Connection error'
            });
        } finally {

        }




    }

    render(): React.ReactNode {

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                width: screenWidth,
            },
            progress: {
                marginTop: -120,

            }
        });

        return (
            <LinearGradient
                colors={[ColorFirst, ColorSecond, ColorTherd]}
                style={styles.container} >

                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>

                    <Image
                        source={require('../images/svgtopng/blogo.png')}
                        resizeMode='contain' style={{ width: '50%', marginTop: -200 }}>
                    </Image>
                    <Progress.Bar
                        animationConfig={{ bounciness: 100 }}
                        borderColor='white'
                        width={200}
                        color={ColorTherd}
                        unfilledColor='orange'
                        style={styles.progress}
                        progress={this.state.progress}
                        indeterminate={this.state.indeterminate}
                    />
                </View>


            </LinearGradient >
        );
    }

}



export default SplashScreen;