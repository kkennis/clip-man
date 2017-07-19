export default function search(state = null, action) {
    switch (action.type) {
    case 'UPDATE_SEARCH':
        return action.searchStr || null;
    default:
        return state;
    }
}
