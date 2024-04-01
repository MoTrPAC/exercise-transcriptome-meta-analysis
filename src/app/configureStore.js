import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import monitorReducersEnhancer from './enhancers/monitorReducer';
import loggerMiddleware from './middleware/logger';
import rootReducer from './reducers';

export default function configureStore(preloadedState) {
  const middlewares = process.env.NODE_ENV !== 'production' ? [loggerMiddleware, thunk] : [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}
