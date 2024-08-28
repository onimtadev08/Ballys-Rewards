//import liraries
import React, { Component, PureComponent } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView, Keyboard, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { PlayerStatus } from '../api/Api';
import ErrorMsg from '../components/errorMsg';
import SuccsessMsg from '../components/SuccsessMsg';
import InfoMsg from '../components/InfoMsg';
import Loader from '../components/Loader';
import { ThousandSeparator } from '../utilitis/utilities';
import GradientButton from '../components/GradientButtonfull';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainManuButton from '../components/MainManuButton';
import AwesomeButton from 'react-native-really-awesome-button';
import MyWallet from '../images/svgs/MyWallet';
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data';
import GradientButtonWithBorder from '../components/GradientButton.tsx'

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
    PlayerID: string;
    Images: Array<string>;
    result: any;
}
interface myProps {
    navigation: any;
    router: any;
}
class ProfileScreen extends PureComponent<myProps, myStates> {

    constructor(props: any) {
        super(props);
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
            PlayerID: '',
            Images: [],
            result: {
                "strDes": "SUCCESS",
                "strReturnMID": "BM 12345",
                "strMName": "BALLYS MEMBER NAME",
                "strCurr_R": "INFINITY",
                "strNext_R": "INFINITY",
                "strReturn_NextDes1": "Earn 0 Ballys points to upgrade next card level.",
                "strReturn_CurrentDes": "0",
                "strCurrentURL_1": "https://i.imgur.com/G2nHqSr.png",
                "strNextURL_1": "https://i.imgur.com/G2nHqSr.png",
                "strReturn_CurrentDes1": "Earn 0 Ballys points by May  9 2025 to maintaining Current card level.",
                "LastRewardPoints": 0,
                "LastExpDate": "Jan  1 2024",
                "CurrentExpDate": "Jan  1 2024",
                "CurrentRewardPoints": 0,
                "NextExpDate": "Jan  1 2024",
                "TodayTBLPoints": 0,
                "TodaySlotPoints": 0,
                "TodayTotalPoints": 0,
                "TodayMessage": "",
                "TodayBallysCoins": 0,
                "TodayBallysCoinsMessage": "Today Earn Points*60",
                "TodayLKR": 0,
                "TodayLKRMessage": "Today Earn Points*40",
                "LastUpdateDateTime": "Jan 1 2024  12:00AM",
                "Message": "",
                "strRturnRes": true
            },
        };

        //      this.setState({result:});



    }

    componentDidMount(): void {

        this.getPlayerStatus();
    }




    async getPlayerStatus() {

        const MID = await AsyncStorage.getItem('MID');
        this.setState({ isLoading: true, PlayerID: MID === null ? '' : MID });
        try {

            const result: any = await PlayerStatus(this.state.PlayerID);

            if (result.strRturnRes) {



                this.setState({
                    isLoading: false,
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

    render(): React.ReactNode {
        const handleLogin = (): void => {

            AsyncStorage.removeItem('Token', () => {
                this.props.navigation.navigate('SplashScreen');
            });

        }

        return (


            <LinearGradient
                colors={[ColorFirst, ColorSecond, ColorTherd]}
                style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={{
                        height: 100,
                        backgroundColor: ColorFirst,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginLeft: 20,
                            marginTop: 10,
                            marginRight: 20,
                        }}>{this.state.result.strMName}</Text>
                        <Text style={{
                            color: 'white',
                            fontSize: 18,
                            marginLeft: 20,
                            marginTop: 10
                        }}>{this.state.result.strReturnMID}</Text>
                    </View>
                    <ScrollView >
                        <View style={{ height: '100%', marginBottom: 20 }}>

                            <View style={{
                                flex: 1,
                                flexDirection: 'row', width: screenWidth, alignItems: 'center', justifyContent: 'space-around'
                            }}>



                                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent', marginTop: 10 }}>
                                    <AwesomeButton
                                        backgroundColor='transparent'
                                        raiseLevel={15}
                                        backgroundDarker='transparent'
                                        backgroundShadow='transparent'
                                        backgroundActive='transparent'
                                        width={(screenWidth / 100) * 24}
                                        height={(screenHeight / 100) * 10}
                                        onPress={async () => {
                                            const MID = await AsyncStorage.getItem('MID');

                                            this.props.navigation.navigate('MyWallet', { 'PlayerID': MID });
                                        }}
                                    >
                                        <View style={{
                                            flexDirection: 'column',
                                            backgroundColor: 'transparent',
                                            paddingBottom: 10,
                                            marginTop: 10,
                                            minWidth: '100%'
                                        }}>
                                            <MyWallet />
                                            <Text
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    fontSize: 10,
                                                    color: 'white',
                                                    fontFamily: 'SFPRODISPLAYBOLD',
                                                    marginTop: 5,
                                                }}
                                            >MY WALLET</Text>
                                        </View>
                                    </AwesomeButton>
                                </View>



                                {/* <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent', marginTop: 10 }}>
                                    <AwesomeButton
                                        backgroundColor='transparent'
                                        raiseLevel={15}
                                        backgroundDarker='transparent'
                                        backgroundShadow='transparent'
                                        backgroundActive='transparent'
                                        width={(screenWidth / 100) * 24}
                                        height={(screenHeight / 100) * 10}
                                        onPress={async () => {
                                            const MID = await AsyncStorage.getItem('MID');
                                            console.log('MID : ' + MID);
                                            this.props.navigation.navigate('MyWallet', { 'PlayerID': MID });
                                        }}
                                    >
                                        <View style={{
                                            flexDirection: 'column',
                                            backgroundColor: 'transparent',
                                            paddingBottom: 10,
                                            marginTop: 10,
                                            minWidth: '100%'
                                        }}>
                                            <MyWallet />
                                            <Text
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    fontSize: 10,
                                                    color: 'white',
                                                    fontFamily: 'SFPRODISPLAYBOLD',
                                                    marginTop: 5,
                                                }}
                                            >MY WALLET</Text>
                                        </View>
                                    </AwesomeButton>
                                </View> */}


                            </View>

                            <View style={{ flexDirection: 'row' }}>

                                <View style={{
                                    borderRadius: 20,
                                    flex: 1,
                                    backgroundColor: '#FFCE6C',
                                    margin: 10,
                                }}>

                                    <Text style={styles.cardHaderText}> Current Tier</Text>
                                    <Text style={[styles.cardHaderText, { marginTop: 0 }]}> Points</Text>

                                    <Text style={styles.cardDetailsText}>{this.state.result.CurrentExpDate}</Text>

                                    <Text style={styles.cardDetail}>{ThousandSeparator(this.state.result.CurrentRewardPoints)}</Text>

                                </View>

                                <View style={{
                                    borderRadius: 20,
                                    flex: 1,
                                    backgroundColor: '#FFCE6C',
                                    margin: 10
                                }}>

                                    <Text style={styles.cardHaderText}> Last Tier</Text>
                                    <Text style={[styles.cardHaderText, { marginTop: 0 }]}> Points</Text>


                                    <Text style={styles.cardDetailsText}>{this.state.result.LastExpDate}</Text>

                                    <Text style={styles.cardDetail}>{ThousandSeparator(this.state.result.LastRewardPoints)}</Text>

                                </View>

                            </View>

                            <View style={{
                                borderRadius: 20,
                                backgroundColor: '#FFCE6C',
                                margin: 10,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>

                                <Image source={{ uri: this.state.result.strCurrentURL_1 }}
                                    style={{
                                        marginLeft: 20,
                                        marginTop: 20,
                                        marginBottom: 20,
                                        height: 60,
                                        width: 100
                                    }}
                                    resizeMode='stretch' />

                                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                    <Text style={{
                                        color: 'black',
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 20,
                                    }}>{this.state.result.strCurr_R}</Text>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 16,
                                        marginLeft: 20,
                                        marginRight: 160,
                                        marginBottom: 20,
                                    }}>{this.state.result.strReturn_CurrentDes1}</Text>
                                </View>
                            </View>


                            <View style={{
                                borderRadius: 20,
                                margin: 10
                            }}>

                                <Text style={{
                                    color: 'white',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    marginLeft: 20,
                                    marginTop: 10
                                }}> Next Card Level</Text>

                                <View style={{
                                    borderRadius: 20,
                                    margin: 10,
                                    flexDirection: 'row'
                                }}>

                                    <Image source={{ uri: this.state.result.strNextURL_1 }}
                                        style={{
                                            marginLeft: 20,
                                            marginTop: 20,
                                            marginBottom: 20,
                                            height: 100,
                                            width: 140
                                        }}
                                        resizeMode='stretch' />

                                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <Text style={{
                                            color: 'white',
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            marginLeft: 20,
                                        }}>{this.state.result.strNext_R}</Text>

                                        <Text style={{
                                            color: 'white',
                                            fontSize: 14,
                                            marginLeft: 20,
                                            marginRight: 133,
                                        }}>{this.state.result.strReturn_NextDes1}</Text>
                                    </View>

                                </View>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    marginLeft: 20,
                                    marginTop: 10
                                }}> Today Summary</Text>
                            </View>


                            <View style={{
                                borderRadius: 20,
                                flex: 1,
                                backgroundColor: '#FFCE6C',
                                margin: 10,
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <View>
                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 10
                                    }}> Total Points Earned</Text>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 14,
                                        marginLeft: 23,
                                    }}>{this.state.result.LastUpdateDateTime}</Text>
                                </View>
                                <Text style={{
                                    width: '40%',
                                    color: 'black',
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    textAlign: 'right',
                                    marginLeft: 20,
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}> {ThousandSeparator(this.state.result.TodayTotalPoints)}</Text>

                            </View>


                            <View style={{ flexDirection: 'row' }}>

                                <View style={{
                                    borderRadius: 20,
                                    flex: 1,
                                    backgroundColor: '#FFCE6C',
                                    margin: 10,
                                }}>

                                    <Text style={styles.cardHaderText}>Slot Points</Text>
                                    <Text style={[styles.cardHaderText, { marginTop: 0 }]}>Earned</Text>

                                    <Text style={[styles.cardDetailsText, { marginLeft: 0, marginRight: 0 }]}>{this.state.result.LastUpdateDateTime}</Text>

                                    <Text style={styles.cardDetail}> {ThousandSeparator(this.state.result.TodaySlotPoints)}</Text>

                                </View>

                                <View style={{
                                    borderRadius: 20,
                                    flex: 1,
                                    backgroundColor: '#FFCE6C',
                                    margin: 10,
                                }}>

                                    <Text style={styles.cardHaderText}>Table Points</Text>
                                    <Text style={[styles.cardHaderText, { marginTop: 0 }]}>Earned</Text>

                                    <Text style={[styles.cardDetailsText, { marginLeft: 0, marginEnd: 0 }]}>{this.state.result.LastUpdateDateTime}</Text>

                                    <Text style={styles.cardDetail}> {ThousandSeparator(this.state.result.TodayTBLPoints)}</Text>

                                </View>


                            </View>

                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginLeft: 30,
                                marginTop: 10
                            }}>Points Breakdown From Total Points</Text>
                            <Text style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginLeft: 30,
                            }}>Earned Today</Text>

                            <View style={{ flexDirection: 'row' }}>

                                <View style={{
                                    borderRadius: 20,
                                    flex: 1,
                                    backgroundColor: '#FFCE6C',
                                    margin: 10,
                                }}>

                                    <Text style={styles.cardHaderText}>Ballys Coins</Text>

                                    <Text style={[styles.cardDetailsText, { marginLeft: 0, marginRight: 0 }]}>{this.state.result.TodayBallysCoinsMessage}</Text>

                                    <Text style={styles.cardDetail}> {ThousandSeparator(this.state.result.TodayBallysCoins)}</Text>

                                </View>

                                <View style={{
                                    borderRadius: 20,
                                    flex: 1,
                                    backgroundColor: '#FFCE6C',
                                    margin: 10,
                                }}>
                                    <Text style={styles.cardHaderText}>Ballys Rupees</Text>

                                    <Text style={[styles.cardDetailsText, { marginLeft: 0, marginRight: 0 }]}>{this.state.result.TodayLKRMessage}</Text>

                                    <Text style={styles.cardDetail}> {ThousandSeparator(this.state.result.TodayLKR)}</Text>

                                </View>


                            </View>

                            {/* <View style={{ width: '100%', alignItems: 'center' }}>
                                <View style={{
                                    marginTop: 20,
                                    width: '80%',
                                    alignItems: 'center'
                                }}>
                                    <GradientButton
                                        title="LOGOUT"
                                        onPress={handleLogin}
                                        colors={['#FF0024', '#FF0024', '#FF0024']}
                                        textStyle={styles.buttonText}
                                    />
                                </View>
                            </View> */}

                            <View style={{ margin: 20, justifyContent: 'center' }}>
                                <GradientButtonWithBorder
                                    title="LOGOUT"
                                    onPress={handleLogin}
                                    colors={['transparent', 'transparent', 'transparent']}
                                    buttonStyle={{}}
                                    textStyle={{}} borderColor={''} />
                            </View>

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
                </SafeAreaView>
            </LinearGradient>


        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '30%',
    },
    safeArea: {
        flex: 1
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 18,
        textAlign: 'center',
    },
    cardHaderText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 10,
        marginRight: 20,
    }, cardDetailsText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 14,
        marginLeft: 20,
        marginRight: 20,
    },
    cardDetail: {
        textAlign: 'center',
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
    }
});




//make this component available to the app
export default ProfileScreen;
