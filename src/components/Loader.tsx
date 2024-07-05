import React from "react";
import { ActivityIndicator, View, Text } from 'react-native'

const Loader: React.FC = ({ }) => {
    return (
        <View
            style={{
                position: 'absolute',
                width: 120,
                height: 100,
                backgroundColor: 'rgba(0,0,0,0.4)',
                top: '50%',
                bottom: 0,
                left: '36%',
                borderRadius: 10,
            }}>
            <ActivityIndicator
                animating={true}
                size={'large'}
                color={'white'}
                style={{ top: 20 }}
            />
            <Text style={{ left: '18%', marginTop: 20, color: 'white' }}>
                Please wait
            </Text>
        </View>
    );
}
export default Loader;