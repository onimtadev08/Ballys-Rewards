import React, { Component } from 'react';
import { BackHandler, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../components/GradientButton.tsx';
import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';
import ButtomNav from '../components/ButtomNav.tsx';
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import TopNav from '../components/TopNav.tsx';
import TextInput from '../components/TextInput';

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
    Images: string[];
    HostData: Hosts[];
    showError: string;
    PIN: string;
    RetypeNewEmail: string;
    newEmail: string;
}
interface myProps {
    navigation: any;
    router: any;
}

interface Hosts {
    M_Name: string;
    M_Mobile: string;
    M_Language: string;
    Img_Url: string;
}


class ChangeEmailScreen extends Component<myProps, myStates> {
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
            Images: [],
            HostData: [],
            showError: '',
            PIN: '',
            RetypeNewEmail: '',
            newEmail: '',
        };



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
                            <TopNav navigation={this.props.navigation} BackButton={true} titel={'CHANGE EMAIL'} />
                        </View>
                        <View style={{ marginBottom: 170 }}>
                            {/* <ScrollView style={styles.container}> */}



                            <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>

                                <Text style={{ color: 'white', fontSize: 20 }}>RESET EMAIL</Text>

                                <TextInput
                                    keyboardType={'number-pad'}
                                    value={this.state.PIN}
                                    onChangeText={(text: string) => {
                                        this.setState({ PIN: text });
                                    }}
                                    showError={this.state.PIN === '' && this.state.showError}
                                    fieldName={'Type Your Pin No.(4 digits)'}
                                    fieldErrorMsg={'Field empty'}
                                />


                                <TextInput
                                    value={this.state.newEmail}
                                    onChangeText={(text: string) => {
                                        this.setState({ newEmail: text });
                                    }}
                                    showError={this.state.newEmail === '' && this.state.showError}
                                    fieldName={'Entet New Email'}
                                    fieldErrorMsg={'Field empty'}
                                />


                                <TextInput
                                    value={this.state.RetypeNewEmail}
                                    onChangeText={(text: string) => {
                                        this.setState({ RetypeNewEmail: text });
                                    }}
                                    showError={this.state.RetypeNewEmail === '' && this.state.showError}
                                    fieldName={'Retype New Email'}
                                    fieldErrorMsg={'Field empty'}
                                />

                                <Text style={{ color: 'white', fontSize: 20 }}>YOU WILL RECEIVE A MESSAGE CONFIRMING YOUR REQUEST</Text>

                                <View style={{ margin: 20, justifyContent: 'center', width: '100%' }}>
                                    <GradientButton
                                        title="SUBMIT"
                                        onPress={() => { }}
                                        colors={['transparent', 'transparent', 'transparent']}
                                        buttonStyle={{}}
                                        textStyle={{ fontSize: 18 }} borderColor={''} />
                                </View>

                            </View>







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

export default ChangeEmailScreen;