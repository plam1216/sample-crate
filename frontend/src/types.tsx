// Schema Interfaces
export interface Song {
    discogsTitle: string,
    genre: string[],
    style: string[],
    year: string,
    YTurl: string,
    YTtitle: string,
}

export interface User extends Document {
    username?: string
    email: string
    picture?: string
    playlist: Song[]
}


// Frontend Defined Interfaces
export interface YTinfo {
    url: string,
    title: string,
}

export interface DiscogsSongInfo {
    discogsTitle: string,
    genre: string[],
    style: string[],
    year: string,
  }
  