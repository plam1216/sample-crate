import mongoose, { trusted } from 'mongoose'
const { Schema } = mongoose

const songSchema = new Schema({
    name: { type: String, required: true },
    album: { type: String, required: true },
    artist: { type: String, required: true },
    release_date: { type: String, required: true },
    duration: { type: Number, required: true }
})

const playlistSchema = new Schema({
    songs: [songSchema]
})

const userSchema = new Schema({
    username: String,
    email: { type: String, required: true },
    pfp: String,
    playlist: playlistSchema
})

export default mongoose.model('User', userSchema)