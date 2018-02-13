import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const Conteiner = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      {children}
    </View>
  </TouchableWithoutFeedback>
);

Conteiner.propTypes = {
  children: PropTypes.any,
};

export default Conteiner;
