import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Action, applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleWare, { ThunkMiddleware } from 'redux-thunk';
import App from './components/App/App';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { rootReducer, RootState, reduxStateInitial } from './state/rootReducer';

// undefined if browser does not have redux devtools installed
const reduxDevtoolsCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const enhancersThunk = applyMiddleware(thunkMiddleWare as ThunkMiddleware<RootState, Action>)

const store = createStore(
  rootReducer,
  reduxStateInitial as any,
  compose(enhancersThunk, ...reduxDevtoolsCompose ? [reduxDevtoolsCompose()] : [], )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
