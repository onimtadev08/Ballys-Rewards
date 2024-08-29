import React, { Component } from 'react';
import { BackHandler, StyleSheet, Dimensions, View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';



import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';


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
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.navigation = this.props.navigation;

        setTimeout(() => {
            this.CheckLogin();
        }, 3000);

    }

    handleBackPress
        = () => {
            return true;
        };

    CheckLogin = async () => {
        const Token = await AsyncStorage.getItem('Token');


        if (Token !== null && (Token !== '' && Token !== undefined)) {
            const MID = await AsyncStorage.getItem('MID');
            this.navigation.replace('Home', { 'PlayerID': MID });

        } else {
            this.navigation.replace('Login');
        }

    }

    render(): React.ReactNode {

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                width: screenWidth,
            }
        });

        return (
            <LinearGradient
                colors={[ColorFirst, ColorSecond, ColorTherd]}
                style={styles.container} >

                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>

                    <Image
                        source={require('../images/svgtopng/blogo.png')}
                        resizeMode='contain' style={{ height: '100%', width: '100%' }}>
                    </Image>

                </View>


            </LinearGradient >
        );
    }

}



export default SplashScreen;