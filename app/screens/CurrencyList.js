import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, View, StatusBar } from 'react-native';

import { ListItem, Separator } from '../components/List';
import currenciesArray from '../data/currencies';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';

const TEMP_CURRENT_CURRENCY = 'CAD';

@connect()
class CurrencyList extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func,
    }),
    dispatch: PropTypes.func,
  }

  handlePress = (currency) => {
    const { type } = this.props.navigation.state.params;
    if (type === 'base') {
      this.props.dispatch(changeBaseCurrency(currency));
    } else if (type === 'quote') {
      this.props.dispatch(changeQuoteCurrency(currency));
    }
    this.props.navigation.goBack(null);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" translucent={false} />
        <FlatList
          data={currenciesArray}
          renderItem={({ item }) => (
            <ListItem
              text={item}
              selected={item === TEMP_CURRENT_CURRENCY}
              onPress={() => this.handlePress(item)}
            />
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

export default CurrencyList;
