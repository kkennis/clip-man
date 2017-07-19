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
    return (dispatch) => {
        db.allDocs({ include_docs: true })
            .then((results) => {
                if (results.total_rows > 0) {
                    const clips = results.rows.map((r) => r.doc);
                    dispatch(updateClips(clips));
                }
            });
    }
}

module.exports.addClip = function addClip({ key, value }) {
    return (dispatch) => {
        db.put({
            _id: new Date().toJSON(),
            key,
            value
        })
        .then(() =>
            dispatch(loadClips())
        )
    }
}

module.exports.removeClip = function removeClip(doc) {
    return (dispatch) => {
        db.remove(doc._id, doc._rev)
            .then(() =>
                dispatch(loadClips())
            );
    }
}


