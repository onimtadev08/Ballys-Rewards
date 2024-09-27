import React, { Component } from 'react';
import { Platform, BackHandler, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, Text } from 'react-native';
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
    Benefits: Benefit[];


}
interface myProps {
    navigation: any;
    route: any;
    Page: number;
}

interface Benefit {
    Name: string;
    classic: boolean;
    silver: boolean;
    gold: boolean;
    platinum: boolean;
    diamond: boolean;
    infinite: boolean;
}


class MemberBenifitScreen extends Component<myProps, myStates> {
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
            Benefits: [{
                Name: 'Free - Airport Pickup and Drop',
                classic: true,
                silver: true,
                gold: true,
                platinum: true,
                diamond: true,
                infinite: true,
            }, {
                Name: 'No Commission Change on Credit Card Withdrawal',
                classic: true,
                silver: true,
                gold: true,
                platinum: true,
                diamond: true,
                infinite: true,
            }, {
                Name: 'Free WIFI and Internet facility',
                classic: true,
                silver: true,
                gold: true,
                platinum: true,
                diamond: true,
                infinite: true,
            }, {
                Name: 'Entry Into Every Super Millionaire Draw on Saturdays',
                classic: true,
                silver: true,
                gold: true,
                platinum: true,
                diamond: true,
                infinite: true,
            }, {
                Name: 'Complimentary Drinks And Refreshments At the Gaming Tables',
                classic: true,
                silver: true,
                gold: true,
                platinum: true,
                diamond: true,
                infinite: true,
            }, {
                Name: 'Complimentary Transportation From 5 star Hotels In Colombo',
                classic: false,
                silver: true,
                gold: true,
                platinum: true,
                diamond: true,
                infinite: true,
            }, {
                Name: 'Birthday offer',
                classic: false,
                silver: true,
                gold: true,
                platinum: true,
                diamond: true,
                infinite: true,
            }, {
                Name: 'Bonus Entries For Select Promotions',
                classic: false,
                silver: false,
                gold: true,
                platinum: true,
                diamond: true,
                infinite: true,
            }, {
                Name: 'Complimentary Buffet Lunch / Dinner at Bally\'s Restaurant',
                classic: false,
                silver: false,
                gold: true,
                platinum: true,
                diamond: true,
                infinite: true,
            }, {
                Name: 'VIP Transport Service',
                classic: false,
                silver: false,
                gold: false,
                platinum: false,
                diamond: true,
                infinite: true,
            }, {
                Name: 'Best Table Avaliable Top of the World',
                classic: false,
                silver: false,
                gold: false,
                platinum: false,
                diamond: true,
                infinite: true,
            }, {
                Name: 'Access to VIP Services',
                classic: false,
                silver: false,
                gold: false,
                platinum: false,
                diamond: false,
                infinite: true,
            }, {
                Name: 'Full day Transport By VVIP Luxury Limousine',
                classic: false,
                silver: false,
                gold: false,
                platinum: false,
                diamond: false,
                infinite: true,
            }, {
                Name: 'Round Trip Limo Service to Airport',
                classic: false,
                silver: false,
                gold: false,
                platinum: false,
                diamond: false,
                infinite: true,
            }
            ]
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
                            <TopNav navigation={this.props.navigation} BackToHome={true} titel={'MEMBERSHIP BENEFITS'} />
                        </View>
                        <View style={{ marginBottom: Platform.OS === 'ios' ? 110 : 150, flex: 1 }}>

                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={[ColorFirst, 'gold', ColorFirst]}
                                style={{ width: '100%', height: 1, alignSelf: 'center', marginBottom: 10, marginTop: 20 }} />


                            <View style={{ flexDirection: 'row', height: 100, alignItems: 'center' }}>

                                <Text style={{ color: 'white', marginStart: 5, flex: 1 }}>MEMBER BENEFITS</Text>

                                <View style={{ flexDirection: 'row', flex: 2, height: '100%' }}>



                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text numberOfLines={1} style={{ width: 95, textAlign: 'center', color: 'white', transform: [{ rotate: '270deg' }] }}>CLASSIC</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text numberOfLines={1} style={{ width: 95, textAlign: 'center', color: 'white', transform: [{ rotate: '270deg' }] }}>SILVER</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text numberOfLines={1} style={{ width: 95, textAlign: 'center', color: 'white', transform: [{ rotate: '270deg' }] }}>GOLD</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text numberOfLines={1} style={{ width: 95, textAlign: 'center', color: 'white', transform: [{ rotate: '270deg' }] }}>PLATINUM</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text numberOfLines={1} style={{ width: 95, textAlign: 'center', color: 'white', transform: [{ rotate: '270deg' }] }}>DIAMOND</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text numberOfLines={1} style={{ width: 95, textAlign: 'center', color: 'white', transform: [{ rotate: '270deg' }] }}>INFINITY</Text>
                                    </View>


                                    {/* <Text numberOfLines={1} style={{ color: 'white', transform: [{ rotate: '270deg' }], left: -15 }}>SILVER</Text>
                                    <Text numberOfLines={1} style={{ color: 'white', transform: [{ rotate: '270deg' }], left: -13 }}>GOLD</Text>
                                    <Text numberOfLines={1} style={{ color: 'white', transform: [{ rotate: '270deg' }], left: -23 }}>PLATINUM</Text>
                                    <Text numberOfLines={1} style={{ color: 'white', transform: [{ rotate: '270deg' }], left: -45 }}>DIAMOND</Text>
                                    <Text numberOfLines={1} style={{ color: 'white', transform: [{ rotate: '270deg' }], left: -65 }}>INFINITY</Text> */}
                                </View>

                            </View>

                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={[ColorFirst, 'gold', ColorFirst]}
                                style={{ width: '100%', height: 1, alignSelf: 'center', marginBottom: 10, marginTop: 10 }} />


                            <View style={{ flexDirection: 'row', width: '100%' }}>

                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: 'white', marginStart: 5 }}>POINT MULTIPLIER</Text>
                                </View>

                                <View style={{ flexDirection: 'row', flex: 2 }}>

                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Text numberOfLines={1} style={{ color: 'white' }}>x1</Text>
                                    </View>

                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Text numberOfLines={1} style={{ color: 'white' }}>x1</Text>
                                    </View>

                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Text numberOfLines={1} style={{ color: 'white' }}>x1.2</Text>
                                    </View>

                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Text numberOfLines={1} style={{ color: 'white' }}>x1.3</Text>
                                    </View>

                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Text numberOfLines={1} style={{ color: 'white' }}>x1.4</Text>
                                    </View>

                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <Text numberOfLines={1} style={{ color: 'white' }}>x1.5</Text>
                                    </View>



                                </View>

                            </View>

                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={[ColorFirst, 'gold', ColorFirst]}
                                style={{ width: '100%', height: 1, alignSelf: 'center', marginBottom: 10, marginTop: 10 }} />


                            <ScrollView style={{ flex: 1, marginBottom: 10 }}>

                                {this.state.Benefits.map((Benefit, index) => (

                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }} key={index}>

                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: 'white', marginStart: 5 }}>{Benefit.Name}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', flex: 2 }}>

                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text numberOfLines={1} style={{ color: 'white' }}>{Benefit.classic ? '\u2713' : null}</Text>
                                            </View>

                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text numberOfLines={1} style={{ color: 'white' }}>{Benefit.silver ? '\u2713' : null}</Text>
                                            </View>

                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text numberOfLines={1} style={{ color: 'white' }}>{Benefit.gold ? '\u2713' : null}</Text>
                                            </View>

                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text numberOfLines={1} style={{ color: 'white' }}>{Benefit.platinum ? '\u2713' : null}</Text>
                                            </View>

                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text numberOfLines={1} style={{ color: 'white' }}>{Benefit.diamond ? '\u2713' : null}</Text>
                                            </View>

                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text numberOfLines={1} style={{ color: 'white' }}>{Benefit.infinite ? '\u2713' : null}</Text>
                                            </View>

                                        </View>

                                    </View>
                                ))}

                            </ScrollView>

                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={[ColorFirst, 'gold', ColorFirst]}
                                style={{ width: '100%', height: 1, alignSelf: 'center', marginBottom: 10 }} />


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

export default MemberBenifitScreen;