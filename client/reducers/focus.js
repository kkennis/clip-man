import { MOVE_FOCUS_DOWN, MOVE_FOCUS_UP } from '../constants/action-types';

export default function focus(state = null, action) {
    switch (action.type) {
    case MOVE_FOCUS_DOWN:
        return state !== null ? state + 1 : 0;
    case MOVE_FOCUS_UP:
        return state && state > 0 ? state - 1 : null;
    default:
        return state;
    }
}