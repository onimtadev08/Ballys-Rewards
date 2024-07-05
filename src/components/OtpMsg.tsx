import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import AntDesing from 'react-native-vector-icons/AntDesign'

const { width, height } = Dimensions.get('window');

interface errorMsgProps {
    msg: string;
    onPress: () => void;
}
const OtpMsg: React.FC<errorMsgProps> = ({
    msg,
    onPress,
}) => {
    return (
        <View style={{
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
                <View style={{ flex: 1, width: '100%', height: '100%', margin: 1, flexDirection: 'row' }}>

                    <TextInput style={{ borderColor: 'black', borderWidth: 1, width: 50, height: 50, borderRadius: 10, margin: 10, textAlign: 'center' }}
                        onChangeText={(val) => {

                        }}
                    ></TextInput>
                    <TextInput style={{ borderColor: 'black', borderWidth: 1, width: 50, height: 50, borderRadius: 10, margin: 10, textAlign: 'center' }}></TextInput>
                    <TextInput style={{ borderColor: 'black', borderWidth: 1, width: 50, height: 50, borderRadius: 10, margin: 10, textAlign: 'center' }}></TextInput>
                    <TextInput style={{ borderColor: 'black', borderWidth: 1, width: 50, height: 50, borderRadius: 10, margin: 10, textAlign: 'center' }}></TextInput>

                </View>
            </View>
        </View>
    );
}
export default OtpMsg;