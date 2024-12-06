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
};

let Recentdata: recentCount[] = [];
let index: number = 0;
const WiningComponent: React.FC<myProps> = ({
    WiningAmount,
    onRetry
}) => {


    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0.5)',
            }}>


            <View style={{ width: '100%', height: '100%', position: 'absolute' }} >

                <Image source={require('../assets/congratz.png')} resizeMode='contain' style={{ width: '100%', height: '50%' }} />


                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
                    <Image source={require('../assets/wining.png')} style={{ width: '100%', position: 'absolute' }} resizeMode='contain' />
                    <Text style={{ color: 'white' }}>YOU WIN</Text>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{ThousandSeparator(WiningAmount.toString())}</Text>



                </View>


                <GradientButton
                    title="RETRY"
                    onPress={() => {
                        onRetry();
                    }}
                    colors={['transparent', 'transparent', 'transparent']}
                    buttonStyle={{}}
                    textStyle={{ fontSize: 18 }} borderColor={''} />


            </View>







        </View>
    );
};

// 7756B1   1b
// 240332   2inside
// 36105A   3main

export default WiningComponent;


