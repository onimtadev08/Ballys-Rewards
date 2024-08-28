import React from 'react';
import { Image, SafeAreaView, View, TouchableOpacity, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import MenuButton from '../components/MenuButton'
import { ColorFirst, ColorSecond, ColorTherd } from "../data/data";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign'

interface propsData {
    navigation: any;
    onPress: () => void;
    onClose: () => void;
}

const { width: screenWidth } = Dimensions.get('window');
const { width: screenHeight } = Dimensions.get('window');


const DrawerMenu: React.FC<propsData> = ({
    navigation,
    onPress,
    onClose,
}) => {

    const styles = StyleSheet.create({

        container: {
            height: '100%',
            width: '100%',
        }
    });



    //  const Mname = await AsyncStorage.getItem('strMName');



    return (
        <View style={{ flex: 1, marginTop: 850, flexDirection: 'column' }}>

            <View style={{ height: '20%', alignItems: 'flex-end' }}>

                <Image
                    source={require('../images/profileHader.png')}
                    resizeMode='contain' style={{ height: '100%', width: '100%' }}>
                </Image>

                <Text style={{
                    color: 'white',
                    position: 'absolute',
                    width: '100%',
                    fontSize: 25,
                    marginTop: 100,
                    fontWeight: 'bold',
                    left: 30
                }}>Premier Packages</Text>

                <TouchableOpacity style={{ position: 'absolute', top: 10, end: 10 }}
                    onPress={onClose}
                >
                    <AntDesign name='closecircle' size={40} color={'#f8d888'} />
                </TouchableOpacity>

            </View>

            <SafeAreaView style={{ height: '87%', width: '80%', backgroundColor: 'blue' }}>
                <LinearGradient
                    colors={[ColorFirst, ColorSecond, ColorTherd]}
                    style={styles.container}>

                    <ScrollView style={styles.container}>
                        <View style={{ height: '100%', width: '100%', flexDirection: 'column', marginBottom: 200 }}>

                            <MenuButton
                                Titel={"Gaming"}
                                Icon2="casino"
                                onPress={(): void => {
                                    onPress();
                                }}
                            />


                            <MenuButton
                                Titel={"Table Limits"}
                                Icon2="table-bar"
                                onPress={(): void => {
                                    onPress();
                                }}
                            />


                            <MenuButton
                                Titel={"Responsible Gaming"}
                                Icon="game-controller"
                                onPress={(): void => {
                                    onPress();
                                }}
                            />

                            <MenuButton
                                Titel={"Term & Conditions"}
                                Icon3="document"
                                onPress={(): void => {
                                    onPress();
                                }}
                            />


                            <MenuButton
                                Titel={"My Profile"}
                                Icon2='account-circle'
                                onPress={async (): Promise<void> => {
                                    const MID = await AsyncStorage.getItem('MID');
                                    navigation.navigate('Profile', { 'PlayerID': MID });
                                    onPress();
                                }}
                            />


                            <MenuButton
                                Titel={"Account Settings"}
                                Icon2="manage-accounts"
                                onPress={(): void => {
                                    onPress();
                                }}
                            />

                            <MenuButton
                                Titel={"Transaction History"}
                                Icon2="work-history"
                                onPress={async (): Promise<void> => {
                                    const MID = await AsyncStorage.getItem('MID');
                                    navigation.navigate('TransactionHistoryScreen', { 'PlayerID': MID });
                                    onPress();
                                }}
                            />


                            <MenuButton
                                Titel={"Membership Benifits"}
                                Icon2="card-membership"
                                onPress={(): void => {
                                    onPress();
                                }}
                            />


                            <MenuButton
                                Titel={"Ballys Rewards & Loyalty"}
                                Icon2="loyalty"
                                onPress={(): void => {
                                    onPress();
                                }}
                            />

                            <MenuButton
                                Titel={"How to Redeem Ballys Coins"}
                                Icon4="coins"
                                onPress={(): void => {
                                    onPress();
                                }}
                            />


                            <MenuButton
                                Titel='Where to Redeem'
                                Icon2="redeem"
                                onPress={(): void => {
                                    onPress();
                                }}
                            />




                        </View>
                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>




        </View >
    );
};


export default DrawerMenu;