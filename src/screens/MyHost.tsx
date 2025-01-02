import React, { Component } from 'react';
import { Platform, Linking, Image, FlatList, Text, Keyboard, BackHandler, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons'


import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';

import ButtomNav from '../components/ButtomNav.tsx';
import { getHostApi } from '../api/Api.tsx';

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
    Images: string[];
    HostData: Hosts[];
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


class MyHost extends Component<myProps, myStates> {
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
        };



    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution
        this.getHost();
    }

    handleBackPress
        = () => {
            return true;
        };

    async getHost() {

        this.setState({ isLoading: true });
        try {


            const result: any = await getHostApi();

            if (result.strRturnRes) {

                console.log(result.data);

                this.setState({
                    isLoading: false,
                    HostData: result.data,
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

    renderItem = ({ item }: { item: Hosts }) => {
        return (
            <View style={{ alignItems: 'center', margin: 10, marginBottom: 20 }}>
                <Image source={{ uri: item.Img_Url }} style={{ height: 200, width: 200, borderColor: 'gold', borderWidth: 3, borderRadius: 20 }}></Image>
                <Text style={{ color: 'white', marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>{item.M_Name}</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{item.M_Language}</Text>
                <Text style={{ color: 'white', marginBottom: 10, fontSize: 20 }}>MOBILE : {item.M_Mobile.split("/", 2)[0]}</Text>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginEnd: 10, marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL('whatsapp://send?text=&phone={' + item.M_Mobile.split("/", 2)[0] + '}');
                            }}
                        >
                            <Ionicons name='logo-whatsapp' size={40} color={'white'} style={{ margin: 10 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginStart: 10, marginTop: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL('tel:${' + item.M_Mobile.split("/", 2)[0] + '}');
                            }}
                        >
                            <Ionicons name='call-outline' size={40} color={'white'} style={{ margin: 10 }} />
                        </TouchableOpacity>
                    </View>

                </View>

                <Text style={{ textAlign: 'center', color: 'white', marginBottom: 10, marginTop: 20, fontSize: 20 }}>24 HOURS HOTLINE{'\n'}{item.M_Mobile.split("/", 2)[1]}</Text>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <View style={{ backgroundColor: 'red', borderRadius: 50, alignItems: 'center', marginEnd: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL('whatsapp://send?text=&phone={' + item.M_Mobile.split("/", 2)[1] + '}');
                            }}
                        >
                            <Ionicons name='logo-whatsapp' size={30} color={'white'} style={{ margin: 10 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ backgroundColor: 'red', borderRadius: 50, alignItems: 'center', marginStart: 10 }}>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL('tel:${' + item.M_Mobile.split("/", 2)[1] + '}');
                            }}
                        >
                            <Ionicons name='call-outline' size={30} color={'white'} style={{ margin: 10 }} />
                        </TouchableOpacity>
                    </View>

                </View>


                {/* <View style={{ borderWidth: 2, borderColor: 'white', width: '90%', marginTop: 20 }} /> */}
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
                            <TopNav navigation={this.props.navigation} BackButton={true} titel={'MY HOST'} />
                        </View>
                        <View style={{ marginBottom: Platform.OS === 'ios' ? 110 : 150, flex: 1 }}>
                            {/* <ScrollView style={styles.container}> */}

                            <FlatList
                                data={this.state.HostData}
                                renderItem={this.renderItem} />
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

export default MyHost;