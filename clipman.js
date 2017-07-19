const ReactDOM = require('react-dom');
const React = require('react');
const { createStore, applyMiddleware } = require('redux');
const { Provider } = require('react-redux');
const thunkMiddleware = require('redux-thunk').default;
const App = require('./client/components/app');
const reducers = require('./client/reducers');

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


