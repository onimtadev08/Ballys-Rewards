import React, { Component } from 'react';
import { Platform, FlatList, BackHandler, Keyboard, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';
import ButtomNav from '../components/ButtomNav.tsx'
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import TopNav from '../components/TopNav.tsx';
import { getWhereToRedeem } from '../api/Api.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

class WhereToRedeemScreen extends Component<myProps, myStates> {
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
        };



    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution
        this.whereToRedeem();
    }


    /**
     * Fetches and processes the preferred partners data for redemption.
     *
     * @remarks
     * This function is responsible for making an API call to retrieve the preferred partners data,
     * handling the response, and updating the component's state accordingly.
     *
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async whereToRedeem(): Promise<void> {

        // Set loading state to true to display the loading indicator
        this.setState({ isLoading: true });

        try {
            // Retrieve the MID from AsyncStorage
            const MID = await AsyncStorage.getItem('MID') as string;

            // Make the API call to fetch the preferred partners data
            const result: any = await getWhereToRedeem(MID);

            // Check if the API call was successful
            if (result.strRturnRes) {

                // Log the result to the console
                console.log(result);

                // Update the component's state with the retrieved data
                this.setState({
                    isLoading: false,
                    ShoppingCredit: result.ShoppingCredit,
                    Partners: result.Locations,
                });

            } else {
                // If the API call was not successful, dismiss the keyboard and show an error message
                Keyboard.dismiss();
                this.setState({
                    isLoading: false,
                    showApiError: true,
                    showApiErrorMsg: 'Please try again'
                });
            }
        } catch (error) {
            // If there was an error during the API call, update the component's state with an error message
            this.setState({
                isLoading: false,
                showApiError: true,
                showApiErrorMsg: 'Server Connection error',
            });
        } finally {
            // This block will always execute, regardless of whether an error occurred or not
        }
    }


    handleBackPress
        = () => {
            return true;
        };


    renderItem = ({ item }: { item: Partner }) => {
        return (
            <View style={{ margin: 10, flexDirection: 'row' }}>
                <Image source={{ uri: item.URL }} style={{ height: 100, width: 100, borderColor: 'gold', borderWidth: 3, borderRadius: 20 }}></Image>

                <View style={{ flex: 1, marginStart: 10 }}>
                    <Text style={{ color: 'white', marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>{item.hp}</Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>{item.Des}</Text>
                </View>



            </View>
        );
    }


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
                            <TopNav navigation={this.props.navigation} BackToHome={true} titel={'PREFERED PARTNERS'} />
                        </View>
                        <View style={{ marginBottom: Platform.OS === 'ios' ? 110 : 150, flex: 1 }}>


                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={[ColorFirst, 'gold', ColorFirst]}
                                style={{ width: '90%', height: 1, alignSelf: 'center', marginBottom: 10, marginTop: 10 }} />


                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>POINT AVAILABLE FOR REDEEM</Text>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{this.state.ShoppingCredit}</Text>

                            <LinearGradient
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                colors={[ColorFirst, 'gold', ColorFirst]}
                                style={{ width: '90%', height: 1, alignSelf: 'center', marginTop: 10, marginBottom: 10 }} />


                            <FlatList
                                data={this.state.Partners}
                                renderItem={this.renderItem} />




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

export default WhereToRedeemScreen;