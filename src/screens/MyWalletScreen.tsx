import React from 'react';
import { Text, BackHandler, View, StyleSheet, ScrollView, Dimensions, Image, SafeAreaView, processColor } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';

import ButtomNav from '../components/ButtomNav.tsx';


import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import GradientButton from '../components/GradientButton.tsx';
import TopNav from '../components/TopNav.tsx';
const { width: screenWidth } = Dimensions.get('window');

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
    data: datas;
    legend: any;
    description: {};
    highlights: any[];
    Accounts: any[];

}

interface datas {
    dataSets: any[];
}



interface myProps {
    navigation: any;
    router: any;
}



class MyWalletScreen extends React.Component<myProps, myStates> {
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
            legend: {
                enabled: true,
                textColor: processColor('white'),
                textSize: 15,
                form: 'CIRCLE',
                horizontalAlignment: "CENTER",
                verticalAlignment: "CENTER",
                orientation: "VERTICAL",
                wordWrapEnabled: true
            },
            data: {
                dataSets: [{
                    values: [
                        { value: 45, label: 'ACCOUNT' },
                        { value: 21, label: 'FIXED DEPOSIT' }],
                    label: '',
                    config: {
                        colors: [processColor('#8CEAFF'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
                        valueTextSize: 20,
                        valueTextColor: processColor('transparent'),
                        sliceSpace: 5,
                        selectionShift: 13,
                        // xValuePosition: "OUTSIDE_SLICE",
                        // yValuePosition: "OUTSIDE_SLICE",
                        valueFormatter: "#.#'%'",
                        valueLineColor: processColor('transparent'),
                        valueLinePart1Length: 0.5
                    }
                }],
            },
            highlights: [{ x: 2 }],
            description: {
                text: 'This is Pie chart description',
                textSize: 15,
                textColor: processColor('darkgray'),

            },
            Accounts: [{
                Account: 'LKRc',
                AccountValue: '1,000,000',
                FixedDeposit: '100,000',
                Total: '1,100,000'
            }, {
                Account: 'INRc',
                AccountValue: '300,000',
                FixedDeposit: '33,000',
                Total: '333,000'
            }, {
                Account: 'USDc',
                AccountValue: '3,000',
                FixedDeposit: '300',
                Total: '33,000'
            }]
        };




    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    // Fetches navigation reference and sets up interval on mount
    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution


     
    }

    handleBackPress
        = () => {
            // Handle back button press logic here
            return true; // Prevent default back behavior
        };

   


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

                        <View style={{ zIndex: 10 }}>
                            <TopNav navigation={this.props.navigation} titel={'MY WALLET'} />
                        </View>

                        <ScrollView style={styles.container}>

                            <Text style={{
                                marginTop: 20,
                                color: 'white',
                                fontSize: 20,
                                textAlign: 'center'
                            }}>ACCOUNT SUMMARY</Text>

                            {this.state.Accounts.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <View style={{ borderWidth: 2, borderColor: 'white', marginTop: 30, marginBottom: 50, margin: 20, borderRadius: 20, alignItems: 'center' }}>

                                            <View style={{ backgroundColor: 'white', borderRadius: 10, height: 50, justifyContent: 'center', top: -20 }}>
                                                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginStart: 10, marginEnd: 10 }}>{item.Account}</Text>
                                            </View>

                                            <View style={{ top: -10, width: '70%' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: 'white', fontSize: 15 }}>{'\u25cf '}</Text>
                                                    <Text style={{ color: 'white' }}>ACCOUNT</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginStart: 10, marginEnd: 10, justifyContent: 'center', flex: 1 }}>
                                                    <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: 'white', flex: 1 }}>{item.AccountValue}</Text>
                                                    <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>{item.Account}</Text>
                                                </View>
                                            </View>


                                            <LinearGradient
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                colors={[ColorFirst, 'white', ColorFirst]}
                                                style={{ width: '100%', height: 2 }} />



                                            <View style={{ top: 15, width: '70%' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ color: 'red', fontSize: 15 }}>{'\u25cf '}</Text>
                                                    <Text style={{ color: 'white' }}>FIXED DEPOSIT</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginStart: 10, marginEnd: 10, justifyContent: 'center', flex: 1 }}>
                                                    <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: 'white', flex: 1 }}>{item.FixedDeposit}</Text>
                                                    <Text style={{ fontSize: 18, textAlign: 'center', color: 'white' }}>{item.Account}</Text>
                                                </View>
                                            </View>



                                            <View style={{ backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', bottom: -30 }}>
                                                <Text style={{ fontSize: 18, textAlign: 'center' }}>{item.Account}</Text>

                                                <View style={{ flexDirection: 'row', marginStart: 10, marginEnd: 10 }}>
                                                    <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>{item.Total}</Text>
                                                    <Text style={{ fontSize: 18, textAlign: 'center' }}>{item.Account}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                );
                            })}


                            <View style={{ top: 3 }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 20,
                                    textAlign: 'center'
                                }}>NEED A FIXED DEPOSIT ?</Text>

                                <Text style={{
                                    color: 'white',
                                    fontSize: 16,
                                    textAlign: 'center'
                                }}>WE WILL HELP YOU OPEN IT INSTANLY</Text>


                                <View style={{ margin: 20, justifyContent: 'center' }}>
                                    <GradientButton
                                        title="OPEN NOW"
                                        onPress={() => { }}
                                        colors={['transparent', 'transparent', 'transparent']}
                                        buttonStyle={{}}
                                        textStyle={{}} borderColor={''} />
                                </View>

                            </View>


                            <View style={{ marginTop: 20 }}>
                                <View style={{ borderWidth: 2, borderColor: 'white', marginTop: 30, marginBottom: 50, margin: 20, borderRadius: 20, alignItems: 'center' }}>

                                    <Image source={require('../images/svgtopng/GOLD.png')} style={{ width: 80, height: 80, top: -40 }} />
                                    <View style={{ top: -30, width: '100%', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}>BALLYS COIN</Text>

                                        <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>
                                            <Text style={{ flex: 1, color: 'white', fontSize: 18, textAlign: 'center' }}>TODAY</Text>
                                            <Text style={{ flex: 1, color: 'white', fontSize: 18, textAlign: 'center' }}>BALANCE</Text>
                                        </View>

                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={[ColorFirst, 'white', ColorFirst]}
                                            style={{ width: '100%', height: 2, top: 10 }} />

                                        <View style={{ flexDirection: 'row', flex: 1, top: 20 }}>
                                            <Text style={{ flex: 1, color: 'white', fontSize: 20, textAlign: 'center' }}>100</Text>
                                            <View style={{ backgroundColor: 'white', width: 1 }} />
                                            <Text style={{ flex: 1, color: 'white', fontSize: 20, textAlign: 'center' }}>3000</Text>
                                        </View>

                                    </View>

                                </View>
                            </View>


                            <View style={{ marginTop: 20, marginBottom: 80 }}>
                                <View style={{ borderWidth: 2, borderColor: 'white', marginTop: 30, marginBottom: 50, margin: 20, borderRadius: 20, alignItems: 'center' }}>

                                    <Image source={require('../images/svgtopng/SILVER.png')} style={{ width: 80, height: 80, top: -40 }} />
                                    <View style={{ top: -30, width: '100%', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}>BALLYS RUPEES</Text>

                                        <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>
                                            <Text style={{ flex: 1, color: 'white', fontSize: 18, textAlign: 'center' }}>TODAY</Text>
                                            <Text style={{ flex: 1, color: 'white', fontSize: 18, textAlign: 'center' }}>BALANCE</Text>
                                        </View>

                                        <LinearGradient
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            colors={[ColorFirst, 'white', ColorFirst]}
                                            style={{ width: '100%', height: 2, top: 10 }} />

                                        <View style={{ flexDirection: 'row', flex: 1, top: 20 }}>
                                            <Text style={{ flex: 1, color: 'white', fontSize: 20, textAlign: 'center' }}>100</Text>
                                            <View style={{ backgroundColor: 'white', width: 1 }} />
                                            <Text style={{ flex: 1, color: 'white', fontSize: 20, textAlign: 'center' }}>3000</Text>
                                        </View>

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
                        <View style={{
                            zIndex: 1,
                            left: 0,
                            bottom: 0,
                            right: 0
                            , position: 'absolute',
                            height: '12%',
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



export default MyWalletScreen;


