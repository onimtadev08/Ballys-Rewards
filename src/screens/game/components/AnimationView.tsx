import LottieView from 'lottie-react-native';
import React, { memo, useEffect, useRef, useState, type FC } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AnimatedLottieView from './AnimatedLottieView';
import { useCount, useCountDown, useInitialState } from '../hooks';
import { Line, Svg } from 'react-native-svg';

interface AnimationViewProps {
  duration: number;
  onBetStart: () => void;
  onBetFinished: (count: number) => void;
}
const AnimatedLine = Animated.createAnimatedComponent(Line);
const { width } = Dimensions.get('window');

const AnimationView: FC<AnimationViewProps> = (props) => {
  const animateX = useRef(new Animated.Value(0));
  const sky = useRef<LottieView>(null);
  const explord = useRef<LottieView>(null);
  const [destroyed, setDestoryed] = useState<boolean>(false);
  const [isLoaded, setLoaded] = useState<boolean | undefined>(undefined);

  const countNumber = useCount(isLoaded ?? false);

  useCountDown(() => {
    props.onBetStart();
  });

  useInitialState(() => {
    if (isLoaded) {
      sky.current?.play();
      Animated.timing(animateX.current, {
        toValue: 200,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setLoaded(false);
        animateX.current.stopAnimation(() => {
          explord.current?.play(0, 18);
          sky.current?.pause();
          setDestoryed(true);
        });
      }, props.duration);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (destroyed) props.onBetFinished(Number(countNumber.toFixed(2)));
  }, [destroyed]);

  // Rocket Line Interpolate
  const interpolateAnimateX = animateX.current.interpolate({
    inputRange: [0, 200],
    outputRange: [-100, width - 100],
  });

  const interpolateAnimateY = animateX.current.interpolate({
    inputRange: [0, 200],
    outputRange: [180, -23],
  });
  // Measure Line Interpolate
  const interpolateAnimateLineX = animateX.current.interpolate({
    inputRange: [0, 200],
    outputRange: [0.710807, width + 100],
  });

  const interpolateAnimateLineY = animateX.current.interpolate({
    inputRange: [0, 200],
    outputRange: [217, width > 500 ? 10 : -27],
  });

  const interpolateAnimateLineLength = animateX.current.interpolate({
    inputRange: [0, 200],
    outputRange: [width + 20, 0],
  });

  return (
    <View style={{ height: 250, backgroundColor: '#2f3046' }}>
      <AnimatedLottieView
        ref={sky}
        source={require('../assets/sky.json')}
        style={styles.sky}
      />

      <Svg height={220} style={{ position: 'absolute', width: width }}>
        <AnimatedLine
          x1="0.710807"
          y1="217"
          x2={interpolateAnimateLineX}
          y2={interpolateAnimateLineY}
          stroke={'#ede089'}
          strokeWidth={4}
          strokeLinecap={'round'}
          strokeDasharray={width}
          strokeDashoffset={interpolateAnimateLineLength}
        />
      </Svg>

      <Text
        style={{
          color: '#ffff',
          position: 'absolute',
          right: 15,
          bottom: 30,
          fontWeight: 'bold',
          fontSize: 30,
        }}
      >
        {countNumber.toFixed(2)}x
      </Text>

      <View style={styles.measureLine}>
        {Array.from([1, 2, 3, 4, 5]).map((_, i) => (
          <View key={i} style={styles.measureDots} />
        ))}
      </View>

      <AnimatedLottieView
        autoPlay
        source={require('../assets/rocket.json')}
        style={[
          styles.rocket,
          {
            opacity: destroyed ? 0 : 1,
            transform: [
              { translateX: interpolateAnimateX },
              { translateY: interpolateAnimateY },
            ],
          },
        ]}
      />
      <AnimatedLottieView
        ref={explord}
        loop={false}
        source={require('../assets/explord.json')}
        style={[
          styles.rocket,
          {
            position: 'absolute',
            transform: [
              { translateX: interpolateAnimateX },
              { translateY: interpolateAnimateY },
            ],
          },
        ]}
      />
      {isLoaded === undefined ? (
        <AnimatedLottieView
          autoPlay
          loop={false}
          source={require('../assets/counter.json')}
          style={styles.counter}
          onAnimationFinish={() => {
            setLoaded(true);
          }}
        />
      ) : null}
    </View>
  );
};

export default memo(AnimationView);

const styles = StyleSheet.create({
  counter: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 58,
    left: width / 2 - 50,
  },
  sky: {
    width: width,
    height: 220,
    position: 'absolute',
    // bottom: 18,
  },
  rocket: {
    width: 110,
    height: 110,
  },
  measureLine: {
    position: 'absolute',
    width,
    height: 30,
    borderTopColor: '#ffff',
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  measureDots: {
    width: 5,
    height: 5,
    backgroundColor: '#ffff',
    marginTop: 10,
    borderRadius: 5,
  },
});
