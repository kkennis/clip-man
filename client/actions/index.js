module.exports.goToAdd = function() {
    return {
        type: 'GO_TO_ADD'
    }
}

module.exports.goToSearch = function() {
    return {
        type: 'GO_TO_SEARCH'
    }
}

module.exports.updateSearch = function(searchStr) {
    return {
        type: 'UPDATE_SEARCH',
        searchStr: searchStr
    }
}

module.exports.loadClips = function() {
    return {
        type: 'LOAD_CLIPS'
    }
}