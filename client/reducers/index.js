const { combineReducers } = require('redux');
const modeReducer = require('./mode');
// const clipsReducer = require('./clips');
const searchReducer = require('./search');

module.exports = combineReducers({
    mode: modeReducer,
    // clips: clipsReducer,
    search: searchReducer
});