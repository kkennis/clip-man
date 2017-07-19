import { GO_TO_ADD, GO_TO_SEARCH } from '../constants/action-types';

export default function mode(state = 'search', action) {
    switch (action.type) {
    case GO_TO_ADD:
        return 'add';
    case GO_TO_SEARCH:
        return 'search';
    default:
        return state;
    }
}
