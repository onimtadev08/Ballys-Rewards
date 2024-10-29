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
    Cards: Card[];


}

interface Card {
    Name: string;
    Points: string;
    ImgUrl: string;
    Number: string;
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
            Cards: [{
                Name: 'CLASSIC',
                ImgUrl: require('../images/Cards/classic.png'),
                Points: '(0-1,499 POINTS)',
                Number: '01',
            }, {
                Name: 'SILVER',
                ImgUrl: require('../images/Cards/silver.png'),
                Points: '(1,500-4,999 POINTS)',
                Number: '02',
            }, {
                Name: 'GOLD',
                ImgUrl: require('../images/Cards/gold.png'),
                Points: '(6,000-24,999 POINTS)',
                Number: '03',
            }, {
                Name: 'PLATINUM',
                ImgUrl: require('../images/Cards/plat.png'),
                Points: '25,000-74,999 POINTS)',
                Number: '04',
            }, {
                Name: 'DIAMOND',
                ImgUrl: require('../images/Cards/diamond.png'),
                Points: '(75,000-49,999 POINTS)',
                Number: '05',
            }, {
                Name: 'INFINITY',
                ImgUrl: require('../images/Cards/infinity.png'),
                Points: '(500,000 POINTS & ABOVE)',
                Number: '06',
            }
            ],
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
                            <TopNav navigation={this.props.navigation} BackButton={true} titel={'REWARDS AND LOYALTY'} />
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


                                    {this.state.Cards.map((data, index) => (
                                        <View key={index} style={{ width: '100%' }}>

                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ marginStart: 20, backgroundColor: 'white', width: 30, height: 30, borderRadius: 30, justifyContent: 'center', marginEnd: 20 }}>
                                                    <Text style={{
                                                        color: 'black',
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                        textAlign: 'center',
                                                    }}>{data.Number}</Text>
                                                </View>
                                                <Text style={{ color: 'white', fontSize: 16, marginEnd: 20 }}>{data.Name}</Text>
                                                <Text style={{ color: 'white', fontSize: 16 }}>{data.Points}</Text>

                                            </View>
                                            <Image key={index} source={data.ImgUrl} style={{ width: '100%', height: 100, alignItems: 'center' }} resizeMode='contain' />

                                            <LinearGradient
                                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                                colors={[ColorFirst, 'gold', ColorFirst]}
                                                style={{ width: '100%', height: 1, alignSelf: 'center', marginBottom: 20, marginTop: 20 }} />


                                        </View>
                                    ))}


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

