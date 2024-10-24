import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

interface GradientButtonProps {
    title: string;
    onPress: () => void;
}

const SmallButton: React.FC<GradientButtonProps> = ({
    title,
    onPress,
}) => {
    return (
        <TouchableOpacity style={{ height: 30, alignItems: 'center', justifyContent: 'center' }} onPress={onPress}>
            <Image source={require('../images/svgtopng/Button.png')}
                style={{ width: '100%', height: '100%' }} resizeMode='contain' />
            <Text style={{ position: 'absolute', width: '100%', textAlign: 'center',fontSize:12 }}>{title}</Text>
        </TouchableOpacity>
    );
};

export default SmallButton;
