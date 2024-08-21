import React from "react";
import { ActivityIndicator, View, Text } from 'react-native'
import { BlurView } from "@react-native-community/blur";

const Loader: React.FC = ({ }) => {
    return (
        <BlurView style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
        }}
            blurAmount={5}
            blurType='dark'
            reducedTransparencyFallbackColor='white'
        >
            <View
                style={{
                    position: 'absolute',
                    width: 200,
                    height: 200,
                    overflow: 'hidden',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    // backgroundColor:'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '30%',

                    // left: '36%',
                    borderRadius: 10,
                }}>
                <ActivityIndicator
                    animating={true}
                    size={'large'}
                    color={'gold'}
                    style={{ top: 20, height: 100, width: 100 }}
                />
                <Text style={{ marginTop: 20, color: 'white', fontSize: 20 }}>
                    Please wait
                </Text>
            </View>
        </BlurView >
    );
}
export default Loader;