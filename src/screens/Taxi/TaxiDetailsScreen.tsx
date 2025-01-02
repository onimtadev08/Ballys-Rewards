import React, { Component } from 'react';
import { TextInput, Linking, BackHandler, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SuccsessMsg from '../../components/SuccsessMsg.tsx';
import InfoMsg from '../../components/InfoMsg.tsx';
import ErrorMsg from '../../components/errorMsg.tsx';
import Loader from '../../components/Loader.tsx';
import ButtomNav from '../../components/ButtomNav.tsx';
import { ColorFirst, ColorSecond, ColorTherd } from '../../data/data.tsx';
import TopNav from '../../components/TopNav.tsx';
import AntDesign from 'react-native-vector-icons/AntDesign.js';
import Ionicons from 'react-native-vector-icons/Ionicons.js';
import StarRating from 'react-native-star-rating-widget';



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
    Messages: any[];
    rating: number;
}
interface myProps {
    navigation: any;
    router: any;
}


class TaxiDetailsScreen extends Component<myProps, myStates> {
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
            Messages: [],
            rating: 0,
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


    render(): React.ReactNode {

        const styles = StyleSheet.create({
            safeArea: {
                backgroundColor: 'rgba(0,0,0,0.0)',
                flex: 1,
            },
            container: {
                flex: 1,
                width: screenWidth,
            }, card: {
                backgroundColor: '#fff',
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
                marginBottom: 20,
            }, buttonText: {
                fontWeight: 'bold',
                color: '#000000',
                fontSize: 18,
                textAlign: 'center',
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
                            <TopNav navigation={this.props.navigation} titel={'MY TAXI'} />
                        </View>

                        <ScrollView style={styles.container}>

                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>

                                <View style={[
                                    styles.card,
                                    {
                                        margin: 20,
                                        width: '85%',
                                        height: '30%',
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                        flexDirection: 'column'
                                    }]}>
                                    <View style={{ flexDirection: 'row', flex: 1, width: '90%', marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, flex: 1, color: 'blue', textAlign: 'center' }}>PICK UP</Text>
                                        <Text style={{ fontSize: 18, flex: 3, textAlign: 'center' }}>YOUR LOCATION</Text>
                                        <AntDesign style={{}} name='plus' size={30} color={'black'} />
                                    </View>

                                    <View style={{ width: '80%', height: 1, backgroundColor: 'gray' }} />

                                    <View style={{ flexDirection: 'row', flex: 1, width: '90%', marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, flex: 1, color: 'red', textAlign: 'center' }}>DROP</Text>
                                        <Text style={{ fontSize: 18, flex: 3, textAlign: 'center' }}>DROP LOCATION</Text>
                                        <AntDesign style={{}} name='plus' size={30} color={'black'} />
                                    </View>

                                </View>


                                <View style={{ borderColor: 'white', width: '90%', borderWidth: 1, marginTop: 30, borderRadius: 10, alignItems: 'center', }}>


                                    <View style={{
                                        backgroundColor: 'white',
                                        borderRadius: 10, width: '55%', height: 50, justifyContent: 'center', marginTop: -25,
                                    }}>
                                        <Text style={{
                                            color: 'black',
                                            textAlign: 'center',
                                            fontSize: 16,
                                        }}>DETAILS</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginStart: 20, marginEnd: 20 }}>

                                        <View style={{ flex: 1 }}>
                                            <Text style={{
                                                color: 'white',
                                                textAlign: 'left',
                                                marginTop: 10,
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>VEHICLE NUMBER</Text>
                                            <Text style={{
                                                color: 'white',
                                                textAlign: 'left',
                                                marginTop: 10,
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>DRIVER NAME</Text>
                                            <Text style={{
                                                color: 'white',
                                                textAlign: 'left',
                                                marginTop: 10,
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>DRIVER CONTACT</Text>
                                            <Text style={{
                                                color: 'white',
                                                textAlign: 'left',
                                                marginBottom: 10,
                                                marginTop: 10,
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>VEHICLE TYPE</Text>
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <Text style={{
                                                color: 'white',
                                                textAlign: 'left',
                                                marginTop: 10,
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>: CAA-6577</Text>
                                            <Text style={{
                                                color: 'white',
                                                textAlign: 'left',
                                                marginTop: 10,
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>: KALIPA COSTA</Text>
                                            <Text style={{
                                                color: 'white',
                                                textAlign: 'left',
                                                marginTop: 10,
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>: +94771234567</Text>
                                            <Text style={{
                                                color: 'white',
                                                textAlign: 'left',
                                                marginTop: 10,
                                                marginBottom: 10,
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>: AXIO</Text>
                                        </View>



                                    </View>

                                    <View style={{ flexDirection: "row", marginBottom: 20 }}>
                                        <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginEnd: 10, marginTop: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL('whatsapp://send?text=&phone={94774771234}');
                                                }}
                                            >
                                                <Ionicons name='logo-whatsapp' size={40} color={'white'} style={{ margin: 10 }} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginStart: 10, marginTop: 10 }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL('tel:${94774771234}');
                                                }}
                                            >
                                                <Ionicons name='call-outline' size={40} color={'white'} style={{ margin: 10 }} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                </View>


                            </View>

                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                width: '100%',
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginTop: 40,
                                marginBottom: 20,
                            }}>DRIVER RATING</Text>

                            <View style={{ alignItems: 'center' }}>
                                <StarRating
                                    enableHalfStar={false}
                                    starSize={40}
                                    rating={this.state.rating}
                                    onChange={(rating: number): void => {
                                        this.setState({ rating: rating });
                                    }} />

                                <TextInput
                                    style={{ padding: 10, borderRadius: 10, marginTop: 20, width: '80%', height: 100, backgroundColor: 'white' }}
                                    multiline={true}
                                    numberOfLines={4}
                                />

                            </View>

                            <View style={{ marginTop: 30, marginBottom: 130, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 18 }}>ANY ASSISTANCE</Text>
                                <Text style={{ marginTop: 10, color: 'white', fontSize: 20, fontWeight: 'bold' }}>MOBILE : +94774771234</Text>


                                <View style={{ flexDirection: "row", marginBottom: 20, marginTop: 20 }}>
                                    <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginEnd: 10, marginTop: 10 }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                Linking.openURL('whatsapp://send?text=&phone={94774771234}');
                                            }}
                                        >
                                            <Ionicons name='logo-whatsapp' size={40} color={'white'} style={{ margin: 10 }} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ backgroundColor: 'green', borderRadius: 50, alignItems: 'center', marginStart: 10, marginTop: 10 }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                Linking.openURL('tel:${94774771234}');
                                            }}
                                        >
                                            <Ionicons name='call-outline' size={40} color={'white'} style={{ margin: 10 }} />
                                        </TouchableOpacity>
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



export default TaxiDetailsScreen;