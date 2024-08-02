import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated, StyleProp, ViewStyle } from 'react-native';

interface CardProps {
  cardSize?: number;
  dotSize?: number;
  animationDuration?: number;
  cardStyle?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
}

const Card: React.FC<CardProps> = ({
  cardSize = 200,
  dotSize = 10,
  animationDuration = 5000,
  cardStyle,
  dotStyle,
}) => {
  const moveAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(moveAnimation, {
        toValue: cardSize * 2, // Move twice the card size for full border traversal
        duration: animationDuration,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => animation.stop(); // Clean up animation on unmount
  }, [cardSize, animationDuration]);

  const calculateDotPosition = (value: number) => {
    const isHorizontal = value <= cardSize;
    const offset = isHorizontal ? value : value - cardSize;
    return {
      left: isHorizontal ? offset : cardSize - dotSize,
      top: isHorizontal ? 0 : offset - cardSize,
    };
  };

  return (
    <View style={[styles.card, cardStyle]}>
      {/* Card content */}
      <Animated.View
        style={[
          styles.dot,
          calculateDotPosition(moveAnimation),
          dotStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
  },
});

export default Card;
