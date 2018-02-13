import React, { Component } from 'react';
import { View, Text, Keyboard, Animated, Platform } from 'react-native';
import { AnimatedImageBackground } from '../Animated';

import styles from './styles';

const ANIMATION_DURATION = 250;

// const AnimatedImageBackground = (props) => {
//   const { children, source, style, ...rest } = props;

//   return (
//     <Animated.View
//       style={style}
//     >
//       <Animated.Image
//         {...rest}
//         source={source}
//         style={[
//           StyleSheet.absoluteFill,
//           style,
//         ]}
//       />
//       { children }
//     </Animated.View>
//   );
// };

class Logo extends Component {
  constructor(props) {
    super(props);

    this.containerImageWidth = new Animated.Value(styles.$largeContainerSize);
    this.imageWidth = new Animated.Value(styles.$largeImageSize);
  }
  componentDidMount() {
    const showListener = (Platform.OS === 'android') ? 'keyboardDidShow' : 'keyboardWillShow';
    const hideListener = (Platform.OS === 'android') ? 'keyboardDidHide' : 'keyboardWillHide';

    this.keyboardShowListener = Keyboard.addListener(showListener, this.keyboardShow);
    this.keyboardHideListener = Keyboard.addListener(hideListener, this.keyboardHide);
  }

  componentWillUpdate() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  keyboardShow = () => {
    Animated.parallel([
      Animated.timing(this.containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  };

  keyboardHide = () => {
    Animated.parallel([
      Animated.timing(this.containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION,
      }),
    ]).start();
  };

  render() {
    const containerImageStyle = [
      styles.containerImage,
      { width: this.containerImageWidth, height: this.containerImageWidth },
    ];

    const imageStyle = [
      styles.logo,
      { width: this.imageWidth, height: this.imageWidth },
    ];

    return (
      <View style={styles.container}>
        <AnimatedImageBackground
          resizeMode="contain"
          source={require('./images/background.png')}
          style={containerImageStyle}
        >
          <Animated.Image
            resizeMode="contain"
            source={require('./images/logo.png')}
            style={imageStyle}
          />
        </AnimatedImageBackground>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
    );
  }
}

export default Logo;
