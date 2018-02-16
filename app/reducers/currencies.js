import { SWAP_CURRENCY, CHANGE_CURRENCY_AMOUNT, CHANGE_BASE_CURRENCY, CHANGE_QUOTE_CURRENCY } from '../actions/currencies';


const initialState = {
  baseCurrency: 'RUB',
  quoteCurrency: 'USD',
  amount: 100,
  conversions: {},
};

const setConvertions = (state, action) => {
  let conversion = {
    isFetching: true,
    data: '',
    rates: {},
  };

  if (state.conversions[action.currency]) {
    conversion = state.conversions[action.currency];
  }

  return {
    ...state,
    [action.currency]: conversion,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY_AMOUNT:
      return {
        ...state,
        amount: action.amount || 0,
      };
    case SWAP_CURRENCY:
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency,
      };
    case CHANGE_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.currency,
        conversions: setConvertions(state, action),
      };
    case CHANGE_QUOTE_CURRENCY:
      return {
        ...state,
        quoteCurrency: action.currency,
        conversions: setConvertions(state, action),
      };
    default:
      return state;
  }
};

export default reducer;
