function clips(state = [], action) {
    switch (action.type) {
    case 'UPDATE_CLIPS':
        return state.clips;
    default:
        return state;
    }
}

module.exports = mode;