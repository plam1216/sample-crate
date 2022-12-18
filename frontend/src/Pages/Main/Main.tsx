import { useState, useEffect } from 'react'
import { User as FirebaseUser } from 'firebase/auth'

import YouTubeEmbed from '../../Components/YouTubeEmbed/YouTubeEmbed'
import Toolbar from '../../Components/Toolbar/Toolbar'

import { User } from '../../types'
import { DiscogsSongInfo } from '../../types'


interface MainProps {
  allUsers: User[]
  fbUser?: FirebaseUser | null
  discogsToken: string | null
}

const Main = (props: MainProps) => {
  const [discogSongInfo, setDiscogSongInfo] = useState<DiscogsSongInfo>({} as DiscogsSongInfo)
  
  // const DISCOGS_URL = 'https://www.discogs.com'

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const genres = [
    "Blues",
    "Brass & Military",
    "Children's",
    "Classical",
    "Electronic",
    "Folk, World, & Country",
    "Funk / Soul",
    "Hip-Hop",
    "Jazz",
    "Latin",
    "Non-Music",
    "Pop",
    "Reggae",
    "Rock",
    " Stage & Screen"
  ]

  // random search term generated up to 3 characters long
  const getRandomSearchTerm = (): string => {
    let termLength = Math.random() * 3
    let searchTerm = ''
    for (let i = 0; i < termLength; i++) {
      searchTerm += alphabet.charAt(Math.floor(Math.random() * 27))
    }

    return searchTerm
  }

  // get random genre from array
  const getRandomGenre = (): string => {
    return genres[Math.floor(Math.random() * genres.length)]
  }

  const getRandomYear = (): number => {
    return Math.floor(Math.random() * 122) + 1900
  }

  const getRandomDiscogsSong = async () => {
    let genre: string = getRandomGenre()
    let searchTerm: string = getRandomSearchTerm()
    let year: number = getRandomYear()

    let response = await fetch(`https://api.discogs.com/database/search?q=${searchTerm}&type=release&genre=%${genre}&year=${year}&token=${props.discogsToken}`)

    const data = await response.json()

    // if there are no search results, get another song
    if (data.results.length !== 0) {

      // get random index from length of possible results
      let randomIndex: number = Math.floor(Math.random() * data.results.length)

      // get a random song from results
      let song = data.results[randomIndex]

      setDiscogSongInfo({
        title: song.title,
        genre: [...song.genre],
        style: [...song.style],
        year: song.year,
        uri: song.uri,
      })

      // return to break recursion
      return
    }

    getRandomDiscogsSong()
  }

  // get song page to scrape for YouTube video
  // const getDiscogsSongPageURL = (song: DiscogsSongInfo): string => {
  //   return DISCOGS_URL + song.uri
  // }

  console.log('./Main songInfo', discogSongInfo)
  
  useEffect(() => {
    if(props.discogsToken !== null) {
      getRandomDiscogsSong()
    }

  }, [props.discogsToken])

  // search allUsers for the email that matches fbUser
  const getCurrUser: (allUsers: User[]) => User = (allUsers): User => {
    let found: User = props.allUsers.filter((user: User) => user.email === props.fbUser?.email)[0]
    console.log("currUser found", found)
    return found
  }

  return (
    <>
      <YouTubeEmbed
        // getDiscogsSongPageURL={getDiscogsSongPageURL}
        discogsSongInfo={discogSongInfo}
      />
      <Toolbar
        getCurrUser={getCurrUser}
        allUsers={props.allUsers}
        fbUser={props.fbUser}
      />
    </>
  )
}

export default Main