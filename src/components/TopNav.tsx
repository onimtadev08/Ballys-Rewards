import React from "react";
import { View, TouchableOpacity, Image, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface propsData {
    navigation: any;
    titel: string;
}

const TopNav: React.FC<propsData> = ({
    navigation,
    titel,
}) => {
    return (
        <View style={{
            flexDirection: 'row',
            width: '100%',
            height: 50,
            alignItems: 'center'
        }} >

            <View style={{ marginStart: 10, flex: 1 }} >

                <TouchableOpacity
                    style={{

                        borderRadius: 40,
                        width: '40%',
                        alignItems: 'center',
                    }}
                    onPress={async () => {
                        const MID = await AsyncStorage.getItem('MID');
                        navigation.navigate('MenuScreen', { 'PlayerID': MID });
                    }}
                >
                    <Image source={require('../images/svgtopng/menubar.png')} style={{ width: 30, height: 30 }} height={30} width={30} resizeMode='contain'></Image>
                </TouchableOpacity>

            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center'
                }}>{titel}</Text>
            </View>


            <View style={{ marginEnd: 10, flex: 1, alignItems: 'flex-end' }} >

                <TouchableOpacity
                    style={{

                        borderRadius: 40,
                        width: '40%',
                        alignItems: 'center',
                    }}
                    onPress={async () => {
                        const MID = await AsyncStorage.getItem('MID');
                        navigation.navigate('NotificationScreen', { 'PlayerID': MID });
                    }}
                >
                    <Image source={require('../images/svgtopng/NOTIFICATION.png')} style={{ width: 30, height: 30 }} height={30} width={30} resizeMode='contain'></Image>
                </TouchableOpacity>

            </View>

        </View>
    );
};

export default TopNav;