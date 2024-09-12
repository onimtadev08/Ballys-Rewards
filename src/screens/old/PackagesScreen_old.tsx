import React from "react";
import { Image, SafeAreaView, View, TouchableOpacity, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient';
import PackageDetailsCard from '../../components/PackageDetailsCard'

interface myStates {
    isLoading: boolean;
    showApiError: boolean;
    showApiErrorMsg: string;
    showApiInfo: boolean;
    showApiInfoMsg: string;
    showOtpMsg: boolean;
    showApiSuccsess: boolean;
    showApiSuccsessMsg: string;
}
interface myProps {
    navigation: any;
    router: any;
}

const { width: screenWidth } = Dimensions.get('window');


const PackageData = [
    {
        "Name": "SILK",
        "Buying": "US$ 8,000",
        "Discount": "10%",
        "Accormadation": "5 star, std room for room for 3 nights",
        "AirTicket": "Economy",
        "Transport": "Premier Car",
        "Service": "N/A",
        "ImgUrl": require('../images/pack_one.png'),
    },
    {
        "Name": "VINTAGE",
        "Buying": "US$ 15,000",
        "Discount": "10%",
        "Accormadation": "5 star, std room for room for 5 nights",
        "AirTicket": "Economy",
        "Transport": "Sedan",
        "Service": "N/A",
        "ImgUrl": require('../images/pack_two.png'),
    },
    {
        "Name": "ELITE",
        "Buying": "US$ 25,000",
        "Discount": "10%",
        "Accormadation": "5 star, Executive room for room for 3 nights",
        "AirTicket": "Economy of Business",
        "Transport": "MUV",
        "Service": "City Sight Seeing",
        "ImgUrl": require('../images/pack_tree.png'),
    },
    {
        "Name": "MONARCH",
        "Buying": "US$ 50,000",
        "Discount": "10% + 5%",
        "Accormadation": "5 star, Suite room for room for 3 nights",
        "AirTicket": "Business",
        "Transport": "SUV",
        "Service": "1 Day SPA Treatment",
        "ImgUrl": require('../images/pack_one.png'),
    },
    {
        "Name": "ROYAL",
        "Buying": "US$ 100,000",
        "Discount": "10% + 5%",
        "Accormadation": "5 star, Suite room for room for 5 nights",
        "AirTicket": "Business & Slik Route",
        "Transport": "VIP Luxury Limousins",
        "Service": "2 Day's SPA Treatment",
        "ImgUrl": require('../images/pack_two.png'),
    },
    {
        "Name": "EMPEROR",
        "Buying": "US$ 500,000",
        "Discount": "10% + 5%",
        "Accormadation": "5 star, Luxury Suite room for room for 5 nights",
        "AirTicket": "First Class & Silk Route",
        "Transport": "VIP Luxury Stretch Limousine",
        "Service": "2 Day's SPA Treatment Dinner @ Exclusive Restaurant + golf",
        "ImgUrl": require('../images/pack_tree.png'),
    },
];

class PackagesScreen extends React.PureComponent<myProps, myStates> {




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
            scrollView: {
                width: screenWidth,
            },
            smalText: {
                fontSize: 18,
                color: 'white',
                marginTop: 5
            }
        });


        return (
            <View style={{ flex: 1, backgroundColor: '#ff6603' }}>
                <View>
                    <Image source={require('../images/pack.png')}></Image>
                    <TouchableOpacity
                        style={{
                            marginLeft: 20,
                            marginTop: 80,
                            backgroundColor: 'white',
                            height: 50,
                            width: 50,
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                        }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                        <Entypo name="chevron-thin-left" color={'black'} size={25} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', position: 'absolute', fontSize: 25, marginLeft: 20, marginTop: 200, fontWeight: 'bold' }}>Premier Packages</Text>
                </View>

                <SafeAreaView style={{ flex: 1 }}>
                    <LinearGradient
                       colors={['#fd0925', '#ff0909', '#ff6603']}
                        style={styles.container}>
                        <ScrollView style={styles.container}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                    marginLeft: 40,
                                    marginTop: 20
                                }}>Player Benefits</Text>

                                <View style={{ marginTop: 20, marginLeft: 30 }}>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name="dot-single" size={30} color={'white'} />
                                        <Text style={styles.smalText}>Five star hotel stay</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name="dot-single" size={30} color={'white'} />
                                        <Text style={styles.smalText}>Air tickets</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name="dot-single" size={30} color={'white'} />
                                        <Text style={styles.smalText}>Chauffeur driven pickup and drop off</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name="dot-single" size={30} color={'white'} />
                                        <Text style={styles.smalText}>Buffet spread</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name="dot-single" size={30} color={'white'} />
                                        <Text style={styles.smalText}>Beverage and snacks on the gaming{'\n'}floor</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name="dot-single" size={30} color={'white'} />
                                        <Text style={styles.smalText}>Discount with Bally's membership{'\n'}card from leading stores and five{'\n'}hotels in Colombo</Text>
                                    </View>
                                </View>

                                <Text style={{
                                    color: 'white',
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                    marginLeft: 40,
                                    marginTop: 20,
                                }}>Terms and Conditions</Text>

                                <Text style={{
                                    marginLeft: 40,
                                    marginTop: 20,
                                    marginEnd: 20,
                                    fontSize: 18,
                                    color: 'white'
                                }}>Play 12 hours with an average betting of 1.5% of the package amount</Text>


                                <LinearGradient
                                    colors={['#FFCE6C', '#FF6648', '#FF0024']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        borderRadius: 10,
                                        margin: 20,
                                        alignItems: 'center',
                                        borderColor: 'black',
                                        borderWidth: 0.5
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        marginLeft: 20,
                                        marginRight: 20,
                                        marginTop: 20
                                    }}>CASH PROGRAMME FOR USD</Text>
                                    <Text style={{
                                        fontSize: 18,
                                        marginBottom: 20,
                                    }}>ROULETTE & BACCARAT ONLY</Text>
                                </LinearGradient>


                                {PackageData.map((data, index) => (
                                    <PackageDetailsCard
                                        key={index}
                                        Name={data.Name}
                                        Accommodation={data.Accormadation}
                                        AirTicket={data.AirTicket}
                                        Transportation={data.Transport}
                                        SpecialService={data.Service}
                                        Ammount={data.Buying}
                                        Precentage={data.Discount}
                                        onPress={function (): void {
                                            throw new Error("Function not implemented.");
                                        }}
                                        ImgUrl={data.ImgUrl} />

                                ))}



                            </View>
                        </ScrollView>
                    </LinearGradient>
                </SafeAreaView>
            </View >
        )
    }
}



export default PackagesScreen;