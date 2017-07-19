var puts = {
    "hello": "goodbye",
    "secret code": "up up down down left right left right b a",
    "greeting": "Well howdy there pard'na!!",
    "hola": "adios",
    "bonjour": "au revior",
}



function doPuts(db) {
    Promise.resolve()
        .then(() => Promise.all(Object.keys(puts).map((put) =>
            db.put({
                _id: new Date().toJSON(),
                key: put,
                value: puts[put]
            })
        )))
        .then(() => console.log('Did puts'))
}

module.exports = doPuts;