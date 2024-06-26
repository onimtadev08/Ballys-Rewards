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
        borderRadius: 10,
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    signin: {
        margin: 10,
        borderWidth: 2,
        padding: 15,
        borderRadius: 20,
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default GradientButtonWithBorder;
