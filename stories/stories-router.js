const router = require("express").Router();
const bcrypt = require("bcryptjs");
const secrets = require("../config/secrets");
const jwt = require("jsonwebtoken");

const Stories = require("./stories-model");

// https://refu-stories-api.herokuapp.com/stories
// Doesn't expect anything -- unsecure route -- returns JS object of stories

router.get('/', (req, res) => {
    Stories.find()
        .then(stories => {
            res.status(200).json(stories)
        })
        .catch(err => {
            res.status(500).json({message: "Failed to find stories ",err})
        })
})

// https://refu-stories-api.herokuapp.com/stories/:id
// Doesn't expect anything -- unsecure route -- returns JS object of story with id matching the url

router.get('/:id', (req, res) => {
    const {id} = req.params

    Stories.findById(id)
        .then(story => {
            if (story) {
                res.status(200).json(story)
            } else {
                res.status(401).json({message: "No stories here."})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Failed to find story ",err})
        })
})

// https://refu-stories-api.herokuapp.com/stories
// expects a body with title, contents, and pending.
// body can also include name, email, and user_id

router.post('/', (req, res) => {
    const storyData = req.body


    Stories.add(storyData)
        .then(story => {
            res.status(201).json(story)
        })
        .catch(err => {
            res.status(500).json({message: "Failed to create story ",err})
        })
})

// https://refu-stories-api.herokuapp.com/stories/:id
// expects a body with title, contents, and pending.
// body can also include name, email, and user_id

router.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body

    Stories.findById(id)
        .then(story => {
            if(story) {
                Stories.edit(changes, id)
                    .then(updatedStory => {
                        res.status(200).json(updatedStory)
                    })
            } else {
                res.status(401).json({message: "Couldn't find story with the given ID"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Failed to update story"})
        })
})

// https://refu-stories-api.herokuapp.com/stories/:id
// doesn't expect anything

router.delete('/:id', (req, res) => {
    const {id} = req.params

    Stories.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(202).json({message: `Removed ${deleted}`})
            } else {
                res.status(401).json({message: "Couldn't find story with given id"})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Failed to delete story'})
        })
})

module.exports = router