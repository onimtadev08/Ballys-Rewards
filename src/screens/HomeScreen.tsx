import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using a class-based navigation solution
import CardView from 'react-native-cardview';
import LinearGradient from 'react-native-linear-gradient';
import MainMenuButton from '../components/MainManuButton'

const { width: screenWidth } = Dimensions.get('window');

const images = [
    require('../images/ballys.png'),
    require('../images/wha.jpg'),
    require('../images/meg.jpg'),
    require('../images/sms.jpg'),
    require('../images/pon.jpg'),
    // Add more local image paths as needed
];
interface myStates {
    currentIndex: number;
}
class HomeScreen extends Component<{}, myStates> {
    // Assuming navigation is passed as a prop

    navigation: any;
    scrollRef: React.RefObject<ScrollView>

    constructor(props: any) {
        super(props)
        this.scrollRef = React.createRef<ScrollView>();
        this.state = {
            currentIndex: 0,
        };

    }
    // Fetches navigation reference and sets up interval on mount
    componentDidMount() {
        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution

        const interval = setInterval(() => {
            const nextIndex = (this.state.currentIndex + 1) % images.length;
            if (this.scrollRef) {
                this.scrollRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
            }
            this.setState({ currentIndex: nextIndex });
        }, 2000);

        return () => clearInterval(interval);
    }

    // Handles login button press and navigates to 'SignUp' screen
    handleLogin = () => {
        this.navigation.navigate('SignUp');
    };


    render(): React.ReactNode {

        const styles = StyleSheet.create({
            safeArea: {
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
                height: (screenWidth * 1.1) - 50,
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
                                        {images.map((image, index) => (
                                            <View key={index} style={{ width: screenWidth }}>
                                                <View style={styles.backgroundContainer}>
                                                    <Image blurRadius={6} source={image} style={styles.backdrop} />
                                                </View>

                                                <View style={styles.overlay}>
                                                    <Image style={styles.logo} source={image} />
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

                            <MainMenuButton Url={require('../images/account.png')} title={'My Account \n '} />

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
                </LinearGradient>
            </SafeAreaView>
        );
    }
}



export default HomeScreen;