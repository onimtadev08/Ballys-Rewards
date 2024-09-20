import React, { Component } from 'react';
import { BackHandler, Keyboard, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';
import ButtomNav from '../components/ButtomNav.tsx'
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import TopNav from '../components/TopNav.tsx';
import { PlayerStatus, fetchUpgradeDowngradeMessage } from '../api/Api.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThousandSeparator } from '../utilitis/utilities.ts';


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
    page_title: string;
    page_description: any[];
    banner_img: string;
    Partners: Partner[];
    ShoppingCredit: string;
    result: any;
    UpgradeDowngradeMessage: any;


}
interface myProps {
    navigation: any;
    route: any;
    Page: number;
}

interface Partner {
    hp: string;
    Des: string;
    URL: string;
}

class RewardLoyalityScreen extends Component<myProps, myStates> {
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
            page_title: '',
            page_description: [],
            banner_img: '',
            Partners: [],
            ShoppingCredit: '0.0',
            result: [],
            UpgradeDowngradeMessage: [],
        };



    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution
        this.getPlayerStatus();
    }


    async getPlayerStatus() {
        this.setState({
            isLoading: true
        });

        try {
            const MID = await AsyncStorage.getItem('MID') as string;

            const result: any = await PlayerStatus(MID);

            if (result.strRturnRes) {

                this.getUpgradeDowngradeMessage();

                this.setState({
                    result: result,
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

            this.setState({
                isLoading: false,
                showApiError: true,
                showApiErrorMsg: 'Server Connection error',
            });
        } finally {

        }

    }
    async getUpgradeDowngradeMessage() {

        try {
            const MID = await AsyncStorage.getItem('MID') as string;

            const result: any = await fetchUpgradeDowngradeMessage(MID);


            if (result.strRturnRes) {


                this.setState({
                    isLoading: false,
                    UpgradeDowngradeMessage: result,
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

            this.setState({
                isLoading: false,
                showApiError: true,
                showApiErrorMsg: 'Server Connection error',
            });
        } finally {

        }
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
                            <TopNav navigation={this.props.navigation} titel={'REWARDS AND LOYALTY'} />
                        </View>
                        <View style={{ marginBottom: 130, flex: 1 }}>



                            <ScrollView style={{ flex: 1 }}>
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>

                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={[ColorFirst, 'gold', ColorFirst]}
                                        style={{ width: '100%', height: 1, alignSelf: 'center', marginBottom: 10, marginTop: 10 }} />


                                    <Image source={{ uri: this.state.result.strCurrentURL_1 }}
                                        style={{
                                            marginTop: 20,
                                            marginBottom: 20,
                                            height: 150,
                                            width: 200
                                        }}
                                        resizeMode='contain' />

                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={[ColorFirst, 'gold', ColorFirst]}
                                        style={{ width: '100%', height: 1, alignSelf: 'center', marginBottom: 10, marginTop: 10 }} />

                                    <Text style={{ marginBottom: 10, marginTop: 10, color: 'gold', fontSize: 18, textAlign: 'center', marginStart: 20, marginEnd: 20, fontWeight: 'bold' }}>REWARDS {ThousandSeparator(this.state.UpgradeDowngradeMessage.CurrentRewards)}</Text>

                                    <Text style={{ marginBottom: 10, marginTop: 10, color: 'white', fontSize: 18, textAlign: 'center', marginStart: 20, marginEnd: 20 }}>{this.state.UpgradeDowngradeMessage.strMsg}</Text>

                                    <LinearGradient
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                        colors={[ColorFirst, 'gold', ColorFirst]}
                                        style={{ width: '100%', height: 1, alignSelf: 'center', marginBottom: 10, marginTop: 10 }} />


                                </View>
                            </ScrollView>

                        </View>
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

export default RewardLoyalityScreen;

