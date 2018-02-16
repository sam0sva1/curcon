import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Button';
import { LastConterted } from '../components/Text';
import { Header } from '../components/Header';

import { swapCurrency, changeCurrencyAmount } from '../actions/currencies';


class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string,
    amount: PropTypes.number,
    conversionRate: PropTypes.number,
    isFetching: PropTypes.bool,
    lastConvertedDate: PropTypes.object,
    primeryColor: PropTypes.string,
  }
  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' });
  }

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' });
  }

  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  }

  handleChangeText = (amount) => {
    this.props.dispatch(changeCurrencyAmount(amount));
  }

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options');
  }

  render() {
    const { baseCurrency, quoteCurrency, amount, conversionRate, isFetching, lastConvertedDate, primeryColor } = this.props;
    let quotePrice = (amount * conversionRate).toFixed(2).toString();
    if (isFetching) {
      quotePrice = '...';
    }

    return (
      <Container backgroundColor={primeryColor}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding" >
          <Logo tintColor={primeryColor} />
          <InputWithButton
            buttonText={baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={String(amount)}
            keyboardType="numeric"
            onChangeText={this.handleChangeText}
            textColor={primeryColor}
          />
          <InputWithButton
            buttonText={quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            defaultValue={quotePrice}
            editable={false}
            textColor={primeryColor}
          />
          <LastConterted
            base={baseCurrency}
            quote={quoteCurrency}
            date={lastConvertedDate}
            conversionRate={conversionRate.toFixed(2)}
          />
          <ClearButton text="Reverse Currencies" onPress={this.handleSwapCurrency} />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    currencies: { amount, baseCurrency, quoteCurrency, conversions },
    theme: { primeryColor },
  } = state;
  const conversionSelector = conversions[baseCurrency] || {};
  const { isFetching } = conversionSelector;
  const conversionRate = (conversionSelector.rates || {})[quoteCurrency] || 0;
  const lastConvertedDate = conversionSelector.date ? new Date(conversionSelector.date) : new Date();

  return {
    amount,
    baseCurrency,
    quoteCurrency,
    conversionRate,
    isFetching,
    lastConvertedDate,
    primeryColor,
  };
};

export default connect(mapStateToProps)(HomeScreen);
