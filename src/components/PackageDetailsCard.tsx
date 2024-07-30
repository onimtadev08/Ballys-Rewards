import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import AntDesing from 'react-native-vector-icons/AntDesign'

const { width, height } = Dimensions.get('window');

interface errorMsgProps {
    Name: string;
    Accommodation: string;
    AirTicket: string;
    Transportation: string;
    SpecialService: string;
    Ammount: string;
    Precentage: string;
    ImgUrl: any;
    onPress: () => void;
}
const PackageDetailsCard: React.FC<errorMsgProps> = ({
    Name,
    Accommodation,
    AirTicket,
    Transportation,
    SpecialService,
    Ammount,
    Precentage,
    ImgUrl,
    onPress,
}) => {
    return (
        <View style={{ alignItems: 'center', height: 220, marginBottom: 20 }}>
            <Image source={ImgUrl} style={{ position: 'absolute' }}></Image>
            <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', marginStart: 35, marginTop: 20, marginEnd: 35 }}>
                    <Text style={{ fontSize: 18, color: 'white', flex: 0.5, fontWeight: 'bold' }}>{Name}</Text>
                    <Text style={{ fontSize: 18, color: 'white', flex: 0.7, textAlign: 'center', fontWeight: 'bold' }}> {Ammount}</Text>
                    <Text style={{ fontSize: 18, color: 'white', flex: 0.5, textAlign: 'right', fontWeight: 'bold' }}>{Precentage}</Text>
                </View>

                <View style={{ flexDirection: 'column', marginStart: 35, marginEnd: 35 }}>
                    <Text style={{
                        marginTop: 10,
                        color: 'white',
                        fontSize: 16,
                    }}>Accommodation {Accommodation}</Text>
                    <Text style={{
                        marginTop: 10,
                        color: 'white',
                        fontSize: 16,
                    }}>Air Ticket {AirTicket}</Text>
                    <Text style={{
                        marginTop: 10,
                        color: 'white',
                        fontSize: 16,
                    }}>Transportation {Transportation}</Text>
                    <Text style={{
                        marginTop: 10,
                        color: 'white',
                        fontSize: 16,
                    }}>Special Service {SpecialService}</Text>
                </View>
            </View>
        </View>
    );
}
export default PackageDetailsCard;