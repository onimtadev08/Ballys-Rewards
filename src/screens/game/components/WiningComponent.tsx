import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import moment from 'moment';
import { ThousandSeparator } from '../../../utilitis/utilities';
import GradientButton from '../../../components/GradientButton.tsx';
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
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                {/* <Image source={require('../assets/congratz.png')} resizeMode='contain' style={{ width: '100%', height: '50%' }} /> */}
                {/* https://thumbs.dreamstime.com/b/congratulations-banner-game-ui-awards-red-ribbon-golden-stars-receiving-cartoon-achievement-game-screen-155291159.jpg */}

                <Image
                    source={{
                        uri: 'https://thumbs.dreamstime.com/b/congratulations-banner-game-ui-awards-red-ribbon-golden-stars-receiving-cartoon-achievement-game-screen-155291159.jpg',
                    }}
                    resizeMode="contain"
                    style={{ width: '100%', height: '100%', marginTop: -200 }}
                />

                <Image
                    source={{
                        uri: 'https://cdn.pixabay.com/animation/2024/05/02/07/43/07-43-00-535_512.gif',
                    }}
                    resizeMode='cover'
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        zIndex: 0,
                    }}
                />

                <View
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
                    }}>
                    {/* <Image source={require('../assets/wining.png')} style={{ width: '100%', position: 'absolute' }} resizeMode='contain' /> */}
                    <Text style={{ color: 'white', fontSize: 20 }}>YOU WIN</Text>
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
                />
            </View>
        </View >
    );
};

// 7756B1   1b
// 240332   2inside
// 36105A   3main

export default WiningComponent;
