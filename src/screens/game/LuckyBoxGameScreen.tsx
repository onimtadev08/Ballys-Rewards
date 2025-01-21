import React, { Component, PureComponent } from 'react';
import {
    BackHandler,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtomNav from '../../components/ButtomNav.tsx';
import { ColorFirst, ColorSecond, ColorTherd } from '../../data/data.tsx';
import TopNav from '../../components/TopNav.tsx';
import LuckyBoxComponent from './components/LuckyBoxComponent.tsx';
import WiningComponent from './components/WiningComponent.tsx';
import { Box, TotalWining } from './gameModel/gameModel.tsx';
import TempWiningsComponent from './components/tempWiningsComponent.tsx';
import RecesntWiningsComponent from './components/RecesntWiningsComponent.tsx';
import FastImage from 'react-native-fast-image';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

interface myStates {
    winnerIndex: number;
    isImageMode: boolean;
    isEndlessSpinningOn: boolean;
    isShowWin: boolean;
    Wininnings: number;
    isWin: boolean;
    isDisabled: boolean;
    BoxData: Box[];
    TotalWinings: TotalWining[];
    isAllOpen: boolean;

}

interface slice {
    text: string;
}
interface myProps {
    navigation: any;
    route: any;
    Page: number;
}

class LuckyBoxGameScreen extends PureComponent<myProps, myStates> {
    // Assuming navigation is passed as a prop
    navigation: any;
    scrollRef: React.RefObject<ScrollView>;

    myArray: Box[] = [
        {
            Win: 100,
            isWin: true
        },
        {
            Win: 200,
            isWin: true
        },
        {
            Win: 0,
            isWin: false
        },
        {
            Win: 400,
            isWin: true
        },
        {
            Win: 0,
            isWin: false
        },
        {
            Win: 600,
            isWin: true
        },
        {
            Win: 0,
            isWin: false
        },
        {
            Win: 800,
            isWin: true
        },
        {
            Win: 0,
            isWin: false
        },
        {
            Win: 1000,
            isWin: true
        },
        {
            Win: 1100,
            isWin: true
        },
        {
            Win: 0,
            isWin: false
        },

    ];



    constructor(props: any) {
        super(props);
        this.scrollRef = React.createRef<ScrollView>();
        this.state = {
            winnerIndex: 0,
            isImageMode: true,
            isEndlessSpinningOn: false,
            isShowWin: false,
            Wininnings: 0,
            isWin: false,
            isDisabled: false,
            BoxData: this.shuffle(this.myArray),
            TotalWinings: [],
            isAllOpen: false,
        };


    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.navigation = this.props.navigation; // Assuming you're using a class-based navigation solution

    }

    handleBackPress = () => {
        return true;
    };

    shuffle = (array: Box[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Usage 




    render(): React.ReactNode {
        const handleDisableBoxPress = (Win: number, isWin: boolean): void => {
            this.setState({ isDisabled: true }, () => {
                setTimeout(() => {


                    if (this.state.TotalWinings.length > 1) {

                        const data = this.state.TotalWinings;
                        data.push({ id: this.state.TotalWinings.length, Amount: Win });

                        const sum = data.reduce((accumulator, currentValue) => accumulator + currentValue.Amount, 0);

                        this.setState({ isAllOpen: true }, () => {
                            setTimeout(() => {
                                this.setState({ TotalWinings: data, isWin: true, Wininnings: Number(sum), isDisabled: false }, () => {
                                    console.log('aaa');
                                });
                            }, 5000);
                        });

                    } else {

                        const data = this.state.TotalWinings;
                        data.push({ id: this.state.TotalWinings.length, Amount: Win });

                        this.setState({ TotalWinings: data, isDisabled: false, Wininnings: Number(Win) })

                    }


                }, 3000);
            });

        };

        return (
            <LinearGradient
                colors={[ColorFirst, ColorSecond, ColorTherd]}
                style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <LinearGradient
                        colors={[ColorFirst, ColorSecond, ColorTherd]}
                        style={styles.container}>
                        <View style={{ zIndex: 10, backgroundColor: ColorFirst }}>
                            <TopNav
                                navigation={this.props.navigation}
                                BackToHome={false}
                                BackButton={true}
                                titel={'LUCKY PICK'}
                            />
                        </View>



                        <ImageBackground
                            style={{
                                width: '100%', height: '80%', alignItems: 'center'
                            }}
                            source={{ uri: 'https://e1.pxfuel.com/desktop-wallpaper/845/951/desktop-wallpaper-search-for-search-login-create-story-audio-view-all-formats-menu-login-latest-stories-best-for-iphone-12-and-iphone-12-pro-101-amazing-iphone-12-backgrounds-101-amazing-iphone-x-backgrounds-amazing-for.jpg' }}
                            resizeMode={FastImage.resizeMode.stretch}
                            imageStyle={{ width: '100%', height: '100%', }}
                        >

                            <FastImage
                                style={{
                                    width: '80%',
                                    height: '25%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                source={require('./assets/LuckySpin/Luckylogo.gif')}
                                resizeMode={FastImage.resizeMode.cover}
                            />

                            {/* <RecesntWiningsComponent Wimimgs={this.state.TotalWinings} /> */}

                            {this.state.isWin ? (

                                <View style={{ width: '100%', height: '85%', position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center' }}>

                                    <WiningComponent
                                        WiningAmount={this.state.Wininnings}
                                        onRetry={(): void => {
                                            this.setState({ isWin: false, isDisabled: false, TotalWinings: [], isAllOpen: false, BoxData: this.shuffle(this.myArray) });
                                        }}
                                    />

                                </View>
                            ) : null}





                            <View
                                style={{
                                    marginTop: 30,
                                    flex: 1,
                                    marginBottom: 120,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <View
                                    style={{ flexDirection: 'row', height: '30%', width: '70%' }}>
                                    <View style={{ flex: 1, margin: 5 }}>
                                        <LuckyBoxComponent
                                            onPress={(Win: number, isWin: boolean): void => handleDisableBoxPress(Win, isWin)}
                                            type={'2'}
                                            isDisabled={this.state.isDisabled} winnings={this.state.BoxData[0].isWin} winningAmount={this.state.BoxData[0].Win} isOpenAll={this.state.isAllOpen} reset={!this.state.isAllOpen} />
                                    </View>
                                    <View style={{ flex: 1, margin: 5 }}>
                                        <LuckyBoxComponent
                                            onPress={(Win: number, isWin: boolean): void => handleDisableBoxPress(Win, isWin)}
                                            type={'3'}
                                            isDisabled={this.state.isDisabled} winnings={this.state.BoxData[1].isWin} winningAmount={this.state.BoxData[1].Win} isOpenAll={this.state.isAllOpen} reset={!this.state.isAllOpen} />
                                    </View>
                                    <View style={{ flex: 1, margin: 5 }}>
                                        <LuckyBoxComponent
                                            onPress={(Win: number, isWin: boolean): void => handleDisableBoxPress(Win, isWin)}
                                            type={'1'}
                                            isDisabled={this.state.isDisabled} winnings={this.state.BoxData[2].isWin} winningAmount={this.state.BoxData[2].Win} isOpenAll={this.state.isAllOpen} reset={!this.state.isAllOpen} />
                                    </View>
                                </View>

                                <View
                                    style={{ flexDirection: 'row', height: '30%', width: '70%' }}>
                                    <View style={{ flex: 1, margin: 5 }}>
                                        <LuckyBoxComponent
                                            onPress={(Win: number, isWin: boolean): void => handleDisableBoxPress(Win, isWin)}
                                            type={''}
                                            isDisabled={this.state.isDisabled} winnings={this.state.BoxData[3].isWin} winningAmount={this.state.BoxData[3].Win} isOpenAll={this.state.isAllOpen} reset={!this.state.isAllOpen} />
                                    </View>
                                    <View style={{ flex: 1, margin: 5 }}>
                                        <LuckyBoxComponent
                                            onPress={(Win: number, isWin: boolean): void => handleDisableBoxPress(Win, isWin)}
                                            type={'2'}
                                            isDisabled={this.state.isDisabled} winnings={this.state.BoxData[4].isWin} winningAmount={this.state.BoxData[4].Win} isOpenAll={this.state.isAllOpen} reset={!this.state.isAllOpen} />
                                    </View>
                                    <View style={{ flex: 1, margin: 5 }}>
                                        <LuckyBoxComponent
                                            onPress={(Win: number, isWin: boolean): void => handleDisableBoxPress(Win, isWin)}
                                            type={'3'}
                                            isDisabled={this.state.isDisabled} winnings={this.state.BoxData[5].isWin} winningAmount={this.state.BoxData[5].Win} isOpenAll={this.state.isAllOpen} reset={!this.state.isAllOpen} />
                                    </View>
                                </View>

                                <View
                                    style={{ flexDirection: 'row', height: '30%', width: '70%' }}>
                                    <View style={{ flex: 1, margin: 5 }}>
                                        <LuckyBoxComponent
                                            onPress={(Win: number, isWin: boolean): void => handleDisableBoxPress(Win, isWin)}
                                            type={'1'}
                                            isDisabled={this.state.isDisabled} winnings={this.state.BoxData[6].isWin} winningAmount={this.state.BoxData[6].Win} isOpenAll={this.state.isAllOpen} reset={!this.state.isAllOpen} />
                                    </View>
                                    <View style={{ flex: 1, margin: 5 }}>
                                        <LuckyBoxComponent
                                            onPress={(Win: number, isWin: boolean): void => handleDisableBoxPress(Win, isWin)}
                                            type={''}
                                            isDisabled={this.state.isDisabled} winnings={this.state.BoxData[7].isWin} winningAmount={this.state.BoxData[7].Win} isOpenAll={this.state.isAllOpen} reset={!this.state.isAllOpen} />
                                    </View>
                                    <View style={{ flex: 1, margin: 5 }}>
                                        <LuckyBoxComponent
                                            onPress={(Win: number, isWin: boolean): void => handleDisableBoxPress(Win, isWin)}
                                            type={'2'}
                                            isDisabled={this.state.isDisabled} winnings={this.state.BoxData[8].isWin} winningAmount={this.state.BoxData[8].Win} isOpenAll={this.state.isAllOpen} reset={!this.state.isAllOpen} />
                                    </View>
                                </View>

                                <View
                                    style={{ flexDirection: 'row', height: '30%', width: '70%' }}>
                                    <View style={{ flex: 1, margin: 5 }}>
                                        <LuckyBoxComponent
                                            onPress={(Win: number, isWin: boolean): void => handleDisableBoxPress(Win, isWin)}
                                            type={'3'}
                                            isDisabled={this.state.isDisabled} winnings={this.state.BoxData[9].isWin} winningAmount={this.state.BoxData[9].Win} isOpenAll={this.state.isAllOpen} reset={!this.state.isAllOpen} />
                                    </View>
                                    <View style={{ flex: 1, margin: 5 }}>
                                        <LuckyBoxComponent
                                            onPress={(Win: number, isWin: boolean): void => handleDisableBoxPress(Win, isWin)}
                                            type={'1'}
                                            isDisabled={this.state.isDisabled} winnings={this.state.BoxData[10].isWin} winningAmount={this.state.BoxData[10].Win} isOpenAll={this.state.isAllOpen} reset={!this.state.isAllOpen} />
                                    </View>
                                    <View style={{ flex: 1, margin: 5 }}>
                                        <LuckyBoxComponent
                                            onPress={(Win: number, isWin: boolean): void => handleDisableBoxPress(Win, isWin)}
                                            type={''}
                                            isDisabled={this.state.isDisabled} winnings={this.state.BoxData[11].isWin} winningAmount={this.state.BoxData[11].Win} isOpenAll={this.state.isAllOpen} reset={!this.state.isAllOpen} />
                                    </View>
                                </View>
                            </View>

                        </ImageBackground>

                        <View
                            style={{
                                zIndex: 2,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                height: '15%',
                                backgroundColor: ColorTherd,
                            }}>
                            <ButtomNav navigation={this.props.navigation}></ButtomNav>
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
        alignItems: 'center',
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

export default LuckyBoxGameScreen;
