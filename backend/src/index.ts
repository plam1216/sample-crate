// use import 'express' instead of 'require' for TypeScript
// const express = require('express')
import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import songsController from './controllers/songs.js'

const app = express()

dotenv.config()
app.use(cors())

// PORT
const PORT = process.env.PORT || 4000

mongoose.set('strictQuery', false)

// lets TypeScript know MONGODB_URI from process.env is a string
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("Connected to MongoDB)")
    })
    .catch((error) => {
        console.log(error)
        throw new Error(error)
    })


///////////////
// Controllers
///////////////
app.use('/songs', songsController)


//////////
// Routes
//////////
app.get('/', (req: Request, res: Response) => {
    res.send('Route is working')
})

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})
