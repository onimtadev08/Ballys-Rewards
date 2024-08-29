import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import AntDesing from 'react-native-vector-icons/AntDesign'

const { width, height } = Dimensions.get('window');

interface errorMsgProps {
    msg: string;
    onPress: () => void;
}
const SuccsessMsg: React.FC<errorMsgProps> = ({
    msg,
    onPress,
}) => {
    return (
        <View style={{
            zIndex:3,
            backgroundColor: 'rgba(0,0,0,0.4)',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
        }}>
            <View
                style={{
                    margin: 100,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    width: '70%',
                    height: '25%',
                    top: height / 5,
                    left: -35,
                    elevation: 100,
                    borderRadius: 20,
                }}>
                <View style={{ backgroundColor: 'white', bottom: height / 14, borderRadius: 100, borderColor: 'white', borderWidth: 5 }}>
                    <AntDesing name='checkcircle' size={60} color={'green'} />
                </View>

                <Text style={{ color: 'black', textAlign: 'center', top: -30 }}>
                    {msg}
                </Text>
                <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, width: '75%', alignItems: 'center', borderRadius: 10 }} onPress={onPress}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default SuccsessMsg;