import { createStore, applyMiddleware } from 'redux';
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import logger from 'redux-logger';

import reducers from '../reducers';

const NavMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const middlewares = [
  NavMiddleware,
];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default createStore(reducers, applyMiddleware(...middlewares));
