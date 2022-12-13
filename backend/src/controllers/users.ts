import express, { Request, Response } from 'express'
import User from '../models/user'

const userRouter = express.Router()

// INDEX
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        res.json(await User.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// NEW


// DELETE
userRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        res.json(await User.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
})

// UPDATE


// CREATE
userRouter.post('/', async (req: Request, res: Response) => {
    try {
        // console.log("userRouter Post", req.body)
        console.log("userRouter Post", req.body.email)

        // if the User already exists, do nothing
        // find() returns [] if no matches, findOne() returns null if no matches
        if (await User.findOne({ email: req.body.email })) {
            console.log('hello')
        }

        // else create the user
        else {
            console.log('created user')
            res.json(await User.create(req.body))
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// EDIT


// SHOW


export default userRouter