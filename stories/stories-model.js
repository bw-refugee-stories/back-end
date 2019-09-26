const db = require('../database/dbConfig')

module.exports = {
    find,
    findBy,
    findById,
    add,
    remove,
    edit,
    getComments,
    addComment,
    removeComment,
    getCommentById,
    getPendingStories,
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

function getComments(storyId) {
    return db('comments as c')
        .join('stories as s', 's.id', 'c.story_id')
        .select('c.contents', 's.title')
        .where({story_id: storyId})
        .orderBy('c.id')
}

function getCommentById(id) {
    return db('comments')
        .where({id})
        .first()
}

async function addComment(comment) {
    const [id] = await db('comments').insert(comment)
    return getCommentById(id)
}

function removeComment(commentId) {
    return db('comments')
        .where({id: commentId})
        .del()
}

function getPendingStories() {
    return db('stories')
        .where({pending: 1})
}