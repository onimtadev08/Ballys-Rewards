import React, { type FC } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

interface CustomTextFeildProps {
  containerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  title: string;
  value?: string;
  placeholder?: string;
  disable?: boolean;
  onChangeText: (value: string) => void;
}

const CustomTextFeild: FC<CustomTextFeildProps> = (props) => {
  return (
    <View style={[styles.mainContiner, props.containerStyle]}>
      <Text style={[styles.title, props.titleTextStyle]}>{props.title}</Text>
      <TextInput
        editable={!props.disable}
        style={[styles.textInput, props.textInputStyle]}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </View>
  );
};

export default CustomTextFeild;

const styles = StyleSheet.create({
  mainContiner: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  title: {
    color: '#6c6e84',
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#ffff',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
