const $ = require('./lib/jquery.min.js');
PouchDB.plugin(require('pouchdb-legacy-utils'));
PouchDB.plugin(require('pouchdb-find'));
const db = new PouchDB('clips');
const copy = require('copy-to-clipboard')
// require('./do-puts')(db)


$(document).ready(function() {
    // db.createIndex({
    //     index: { fields: ['key'] }
    // })
    Promise.resolve()
    .then(init);
});

function init() {
    populateKeys();

    var $search = $('#key-input');
    $search.focus();
    $search.on('keyup', updateResults)

    $('.clip-container').on('keyup', '.item', copyValue)
    $('.add-val').on('click', addItem)
    $('.add-item').on('keyup', '#new-val-input', handleInputHotkey)

}

function populateKeys() {
    db.allDocs({ include_docs: true, limit: 10 })
        .then(drawInitial)
}

function updateResults(event) {
    if (event.ctrlKey && event.keyCode === 78) {
        addItem();
    } else {
        var inputVal = $(event.target).val();

        db.find({
            selector: {
                key: {
                    $regex: inputVal
                }
            }
        })
        .then(function(results) {
            console.log('Searched on input', results)
            drawResults(results);
        });
    }

}

function drawResults(results) {
    if (results.docs.length > 0) {
        console.log('Got results')

        $('.clip-container').html('');

        results.docs.reverse().forEach((item) => {
            $('.clip-container').append(itemTemplate(item));
        });
    }
}

function drawInitial(results) {
    console.log('Got results', results)

    if (results.total_rows > 0) {
        console.log('Got results')

        $('.clip-container').html('');

        results.rows.reverse().forEach((item) => {
            $('.clip-container').append(itemTemplate(item.doc));
        });
    }
}

function itemTemplate(item) {
    return `
<div class='item' tabindex='1'>
    <h4 class='item-header'>${item.key}</h4>
    <p class='item-value'>${item.value}</p>
</div>`;
}

function copyValue(event) {
    if (event.keyCode === 13) {
        const value = $(event.target).find('.item-value').html();
        copy(value);
        console.log('Copied', value)
        $(event.target).blur();
    } else if (event.keyCode === 38) {
        $(event.target).prev().focus();
    } else if (event.keyCode === 40) {
        $(event.target).next().focus();
    } else if (event.keyCode === 27) {
        $('#key-input').focus();
    }
}

function addItem(event) {
    $('.input-line').hide()
    $('.add-item').show()
    $('#new-key-input').focus();
}

function handleInputHotkey(event) {
    event.preventDefault();

    if (event.keyCode === 27) {
        $('.input-line').show()
        $('.add-item').hide()
        $('#key-input').focus()
    } else if (event.ctrlKey && event.keyCode === 13) {
        var key = $('[name=key]').val()
        var value = $('[name=value]').val()
        $('[name=key]').val('')
        $('[name=value]').val('').html('')

        db.put({
            _id: new Date().toJSON(),
            key,
            value
        }).then(() => {
            $('.input-line').show()
            $('.add-item').hide()
            $('#key-input').focus()

            populateKeys();
        })
    }
}