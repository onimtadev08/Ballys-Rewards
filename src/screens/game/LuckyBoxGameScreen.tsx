import React, { Component } from 'react';
import { BackHandler, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ButtomNav from '../../components/ButtomNav.tsx'
import { ColorFirst, ColorSecond, ColorTherd } from '../../data/data.tsx';
import TopNav from '../../components/TopNav.tsx';
import LuckyBoxComponent from './components/LuckyBoxComponent.tsx';
import WiningComponent from './components/WiningComponent.tsx';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');


interface myStates {
    winnerIndex: number;
    isImageMode: boolean;
    isEndlessSpinningOn: boolean;
    isShowWin: boolean;
    Wininnings: number;
    isWin: boolean;
}

interface slice {
    text: string;
}
interface myProps {
    navigation: any;
    route: any;
    Page: number;
}


class LuckyBoxGameScreen extends Component<myProps, myStates> {
    // Assuming navigation is passed as a prop
    navigation: any;
    scrollRef: React.RefObject<ScrollView>


    constructor(props: any) {
        super(props)
        this.scrollRef = React.createRef<ScrollView>();
        this.state = {
            winnerIndex: 0,
            isImageMode: true,
            isEndlessSpinningOn: false,
            isShowWin: false,
            Wininnings: 0,
            isWin: false
        }


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
                            <TopNav navigation={this.props.navigation} BackToHome={false} BackButton={true} titel={'LUCKY PICK'} />
                        </View>


                        {this.state.isWin ?
                            <View style={{ flex: 1, marginBottom: 120, alignItems: 'center', justifyContent: 'center' }}>
                                <WiningComponent
                                    WiningAmount={this.state.Wininnings}
                                    onRetry={(): void => {
                                        this.setState({ isWin: false });
                                    }} />
                            </View>
                            :


                            <View style={{ flex: 1, marginBottom: 120, alignItems: 'center', justifyContent: 'center' }}>

                                <View style={{ flexDirection: 'row', height: '25%', width: '100%' }}>
                                    <View style={{ flex: 1 }}>
                                        <LuckyBoxComponent onPress={(Win: number, isWin: boolean): void => {
                                            this.setState({ isWin: isWin, Wininnings: Number(Win) });
                                        }} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <LuckyBoxComponent onPress={function (Win: number, isWin: boolean): void {

                                        }} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <LuckyBoxComponent onPress={function (Win: number, isWin: boolean): void {

                                        }} />
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', height: '25%', width: '100%' }}>
                                    <View style={{ flex: 1 }}>
                                        <LuckyBoxComponent onPress={function (Win: number, isWin: boolean): void {

                                        }} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <LuckyBoxComponent onPress={(Win: number, isWin: boolean): void => {
                                            this.setState({ isWin: isWin, Wininnings: Number(Win) });
                                        }} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <LuckyBoxComponent onPress={function (Win: number, isWin: boolean): void {

                                        }} />
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', height: '25%', width: '100%' }}>
                                    <View style={{ flex: 1 }}>
                                        <LuckyBoxComponent onPress={function (Win: number, isWin: boolean): void {

                                        }} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <LuckyBoxComponent onPress={function (Win: number, isWin: boolean): void {

                                        }} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <LuckyBoxComponent onPress={function (Win: number, isWin: boolean): void {

                                        }} />
                                    </View>
                                </View>


                            </View>
                        }
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


export default LuckyBoxGameScreen;