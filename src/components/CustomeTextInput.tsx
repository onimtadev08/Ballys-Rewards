import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

interface CustomeTextInputProps extends TextInputProps {
    disable?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
}

const CustomeTextInput: FC<CustomeTextInputProps> = props => {
    const { disable, containerStyle } = props;
    return (
        <View
            pointerEvents={disable ? 'none' : 'auto'}
            style={[styles.mainContainer, containerStyle]}>
            <TextInput
                placeholderTextColor={'#63666b'}
                style={{
                    height: 36,
                    paddingTop: 10,
                    paddingLeft: 15,
                    fontFamily: 'Asap-Regular',
                    color: '#000',
                    textAlignVertical: 'center',
                }}
                {...props}
            />
        </View>
    );
};

export default CustomeTextInput;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#E8E8E8',
        width: 273,
        height: 35,
    },
});
