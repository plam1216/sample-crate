import { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router';

import { Container } from 'react-bootstrap';

import { auth } from './services/firebase'
import { User as FirebaseUser } from 'firebase/auth'

import { getRandomSearchTerm } from './util/getRandomSearchTerm';
import { getRandomGenre } from './util/getRandomGenre';
import { getRandomYear } from './util/getRandomYear';

import Header from './Components/Header/Header';
import Main from './Pages/Main/Main';

import { YTinfo, DiscogsSongInfo, SearchParams } from './types';
import { URL } from './config';


function App() {
  const [fbUser, setfbUser] = useState<FirebaseUser | null>(null)

  const [discogsSongInfo, setDiscogsSongInfo] = useState<DiscogsSongInfo>({} as DiscogsSongInfo)
  const [YTinfo, setYTinfo] = useState<YTinfo>({} as YTinfo)

  const [filteredSearch, setFilteredSearch] = useState<SearchParams>({} as SearchParams)

  const getRandomDiscogsSong = async () => {
    // GET discogsToken
    const discogsResponse = await fetch(URL + 'discogstoken/')
    const discogsToken = await discogsResponse.text()

    let genre: string = getRandomGenre()
    let searchTerm: string = getRandomSearchTerm()
    let year: number = getRandomYear()

    // use token, genre, searchTerm, and year to GET a song
    let response = await fetch(`https://api.discogs.com/database/search?q=${searchTerm}&type=release&genre=%${genre}&year=${year}&token=${discogsToken}`)
    const data = await response.json()

    // if results are not empty
    if (data.results.length !== 0) {

      // get random index from length of possible results
      let randomIndex: number = Math.floor(Math.random() * data.results.length)

      // get a random song from results
      let song = data.results[randomIndex]

      // remove backslash to prevent errors in the future when using the song title
      song.title = song.title.replace('/', '')

      setDiscogsSongInfo({
        discogsTitle: song.title,
        genre: [...song.genre],
        style: [...song.style],
        year: song.year,
      })

      // return to break recursion
      return
    }

    // results empty, continue searching
    console.log('searching...')
    getRandomDiscogsSong()
  }

  const getFilteredDiscogsSong = async (genre: string, year?: number) => {
    const discogsResponse = await fetch(URL + 'discogstoken/')
    const discogsToken = await discogsResponse.text()

    let searchTerm: string = getRandomSearchTerm()

    let response = await fetch(`https://api.discogs.com/database/search?q=${searchTerm}&type=release&genre=%${genre}&year=${year}&token=${discogsToken}`)
    const data = await response.json()

    // if there are no search results, get another song
    if (data.results.length !== 0) {

      // get random index from length of possible results
      let randomIndex: number = Math.floor(Math.random() * data.results.length)

      // get a random song from results
      let song = data.results[randomIndex]

      // remove backslash to prevent errors with future use of title
      song.title = song.title.replace('/', '')

      setFilteredSearch({
        genre: genre,
        year: year,
      })

      setDiscogsSongInfo({
        discogsTitle: song.title,
        genre: [...song.genre],
        style: [...song.style],
        year: song.year,
      })

      // return to break recursion
      return
    }

    console.log('searching...')
    getFilteredDiscogsSong(genre, year)
  }

  // get YouTube video info
  const getVideoURL = async () => {
    if (discogsSongInfo.discogsTitle !== undefined) {

      const response = await fetch(URL + 'youtubekey/')
      const youtubeKey = await response.text()

      const youtubeResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&safeSearch=none&q=${discogsSongInfo.discogsTitle}&type=video&videoCategoryId=10&key=${youtubeKey}`)
      const youtubeData = await youtubeResponse.json()

      let videoID = youtubeData.items[0].id['videoId']
      let YTtitle = youtubeData.items[0].snippet['title']
      let YTthumbnail = youtubeData.items[0].snippet['thumbnails'].default.url

      // let videoID = 'COz9lDCFHjw'
      // let YTtitle = 'Passionfruit'
      // let YTthumbnail = 'thumbnails'

      setYTinfo({
        videoID: videoID,
        title: YTtitle,
        thumbnail: YTthumbnail
      })
    }
  }

  // change current video with one from Playlist
  const changeCurrentVideo = async (songTitle: string) => {
    let response = await fetch(URL + 'users/songs/' + fbUser?.uid + '/' + songTitle + '/')
    let data = await response.json()

    setDiscogsSongInfo({
      discogsTitle: data.discogsTitle,
      genre: data.genre,
      style: data.style,
      year: data.year,
    })

    setYTinfo({
      videoID: data.videoID,
      title: data.YTtitle,
      thumbnail: data.YTthumbnail
    })
  }

  // create a user in MongoDB using Firebase login info
  const createUser: (fbUser: FirebaseUser | null) => Promise<void> = async (fbUser): Promise<void> => {

    // send a JWT from frontend to backend to access Firebase login info in backend/index.ts
    const token = await fbUser?.getIdToken()

    await fetch(URL + "users/", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "Authorization": "Bearer " + token
      }
    })
  }


  useEffect(() => {
    getRandomDiscogsSong()

    // onAuthStateChanged triggers when someone logs in or logs out
    const unsubscribe = auth.onAuthStateChanged(fbUser => {

      // set fbUser to logged in user upon login or null on logout
      setfbUser(fbUser)

      // createUser in MongoDB if user logged in
      if (fbUser) createUser(fbUser)
    })

    return unsubscribe
  }, [])

  useEffect(() => {
        getVideoURL()
  }, [discogsSongInfo])
  

  return (
    <>
      <Header
        fbUser={fbUser}
      />
      <Switch>
        <Route exact path='/'>
          <Container className="App">
            <Main
              fbUser={fbUser}
              discogsSongInfo={discogsSongInfo}
              filteredSearch={filteredSearch}
              YTinfo={YTinfo}
              getVideoURL={getVideoURL}
              changeCurrentVideo={changeCurrentVideo}
              getRandomDiscogsSong={getRandomDiscogsSong}
              getFilteredDiscogsSong={getFilteredDiscogsSong}
            />
          </Container>
        </Route>
      </Switch>
    </>
  );
}

export default App;
