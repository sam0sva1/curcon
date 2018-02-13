import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Home from './screens/Home';

EStyleSheet.build({
  $primeryBlue: '#4F6D7A',
  $white: '#FFF',
  $border: '#E2E2E2',
  $inputText: '#797979',
  $lightGrey: '#F0F0F0',
});


export default () => <Home />;
