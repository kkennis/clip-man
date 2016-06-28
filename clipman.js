const $ = require('./lib/jquery.min.js');
PouchDB.plugin(require('pouchdb-legacy-utils'));
PouchDB.plugin(require('pouchdb-find'));
const db = new PouchDB('clips');
const copy = require('copy-to-clipboard');
// require('./do-puts')(db)

let currentClips;

$(document).ready(function() {
    // db.createIndex({
    //     index: { fields: ['key'] }
    // })
    Promise.resolve()
    .then(init);
});

function init() {
    populateKeys();

    let $search = $('#key-input');
    $search.focus();
    $search.on('keyup', updateResults)

    $('.clip-container').on('keyup', '.item', handleItemClick)
    $('.add-val').on('click', showAdd)
    $('.add-item').on('keyup', '#new-val-input, #new-key-input', handleInputHotkey)
}

function populateKeys() {
    db.allDocs({ include_docs: true, limit: 10 })
        .then(drawInitial)
}

function updateResults(event) {
    if (event.ctrlKey && event.keyCode === 78) {
        showAdd();
    } else {
        let inputVal = $(event.target).val();

        db.find({
            selector: {
                key: {
                    $regex: inputVal
                }
            }
        })
        .then(drawResults);
    }
}

function drawResults(results) {
    currentClips = results.docs
    drawClips();
}

function drawInitial(results) {
    if (results.total_rows > 0) {
        currentClips = results.rows.map((r) => r.doc);
        drawClips();
    }
}

function drawClips() {
    $('.clip-container').html('');
    currentClips.reverse().forEach((item) => {
        $('.clip-container').append(itemTemplate(item));
    });
}

function itemTemplate(item) {
    return `
<div class='item' tabindex='1' _id=${item._id}>
    <h4 class='item-header'>${item.key}</h4>
    <p class='item-value'>${item.value}</p>
</div>`;
}

function handleItemClick(event) {
    if (event.keyCode === 13) {
        const value = $(event.target).find('.item-value').html();
        copy(value);
        $(event.target).blur();
    } else if (event.keyCode === 38) {
        $(event.target).prev().focus();
    } else if (event.keyCode === 40) {
        $(event.target).next().focus();
    } else if (event.keyCode === 27) {
        $('#key-input').focus();
    } else if (event.ctrlKey && event.keyCode == 68) {
        const id = $(event.target).attr('_id');
        const doc = currentClips.find((clip) => clip._id === id);
        db.remove(doc._id, doc._rev).then(populateKeys);
    }
}

function showAdd(event) {
    $('.input-line').hide()
    $('.add-item').show()
    $('#new-key-input').focus();
}

function showSearch(event) {
    $('.input-line').show()
    $('.add-item').hide()
    $('#key-input').focus()
}

function handleInputHotkey(event) {
    event.preventDefault();

    if (event.keyCode === 27) {
        showSearch();
    } else if (event.ctrlKey && event.keyCode === 13) {
        let key = $('[name=key]').val()
        let value = $('[name=value]').val()
        $('[name=key]').val('')
        $('[name=value]').val('').html('')

        db.put({
            _id: new Date().toJSON(),
            key,
            value
        }).then(() => {
            populateKeys();
            showSearch();
        })
    }
}