import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { BackHandler } from 'react-native';


import Navigator from '../../config/routes';

const addListener = createReduxBoundAddListener('root');

class ReduxNavigation extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    nav: PropTypes.shape({
      routes: PropTypes.arrayOf(PropTypes.object),
    }),
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
      addListener,
    });

    return <Navigator navigation={navigation} />;
  }
}

const AppWithNavigation = connect(state => ({ nav: state.nav }))(ReduxNavigation);

export default AppWithNavigation;
