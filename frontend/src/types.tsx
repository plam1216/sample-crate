export interface Song {
    name: string
    album: string
    artist: string
    release_date: string
    duration: number
}

export interface User extends Document {
    username?: string
    email: string
    pfp?: string
    playlist?: Song[]
}
