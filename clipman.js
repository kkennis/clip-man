<<<<<<< HEAD
const $ = require('./lib/jquery.min.js');
const ClipStore = require('./clip-store');
const copy = require('copy-to-clipboard');
require('./do-puts')(db);
=======
const ReactDOM = require('react-dom');
const React = require('react');
const { createStore, applyMiddleware } = require('redux');
const { Provider } = require('react-redux');
const thunkMiddleware = require('redux-thunk').default;
const App = require('./client/components/app');
const reducers = require('./client/reducers');

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
>>>>>>> react


<<<<<<< HEAD
const HOTKEYS = {
    add: {
        char: 'n',
        keycode: 78
    }
}

const isShortcut = (action) => (event) => event.ctrlKey && event.keyCode === HOTKEYS[action].keycode;
const isAddShortcut = isShortcut('add');

$(document).ready(function() {
    Promise.resolve()
        .then(init);
});

async function init() {
    const store = new ClipStore(db);
    const allClips = await store._loadClips();

    drawInitialList(allClips);


    let $search = $('#key-input');
    $search.focus();
    $search.on('keyup', updateResults)

    $('.clip-container').on('keyup', '.item', handleItemClick)
    $('.add-val').on('click', showAdd)
    $('.add-item').on('keyup', '#new-val-input, #new-key-input', handleInputHotkey)
}

function populateKeys() {
    db.allDocs({ include_docs: true })
        .then(drawInitial)
}

function updateResults(event) {
    if (isAddShortcut(event)) {
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
    currentClips = results.docs;
    drawClips();
}

function drawInitialList(clips) {
    if (clips.length > 0) {
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
=======
>>>>>>> react
