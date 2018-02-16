import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';


const Conteiner = ({ children, backgroundColor }) => {
  const containerStyles = [
    styles.container,
    backgroundColor ? { backgroundColor } : null,
  ];

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={containerStyles}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

Conteiner.propTypes = {
  children: PropTypes.any,
  backgroundColor: PropTypes.string,
};

export default Conteiner;
