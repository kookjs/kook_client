import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from "redux-thunk";
import invariant from 'redux-immutable-state-invariant';
// import reducer from './reducers';
// import * as actionCreators from '../actions/counter'; 

import { combineReducers } from 'redux';
import counter from './actions/reducers/counter';
import { routeReducer } from '@kookjs-client/route/redux/reducers'
import { RouteActionTypes } from '@kookjs-client/route/redux/types'

export type AppActions = RouteActionTypes

const rootReducer = combineReducers({
  counter,
  routes: routeReducer
});

export type AppState = ReturnType<typeof rootReducer>;


export default function configureStore(preloadedState) {
  const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
  const store = createStore(rootReducer, preloadedState, composeEnhancers(
    // applyMiddleware(invariant(), thunk)
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
  ));

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     store.replaceReducer(require('../reducers').default)
  //   });
  // }

  return store;
}
