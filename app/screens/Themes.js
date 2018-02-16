import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { ListItem, Separator } from '../components/List';
import { changePrimeryColor } from '../actions/theme';


const styles = EStyleSheet.create({
  $blue: '$primeryBlue',
  $orange: '$primeryOrange',
  $green: '$primeryGreen',
  $purple: '$primeryPurple',
});

@connect()
class Themes extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func,
    }),
    dispatch: PropTypes.func,
  }

  handlerThemePress = (color) => {
    this.props.dispatch(changePrimeryColor(color));
    this.props.navigation.goBack();
  }

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text="Blue"
          onPress={() => this.handlerThemePress(styles.$blue)}
          selected
          checkmark={false}
          iconBackground={styles.$blue}
        />
        <Separator />
        <ListItem
          text="Orange"
          onPress={() => this.handlerThemePress(styles.$orange)}
          selected
          checkmark={false}
          iconBackground={styles.$orange}
        />
        <Separator />
        <ListItem
          text="Green"
          onPress={() => this.handlerThemePress(styles.$green)}
          selected
          checkmark={false}
          iconBackground={styles.$green}
        />
        <Separator />
        <ListItem
          text="Purple"
          onPress={() => this.handlerThemePress(styles.$purple)}
          selected
          checkmark={false}
          iconBackground={styles.$purple}
        />
        <Separator />
      </ScrollView>
    );
  }
}

export default Themes;
