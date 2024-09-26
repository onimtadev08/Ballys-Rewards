import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import AnimatedBorderView from 'react-native-animated-border-view';

interface VariantProps {
  width: number;
  height: number;
  borderRadius: number;
  sliderWidth: number;
  sliderHeight: number;
  delayInAnimation: number;
  pathColor: string;
  sliderColor: string;
  innerContainerColor: string;
  text: string;
}

const CardViewGlow: React.FC = () => {
  const variants: VariantProps[] = [
    {
      width: 150,
      height: 150,
      borderRadius: 75,
      sliderWidth: 60,
      sliderHeight: 6,
      delayInAnimation: 5000,
      pathColor: '#B0E0E6', // Light Steel Blue
      sliderColor: '#FF4500', // Deep Sky Blue
      innerContainerColor: '#4682B4', // Steel Blue
      text: 'Variant 0',
    },
    {
      width: 180,
      height: 50,
      borderRadius: 25,
      sliderWidth: 80,
      sliderHeight: 5,
      delayInAnimation: 3000,
      pathColor: '#DDA0DD', // Plum
      sliderColor: '#DA70D6', // Orchid
      innerContainerColor: '#9370DB', // Medium Purple
      text: 'Variant 1',
    },
    // ... other variants
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {variants.map((variant, index) => (
        <View key={index} style={styles.variantContainer}>
          <AnimatedBorderView {...variant}>
            <View style={styles.view}>
              <Text style={styles.text}>{variant.text}</Text>
            </View>
          </AnimatedBorderView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  variantContainer: {
    marginVertical: 10,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
  },
});

export default CardViewGlow;