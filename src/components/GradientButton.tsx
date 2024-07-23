import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
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
        <TouchableOpacity onPress={onPress} style={[styles.signin, { borderColor }, buttonStyle]}>
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        borderWidth: 2,
        alignItems: 'center',
    },
    signin: {
        width: '100%',
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 10,
        textAlign: 'center',
    },
});

export default GradientButtonWithBorder;
