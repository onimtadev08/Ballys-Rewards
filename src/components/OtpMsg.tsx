import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import AntDesing from 'react-native-vector-icons/AntDesign'

const { width, height } = Dimensions.get('window');

interface OtpText {
    Text: string;
}
interface errorMsgProps {
    msg: string;
    onPressCancel: () => void;
    onReturnOtp: (otp: string) => void;
    onResendOtp: () => void;
}
const OtpMsg: React.FC<errorMsgProps> = ({
    msg,
    onPressCancel,
    onReturnOtp,
    onResendOtp,
}) => {
    const ref_input1 = useRef<TextInput | null>(null);
    const ref_input2 = useRef<TextInput | null>(null);
    const ref_input3 = useRef<TextInput | null>(null);
    const ref_input4 = useRef<TextInput | null>(null);

    const [Text1, setText1] = useState<string>('');
    const [Text2, setText2] = useState<string>('');
    const [Text3, setText3] = useState<string>('');
    const [Text4, setText4] = useState<string>('');

    const [second, setSecond] = useState<number>(60);
    const [isEnable, setEnable] = useState<boolean>(false);
    const [start, setStart] = useState<boolean>(true);

    React.useEffect(() => {
        resendOTP();
    }, [start]);

    const resendOTP = () => {
        let s = second;
        setEnable(true);
        let interval = setInterval(() => {
            s = s - 1;

            if (s < 10) {
                setSecond(0 + s);
            } else {
                setSecond(s);
            }

            if (s === 0) {
                setEnable(false);
                setSecond(30);
                clearInterval(interval);
            }
        }, 1000);
    }



    React.useEffect(() => {
        onReturnOtp(Text1 + '' + Text2 + '' + Text3 + '' + Text4);
    }, [Text4]);

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
                    width: '90%',
                    height: '25%',
                    top: height / 20,
                    left: -80,
                    elevation: 50,
                    borderRadius: 20,
                }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            flex: 5,
                            margin: 20,
                            textAlign: 'center',
                            color: 'black',
                            fontSize: 14,
                            fontWeight: '500',
                        }}>{msg}</Text>

                        <TouchableOpacity
                            onPress={onPressCancel}
                        >
                            <AntDesing name='close' size={50} color={'red'} style={{ flex: 1, margin: 10 }} />
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        marginTop: 30,
                        flexDirection: 'row'
                    }}>

                        <TextInput
                            keyboardType='number-pad'
                            style={{
                                borderColor: 'black',
                                borderWidth: 1,
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                                margin: 10,
                                textAlign: 'center'
                            }}
                            ref={ref_input1}
                            onChangeText={(val) => {
                                if (val.length === 0) return;
                                setText1(val);
                                ref_input2.current?.focus();
                            }}
                            maxLength={1}
                            value={Text1}
                        ></TextInput>

                        <TextInput
                            keyboardType='number-pad'
                            style={{
                                borderColor: 'black',
                                borderWidth: 1,
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                                margin: 10,
                                textAlign: 'center'
                            }}
                            ref={ref_input2}
                            onChangeText={(val) => {
                                if (val.length === 0) return;
                                setText2(val);
                                ref_input3.current?.focus();
                            }}
                            maxLength={1}
                            value={Text2}
                        ></TextInput>

                        <TextInput
                            keyboardType='number-pad'
                            style={{
                                borderColor: 'black',
                                borderWidth: 1,
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                                margin: 10,
                                textAlign: 'center'
                            }}
                            ref={ref_input3}
                            onChangeText={(val) => {
                                if (val.length === 0) return;
                                setText3(val);
                                ref_input4.current?.focus();
                            }}
                            maxLength={1}
                            value={Text3}
                        ></TextInput>

                        <TextInput
                            keyboardType='number-pad'
                            style={{
                                borderColor: 'black',
                                borderWidth: 1,
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                                margin: 10,
                                textAlign: 'center'
                            }}
                            ref={ref_input4}
                            onChangeText={(val) => {
                                if (val.length === 0) return;
                                setText4(val);
                            }}
                            maxLength={1}
                            value={Text4}
                        ></TextInput>

                    </View>
                    <TouchableOpacity
                        disabled={isEnable}
                        style={{ flex: 1, alignItems: 'center', marginTop: 20 }}
                        onPress={() => {
                            onResendOtp();
                        }}>
                        <View>
                            <Text
                                style={{
                                    color: isEnable ? '#d1d1d1' : 'black',
                                }}>
                                Resend Code{' '}
                                {isEnable ? '00:' + second : null}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
export default OtpMsg;                                            