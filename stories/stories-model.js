const db = require('../database/dbConfig')

module.exports = {
    find,
    findBy,
    findById,
    add,
    remove,
    edit
}

function find() {
    return db('stories')
}

function findBy(filter) {
    return db('stories').where(filter)
}

async function add(story) {
    const [id] = await db('stories').insert(story)
    return findById(id)
}

function findById(id) {
    return db('stories')
        .where({id})
        .first()
}

function remove(id) {
    const story = findById(id)
    return db('stories')
        .where({id})
        .del()
}

function edit(changes, id) {
    return db('stories')
        .where({id})
        .update(changes)
        .then(ids => {
            return findById(id)
        })
}