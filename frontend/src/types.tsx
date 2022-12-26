// Schema Interfaces
export interface Song {
    discogsTitle: string,
    genre: string[],
    style: string[],
    year: string,
    YTurl: string,
    YTtitle: string,
    YTthumbnail: string
}

export interface User extends Document {
    user_id: string
    name?: string
    email: string
    picture?: string
    playlist: Song[]
}


// Frontend Defined Interfaces
export interface YTinfo {
    videoID: string,
    title: string,
    thumbnail: string
}

export interface DiscogsSongInfo {
    discogsTitle: string,
    genre: string[],
    style: string[],
    year: string,
}

export interface FilterForm {
    genre: string
    minYear: number
    maxYear: number
}

export interface SearchParams {
    genre: string
    year?: number
}