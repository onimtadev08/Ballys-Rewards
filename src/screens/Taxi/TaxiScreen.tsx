import React, { Component } from 'react';
import { BackHandler, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SuccsessMsg from '../../components/SuccsessMsg.tsx';
import InfoMsg from '../../components/InfoMsg.tsx';
import ErrorMsg from '../../components/errorMsg.tsx';
import Loader from '../../components/Loader.tsx';
import ButtomNav from '../../components/ButtomNav.tsx';
import { ColorFirst, ColorSecond, ColorTherd } from '../../data/data.tsx';
import TopNav from '../../components/TopNav.tsx';
import AntDesign from 'react-native-vector-icons/AntDesign.js'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geocoder from 'react-native-geocoder';

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
    latitude: number;
    longitude: number;
    myAddress: string;

}
interface myProps {
    navigation: any;
    router: any;
}


class TaxiScreen extends Component<myProps, myStates> {
    // Assuming navigation is passed as a prop
    navigation: any;
    scrollRef: React.RefObject<ScrollView>
    mapRef: any

    constructor(props: any) {
        super(props)
        this.scrollRef = React.createRef<ScrollView>();
        this.mapRef = React.createRef();
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
            latitude: 0,
            longitude: 0,
            myAddress: '',
        };



    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    // Fetches navigation reference and sets up interval on mount
    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.navigation = this.props.navigation;

        this.getCurrentLocation();

    }

    getCurrentLocation() {
        Geolocation.getCurrentPosition(
            position => {
                this.setState(
                    {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                    () => {

                        // Position Geocoding
                        var NY = {
                            lat: this.state.latitude,
                            lng: this.state.longitude
                        };

                        Geocoder.geocodePosition(NY).then((res: any) => {
                            console.log(res);
                            this.setState({ myAddress: res[0].formattedAddress });
                        })
                            .catch((err: any) => console.error(err))

                        this.mapRef.current.animateToRegion({
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.0,
                            longitudeDelta: 0.007,
                        });

                    },
                );
            },
            error => {
                console.error(error.message);
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
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
            },
            map: {
                ...StyleSheet.absoluteFillObject,
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
                            <TopNav navigation={this.props.navigation} BackButton={true} titel={'MY TAXI'} />
                        </View>

                        {/* <ScrollView style={styles.container}> */}

                        <View style={{ flex: 1, flexDirection: 'column' }}>

                            <View style={{ flex: 2 }}>

                                <View
                                    style={{ width: '100%', height: '100%' }}
                                >

                                    <MapView
                                        ref={this.mapRef}
                                        zoomEnabled={true}
                                        zoomControlEnabled={true}
                                        zoomTapEnabled={true}
                                        onRegionChange={(region, description) => {
                                            // console.log(region);
                                            // console.log(description);
                                        }}
                                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                        style={styles.map}
                                        showsCompass={true}
                                        showsUserLocation={true}
                                        //    showsMyLocationButton={true}
                                        mapType='standard'

                                    >
                                    </MapView>

                                </View>
                            </View>





                            <View style={{ flex: 1, backgroundColor: ColorTherd, alignItems: 'center' }}>



                                <View style={[
                                    styles.card,
                                    {
                                        width: '85%',
                                        height: '50%',
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                        top: -80,
                                        flexDirection: 'column'
                                    }]}>
                                    <View style={{ flexDirection: 'row', flex: 1, width: '90%', marginTop: 10, marginBottom: 10, alignItems: 'center' }}>

                                        <View
                                            style={{
                                                alignItems: 'flex-end',
                                                justifyContent: 'flex-end',
                                                position: 'absolute',
                                                backgroundColor: 'white',
                                                borderRadius: 10,
                                                top: -70,
                                                right: -30,
                                            }}
                                        >
                                            <MaterialIcons
                                                style={{ margin: 10 }}
                                                size={30}
                                                name="my-location"
                                                onPress={() => {
                                                    this.getCurrentLocation();
                                                }}
                                            />
                                        </View>

                                        <Text style={{ fontSize: 18, flex: 1, color: 'blue', textAlign: 'center' }}>PICK UP</Text>
                                        <Text style={{ fontSize: 18, flex: 3, textAlign: 'center' }}>{this.state.myAddress}</Text>
                                        <AntDesign style={{}} name='plus' size={30} color={'black'} />
                                    </View>

                                    <View style={{ width: '80%', height: 1, backgroundColor: 'gray' }} />

                                    <View style={{ flexDirection: 'row', flex: 1, width: '90%', marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, flex: 1, color: 'red', textAlign: 'center' }}>DROP</Text>
                                        <Text style={{ fontSize: 18, flex: 3, textAlign: 'center' }}>DROP LOCATION</Text>
                                        <AntDesign style={{}} name='plus' size={30} color={'black'} />
                                    </View>

                                </View>


                                <View style={{ top: -80, height: '20%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ height: 55, width: '100%', justifyContent: 'center' }} onPress={() => {
                                        this.props.navigation.navigate('TaxiDetailsScreen');
                                    }}>
                                        <Image source={require('../../images/svgtopng/Button.png')}
                                            style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                                        <Text style={{ position: 'absolute', textAlign: 'center', width: '100%', fontSize: 20 }}>BOOK NOW</Text>
                                    </TouchableOpacity>
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



export default TaxiScreen;