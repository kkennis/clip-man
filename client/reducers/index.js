import { combineReducers } from 'redux';
import modeReducer from './mode';
import clipsReducer from './clips';
import searchReducer from './search';
import focusReducer from './focus';

export default combineReducers({
    mode: modeReducer,
    clips: clipsReducer,
    search: searchReducer,
    focus: focusReducer
});