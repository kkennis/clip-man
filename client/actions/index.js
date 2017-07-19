PouchDB.plugin(require('pouchdb-legacy-utils'));
PouchDB.plugin(require('pouchdb-find'));
const db = new PouchDB('clips');

module.exports.goToAdd = function goToAdd() {
    return {
        type: 'GO_TO_ADD'
    }
}

module.exports.goToSearch = function goToSearch() {
    return {
        type: 'GO_TO_SEARCH'
    }
}


module.exports.moveFocusUp = function moveFocusUp() {
    return {
        type: 'MOVE_FOCUS_UP'
    }
}

module.exports.moveFocusDown = function moveFocusDown() {
    return {
        type: 'MOVE_FOCUS_DOWN'
    }
}

module.exports.updateSearch = function updateSearch(searchStr) {
    return {
        type: 'UPDATE_SEARCH',
        searchStr: searchStr
    }
}

module.exports.updateClips = function updateClips(clips) {
    return {
        type: 'UPDATE_CLIPS',
        clips: clips
    }
}

module.exports.loadClips = function loadClips() {
    const updateClips = module.exports.updateClips;

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

module.exports.addClip = function addClip({ key, value }) {
    const loadClips = module.exports.loadClips;
    const goToSearch = module.exports.goToSearch;

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

module.exports.removeClip = function removeClip({ _id, _rev }) {
    const loadClips = module.exports.loadClips;

    return (dispatch) => {
        db.remove(_id, _rev)
            .then(() =>
                dispatch(loadClips())
            );
    }
}


