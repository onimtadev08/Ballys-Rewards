import React, { Component } from 'react';
import {
    BackHandler,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    SafeAreaView,
    Button,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtomNav from '../../components/ButtomNav.tsx';
import { ColorFirst, ColorSecond, ColorTherd } from '../../data/data.tsx';
import TopNav from '../../components/TopNav.tsx';
import LuckyWheel from 'react-native-lucky-wheel';
import GradientButton from '../../components/GradientButton.tsx';
import WiningComponent from './components/WiningComponent.tsx';
import FastImage from 'react-native-fast-image';
import Sound from 'react-native-sound';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

interface myStates {
    winnerIndex: number;
    isImageMode: boolean;
    isEndlessSpinningOn: boolean;
    isShowWin: boolean;
    Wininnings: number;
}

interface slice {
    text: string;
}
interface myProps {
    navigation: any;
    route: any;
    Page: number;
}

class LuckySpinGameScreen extends Component<myProps, myStates> {
    // Assuming navigation is passed as a prop
    navigation: any;
    scrollRef: React.RefObject<ScrollView>;
    wheelRef: React.RefObject<LuckyWheel>;
    click_sound: any;
    background_sound: any;

    constructor(props: any) {
        super(props);
        this.scrollRef = React.createRef<ScrollView>();
        this.state = {
            winnerIndex: 0,
            isImageMode: true,
            isEndlessSpinningOn: false,
            isShowWin: false,
            Wininnings: 0,
        };
        this.wheelRef = React.createRef<LuckyWheel>();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.navigation = this.props.navigation;

        this.initSounds();

    }

    handleBackPress = () => {
        return true;
    };

    initSounds() {

        this.click_sound = new Sound('click.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
        });

        this.background_sound = new Sound('backgorund.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }

            console.log('duration in seconds: ' + this.background_sound.getDuration() + 'number of channels: ' + this.background_sound.getNumberOfChannels());
            // Play the sound with an onEnd callback
            this.background_sound.play((success: any) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });

        });



    }

    render(): React.ReactNode {
        return (

            <ImageBackground
                // source={require('./assets/LuckySpin/backGround.jpg')}
                source={{ uri: 'https://i.makeagif.com/media/12-05-2023/7sCQBx.gif' }}
                resizeMode='cover'
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {!this.state.isShowWin ? null : (
                    <WiningComponent
                        WiningAmount={this.state.Wininnings}
                        onRetry={(): void => {
                            this.setState({ isShowWin: false });
                        }}
                    />
                )}


                <View style={{ width: '100%', height: '7%', justifyContent: 'center', zIndex: 1, top: -30 }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.navigation.goBack();
                        }}
                        style={{ alignItems: 'flex-end' }}
                    >
                        <FastImage
                            source={require('./assets/LuckyBox/png/close.png')}
                            style={{
                                margin: 10,
                                borderRadius: 100,
                                width: '16%',
                                height: '90%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                    </TouchableOpacity>
                </View>

                <FastImage
                    style={{
                        marginTop: -50,
                        width: '90%',
                        height: '20%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    source={require('./assets/LuckySpin/LUCKY-SPIN.gif')}
                    resizeMode={FastImage.resizeMode.contain}
                />


                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {/* <Image
                                    source={require('./assets/LuckySpin/spinBack.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: '90%',
                                        top: -80,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                    }}
                                /> */}
                    <FastImage
                        style={{
                            width: '100%',
                            top: 13,
                            height: '115%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                        }}
                        source={require('./assets/LuckySpin/spinBack.png')}
                        resizeMode={FastImage.resizeMode.contain}
                    />

                    {/* <FastImage
                                    style={{
                                        borderRadius: 1000,
                                        top: 27,
                                        width: 328,
                                        height: 328,
                                        position: 'absolute',
                                        zIndex: 10
                                    }}
                                    source={require('./assets/LuckySpin/7ZNJ.gif')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                /> */}

                    <LuckyWheel
                        ref={this.wheelRef}
                        slices={
                            this.state.isImageMode
                                ? require('./data/slices-for-image.json')
                                : require('./data/slices-for-svg.json')
                        }
                        onSpinningStart={() => { }}
                        onSpinningEnd={(_winner: any) => {
                            this.setState({ isShowWin: true, Wininnings: _winner.value });
                        }}
                        backgroundColorOptions={{
                            luminosity: 'orenge',
                            hue: 'vibrant',
                        }}
                        size={300}
                        // source={this.state.isImageMode ? require('./assets/wheel.png') : null}
                        source={
                            this.state.isImageMode
                                ? require('./assets/LuckySpin/spinAmount2.png')
                                : null
                        }
                        enableGesture
                        minimumSpinVelocity={0.5} // 0.0 - 1.0
                        winnerIndex={this.state.winnerIndex}
                        waitWinner={this.state.isEndlessSpinningOn}
                        enableOuterDots={false}
                        customKnob={() => {
                            return (
                                <View>
                                    <Image
                                        source={require('./assets/LuckySpin/mark.png')}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            margin: 10,
                                            marginBottom: -10,
                                            transform: [{ rotate: '180deg' }],
                                        }}
                                        resizeMode="contain"
                                    />
                                </View>
                            );
                        }}
                    />

                    <Image
                        source={require('./assets/LuckySpin/logomid.png')}
                        resizeMode="contain"
                        style={{
                            top: 95,
                            width: '10%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            zIndex: 1,
                        }}
                    />
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={{ width: '100%', height: 60 }}
                        onPress={() => {

                            // loaded successfully
                            console.log('duration in seconds: ' + this.click_sound.getDuration() + 'number of channels: ' + this.click_sound.getNumberOfChannels());

                            // Play the sound with an onEnd callback
                            this.click_sound.play((success: any) => {
                                if (success) {
                                    console.log('successfully finished playing');
                                } else {
                                    console.log('playback failed due to audio decoding errors');
                                }
                            });


                            this.wheelRef?.current?.start();
                        }}>
                        <Image
                            source={require('./assets/LuckySpin/spinButton.png')}
                            style={{ width: '100%', height: 60 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>




            </ImageBackground>


        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'rgba(0,0,0,0.0)',
        flex: 1,
    },
    container: {
        flex: 1,
        width: screenWidth,
    },
    buttons: {
        top: -20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 100,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default LuckySpinGameScreen;
