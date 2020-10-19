import React from "react";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Container from './containers/Container';
import rootReducer from './reducers/rootReducer';
import initialState from './model/initialState';
import { actionLoadState } from './api/apiAxios';

import { saveState } from './model/localStorage';

const store = createStore(rootReducer, initialState, applyMiddleware(thunk), window.devToolsExtension && window.devToolsExtension());

store.dispatch(actionLoadState());

store.subscribe(() => saveState(store.getState()));

export default function ProviderReducer () {

  return (
	  <Provider store={store} >
	    <Container />
	  </Provider>
	);
}
