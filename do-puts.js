var puts = {
    "hello": "goodbye",
    "secret code": "up up down down left right left right b a",
    "greeting": "Well howdy there pard'na!!"
}

function doPuts(db) {
    var putPs = Object.keys(puts).map((put) =>
        db.put({
            _id: new Date().toJSON(),
            key: put,
            value: puts[put]
        });
    )

    Promise.all(putPs)
        .then(() => console.log('Did puts'))
}

module.exports = doPuts;