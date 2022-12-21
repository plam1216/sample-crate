import express, { Request, Response } from 'express'
import { Document } from 'mongoose'

import User from '../models/user'

const userRouter = express.Router()

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

// get all users
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        res.json(await User.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// delete user
userRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        res.json(await User.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

// create user
userRouter.post('/', async (req: Request, res: Response) => {
    try {
        // if User doesnt exist, createUser
        // find() returns [] if no matches, findOne() returns null if no matches
        if (!await User.findOne({ email: req.body.email })) {
            console.log('created user')
            res.json(await User.create(req.body))
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

export default userRouter