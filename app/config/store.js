import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import logger from 'redux-logger';

import reducers from '../reducers';
import rootSaga from './sagas';

const NavMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const SagaMiddleware = createSagaMiddleware();

const middlewares = [
  SagaMiddleware,
  NavMiddleware,
];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middlewares));

SagaMiddleware.run(rootSaga);

export default store;
