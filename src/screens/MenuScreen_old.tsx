import React from "react";
import { Image, SafeAreaView, View, TouchableOpacity, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient';
import PackageDetailsCard from '../components/PackageDetailsCard'
import MenuButton from '../components/MenuButton'
import { ColorFirst, ColorSecond, ColorTherd } from "../data/data";

interface myProps {
    navigation: any;
    route: any;
}

const { width: screenWidth } = Dimensions.get('window');


class ManuScreen extends React.PureComponent<myProps> {
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
            <View style={{ flex: 1, backgroundColor: ColorFirst }}>
                <View style={{ height: '20%' }}>
                    <Image source={require('../images/profileHader.png')} resizeMode='repeat'></Image>
                    <Text style={{ color: 'white', position: 'absolute', fontSize: 25, marginLeft: 20, marginTop: 100, fontWeight: 'bold' }}>Premier Packages</Text>
                </View>

                <SafeAreaView style={{ flex: 1 }}>
                    <LinearGradient
                        colors={[ColorFirst, ColorSecond, ColorTherd]}
                        style={styles.container}>
                        <ScrollView style={styles.container}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>

                                <MenuButton
                                    Titel={"Gaming"}
                                    Icon2="casino"
                                    onPress={(): void => {
                                        this.props.navigation.goBack();
                                    }}
                                />


                                <MenuButton
                                    Titel={"Table Limits"}
                                    Icon2="table-bar"
                                    onPress={(): void => {
                                        this.props.navigation.goBack();
                                    }}
                                />


                                <MenuButton
                                    Titel={"Responsible Gaming"}
                                    Icon="game-controller"
                                    onPress={(): void => {
                                        this.props.navigation.goBack();
                                    }}
                                />

                                <MenuButton
                                    Titel={"Term & Conditions"}
                                    Icon3="document"
                                    onPress={(): void => {
                                        this.props.navigation.goBack();
                                    }}
                                />


                                <MenuButton
                                    Titel={"My Profile"}
                                    Icon2='account-circle'
                                    onPress={(): void => {
                                        this.props.navigation.navigate('Profile', { 'PlayerID': this.props.route.params.PlayerID });
                                    }}
                                />


                                <MenuButton
                                    Titel={"Account Settings"}
                                    Icon2="manage-accounts"
                                    onPress={(): void => {
                                        this.props.navigation.goBack();
                                    }}
                                />

                                <MenuButton
                                    Titel={"Transaction History"}
                                    Icon2="work-history"
                                    onPress={(): void => {
                                        this.props.navigation.navigate('TransactionHistoryScreen', { 'PlayerID': this.props.route.params.PlayerID });
                                    }}
                                />


                                <MenuButton
                                    Titel={"Membership Benifits"}
                                    Icon2="card-membership"
                                    onPress={(): void => {
                                        this.props.navigation.goBack();
                                    }}
                                />


                                <MenuButton
                                    Titel={"Ballys Rewards & Loyalty"}
                                    Icon2="loyalty"
                                    onPress={(): void => {
                                        this.props.navigation.goBack();
                                    }}
                                />

                                <MenuButton
                                    Titel={"How to Redeem Ballys Coins"}
                                    Icon4="coins"
                                    onPress={(): void => {
                                        this.props.navigation.goBack();
                                    }}
                                />


                                <MenuButton
                                    Titel='Where to Redeem'
                                    Icon2="redeem"
                                    onPress={(): void => {
                                        this.props.navigation.goBack();
                                    }}
                                />




                            </View>
                        </ScrollView>
                    </LinearGradient>
                </SafeAreaView>
            </View >
        )
    }
}
export default ManuScreen