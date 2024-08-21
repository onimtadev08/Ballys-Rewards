import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientButtonProps {
    title: string;
    onPress: () => void;
    colors: string[];
    borderColor: string;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
}

const GradientButtonWithBorder: React.FC<GradientButtonProps> = ({
    title,
    onPress,
    colors,
    borderColor,
    buttonStyle,
    textStyle,
}) => {
    return (
        // <TouchableOpacity onPress={onPress} style={[styles.signin]}>

        //     <Image source={require('../images/svgtopng/SubmitIconPng.png')}
        //         style={{ width: '100%',height:30 }} resizeMode='center' />
        //     <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        //     {/* <LinearGradient
        //         colors={colors}
        //         start={{ x: 0, y: 0 }}
        //         end={{ x: 1, y: 1 }}>

        //     </LinearGradient> */}
        // </TouchableOpacity>
        <TouchableOpacity style={{ height: 55, width: '100%', justifyContent: 'center' }} onPress={onPress}>
            <Image source={require('../images/svgtopng/Button.png')}
                style={{ width: '100%', height: '100%' }} resizeMode='contain' />
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    signin: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '10%',
    },

    buttonText: {
        fontSize: 20,
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
});

export default GradientButtonWithBorder;
