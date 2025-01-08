import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
interface myProps {
    onPress: (Win: number, isWin: boolean) => void
    type: string;
    isDisabled: boolean;
    winnings: boolean;
    winningAmount: number;
}


const LuckyBoxComponent: React.FC<myProps> = ({
    onPress, // Fix the typo here
    type,
    isDisabled,
    winnings,
    winningAmount,
}) => {

    const [isWin, setisWin] = React.useState(false);


    React.useEffect(() => {


        if (isWin) {
            setTimeout(() => {
                setisWin(false);
            }, 3000);
        }
    }, [isWin]);

    const imageSource = type === '1' ? isWin ? require('../assets/LuckyBox/gif/luckyBoxCard1.gif') : require('../assets/LuckyBox/png/luckBoxG.png') :
        type === '2' ? isWin ? require('../assets/LuckyBox/gif/luckyBoxCard2.gif') : require('../assets/LuckyBox/png/luckyBoxB.png') :
            type === '3' ? isWin ? require('../assets/LuckyBox/gif/luckyBoxCard3.gif') : require('../assets/LuckyBox/png/luckBoxR.png') :
                isWin ? require('../assets/LuckyBox/gif/luckyBoxCard4.gif') : require('../assets/LuckyBox/png/luckyBoxBlue.png');

    React.useEffect(() => {



    }, [imageSource]);


    return (
        <View
            style={{
                height: '100%',
                borderWidth: 1,
                borderColor: 'gold',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
            }}>

            <TouchableOpacity disabled={isDisabled} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
                onPress={() => {
                    setisWin(!isWin);
                    onPress(winningAmount, winnings);
                }}
            >
                {/* <Image source={
                    type === '1' ? isWin ? require('../assets/LuckyBox/gif/luckyBoxCard1.gif') : require('../assets/LuckyBox/png/luckBoxG.png') :
                        type === '2' ? isWin ? require('../assets/LuckyBox/gif/luckyBoxCard2.gif') : require('../assets/LuckyBox/png/luckyBoxB.png') :
                            type === '3' ? isWin ? require('../assets/LuckyBox/gif/luckyBoxCard3.gif') : require('../assets/LuckyBox/png/luckBoxR.png') :
                                isWin ? require('../assets/LuckyBox/gif/luckyBoxCard4.gif') : require('../assets/LuckyBox/png/luckyBoxBlue.png')
                } resizeMode={isWin ? 'center' : 'contain'} style={{ width: '80%', height: '80%', }} /> */}


                <Image key={imageSource} source={imageSource} resizeMode={isWin ? 'center' : 'contain'} style={{ width: '80%', height: '80%', }} />
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


