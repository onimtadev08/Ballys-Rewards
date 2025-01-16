import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image'
interface myProps {
    WiningAmount: number;
    isWinn: boolean
}

const tempWiningsComponent: React.FC<myProps> = ({ WiningAmount, isWinn }) => {
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 10,
            }}>
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                {isWinn ?
                    <FastImage
                        source={{
                            uri: 'https://cdn.pixabay.com/animation/2023/08/17/08/51/08-51-41-992_512.gif',
                            priority: FastImage.priority.normal,
                            cache: FastImage.cacheControl.immutable,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={{ width: '100%', height: '100%' }}
                    />
                    :
                    null
                }

                <View
                    style={{
                        borderRadius: 10,
                        position: 'absolute',
                        width: '50%', height: '50%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >

                    <Text style={{ width: '100%', color: 'white', textAlign: 'center', marginTop: 10, fontWeight: 'bold', fontSize: 12 }}>{isWinn ? 'YOU WON' : ''}</Text>
                    <Text style={{ width: '100%', color: 'white', textAlign: 'center', marginTop: 10 }}>{WiningAmount}</Text>

                </View>

            </View>
        </View>
    );
};

export default React.memo(tempWiningsComponent);
