import { takeEvery, select, call, put } from 'redux-saga/effects';

import {
  SWAP_CURRENCY,
  CHANGE_BASE_CURRENCY,
  GET_INITIAL_CONVERSION,
  CONVERTION_RESULT,
  CONVERTION_ERROR,
} from '../actions/currencies';

const getLatestRate = currency => fetch(`https://api.fixer.io/latest?base=${currency}`);

function* fetchLatestConversionRates(action) {
  try {
    let { currency } = action;
    if (!currency) {
      currency = yield select(state => state.currencies.baseCurrency);
    }
    const response = yield call(getLatestRate, currency);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: CONVERTION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERTION_RESULT, result });
    }
  } catch (e) {
    yield put({ type: CONVERTION_ERROR, error: e.message });
  }
}

export default function* rootSaga() {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
  yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
}
