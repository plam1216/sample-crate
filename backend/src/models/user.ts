import mongoose, { Document, Schema } from 'mongoose'

interface Song {
    discogsTitle: string,
    genre: string[],
    style: string[],
    year: string,
    YTurl: string,
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

const songSchema = new Schema({
    discogsTitle: { type: String, required: true },
    genre: [{ type: String, required: true }],
    style: [{ type: String, required: true }],
    year: { type: String, required: true },
    videoID: {type: String, required: true},
    YTtitle: {type: String, required: true},
    YTthumbnail: {type: String, required: true}
})

const userSchema = new Schema({
    user_id: String,
    name: String,
    email: { type: String, required: true },
    picture: String,
    playlist: [songSchema]
})

export default mongoose.model<User>('User', userSchema)