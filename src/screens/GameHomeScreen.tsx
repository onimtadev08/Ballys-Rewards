import React, { Component } from 'react';
import { BackHandler, Linking, Keyboard, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../components/GradientButton.tsx';
import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';
import ButtomNav from '../components/ButtomNav.tsx'
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import TopNav from '../components/TopNav.tsx';
import { getSinglePageDetailsApi } from '../api/Api.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainMenuButton from '../components/MainManuButton';


const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');


interface myStates {

}
interface myProps {
    navigation: any;
    route: any;
    Page: number;
}


class GameHomeScreen extends Component<myProps, myStates> {
    // Assuming navigation is passed as a prop
    navigation: any;
    scrollRef: React.RefObject<ScrollView>

    constructor(props: any) {
        super(props)
        this.scrollRef = React.createRef<ScrollView>();
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
                            <TopNav navigation={this.props.navigation} BackToHome={true} titel={'GAMING HOME'} />
                        </View>
                        <View style={{ flex: 1, marginBottom: 120 }}>




                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../images/svgtopng/L1.png')} style={{ width: 100, height: 100 }} />
                                <Text style={{
                                    marginTop: 10,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    fontSize: 14,
                                    color: 'white',
                                    fontFamily: 'SFPRODISPLAYBOLD',
                                }}>{'LUCKY SPIN'.toUpperCase()}</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                                onPress={async () => {
                                    const MID = await AsyncStorage.getItem('MID');
                                    this.props.navigation.navigate('RockertGameScreen', { 'PlayerID': MID });
                                }}
                            >
                                <Image source={require('../images/svgtopng/L2.png')} style={{ width: 100, height: 100 }} />
                                <Text style={{
                                    marginTop: 10,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    fontSize: 14,
                                    color: 'white',
                                    fontFamily: 'SFPRODISPLAYBOLD',
                                }}>{'LUCKY ROCKET'.toUpperCase()}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../images/svgtopng/L3.png')} style={{ width: 100, height: 100 }} />
                                <Text style={{
                                    marginTop: 10,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    fontSize: 14,
                                    color: 'white',
                                    fontFamily: 'SFPRODISPLAYBOLD',
                                }}>{'LUCKY PICK'.toUpperCase()}</Text>
                            </TouchableOpacity>

                            {/* <MainMenuButton Url={require('../images/svgtopng/L1.png')} title={'LUCKY GAME'}
                                        onPress={async () => {
                                            const MID = await AsyncStorage.getItem('MID');
                                            this.props.navigation.navigate('GameHomeScreen', { 'PlayerID': MID });

                                        }}
                                    /> */}



                        </View>

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

export default GameHomeScreen;