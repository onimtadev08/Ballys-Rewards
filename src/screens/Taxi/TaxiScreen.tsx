import React, { Component } from 'react';
import {
    BackHandler,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SuccsessMsg from '../../components/SuccsessMsg.tsx';
import InfoMsg from '../../components/InfoMsg.tsx';
import ErrorMsg from '../../components/errorMsg.tsx';
import Loader from '../../components/Loader.tsx';
import ButtomNav from '../../components/ButtomNav.tsx';
import { ColorFirst, ColorSecond, ColorTherd } from '../../data/data.tsx';
import TopNav from '../../components/TopNav.tsx';
import AntDesign from 'react-native-vector-icons/AntDesign.js';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddressSearch from '../../components/AddressSearch.tsx';
import {
    getAddressFromCoordinates,
    getDirections,
    getDistanceAndDuration,
} from '../../api/MapApi.tsx';
import { CommonRequestPayload, Rows } from '../../model/model.tsx';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { LocationPermissionStatus } from '../../utilitis/utilities.ts';

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
    ShowAddressSearch: boolean;
    geoCodes: any;
    directions: any;
    dropLocation: string;
    distance: string;
    duration: string;
}
interface myProps {
    navigation: any;
    router: any;
}

class TaxiScreen extends Component<myProps, myStates> {
    // Assuming navigation is passed as a prop
    navigation: any;
    scrollRef: React.RefObject<ScrollView>;
    mapRef: any;

    constructor(props: any) {
        super(props);
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
            ShowAddressSearch: false,
            geoCodes: null,
            directions: null,
            dropLocation: 'DROP LOCATION',
            distance: '',
            duration: '',
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
                    async () => {

                        console.log('position : ', position.coords);


                        this.mapRef.current.animateToRegion({
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.0,
                            longitudeDelta: 0.007,
                        });



                        const myAddress = await getAddressFromCoordinates({
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                        }).then((res: any) => {
                            this.setState({ myAddress: res });
                        });
                    },
                );
            },
            error => {
                LocationPermissionStatus();
                console.error("Error getting location : ", error.message);
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
    }

    handleBackPress = () => {
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
            },
            card: {
                backgroundColor: '#fff',
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
                marginBottom: 20,
            },
            buttonText: {
                fontWeight: 'bold',
                color: '#000000',
                fontSize: 18,
                textAlign: 'center',
            },
            map: {
                ...StyleSheet.absoluteFillObject,
            },
            outterSqure: {
                width: 15,
                height: 15,
                borderRadius: 3,
                backgroundColor: 'transparent',
                borderColor: '#000',
                borderWidth: 3,
                alignItems: 'center',
                justifyContent: 'center',
            },
            innerSqure: {
                width: 8,
                height: 8,
                backgroundColor: '#000',
                borderRadius: 2,
            },
        });

        return (
            <LinearGradient
                colors={[ColorFirst, ColorSecond, ColorTherd]}
                style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <LinearGradient
                        colors={[ColorFirst, ColorSecond, ColorTherd]}
                        style={styles.container}>
                        <View style={{ zIndex: 10, backgroundColor: ColorFirst, alignItems: 'center', justifyContent: 'center' }}>
                            <TopNav
                                navigation={this.props.navigation}
                                BackButton={true}
                                titel={'MY TAXI'}
                            />
                        </View>

                        {/* <ScrollView style={styles.container}> */}

                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{ flex: 2 }}>
                                <View style={{ width: '100%', height: '100%' }}>


                                    {this.state.distance !== '' ?

                                        <View
                                            style={{
                                                zIndex: 1,
                                                position: 'absolute',
                                                width: '100%',
                                                alignItems: 'center'
                                            }}>
                                            <View
                                                style={{
                                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                                    width: '95%',
                                                    height: '100%',
                                                    flexDirection: 'row',
                                                    marginTop: 5,
                                                    borderRadius: 5,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <Text style={{ color: 'white', flex: 1, marginTop: 5, marginBottom: 5, marginStart: 5, fontWeight: 'bold' }}>
                                                    Distance : {this.state.distance}
                                                </Text>
                                                <Text style={{ color: 'white', flex: 1, marginTop: 5, marginBottom: 5, fontWeight: 'bold' }}>
                                                    Duration : {this.state.duration}
                                                </Text>
                                            </View>
                                        </View>

                                        : null}



                                    <MapView
                                        ref={this.mapRef}
                                        zoomEnabled={true}
                                        //        zoomControlEnabled={true}
                                        zoomTapEnabled={true}
                                        onRegionChange={(region, description) => { }}
                                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                        style={styles.map}
                                        showsCompass={true}
                                        showsUserLocation={true}
                                        showsMyLocationButton={true}
                                        onUserLocationChange={(data) => {
                                            //  console.log(data);
                                        }}
                                        mapType="standard">
                                        {this.state.directions ?
                                            <Polyline
                                                coordinates={this.state.directions}
                                                strokeWidth={3}
                                                strokeColors={['black']}
                                            />
                                            : null}
                                        <Marker
                                            anchor={{ x: 0.5, y: 0.5 }}
                                            coordinate={{
                                                latitude: this.state.latitude,
                                                longitude: this.state.longitude,
                                            }}>
                                            <FontAwesome5Icon
                                                name="dot-circle"
                                                color={'#000'}
                                                solid
                                                size={15}
                                            />
                                        </Marker>

                                        {this.state.geoCodes ? (
                                            <Marker
                                                anchor={{ x: 0.5, y: 0.5 }}
                                                coordinate={{
                                                    latitude: this.state.geoCodes.geometry.location.lat,
                                                    longitude: this.state.geoCodes.geometry.location.lng,
                                                }}>
                                                <FontAwesome5Icon
                                                    name="dot-circle"
                                                    color={'#000'}
                                                    solid
                                                    size={15}
                                                />
                                            </Marker>
                                        ) : null}
                                    </MapView>
                                </View>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: ColorTherd,
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={[
                                        styles.card,
                                        {
                                            width: '85%',
                                            height: '50%',
                                            alignItems: 'center',
                                            backgroundColor: 'white',
                                            top: -80,
                                            flexDirection: 'column',
                                        },
                                    ]}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            width: '90%',
                                            marginTop: 10,
                                            marginBottom: 10,
                                            alignItems: 'center',
                                        }}>
                                        <TouchableOpacity
                                            style={{
                                                alignItems: 'flex-end',
                                                justifyContent: 'flex-end',
                                                position: 'absolute',
                                                backgroundColor: 'white',
                                                borderRadius: 10,
                                                top: -70,
                                                right: -30,
                                            }}
                                            onPress={() => this.getCurrentLocation()}
                                        >
                                            <MaterialIcons
                                                style={{ margin: 10 }}
                                                size={30}
                                                name="my-location"
                                            />
                                        </TouchableOpacity>

                                        <Text
                                            style={{
                                                fontSize: 18,
                                                flex: 1,
                                                color: 'blue',
                                                textAlign: 'center',
                                            }}>
                                            PICK UP
                                        </Text>
                                        <Text style={{ fontSize: 12, flex: 2, textAlign: 'center' }}>
                                            {this.state.myAddress}
                                        </Text>
                                        <AntDesign
                                            style={{}}
                                            name="plus"
                                            size={30}
                                            color={'black'}
                                        />
                                    </View>

                                    <View
                                        style={{ width: '80%', height: 1, backgroundColor: 'gray' }}
                                    />

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            width: '90%',
                                            marginTop: 10,
                                            marginBottom: 10,
                                            alignItems: 'center',
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                flex: 1,
                                                color: 'red',
                                                textAlign: 'center',
                                            }}>
                                            DROP
                                        </Text>
                                        <Text style={{ fontSize: 12, flex: 2, textAlign: 'center' }}>
                                            {this.state.dropLocation}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ ShowAddressSearch: true, distance: '', duration: '' });
                                            }}>
                                            <AntDesign
                                                style={{}}
                                                name="plus"
                                                size={30}
                                                color={'black'}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        top: -80,
                                        height: '20%',
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <TouchableOpacity
                                        style={{
                                            height: 55,
                                            width: '100%',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => {
                                            this.props.navigation.navigate('TaxiDetailsScreen');
                                        }}>
                                        <Image
                                            source={require('../../images/svgtopng/Button.png')}
                                            style={{ width: '100%', height: '100%' }}
                                            resizeMode="contain"
                                        />
                                        <Text
                                            style={{
                                                position: 'absolute',
                                                textAlign: 'center',
                                                width: '100%',
                                                fontSize: 20,
                                            }}>
                                            BOOK NOW
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {this.state.ShowAddressSearch ? (
                            <AddressSearch
                                onLocationSelect={geoCodes => {
                                    this.setState(
                                        {
                                            ShowAddressSearch: false,
                                            geoCodes: geoCodes,
                                            dropLocation: geoCodes.formatted_address,
                                        },
                                        () => {
                                            const dirextion: CommonRequestPayload = {
                                                origins: {
                                                    lat: this.state.latitude,
                                                    lng: this.state.longitude,
                                                },
                                                destination: {
                                                    lat: this.state.geoCodes.geometry.location.lat,
                                                    lng: this.state.geoCodes.geometry.location.lng,
                                                },
                                            };

                                            getDirections(dirextion).then(directions => {
                                                this.setState({ directions: directions }, () => {
                                                    getDistanceAndDuration(dirextion).then(
                                                        (distance: Rows[]) => {
                                                            this.setState({
                                                                distance: distance[0].elements[0].distance.text,
                                                                duration: distance[0].elements[0].duration.text,
                                                            });
                                                        },
                                                    );

                                                    this.mapRef.current.fitToCoordinates(directions, {
                                                        animated: true,
                                                        edgePadding: {
                                                            top: 50,
                                                            right: 10,
                                                            bottom: 100,
                                                            left: 10,
                                                        },
                                                    });
                                                });
                                            });
                                        },
                                    );
                                }}
                            />
                        ) : null}

                        {this.state.showApiSuccsess ? (
                            <SuccsessMsg
                                msg={this.state.showApiSuccsessMsg}
                                onPress={() => {
                                    this.setState({ showApiSuccsess: false });
                                }}
                            />
                        ) : null}
                        {this.state.showApiError ? (
                            <ErrorMsg
                                msg={this.state.showApiErrorMsg}
                                onPress={() => {
                                    this.setState({ showApiError: false });
                                }}
                            />
                        ) : null}
                        {this.state.showApiInfo ? (
                            <InfoMsg
                                msg={this.state.showApiInfoMsg}
                                onPress={() => {
                                    this.setState({ showApiInfo: false });
                                }}
                            />
                        ) : null}
                        {this.state.isLoading ? <Loader /> : null}
                        <View
                            style={{
                                zIndex: 1,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                height: '15%',
                                backgroundColor: ColorTherd,
                            }}>
                            <ButtomNav navigation={this.props.navigation}></ButtomNav>
                        </View>
                    </LinearGradient>
                </SafeAreaView>
            </LinearGradient>
        );
    }
}

export default TaxiScreen;
