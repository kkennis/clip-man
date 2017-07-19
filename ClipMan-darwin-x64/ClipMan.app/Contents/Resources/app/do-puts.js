var puts = {
    "hello": "goodbye",
    "hola": "adios",
    "bonjour": "au revior",
}



function doPuts(db) {
    window.DB = db;
    window.doPuts = doPuts;

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