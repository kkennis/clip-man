var puts = {
    "SKUTESTDE": "film bless onion cave spy toast mesh athlete pull reveal credit decorate",
    "CHAINTESTDE": "hedgehog shop desert oven glide tribe much feed glue casual celery cable",
    "ITTESTSKU": "alter spoon vendor soft federal refuse smooth fetch setup velvet case chief",
    "ITTESTCHAIN": "jelly novel dignity tongue during table erupt fortune upgrade arena hub tomato",
    "SKUTESTK": "card hand blame stuff fetch aisle inherit beyond gorilla symptom tip weasel",
    "unicredit": "rabbit sure inquiry toward seed grape throw witness little lunar inmate tissue"
}

function doPuts(db) {
    var putPs = Object.keys(puts).map((put) =>
        db.put({
            _id: new Date().toJSON(),
            key: put,
            value: puts[put]
        })
    )

    Promise.all(putPs)
        .then(() => console.log('Did puts'))
}

module.exports = doPuts;