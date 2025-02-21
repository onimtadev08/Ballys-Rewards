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
            backgroundColor: 'white',
            width: '70%',
        }
    });



    //  const Mname = await AsyncStorage.getItem('strMName');



    return (
        <View style={{ flex: 1, flexDirection: 'column', width: '100%', height: '100%' }}>

            <View style={{
                alignItems: 'flex-end',
                height: '15%',
            }}>
                <View style={{ width: '100%', height: '100%' }}>
                    <View style={{ width: '70%', height: '100%', backgroundColor: ColorFirst, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../images/svgtopng/blogo.png')}
                            resizeMode='contain'
                            style={{
                                width: '70%',
                                height: '70%'
                            }}>
                        </Image>

                        <TouchableOpacity style={{ position: 'absolute', top: 10, end: 10 }}
                            onPress={onClose}
                        >
                            <AntDesign name='closecircle' size={30} color={'#EFAE4D'} />
                        </TouchableOpacity>

                    </View>

                </View>



            </View>

            {/* <SafeAreaView style={{ height: '87%', width: '80%' ,marginTop:300}}> */}


            <ScrollView
                scrollEnabled={true}
                nestedScrollEnabled={true}
                style={styles.container}>

                <Text style={{
                    paddingStart: 40,
                    paddingTop: 20,
                    paddingBottom: 10,
                    marginBottom: 20,
                    color: '#EFAE4D',
                    fontWeight: 'bold',
                    fontSize: 20,
                    backgroundColor: ColorFirst
                }}>GENERAL</Text>

                <View style={{
                    height: '100%',
                    width: '100%',
                    flexDirection: 'column',
                    marginBottom: 100,
                }}>

                    <MenuButton
                        Titel={"Gaming"}
                        Icon2="casino"
                        onPress={async (): Promise<void> => {
                            const MID = await AsyncStorage.getItem('MID');
                            navigation.replace('GamingScreen', { 'PlayerID': MID });
                            onPress();
                        }}
                    />


                    <MenuButton
                        Titel={"Table Limits"}
                        Icon2="table-bar"
                        onPress={async (): Promise<void> => {
                            const MID = await AsyncStorage.getItem('MID');
                            navigation.replace('TableLimitsScreen', { 'PlayerID': MID });
                            onPress();
                        }}
                    />


                    <MenuButton
                        Titel={"Responsible Gaming"}
                        Icon="game-controller"
                        onPress={async (): Promise<void> => {
                            const MID = await AsyncStorage.getItem('MID');
                            navigation.replace('SinglePageDetailsScreen', { 'PlayerID': MID, 'Page': 1 });
                            onPress();

                        }}
                    />

                    <MenuButton
                        Titel={"Term & Conditions"}
                        Icon3="document"
                        onPress={async (): Promise<void> => {
                            const MID = await AsyncStorage.getItem('MID');
                            navigation.replace('SinglePageDetailsScreen', { 'PlayerID': MID, 'Page': 2 });
                            onPress();
                        }}
                    />

                    <Text style={{ paddingTop: 10, paddingBottom: 10, paddingStart: 40, marginTop: 20, marginBottom: 20, color: '#EFAE4D', fontWeight: 'bold', fontSize: 20, backgroundColor: ColorFirst }}>ACCOUNT</Text>


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
                        onPress={async (): Promise<void> => {
                            const MID = await AsyncStorage.getItem('MID');
                            navigation.navigate('AccountSettingsScreen', { 'PlayerID': MID });
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
                        onPress={async (): Promise<void> => {
                            const MID = await AsyncStorage.getItem('MID');
                            navigation.navigate('MemberBenifitScreen', { 'PlayerID': MID });
                            onPress();
                        }}
                    />


                    <MenuButton
                        Titel={"Ballys Rewards & Loyalty"}
                        Icon2="loyalty"
                        onPress={async (): Promise<void> => {
                            const MID = await AsyncStorage.getItem('MID');
                            navigation.navigate('RewardLoyalityScreen', { 'PlayerID': MID });
                            onPress();
                        }}
                    />

                    <MenuButton
                        Titel={"How to Redeem Ballys Coins"}
                        Icon4="coins"
                        onPress={async (): Promise<void> => {
                            const MID = await AsyncStorage.getItem('MID');
                            navigation.navigate('HowToRedeemScreen', { 'PlayerID': MID });
                            onPress();
                        }}
                    />


                    <MenuButton
                        Titel='Where to Redeem'
                        Icon2="redeem"
                        onPress={async (): Promise<void> => {
                            const MID = await AsyncStorage.getItem('MID');
                            navigation.navigate('WhereToRedeemScreen', { 'PlayerID': MID });
                            onPress();
                        }}
                    />




                </View>
            </ScrollView>

            {/* </SafeAreaView> */}




        </View >
    );
};


export default DrawerMenu;