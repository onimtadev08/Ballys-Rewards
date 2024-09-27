import React, { Component } from 'react';
import { BackHandler, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';
import ButtomNav from '../components/ButtomNav.tsx'
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import TopNav from '../components/TopNav.tsx';


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
    FloorGames: game[];
    VipGames: game[];


}
interface myProps {
    navigation: any;
    route: any;
    Page: number;
}

interface game {
    Name: string;
    MinBet: string;
    MaxBet: string;
}


class TableLimitsScreen extends Component<myProps, myStates> {
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
            FloorGames: [{
                Name: 'Baccarat',
                MinBet: '1,000',
                MaxBet: '10,000,000',
            }, {
                Name: 'Baccarat',
                MinBet: '1,000',
                MaxBet: '20,000,000',
            }, {
                Name: 'Baccarat',
                MinBet: '1,000',
                MaxBet: '30,000,000',
            }, {
                Name: 'Baccarat',
                MinBet: '1,000',
                MaxBet: '10,000,000',
            }, {
                Name: 'Baccarat',
                MinBet: '1,000',
                MaxBet: '20,000,000',
            }, {
                Name: 'Baccarat',
                MinBet: '1,000',
                MaxBet: '30,000,000',
            }, {
                Name: 'Baccarat Table Limit',
                MinBet: '2,000',
                MaxBet: '2,000,000',
            }, {
                Name: 'Baccarat Table Limit',
                MinBet: '2,000',
                MaxBet: '2,000,000',
            }, {
                Name: 'Baccarat Table Limit',
                MinBet: '2,000',
                MaxBet: '2,000,000',
            }
            ],
            VipGames: [{
                Name: 'Baccarat Table Limit',
                MinBet: '2,000',
                MaxBet: '2,000,000',
            }],

        };



    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.navigation = this.props.navigation;
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
                            <TopNav navigation={this.props.navigation} BackToHome={true} titel={'TABLE LIMITS'} />
                        </View>
                        <View style={{ marginBottom: 130, flex: 1 }}>

                            <ScrollView style={{ flex: 1 }}>


                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={[ColorFirst, 'gold', ColorFirst]}
                                    style={{ width: '100%', height: 1, alignSelf: 'center', marginBottom: 10, marginTop: 10 }} />

                                <Text style={{ width: '100%', color: 'white', fontSize: 20, textAlign: 'center' }}>GAMING FLOOR</Text>



                                <View style={{
                                    flexDirection: 'row',
                                    marginStart: 10,
                                    marginEnd: 10,
                                    padding: 10,
                                    borderRadius: 10
                                }}>
                                    <Text style={{ flex: 2, color: 'white', fontSize: 16, textAlign: 'left' }}></Text>
                                    <Text style={{ flex: 1.5, color: 'white', fontSize: 16, textAlign: 'right' }}>Min Bet{'\n'}(LKR)</Text>
                                    <Text style={{ flex: 1.5, color: 'white', fontSize: 16, textAlign: 'right' }}>Max Bet{'\n'}(LKR)</Text>
                                </View>

                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={[ColorFirst, 'gold', ColorFirst]}
                                    style={{ width: '100%', height: 1, alignSelf: 'center', marginBottom: 10, marginTop: 10 }} />

                                {this.state.FloorGames.map((item, index) => (
                                    <View style={{
                                        flexDirection: 'row',
                                        marginStart: 10,
                                        marginBottom: 5,
                                        marginTop: 5,
                                        marginEnd: 10,
                                        backgroundColor: 'rgba(0,0,0,0.4)',
                                        padding: 10,
                                        borderRadius: 10
                                    }}>
                                        <Text style={{ flex: 2, color: 'white', fontSize: 16, textAlign: 'left' }}>{item.Name}</Text>
                                        <Text style={{ flex: 1.3, color: 'white', fontSize: 16, textAlign: 'right' }}>{item.MinBet}</Text>
                                        <Text style={{ flex: 1.5, color: 'white', fontSize: 16, textAlign: 'right' }}>{item.MaxBet}</Text>
                                    </View>
                                ))}



                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={[ColorFirst, 'gold', ColorFirst]}
                                    style={{ width: '100%', height: 1, alignSelf: 'center', marginBottom: 10, marginTop: 10 }} />

                                <Text style={{ width: '100%', color: 'white', fontSize: 20, textAlign: 'center' }}>VIP AREA</Text>



                                <View style={{
                                    flexDirection: 'row',
                                    marginStart: 10,
                                    marginEnd: 10,
                                    padding: 10,
                                    borderRadius: 10
                                }}>
                                    <Text style={{ flex: 2, color: 'white', fontSize: 16, textAlign: 'left' }}></Text>
                                    <Text style={{ flex: 1.5, color: 'white', fontSize: 16, textAlign: 'right' }}>Min Bet{'\n'}(LKR)</Text>
                                    <Text style={{ flex: 1.5, color: 'white', fontSize: 16, textAlign: 'right' }}>Max Bet{'\n'}(LKR)</Text>
                                </View>

                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={[ColorFirst, 'gold', ColorFirst]}
                                    style={{ width: '100%', height: 1, alignSelf: 'center', marginBottom: 10, marginTop: 10 }} />

                                {this.state.VipGames.map((item, index) => (
                                    <View style={{
                                        flexDirection: 'row',
                                        marginStart: 10,
                                        marginBottom: 5,
                                        marginTop: 5,
                                        marginEnd: 10,
                                        backgroundColor: 'rgba(0,0,0,0.4)',
                                        padding: 10,
                                        borderRadius: 10
                                    }}>
                                        <Text style={{ flex: 2, color: 'white', fontSize: 16, textAlign: 'left' }}>{item.Name}</Text>
                                        <Text style={{ flex: 1.3, color: 'white', fontSize: 16, textAlign: 'right' }}>{item.MinBet}</Text>
                                        <Text style={{ flex: 1.5, color: 'white', fontSize: 16, textAlign: 'right' }}>{item.MaxBet}</Text>
                                    </View>
                                ))}

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

export default TableLimitsScreen;