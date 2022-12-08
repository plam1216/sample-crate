import express from 'express'

const songsRouter = express.Router()

// INDEX
songsRouter.get('/', async (req, res) => {
    res.send("song index")
})
// NEW


// DELETE


// UPDATE


// CREATE


// EDIT


// SHOW


// for export default TypeScript syntax
export default songsRouter