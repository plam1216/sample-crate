import express, { Request, Response } from 'express'
import { Document } from 'mongoose'

import User from '../models/user'

const songsRouter = express.Router()

interface Song {
    discogsTitle: string,
    genre: string[],
    style: string[],
    year: string,
    uri: string,
    YTurl: string,
    YTtitle: string,
}

interface User extends Document {
    username?: string
    email: string
    picture?: string
    playlist: Song[]
}

// get the current user's playlist
songsRouter.get('/users/songs/:email', async (req: Request, res: Response) => {
    try {
        // req.body[0] is currUser
        // req.body[1] is the discogsSongInfo
        User.findOne({ email: req.params.email }, (err: any, foundUser: User) => {
            // console.log('playlist', foundUser.playlist)
            res.json(foundUser.playlist)

        })
    } catch (error) {
        res.status(400).json(error)
    }

})

// DELETE song from current user's playlist
songsRouter.delete('/users/songs/:email/:songTitle', async (req: Request, res: Response) => {
    try {
        User.findOne({ email: req.params.email }, (err: any, foundUser: User) => {
            let songIndex = foundUser.playlist.findIndex(song => song.discogsTitle === req.params.songTitle)
            if (songIndex !== -1){
                foundUser.playlist.splice(songIndex, 1)
                foundUser.save()
                console.log('songsRouter DELETE: ', req.params.songTitle)
                res.status(201).json(req.params.songTitle)
            }
        })
    }
    catch (error) {
        res.status(400).json(error)
    }
})

// UPDATE


// CREATE - add song to current user's playlist
songsRouter.post('/users/songs', async (req: Request, res: Response) => {
    try {
        // req.body[0] is currUser
        // req.body[1] is the discogsSongInfo
        // req.body[2] is the YTinfo
        User.findById(req.body[0]._id, (err: any, foundUser: User) => {
            // add the YTurl & YTtitle to the discogsSongInfo
            req.body[1]['YTurl'] = req.body[2]['url']
            req.body[1]['YTtitle'] = req.body[2]['title']

            // if the song doesnt exist in the playlist push
            if (!foundUser.playlist.some(song => song.discogsTitle === req.body[1].discogsTitle)) {
                // push the discogsSongInfo as a Song
                foundUser.playlist.push(req.body[1])
                foundUser.save()

                console.log('songsRouter POST: ', req.body[1])
                res.status(201).json(req.body[1])
            }
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

export default songsRouter