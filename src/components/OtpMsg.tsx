import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, Keyboard, ImageBackground } from 'react-native';
import { ColorTherd } from '../data/data';

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
            zIndex: 50,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.4)',
            overflow: 'hidden',
        }}>

            <ImageBackground source={require('../images/meg.jpg')}
                blurRadius={100}
                resizeMode='stretch'
                style={{
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                }}>

            </ImageBackground>
            <View
                style={{
                    backgroundColor: ColorTherd,
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
                            color: 'white',
                            fontSize: 18,
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
                                color: 'white',
                                borderColor: 'gold',
                                borderWidth: 1,
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                                margin: 10,
                                textAlign: 'center',
                            }}
                            ref={ref_input1}
                            onChangeText={(val) => {
                                if (val.length > 0) {
                                    setText1(val);
                                    ref_input2.current?.focus();
                                }else{
                                    setText1('');
                                }
                               
                            }}
                            maxLength={1}
                            value={Text1}
                        ></TextInput>

                        <TextInput
                            keyboardType='number-pad'
                            style={{
                                color: 'white',
                                borderColor: 'gold',
                                borderWidth: 1,
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                                margin: 10,
                                textAlign: 'center'
                            }}
                            ref={ref_input2}
                            onChangeText={(val) => {
                                if (val.length > 0) {
                                    setText2(val);
                                    ref_input3.current?.focus();
                                }else{
                                    setText2('');
                                    ref_input1.current?.focus();
                                }
                            }}
                            maxLength={1}
                            value={Text2}
                        ></TextInput>

                        <TextInput
                            keyboardType='number-pad'
                            style={{
                                color: 'white',
                                borderColor: 'gold',
                                borderWidth: 1,
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                                margin: 10,
                                textAlign: 'center'
                            }}
                            ref={ref_input3}
                            onChangeText={(val) => {
                                if (val.length > 0) {
                                    setText3(val);
                                    ref_input4.current?.focus();
                                }else{
                                    setText3('');
                                    ref_input2.current?.focus();
                                }
                            }}
                            maxLength={1}
                            value={Text3}
                        ></TextInput>

                        <TextInput
                            keyboardType='number-pad'
                            style={{
                                color: 'white',
                                borderColor: 'gold',
                                borderWidth: 1,
                                width: 50,
                                height: 50,
                                borderRadius: 10,
                                margin: 10,
                                textAlign: 'center'
                            }}
                            ref={ref_input4}
                            onChangeText={(val) => {
                                if (val.length > 0) {
                                    setText4(val);
                                }else{
                                    setText4('');
                                    ref_input3.current?.focus();
                                }
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
                                    color: isEnable ? 'black' : 'white', fontSize: 16
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
                                borderColor: 'gold',
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
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginLeft: 20,
                                backgroundColor: 'gold',
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
                            <Text style={{ color: 'black', fontWeight: '500', fontSize: 18 }}>Verify</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        </View>
    );
}
export default OtpMsg;                                            