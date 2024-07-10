import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, Keyboard } from 'react-native';
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
    onPressDone: (otp: string) => void
}
const OtpMsg: React.FC<errorMsgProps> = ({
    msg,
    onPressCancel,
    onReturnOtp,
    onResendOtp,
    onPressDone,
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
        Keyboard.dismiss();
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
                setSecond(60);
                clearInterval(interval);
            }
        }, 1000);
    }



    React.useEffect(() => {
        if ((Text1 + '' + Text2 + '' + Text3 + '' + Text4) !== '') {
            onReturnOtp(Text1 + '' + Text2 + '' + Text3 + '' + Text4);
            setText1('');
            setText2('');
            setText3('');
            setText4('');
        }

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
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    width: '90%',
                    height: 300,
                    top: 100,
                    elevation: 50,
                    borderRadius: 20,
                    minHeight: 300,
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



                    </View>
                    <View style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        marginTop: 10,
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
                            Keyboard.dismiss;
                            setText1('');
                            setText2('');
                            setText3('');
                            setText4('');
                            onResendOtp();
                            resendOTP();
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
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{
                                borderWidth: 2,
                                borderColor: 'green',
                                padding: 10,
                                width: 150,
                                alignItems: 'center',
                                borderRadius: 10,
                                marginTop: -20,
                                marginBottom: 10,
                            }}
                            onPress={() => {
                                Keyboard.dismiss;
                                onPressCancel();
                            }}>
                            <Text style={{ color: 'black', fontWeight: '500' }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginLeft: 20,
                                backgroundColor: 'green',
                                padding: 10,
                                width: 150,
                                alignItems: 'center',
                                borderRadius: 10,
                                marginTop: -20,
                                marginBottom: 10,
                            }}
                            onPress={() => {
                                Keyboard.dismiss;

                                let val: boolean = true;

                                if (Text1 === '') {
                                    val = false;
                                }

                                if (Text2 === '') {
                                    val = false;
                                }

                                if (Text3 === '') {
                                    val = false;
                                }

                                if (Text4 === '') {
                                    val = false;
                                }

                                if (((Text1 + '' + Text2 + '' + Text3 + '' + Text4) !== '') && val) {
                                    onReturnOtp(Text1 + '' + Text2 + '' + Text3 + '' + Text4);
                                    setText1('');
                                    setText2('');
                                    setText3('');
                                    setText4('');
                                } 
                            }}>
                            <Text style={{ color: 'white', fontWeight: '500' }}>Verify</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        </View>
    );
}
export default OtpMsg;                                            