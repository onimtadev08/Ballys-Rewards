import LottieView, { type AnimationObject } from 'lottie-react-native';
import React, { forwardRef, memo } from 'react';
import { Animated, type StyleProp, type ViewStyle } from 'react-native';

const AnimateLottieView = Animated.createAnimatedComponent(LottieView);

interface AnimatedLottieViewProps {
  loop?: boolean;
  autoPlay?: boolean;
  source: string | AnimationObject | { uri: string };
  style: StyleProp<ViewStyle>;
  onAnimationFinish?: () => void;
}

const AnimatedLottieView = forwardRef<LottieView, AnimatedLottieViewProps>(
  (props, ref) => {
    return (
      <AnimateLottieView
        ref={ref}
        loop={props.loop}
        autoPlay={props.autoPlay}
        hardwareAccelerationAndroid={true}
        cacheComposition
        enableMergePathsAndroidForKitKatAndAbove
        useNativeLooping
        source={props.source}
        style={props.style}
        resizeMode={'cover'}
        onAnimationFinish={() => {
          props.onAnimationFinish && props.onAnimationFinish();
        }}
      />
    );
  }
);

export default memo(AnimatedLottieView);
