import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import moment from 'moment';
import { ThousandSeparator } from '../../../utilitis/utilities';
import GradientButton from '../../../components/GradientButton.tsx';
interface myProps {
    onPress: (Win: number, isWin: boolean) => void
}


const LuckyBoxComponent: React.FC<myProps> = ({
    onPress
}) => {

    const [isWin, setisWin] = React.useState(false);


    React.useEffect(() => {
        if (isWin) {
            setTimeout(() => {
                setisWin(false);
            }, 3000);
        }
    }, [isWin]);


    return (
        <View
            style={{
                width: '100%',
                height: '100%',
            }}>

            <TouchableOpacity disabled={isWin} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
                onPress={() => {
                    setisWin(!isWin);
                    setTimeout(() => {
                        onPress(1000, true);
                    }, 2000)
                }}
            >
                <Image source={isWin ? require('../assets/gif/luckyBoxWin.gif') : require('../assets/gif/luckyBox.gif')} resizeMode='center' style={{ width: '150%', height: '150%' }} />
            </TouchableOpacity>

            <Image source={require('../assets/luckyBoxBack.png')} resizeMode='center' style={{ width: '100%', height: '100%', position: 'absolute' }} />
        </View>
    );
};

// 7756B1   1b
// 240332   2inside
// 36105A   3main

export default LuckyBoxComponent;


