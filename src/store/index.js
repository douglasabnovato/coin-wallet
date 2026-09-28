/* Store Redux com thunk e persistência local da carteira (e-mail e despesas) */
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from '../reducers';
import { loadState, saveState } from './persist';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, loadState(), composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => saveState(store.getState()));

export default store;
/* Fim de store/index.js */
