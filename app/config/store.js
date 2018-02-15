import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import reducers from '../reducers';

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default createStore(reducers, applyMiddleware(...middlewares));
