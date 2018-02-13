import React from 'react';
import { Animated, StyleSheet } from 'react-native';


const AnimatedImageBackground = (props) => {
  const { children, source, style, ...rest } = props;

  return (
    <Animated.View
      style={style}
    >
      <Animated.Image
        {...rest}
        source={source}
        style={[
          StyleSheet.absoluteFill,
          style,
        ]}
      />
      { children }
    </Animated.View>
  );
};

export default AnimatedImageBackground;
