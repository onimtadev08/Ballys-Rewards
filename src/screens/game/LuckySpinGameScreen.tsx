import React, { Component } from 'react';
import { BackHandler, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtomNav from '../../components/ButtomNav.tsx'
import { ColorFirst, ColorSecond, ColorTherd } from '../../data/data.tsx';
import TopNav from '../../components/TopNav.tsx';
import LuckyWheel from 'react-native-lucky-wheel';
import GradientButton from '../../components/GradientButton.tsx';
import WiningComponent from './components/WiningComponent.tsx';

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
    scrollRef: React.RefObject<ScrollView>
    wheelRef: React.RefObject<LuckyWheel>;

    constructor(props: any) {
        super(props)
        this.scrollRef = React.createRef<ScrollView>();
        this.state = {
            winnerIndex: 0,
            isImageMode: true,
            isEndlessSpinningOn: false,
            isShowWin: false,
            Wininnings: 0,
        }
        this.wheelRef = React.createRef<LuckyWheel>();

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution
    }

    handleBackPress
        = () => {
            return true;
        };

    render(): React.ReactNode {


        return (
            <LinearGradient
                colors={[ColorFirst, ColorSecond, ColorTherd]}
                style={styles.container} >

                <SafeAreaView style={styles.safeArea}>

                    <LinearGradient
                        colors={[ColorFirst, ColorSecond, ColorTherd]}
                        style={styles.container}>


                        <View style={{ zIndex: 10, backgroundColor: ColorFirst }}>
                            <TopNav navigation={this.props.navigation} BackToHome={false} BackButton={true} titel={'LUCKY SPIN'} />
                        </View>
                        <View style={{ flex: 1, marginBottom: 120, alignItems: 'center', justifyContent: 'center' }}>

                            {!this.state.isShowWin ?
                                <View>
                                    <LuckyWheel
                                        ref={this.wheelRef}
                                        slices={
                                            this.state.isImageMode
                                                ? require('./data/slices-for-image.json')
                                                : require('./data/slices-for-svg.json')
                                        }
                                        onSpinningStart={() => {
                                            console.log('onSpinningStart');
                                        }}
                                        onSpinningEnd={(_winner: any) => {
                                            console.log('onSpinningEnd : ', _winner);
                                            this.setState({ isShowWin: true, Wininnings: _winner.value });
                                        }}
                                        backgroundColorOptions={{ luminosity: 'orenge', hue: 'vibrant' }}
                                        size={300}
                                        // source={this.state.isImageMode ? require('./assets/wheel.png') : null}
                                        source={this.state.isImageMode ? require('./assets/cc.png') : null}
                                        enableGesture
                                        minimumSpinVelocity={0.5} // 0.0 - 1.0
                                        winnerIndex={this.state.winnerIndex}
                                        waitWinner={this.state.isEndlessSpinningOn}
                                        enableOuterDots={false}
                                        customKnob={() => {
                                            return (
                                                <View >
                                                    <Image source={require('./assets/knob.png')} style={{ width: 40, height: 40, margin: 10 }} resizeMode='contain' />
                                                </View>
                                            );
                                        }}
                                    />
                                    <View style={styles.buttons}>


                                        <GradientButton
                                            title="SPIN"
                                            onPress={() => {
                                                this.wheelRef?.current?.start();
                                            }}
                                            colors={['transparent', 'transparent', 'transparent']}
                                            buttonStyle={{}}
                                            textStyle={{ fontSize: 18 }} borderColor={''} />




                                    </View>
                                </View>
                                :

                                <WiningComponent
                                    WiningAmount={this.state.Wininnings}
                                    onRetry={(): void => {
                                        this.setState({ isShowWin: false });
                                    }} />
                            }

                        </View>

                        <View style={{
                            zIndex: 1,
                            left: 0,
                            bottom: 0,
                            right: 0
                            , position: 'absolute',
                            height: '15%',
                            backgroundColor: ColorTherd
                        }}>
                            <ButtomNav navigation={this.props.navigation}
                            ></ButtomNav>
                        </View>
                    </LinearGradient>
                </SafeAreaView >

            </LinearGradient >
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
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
    },
});


export default LuckySpinGameScreen;