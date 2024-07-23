import React, { Component } from 'react';
import { Keyboard, BackHandler, View, Text, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using a class-based navigation solution
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';
import MainMenuButton from '../components/MainManuButton'
import SuccsessMsg from '../components/SuccsessMsg';
import ErrorMsg from '../components/errorMsg';
import InfoMsg from '../components/InfoMsg';
import Loader from '../components/Loader';
import { Home } from '../api/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window');

// const images = [
//     require('../images/ballys.png'),
//     require('../images/wha.jpg'),
//     require('../images/meg.jpg'),
//     require('../images/sms.jpg'),
//     require('../images/pon.jpg'),
//     // Add more local image paths as needed
// ];
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
    PlayerID: string;
    Images: Array<string>;
}
interface myProps {
    navigation: any;
    router: any;
}
class HomeScreen extends Component<myProps, myStates> {
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
            PlayerID: props.route.params.PlayerID,
            Images: [],
        };

        console.log(props.route.params);


    }
    // Fetches navigation reference and sets up interval on mount
    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', () => true);

        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution

        const interval = setInterval(() => {
            const nextIndex = (this.state.currentIndex + 1) % this.state.Images.length;
            if (this.scrollRef) {
                this.scrollRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
            }
            this.setState({ currentIndex: nextIndex });
        }, 2000);

        this.MainHomeLoad();

        return () => clearInterval(interval);
    }

    async MainHomeLoad() {

        this.setState({ isLoading: true });
        try {
            const result: any = await Home(this.state.PlayerID);
            console.log('val : ', result);
            if (result.strRturnRes) {

                let img = [];

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
            console.log(error);
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
            scrollView: {
                width: screenWidth,
            },
            image: {
                width: screenWidth,
                height: screenWidth * 1.1,
                resizeMode: 'cover',
            },
            backgroundContainer: {
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
            overlay: {
                opacity: 1,
                top: 60,
                right: 29,
            },
            logo: {
                margin: 20,
                resizeMode: 'contain',
                backgroundColor: 'rgba(0,0,0,0)',
                width: screenWidth,
                height: (screenWidth * 1.1) - 100,
                bottom: 60,
            },
            backdrop: {
                height: screenWidth * 1.1,
                width: screenWidth,
                resizeMode: 'cover',
            },
            headline: {
                fontSize: 18,
                textAlign: 'center',
                backgroundColor: 'black',
                color: 'white'
            }
        });

        return (
            <LinearGradient
                colors={['#FF0024', '#FF6648', '#FFCE6C']}
                style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <LinearGradient
                        colors={['#FF0024', '#FF6648', '#FFCE6C']}
                        style={styles.container}>
                        <ScrollView style={styles.container}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <CardView style={{ flex: 1, flexDirection: 'column', borderRadius: 20, margin: 10 }}
                                    cardElevation={20}
                                    cardMaxElevation={10}
                                    cornerRadius={20}>
                                    <View style={{ flexDirection: 'column', borderRadius: 10 }}>
                                        <ScrollView
                                            ref={this.scrollRef}
                                            horizontal
                                            pagingEnabled
                                            showsHorizontalScrollIndicator={false}
                                        >
                                            {this.state.Images.map((image, index) => (
                                                <View key={index} style={{ width: screenWidth }}>
                                                    <View style={styles.backgroundContainer}>
                                                        <Image blurRadius={6} source={{ uri: image }} style={styles.backdrop} />
                                                    </View>

                                                    <View style={styles.overlay}>
                                                        <Image style={styles.logo} source={{ uri: image }} />
                                                    </View>

                                                </View>
                                            ))}
                                        </ScrollView>

                                    </View>
                                </CardView>

                            </View>

                            <View style={{
                                flexDirection: 'row', width: screenWidth, alignItems: 'center', justifyContent: 'space-around'
                            }}>

                                <MainMenuButton Url={require('../images/account.png')} title={'My Account \n '}
                                    onPress={async () => {
                                        const MID = await AsyncStorage.getItem('MID');

                                        console.log('MID : ' + MID);

                                        this.navigation.navigate('Profile', { 'PlayerID': MID });

                                    }} />

                                <MainMenuButton Url={require('../images/offer.png')} title={'My Offer \n '} />

                                <MainMenuButton Url={require('../images/tournament.png')} title={'Tournament & \n Drawer'} />

                            </View>


                            <View style={{
                                flexDirection: 'row', width: screenWidth, alignItems: 'center', justifyContent: 'space-around'
                            }}>

                                <MainMenuButton Url={require('../images/dining.png')} title={'Dining'} />

                                <MainMenuButton Url={require('../images/entertainment.png')} title={'Entertainment'} />

                                <MainMenuButton Url={require('../images/onlinecasino.png')} title={'Online Casino'} />

                            </View>


                            <View style={{
                                flexDirection: 'row', width: screenWidth, alignItems: 'center', justifyContent: 'space-around'
                            }}>

                                <MainMenuButton Url={require('../images/packages.png')} title={'Packages'} />

                                <MainMenuButton Url={require('../images/rewards2.png')} title={'Rewards Circle'} />

                                <MainMenuButton Url={require('../images/contact.png')} title={'Contact Us'} />

                            </View>


                            <View style={{
                                flexDirection: 'row', width: screenWidth, alignItems: 'center', justifyContent: 'space-around'
                            }}>

                                <MainMenuButton Url={require('../images/messaging.png')} title={'Messaging\n \n '} />

                                <MainMenuButton Url={require('../images/feedback.png')} title={'Feedback &\nFollow Us \n '} />

                                <MainMenuButton Url={require('../images/myride.png')} title={'My Ride\n \n '} />

                            </View>
                        </ScrollView>
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
                </SafeAreaView>
            </LinearGradient>
        );
    }
}



export default HomeScreen;