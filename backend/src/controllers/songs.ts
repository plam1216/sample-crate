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
    videoID: string,
    YTtitle: string,
    YTthumbnail: string,
}

interface User extends Document {
    user_id: string
    name?: string
    email: string
    picture?: string
    playlist: Song[]
}

// GET the current user's playlist
songsRouter.get('/users/songs/:user_id', async (req: Request, res: Response) => {
    try {
        User.findOne({ user_id: req.params.user_id }, (err: any, foundUser: User) => {
            res.json(foundUser.playlist)

        })
    } catch (error) {
        res.status(400).json(error)
    }

})

// GET song from current user's playlist
songsRouter.get('/users/songs/:user_id/:songTitle', async (req: Request, res: Response) => {
    try {
        User.findOne({ user_id: req.params.user_id }, (err: any, foundUser: User) => {
            let song = foundUser.playlist.find(song => song.discogsTitle === req.params.songTitle)

            console.log('songsRouter GET FROM PLAYLIST: ', song)
            res.status(201).json(song)
        })
    }
    catch (error) {
        res.status(400).json(error)
    }
})

// DELETE current song from current user's playlist
songsRouter.delete('/users/songs/:user_id/:songTitle', async (req: Request, res: Response) => {
    try {
        User.findOne({ user_id: req.params.user_id }, (err: any, foundUser: User) => {
            let songIndex = foundUser.playlist.findIndex(song => song.discogsTitle === req.params.songTitle)

            // if song does exist, delete it
            if (songIndex !== -1) {
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


// CREATE - add song to current user's playlist
songsRouter.post('/users/songs', async (req: Request, res: Response) => {
    try {
        // req.body[0] is fbUser
        // req.body[1] is the discogsSongInfo
        // req.body[2] is the YTinfo

        // find the user in MongoDB with matching email as FB user
        User.findOne({ email: req.body[0].email }, async (err: any, foundUser: User) => {
            req.body[1]['videoID'] = req.body[2]['videoID']
            req.body[1]['YTtitle'] = req.body[2]['title']
            req.body[1]['YTthumbnail'] = req.body[2]['thumbnail']

            // if not in playlist, add song to playlist
            if (!foundUser.playlist.some(song => song.discogsTitle === req.body[1].discogsTitle)) {
                foundUser.playlist.push(req.body[1])
                await foundUser.save()

                console.log('songsRouter POST: ', req.body[1])
                res.status(201).json(req.body[1])
            }
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

export default songsRouter