import ReactDOM from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import App from './client/components/app';
import reducers from './client/reducers';

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


