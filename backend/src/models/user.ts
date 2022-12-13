import mongoose, { Document, Schema } from 'mongoose'

interface Song {
    name: string
    album: string
    artist: string
    release_date: string
    duration: number
}

interface User extends Document {
    name?: string
    email: string
    pfp?: string
    playlist?: Song[]
}
const songSchema = new Schema({
    name: { type: String, required: true },
    album: { type: String, required: true },
    artist: { type: String, required: true },
    release_date: { type: String, required: true },
    duration: { type: Number, required: true }
})

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true },
    picture: String,
    playlist: [songSchema]
})

export default mongoose.model<User>('User', userSchema)