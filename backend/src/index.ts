import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import songsController from './controllers/songs.js'
import usersController from './controllers/users.js'

const app = express()

dotenv.config()
app.use(cors())
app.use(express.json());

// PORT
const PORT = process.env.PORT || 4000

// Discogs API Token
const DISCOGS_TOKEN = process.env.DISCOGS_TOKEN
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const YT_MP3_KEY = process.env.YT_MP3_KEY

mongoose.set('strictQuery', false)

// lets TypeScript know MONGODB_URI from process.env is a string
mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.log(error)
        throw new Error(error)
    })

// setup firebase admin
let admin = require("firebase-admin");

let serviceAccount = require("./sample-crate-firebase-adminsdk-e5c0c-586e71e705.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// create middleware to read JWT
app.use(async (req: Request, res: Response, next: NextFunction) => {
    // get token from Authorization header in frontend App.tsx createUser()
    const token = req.get('Authorization')

    // console.log("token", token)
    if (!token) return next()

    // 'verifyIdToken' takes argument and returns 'user' object
    const user = await admin.auth().verifyIdToken(token.replace("Bearer ", ""))
    // console.log(user)

    if (user) {
        req.body = user
    } else {
        return res.status(401).json({ error: 'token invalid' })
    }
    next()
})

///////////////
// Controllers
///////////////
app.use('/', songsController)
app.use('/users', usersController)


//////////
// Routes
//////////
app.get('/', (req: Request, res: Response) => {
    res.send('Route is working')
})

app.get('/discogstoken', (req: Request, res: Response) => {
    res.send(DISCOGS_TOKEN)
})

app.get('/youtubekey', (req: Request, res: Response) => {
    res.send(YOUTUBE_API_KEY)
})

app.get('/ytmp3key', (req: Request, res: Response) => {
    res.send(YT_MP3_KEY)
})

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})