import React from 'react';
import { Image, Text, View } from 'react-native';
interface myProps {
    WiningAmount: number;
}

const tempWiningsComponent: React.FC<myProps> = ({ WiningAmount }) => {
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                <Image
                    source={{
                        uri: 'https://cdn.pixabay.com/animation/2023/08/17/08/51/08-51-41-992_512.gif',
                    }}
                    resizeMode='cover'
                    style={{ width: '100%', height: '100%' }}
                />

                <View
                    style={{
                        borderRadius: 10,
                        position: 'absolute',
                        width: '70%', height: '30%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >

                    <Text style={{ width: '100%', color: 'white', textAlign: 'center', marginTop: 20, fontWeight: 'bold', fontSize: 29 }}>YOU WON</Text>
                    <Text style={{ width: '100%', color: 'white', textAlign: 'center', marginTop: 20 }}>{WiningAmount}</Text>

                </View>

            </View>
        </View>
    );
};

export default tempWiningsComponent;
