var puts = {
    "hello": "goodbye",
<<<<<<< HEAD
    "secret code": "up up down down left right left right b a",
    "greeting": "Well howdy there pard'na!!"
=======
    "hola": "adios",
    "bonjour": "au revior",
>>>>>>> react
}



function doPuts(db) {
<<<<<<< HEAD
    var putPs = Object.keys(puts).map((put) =>
        db.put({
            _id: new Date().toJSON(),
            key: put,
            value: puts[put]
        });
    )
=======
    window.DB = db;
    window.doPuts = doPuts;
>>>>>>> react

    console.log("About to destroy")
    // db.destroy()
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