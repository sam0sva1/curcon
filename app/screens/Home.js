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

const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '5873';
const TEMP_CONVERSION_RATE = 58.73;
const TEMP_CONVERSION_DATE = new Date();


const mapStateToProps = (state) => {
  const { amount, baseCurrency, quoteCurrency, conversions } = state.currencies;
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
  };
};

@connect(mapStateToProps)
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
  }
  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Base Currency' });
  }

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency' });
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
    const { baseCurrency, quoteCurrency, amount, conversionRate, isFetching, lastConvertedDate } = this.props;
    let quotePrice = (amount * conversionRate).toFixed(2).toString();
    if (isFetching) {
      quotePrice = '...';
    }

    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding" >
          <Logo />
          <InputWithButton
            buttonText={baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={String(amount)}
            keyboardType="numeric"
            onChangeText={this.handleChangeText}
          />
          <InputWithButton
            buttonText={quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            defaultValue={quotePrice}
            editable={false}
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

export default HomeScreen;
