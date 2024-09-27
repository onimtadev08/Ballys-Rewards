import React, { Component } from 'react';
import { FlatList, BackHandler, Linking, Keyboard, View, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../components/GradientButton.tsx';
import SuccsessMsg from '../components/SuccsessMsg.tsx';
import InfoMsg from '../components/InfoMsg.tsx';
import ErrorMsg from '../components/errorMsg.tsx';
import Loader from '../components/Loader.tsx';
import ButtomNav from '../components/ButtomNav.tsx'
import { ColorFirst, ColorSecond, ColorTherd } from '../data/data.tsx';
import TopNav from '../components/TopNav.tsx';
import { getSinglePageDetailsApi } from '../api/Api.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');


interface myStates {
    currentIndex: number;
    isLoading: boolean;
    showApiError: boolean;
    showApiErrorMsg: string;
    showApiInfo: boolean;
    showApiInfoMsg: string;
    showOtpMsg: boolean;
    showApiSuccsess: boolean;
    showApiSuccsessMsg: string;
    page_title: string;
    page_description: any[];
    banner_img: string;
    Games: Game[];

}
interface myProps {
    navigation: any;
    route: any;
    Page: number;
}

interface Game {
    Name: string;
    Description: string;
    Img: string;
    ApiNum: string;
}

class GamingScreen extends Component<myProps, myStates> {
    // Assuming navigation is passed as a prop
    navigation: any;
    scrollRef: React.RefObject<ScrollView>

    constructor(props: any) {
        super(props)
        this.scrollRef = React.createRef<ScrollView>();
        this.state = {
            currentIndex: 0,
            isLoading: false,
            showApiError: false,
            showApiErrorMsg: '',
            showApiInfo: false,
            showApiInfoMsg: '',
            showOtpMsg: false,
            showApiSuccsess: false,
            showApiSuccsessMsg: '',
            page_title: '',
            page_description: [],
            banner_img: '',
            Games: [
                {
                    Name: 'BACCARAT',
                    Description: 'Ballys Baccarat is a very lucky game andeasy to play. It is the most popular card game in Asia and Ballys Casino offers Baccarat Tables for All Players both High Stakes and Low stakes 24 hours.',
                    Img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgV1q3F1XOa6CXfzIXjHK73N3BP3eruhKxQ&s',
                    ApiNum: '111',
                }, {
                    Name: 'ROULETTE',
                    Description: 'Ballys Roulette is a popular casino gamein which Players bet on which red or black numbered compartment of a revolving wheel a small ball (spun in the opposite direction) will come to rest within. Bets are placed on a table marked to correspond with the compartments of the wheel',
                    Img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgV1q3F1XOa6CXfzIXjHK73N3BP3eruhKxQ&s',
                    ApiNum: '55',
                }, {
                    Name: 'BLACKJACK',
                    Description: 'Ballys Blackjack is a card game that the Players dealt cards total has to have a higher count than the dealers cards up to but not exceeding 21.',
                    Img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgV1q3F1XOa6CXfzIXjHK73N3BP3eruhKxQ&s',
                    ApiNum: '600',
                }, {
                    Name: 'SABONG CARDS',
                    Description: 'Ballys Sabong Cards is a fun and easy unique card game. Players wager on whether the winning card appears is the MERON or WALA it s that easy.',
                    Img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgV1q3F1XOa6CXfzIXjHK73N3BP3eruhKxQ&s',
                    ApiNum: '601',
                }, {
                    Name: 'ASIAN POKER',
                    Description: 'Ballys Asian poker, is a variation of poker that is played against the house or the dealer, and not against other Players. Asian poker is one of the best poker games variations played against the house.',
                    Img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgV1q3F1XOa6CXfzIXjHK73N3BP3eruhKxQ&s',
                    ApiNum: '602',
                }, {
                    Name: 'ANDAR BAHAR',
                    Description: 'Ballys Andar Bahar uses a standard 52-card pack. The dealer operates the Bank. Players place bets on Andar or Bahar watch the deal, and receive their winnings if successful.',
                    Img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgV1q3F1XOa6CXfzIXjHK73N3BP3eruhKxQ&s',
                    ApiNum: '603',
                }, {
                    Name: 'TEXAS HOLD-EM',
                    Description: 'Ballys exciting Texas hold-em game play is for Players to use their two hole cards in combination with the community cards to make the best possible five-card poker hand.',
                    Img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgV1q3F1XOa6CXfzIXjHK73N3BP3eruhKxQ&s',
                    ApiNum: '604',
                }, {
                    Name: 'DRAGON TIGER',
                    Description: 'Dragon Tiger is a fast action game the game is played with a standard deck of 52 cards with no jokers or wildcards. It is played with 8 decks in a shoe.',
                    Img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgV1q3F1XOa6CXfzIXjHK73N3BP3eruhKxQ&s',
                    ApiNum: '605',
                }, {
                    Name: 'LUCKY 7',
                    Description: 'Ballys Lucky 7 is played with eight decks of 52 cards without jokers. The dealer shuffles the cards before the game starts. You have to guess if the card will be higher than 7 (7 up), lower than 7 (7 down), or just 7. Good Luck.',
                    Img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgV1q3F1XOa6CXfzIXjHK73N3BP3eruhKxQ&s',
                    ApiNum: '606',
                }, {
                    Name: '3 CARD POKER',
                    Description: 'Ballys 3 Card Poker is played between the players hand and the dealers hand. This hot table game is fun but also easy to play.',
                    Img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgV1q3F1XOa6CXfzIXjHK73N3BP3eruhKxQ&s',
                    ApiNum: '607',
                }
            ],
        };



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


    renderItem = ({ item }: { item: Game }) => {
        return (
            <View style={{ margin: 10, flexDirection: 'row' }}>
                <Image source={{ uri: item.Img }} style={{ height: 100, width: 100, borderColor: 'gold', borderWidth: 3, borderRadius: 20 }}></Image>

                <View style={{ flex: 1, marginStart: 10 }}>
                    <Text style={{ color: 'white', marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>{item.Name}</Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>{item.Description}</Text>

                    <View style={{ margin: 20 }}>
                        <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: 'gold', alignItems: 'center', justifyContent: 'center', borderRadius: 10, elevation: 100 }} onPress={async () => {
                            const MID = await AsyncStorage.getItem('MID');
                            this.props.navigation.replace('SinglePageDetailsScreen', { 'PlayerID': MID, 'Page': item.ApiNum, 'back': 'T' });
                        }} >
                            <Text style={{ color: 'black', fontSize: 14, textAlign: 'center' }}>VIEW MORE</Text>

                        </TouchableOpacity>
                    </View>
                </View>



            </View>
        );
    }


    render(): React.ReactNode {

        const styles = StyleSheet.create({
            safeArea: {
                backgroundColor: 'rgba(0,0,0,0.0)',
                flex: 1,
            },
            container: {
                flex: 1,
                width: screenWidth,
            }
        });

        return (
            <LinearGradient
                colors={[ColorFirst, ColorSecond, ColorTherd]}
                style={styles.container} >

                <SafeAreaView style={styles.safeArea}>

                    <LinearGradient
                        colors={[ColorFirst, ColorSecond, ColorTherd]}
                        style={styles.container}>


                        <View style={{ zIndex: 10, backgroundColor: ColorFirst }}>
                            <TopNav navigation={this.props.navigation} BackToHome={true} titel={'GAMING'} />
                        </View>
                        <View style={{ marginBottom: 130, flex: 1 }}>



                            <FlatList
                                data={this.state.Games}
                                renderItem={this.renderItem} />




                        </View>
                        {this.state.showApiSuccsess ?
                            <SuccsessMsg msg={this.state.showApiSuccsessMsg} onPress={() => {
                                this.setState({ showApiSuccsess: false });
                            }} />
                            : null}
                        {this.state.showApiError ?
                            <ErrorMsg msg={this.state.showApiErrorMsg} onPress={() => {
                                this.setState({ showApiError: false });
                            }} />
                            : null}
                        {this.state.showApiInfo ?
                            <InfoMsg msg={this.state.showApiInfoMsg} onPress={() => {
                                this.setState({ showApiInfo: false });
                            }} />
                            : null}
                        {this.state.isLoading ? (
                            <Loader />
                        ) : null}
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

export default GamingScreen;