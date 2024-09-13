import React, { Component } from 'react';
import { BackHandler, Keyboard, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../components/GradientButton.tsx';
import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';
import ButtomNav from '../components/ButtomNav.tsx';
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import TopNav from '../components/TopNav.tsx';
import { getSinglePageDetailsApi } from '../api/Api.tsx';

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

}
interface myProps {
    navigation: any;
    route: any;
    Page: number;
}



class SinglePageDetailsScreen extends Component<myProps, myStates> {
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
        };



    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution
        this.getSinglePageDetails();
    }

    handleBackPress
        = () => {
            return true;
        };

    async getSinglePageDetails() {

        this.setState({ isLoading: true });
        try {

            const result: any = await getSinglePageDetailsApi(this.props.route.params.Page?.toString());

            if (result.message === 'success') {

                console.log(result);

                this.setState({
                    isLoading: false,
                    page_title: result.result[0].page_title,
                    page_description: result.result[0].page_description,
                    banner_img: result.result[0].banner_img,
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
                            <TopNav navigation={this.props.navigation} BackButtonNew={this.props.route.params.back ? true : false} titel={this.state.page_title.toUpperCase()} />
                        </View>
                        <View style={{ marginBottom: 130, flex: 1 }}>
                            {/* <Image source={{ uri: this.state.banner_img }} style={{ width: '100%', height: '80%' }} resizeMode='center' /> */}
                            <ScrollView style={styles.container}>

                                {this.state.page_description.map((data, index) => (
                                    <View key={index}>
                                        {data.P ? <Text style={{ color: 'white', marginBottom: 10, marginStart: 10, marginEnd: 10, fontSize: 18 }}>{data.P}</Text> : null}
                                        {data.UL ? <Text style={{ color: 'white', marginBottom: 10, marginStart: 10, marginEnd: 10, fontSize: 18 }}>{'\u25cf '}{data.UL}</Text> : null}
                                    </View>
                                ))}




                            </ScrollView>
                        </View>
                        {/* </ScrollView> */}
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

export default SinglePageDetailsScreen;