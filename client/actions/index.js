import {
    GO_TO_ADD,
    GO_TO_SEARCH,
    MOVE_FOCUS_UP,
    MOVE_FOCUS_DOWN,
    UPDATE_SEARCH,
    UPDATE_CLIPS
} from '../constants/action-types';

PouchDB.plugin(require('pouchdb-legacy-utils'));
PouchDB.plugin(require('pouchdb-find'));
const db = new PouchDB('clips');

export function goToAdd() {
    return {
        type: 'GO_TO_ADD'
    }
}

export function goToSearch() {
    return {
        type: 'GO_TO_SEARCH'
    }
}


export function moveFocusUp() {
    return {
        type: 'MOVE_FOCUS_UP'
    }
}

export function moveFocusDown() {
    return {
        type: 'MOVE_FOCUS_DOWN'
    }
}

export function updateSearch(searchStr) {
    return {
        type: 'UPDATE_SEARCH',
        searchStr: searchStr
    }
}

export function updateClips(clips) {
    return {
        type: 'UPDATE_CLIPS',
        clips: clips
    }
}

export function loadClips() {
    return (dispatch) => {
        db.allDocs({ include_docs: true })
            .then((results) => {
                if (results.total_rows > 0) {
                    const clips = results.rows.map((r) => r.doc);
                    console.log('Loaded these clips', clips);
                    dispatch(updateClips(clips));
                }
            });
    }
}

export function addClip({ key, value }) {
    return (dispatch) => {
        db.put({
            _id: new Date().toJSON(),
            key,
            value
        })
        .then(() => {
            dispatch(goToSearch());
            dispatch(loadClips());
        })
    }
}

export function removeClip({ _id, _rev }) {
    return (dispatch) => {
        db.remove(_id, _rev)
            .then(() =>
                dispatch(loadClips())
            );
    }
}


