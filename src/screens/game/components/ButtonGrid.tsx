import React, { type FC } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ColorValue,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

interface ButtonGridProp {
  disable?: boolean;
  numberList: number[];
  onPress: (value: number) => void;
  onPlaceBetPress: Function;
  onTakeWinningPress: Function;
  containerStyle?: StyleProp<ViewStyle>;
}

const { width } = Dimensions.get('window');

const ButtonGrid: FC<ButtonGridProp> = (props) => {
  const getContainerColor = (item: number): ColorValue => {
    if (item === 0 && !props.disable) {
      return '#810117';
    } else if (item === 0 && props.disable) {
      return '#590110';
    } else if (props.disable) {
      return '#222442';
    } else {
      return '#37395d';
    }
  };

  const renderItem = ({ item }: { item: number }) => {
    return (
      <TouchableOpacity
        disabled={props.disable}
        onPress={() => props.onPress(item)}
      >
        <View
          style={[
            styles.rowItemContainer,
            { backgroundColor: getContainerColor(item) },
          ]}
        >
          <Text
            style={{
              color: '#ffff',
              fontWeight: item === 0 ? 'bold' : 'normal',
            }}
          >
            {item === 0 ? 'X' : item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const buttonContainer = (color: string, title: string) => {
    return (
      <View style={[styles.buttonContainer, { backgroundColor: color }]}>
        <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.mainContainer, props.containerStyle]}>
      <View style={styles.list}>
        <FlatList
          data={[...props.numberList, 0]}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
          numColumns={4}
        />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => props.onPlaceBetPress()}>
          {buttonContainer('#f06414', 'Place a bet')}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.onTakeWinningPress()}>
          {buttonContainer('#7d2e45', 'Take a winnings')}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtonGrid;

const styles = StyleSheet.create({
  mainContainer: {
    height: 170,
    marginTop: 5,
  },
  list: {
    alignItems: 'center',
  },
  rowItemContainer: {
    flex: 1,
    width: 94,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 2,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginHorizontal: 11,
  },
  buttonContainer: {
    width: width / 2 - 14,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
