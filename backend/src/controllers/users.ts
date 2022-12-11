import express, { Request, Response } from 'express'
import User from '../models/user'

const userRouter = express()

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
        console.log(req.body)
        res.json(await User.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

// EDIT


// SHOW


export default userRouter