import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import Sound from 'react-native-sound';
interface myProps {
    WiningAmount: number;
    onRetry: () => void;
}

interface recentCount {
    id: number;
    Val: number;
    time: string;
}

let Recentdata: recentCount[] = [];
let index: number = 0;
const WiningComponent: React.FC<myProps> = ({ WiningAmount, onRetry }) => {

    React.useEffect(() => {
        const win_sound = new Sound('win.wav', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }


            console.log('duration in seconds: ' + win_sound.getDuration() + 'number of channels: ' + win_sound.getNumberOfChannels());

            // Play the sound with an onEnd callback
            win_sound.play((success: any) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        });
    }, [WiningAmount]);

    return (
        <View
            style={{
                zIndex: 2,
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0.3)',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                }}>
                {/* <Image source={require('../assets/congratz.png')} resizeMode='contain' style={{ width: '100%', height: '50%' }} /> */}
                {/* https://thumbs.dreamstime.com/b/congratulations-banner-game-ui-awards-red-ribbon-golden-stars-receiving-cartoon-achievement-game-screen-155291159.jpg */}

                {/* <Image
                    source={{
                        uri: 'https://thumbs.dreamstime.com/b/congratulations-banner-game-ui-awards-red-ribbon-golden-stars-receiving-cartoon-achievement-game-screen-155291159.jpg',
                    }}
                    resizeMode="contain"
                    style={{ width: '100%', height: '100%', marginTop: -200 }}
                /> */}

                <FastImage
                    source={{
                        uri: 'https://cdn.pixabay.com/animation/2024/05/02/07/43/07-43-00-535_512.gif',
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.immutable,
                    }}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%', position: 'absolute' }}
                />

                <View
                    style={{
                        width: '70%',
                        height: '60%',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        backgroundColor: '#FFC300',
                        borderColor: '#FFC300',
                        borderWidth: 20,
                        borderRadius: 40,
                    }}>
                    <TouchableOpacity
                        style={{
                            top: 10,
                            left: 30,
                            backgroundColor: 'red',
                            borderRadius: 30,
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 10,
                            shadowColor: 'black',
                        }}
                        onPress={() => {
                            onRetry();
                        }}
                    >
                        <FontAwesome
                            name="close"
                            size={30}
                            color="white"
                            style={{ margin: 10 }}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#F7DC6F',
                            borderRadius: 30,
                            elevation: 10,
                            shadowColor: 'red',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <FastImage
                            source={require('../assets/LuckySpin/logomid.png')}
                            resizeMode="contain"
                            style={{
                                marginTop: 50,
                                marginBottom: 10,
                                width: '100%',
                                height: '20%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        />

                        <Text
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                fontSize: 25,
                                fontWeight: 'bold',
                                color: '#6E2C00',
                                fontStyle: 'italic',
                                fontFamily: 'Helvetica',
                            }}>
                            Congratulations !!!
                        </Text>
                        <View
                            style={{
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                width: '90%',
                                height: '50%',
                                marginTop: 10,
                                marginBottom: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 20,
                            }}>
                            <Text
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                    color: '#6E2C00',
                                    fontStyle: 'italic',
                                    fontFamily: 'Helvetica',
                                }}>
                                YOUR{'\n'}REWARD
                            </Text>
                            <Text
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                    color: '#6E2C00',
                                    fontStyle: 'italic',
                                    fontFamily: 'Helvetica',
                                }}>
                                {WiningAmount}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={{
                                backgroundColor: 'green',
                                borderRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                elevation: 10,
                                shadowColor: 'black',
                                borderColor: 'black',
                                borderWidth: 1,
                            }}
                            onPress={() => {
                                onRetry();
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    margin: 10,
                                    elevation: 10,
                                    shadowColor: 'black',
                                }}>
                                NEXT
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <Image
                    source={{
                        uri: 'https://cdn.pixabay.com/animation/2024/05/02/07/43/07-43-00-535_512.gizf',
                    }}
                    resizeMode='cover'
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        zIndex: 0,
                    }}
                /> */}

                {/* <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 50,
                        marginTop: -150,
                        zIndex: 2,
                        width: '50%',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        padding: 10,
                        borderRadius: 10,
                        elevation: 10,
                    }}> */}
                {/* <Image source={require('../assets/wining.png')} style={{ width: '100%', position: 'absolute' }} resizeMode='contain' /> */}
                {/* <Text style={{ color: 'white', fontSize: 20 }}>YOU WIN</Text>
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>
                        {ThousandSeparator(WiningAmount.toString())}
                    </Text>
                </View>

                <GradientButton
                    title="RETRY"
                    onPress={() => {
                        onRetry();
                    }}
                    colors={['transparent', 'transparent', 'transparent']}
                    buttonStyle={{}}
                    textStyle={{ fontSize: 18 }}
                    borderColor={''}
                /> */}
            </View>
        </View>
    );
};

// 7756B1   1b
// 240332   2inside
// 36105A   3main

export default React.memo(WiningComponent);
