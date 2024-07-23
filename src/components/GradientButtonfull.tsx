import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientButtonProps {
    title: string;
    onPress: () => void;
    colors: string[];
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
}

const GradientButton: React.FC<GradientButtonProps> = ({
    title,
    onPress,
    colors,
    textStyle,
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ width: '100%' }}>
            <LinearGradient colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.signup}>
                <Text style={styles.buttonText}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    signup: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 13,
        borderRadius: 5,
    },

    buttonText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default GradientButton;
