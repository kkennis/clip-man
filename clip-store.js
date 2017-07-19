
PouchDB.plugin(require('pouchdb-legacy-utils'));
PouchDB.plugin(require('pouchdb-find'));

class ClipStore {
    allClips = [];
    currentClips = null;

    constructor() {
        this._db = new PouchDB('clips');
    }

    async _loadClips() {
        this.allClips = await this._db.allDocs({ include_docs: true });
        return this.allClips;
    }

    async find(query) {
        this.currentClips = await this._db.find(query);
        return this.currentClips;
    }
}