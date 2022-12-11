import mongoose from 'mongoose'
const { Schema } = mongoose

interface Song {
    name: string
    album: string
    artist: string
    release_date: string
    duration: number
}

interface Playlist {
    songs: [Song]
}

interface User {
    username?: string
    email: string
    pfp?: string
    playlist: Playlist
}
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

export default mongoose.model<User>('User', userSchema)