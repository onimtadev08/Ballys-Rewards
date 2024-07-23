//import liraries
import React, { Component, PureComponent } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, SafeAreaView, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { PlayerStatus } from '../api/Api';
import ErrorMsg from '../components/errorMsg';
import SuccsessMsg from '../components/SuccsessMsg';
import InfoMsg from '../components/InfoMsg';
import Loader from '../components/Loader';
import { ThousandSeparator } from '../utilitis/utilities';
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
            PlayerID: props.route.params.PlayerID,
            Images: [],
            result: {},
        };


        console.log(props);

    }

    componentDidMount(): void {
        this.getPlayerStatus();
    }




    async getPlayerStatus() {

        this.setState({ isLoading: true });
        try {
            console.log(this.state.PlayerID);
            const result: any = await PlayerStatus(this.state.PlayerID);
            console.log('val : ', result);
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
            console.log(error);
            this.setState({
                isLoading: false,
                showApiError: true,
                showApiErrorMsg: 'Server Connection error',
            });
        } finally {

        }

    }

    render(): React.ReactNode {
        return (


            <LinearGradient
                colors={['#FF0024', '#FF6648', '#FFCE6C']}
                style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={{
                        height: 100,
                        backgroundColor: '#0e0436',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color: 'white',
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


                            <View style={{ flexDirection: 'row' }}>

                                <View style={{
                                    borderRadius: 20,
                                    flex: 1,
                                    backgroundColor: '#FFCE6C',
                                    margin: 10,
                                }}>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginLeft: 16,
                                        marginTop: 10
                                    }}> Current Tier</Text>
                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginLeft: 16,
                                    }}> Points</Text>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 14,
                                        marginLeft: 20,
                                    }}>{this.state.result.CurrentExpDate}</Text>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 30,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 10,
                                        marginBottom: 10,
                                        textAlign:'right',
                                        marginRight:20,
                                    }}>{ThousandSeparator(this.state.result.CurrentRewardPoints)}</Text>

                                </View>

                                <View style={{
                                    borderRadius: 20,
                                    flex: 1,
                                    backgroundColor: '#FFCE6C',
                                    margin: 10
                                }}>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginLeft: 16,
                                        marginTop: 10
                                    }}> Last Tier</Text>
                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginLeft: 16,
                                    }}> Points</Text>


                                    <Text style={{
                                        color: 'black',
                                        fontSize: 14,
                                        marginLeft: 20,
                                    }}>{this.state.result.LastExpDate}</Text>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 30,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 10,
                                        marginBottom: 10,
                                        textAlign:'right',
                                        marginRight:20,
                                    }}>{ThousandSeparator(this.state.result.LastRewardPoints)}</Text>

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

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 10
                                    }}>Slot Points</Text>
                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                    }}>Earned</Text>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 14,
                                        marginLeft: 20,
                                    }}>{this.state.result.LastUpdateDateTime}</Text>

                                    <Text style={{
                                        textAlign: 'right',
                                        color: 'black',
                                        fontSize: 30,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 10,
                                        marginBottom: 10,
                                        marginEnd: 20,
                                    }}> {ThousandSeparator(this.state.result.TodaySlotPoints)}</Text>

                                </View>

                                <View style={{
                                    borderRadius: 20,
                                    flex: 1,
                                    backgroundColor: '#FFCE6C',
                                    margin: 10,
                                }}>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 10
                                    }}>Table Points</Text>
                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                    }}>Earned</Text>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 14,
                                        marginLeft: 20,
                                    }}>{this.state.result.LastUpdateDateTime}</Text>

                                    <Text style={{
                                        textAlign: 'right',
                                        color: 'black',
                                        fontSize: 30,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 10,
                                        marginBottom: 10,
                                        marginEnd: 20,
                                    }}> {ThousandSeparator(this.state.result.TodayTBLPoints)}</Text>

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

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 10
                                    }}>Ballys Coins</Text>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 14,
                                        marginLeft: 20,
                                    }}>{this.state.result.TodayBallysCoinsMessage}</Text>

                                    <Text style={{
                                        textAlign: 'right',
                                        color: 'black',
                                        fontSize: 30,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 10,
                                        marginBottom: 10,
                                        marginEnd: 20,
                                    }}> {ThousandSeparator(this.state.result.TodayBallysCoins)}</Text>

                                </View>

                                <View style={{
                                    borderRadius: 20,
                                    flex: 1,
                                    backgroundColor: '#FFCE6C',
                                    margin: 10,
                                }}>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 10
                                    }}>Ballys Rupees</Text>


                                    <Text style={{
                                        color: 'black',
                                        fontSize: 14,
                                        marginLeft: 20,
                                    }}>{this.state.result.TodayLKRMessage}</Text>

                                    <Text style={{
                                        textAlign: 'right',
                                        color: 'black',
                                        fontSize: 30,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginTop: 10,
                                        marginBottom: 10,
                                        marginEnd: 20,
                                    }}> {ThousandSeparator(this.state.result.TodayLKR)}</Text>

                                </View>


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
    }
});




//make this component available to the app
export default ProfileScreen;
