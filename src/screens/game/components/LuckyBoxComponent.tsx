import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import TempWiningsComponent from './tempWiningsComponent';
import FastImage from 'react-native-fast-image'
interface myProps {
    onPress: (Win: number, isWin: boolean) => void;
    type: string;
    isDisabled: boolean;
    winnings: boolean;
    winningAmount: number;
    isOpenAll: boolean;
    reset: boolean;
}

const LuckyBoxComponent: React.FC<myProps> = ({
    onPress, // Fix the typo here
    type,
    isDisabled,
    winnings,
    winningAmount,
    isOpenAll,
    reset,
}) => {
    const [isWin, setisWin] = React.useState(false);
    const [tempisWin, settempisWin] = React.useState(false);
    const [isWinMSg, setisWinMSg] = React.useState(true);


    React.useEffect(() => {
        if (isWin) {
            setTimeout(() => {
                setisWin(false);
            }, 3000);
        }
    }, [isWin]);

    React.useEffect(() => {
        if (!tempisWin && isOpenAll) {
            setisWinMSg(false);
            if (!isWin) {
                setisWin(true);
            }
            setTimeout(() => {
                settempisWin(true);
            }, 3000);
        }
    }, [isOpenAll]);


    React.useEffect(() => {
        if (reset) {
            setisWin(false);
            settempisWin(false);
            setisWinMSg(true);
        }
    }, [reset]);

    const imageSource =
        type === '1'
            ? isWin
                ? require('../assets/LuckyBox/gif/luckyBoxCard1.gif')
                : require('../assets/LuckyBox/png/luckBoxG.png')
            : type === '2'
                ? isWin
                    ? require('../assets/LuckyBox/gif/luckyBoxCard2.gif')
                    : require('../assets/LuckyBox/png/luckyBoxB.png')
                : type === '3'
                    ? isWin
                        ? require('../assets/LuckyBox/gif/luckyBoxCard3.gif')
                        : require('../assets/LuckyBox/png/luckBoxR.png')
                    : isWin
                        ? require('../assets/LuckyBox/gif/luckyBoxCard4.gif')
                        : require('../assets/LuckyBox/png/luckyBoxBlue.png');

    React.useEffect(() => { }, [imageSource]);

    return (
        <View
            style={{
                height: '100%',
                borderWidth: 1,
                borderColor: 'gold',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
            }}>

            {tempisWin ?
                <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 2 }}>
                    <TempWiningsComponent WiningAmount={winningAmount} isWinn={isWinMSg} />
                </View >
                : null}

            {/* {isOpenAll ?
                <View style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 2 }}>
                    <TempWiningsComponent WiningAmount={winningAmount} />
                </View >
                : null} */}

            <TouchableOpacity
                disabled={isDisabled}
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                }}
                onPress={() => {
                    setisWin(!isWin);
                    onPress(winningAmount, winnings);
                    setTimeout(() => {
                        settempisWin(true);
                    }, 3000);
                }}>
                {/* <Image source={
                    type === '1' ? isWin ? require('../assets/LuckyBox/gif/luckyBoxCard1.gif') : require('../assets/LuckyBox/png/luckBoxG.png') :
                        type === '2' ? isWin ? require('../assets/LuckyBox/gif/luckyBoxCard2.gif') : require('../assets/LuckyBox/png/luckyBoxB.png') :
                            type === '3' ? isWin ? require('../assets/LuckyBox/gif/luckyBoxCard3.gif') : require('../assets/LuckyBox/png/luckBoxR.png') :
                                isWin ? require('../assets/LuckyBox/gif/luckyBoxCard4.gif') : require('../assets/LuckyBox/png/luckyBoxBlue.png')
                } resizeMode={isWin ? 'center' : 'contain'} style={{ width: '80%', height: '80%', }} /> */}

                <FastImage
                    key={imageSource}
                    source={imageSource}
                    resizeMode={isWin ? FastImage.resizeMode.contain : FastImage.resizeMode.contain}
                    style={{ width: '80%', height: '80%' }}
                />
                {/* <Text style={{ color: 'red' }}>{winningAmount}</Text> */}
            </TouchableOpacity>

            {/* <Image source={require('../assets/luckyBoxBack.png')} resizeMode='center' style={{ width: '100%', height: '100%', position: 'absolute' }} /> */}
        </View>
    );
};

// 7756B1   1b
// 240332   2inside
// 36105A   3main

export default LuckyBoxComponent;
