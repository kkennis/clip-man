import { UPDATE_CLIPS } from '../constants/action-types';

export default function clips(state = [], action) {
    switch (action.type) {
    case UPDATE_CLIPS:
        return action.clips;
    default:
        return state;
    }
}
