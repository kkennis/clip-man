const { combineReducers } = require('redux');
const modeReducer = require('./mode');
const clipsReducer = require('./clips');
const searchReducer = require('./search');
const focusReducer = require('./focus');

module.exports = combineReducers({
    mode: modeReducer,
    clips: clipsReducer,
    search: searchReducer,
    focus: focusReducer
});