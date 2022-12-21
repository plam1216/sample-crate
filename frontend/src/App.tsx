import { useState, useEffect } from 'react'

import { Container } from 'react-bootstrap';

import { auth } from './services/firebase'
import { User as FirebaseUser } from 'firebase/auth'

import { getRandomSearchTerm } from './util/getRandomSerachTerm';
import { getRandomGenre } from './util/getRandomGenre';
import { getRandomYear } from './util/getRandomYear';

import Header from './Components/Header/Header';
import Main from './Pages/Main/Main';

import { YTinfo, DiscogsSongInfo } from './types';


function App() {
  const [fbUser, setfbUser] = useState<FirebaseUser | null>(null)

  const [discogsSongInfo, setDiscogsSongInfo] = useState<DiscogsSongInfo>({} as DiscogsSongInfo)
  const [YTinfo, setYTinfo] = useState<YTinfo>({} as YTinfo)

  const URL = "http://localhost:4000/users/"
  const TOKEN_URL = "http://localhost:4000/discogstoken/"

  const getRandomDiscogsSong = async () => {
    const discogResponse = await fetch(TOKEN_URL)
    const discogsToken = await discogResponse.text()

    let genre: string = getRandomGenre()
    let searchTerm: string = getRandomSearchTerm()
    let year: number = getRandomYear()

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

      setDiscogsSongInfo({
        discogsTitle: song.title,
        genre: [...song.genre],
        style: [...song.style],
        year: song.year,
      })

      // return to break recursion
      return
    }

    // console.log('data 0')
    getRandomDiscogsSong()
  }

  const getVideoURL = async () => {
    const response = await fetch("http://localhost:4000/youtubekey/")
    const youtubeKey = await response.text()

    // const youtubeResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&safeSearch=none&q=${props.discogsSongInfo.discogsTitle}&type=video&videoCategoryId=10&key=${youtubeKey}`)

    // const youtubeData = await youtubeResponse.json()

    // let YTurl = `https://www.youtube.com/embed/${youtubeData.items[0].id['videoId']}`
    // let YTtitle = youtubeData.items[0].snippet['title']

    let YTurl = `https://www.youtube.com/embed/Wxw1wNwlBbk`
    let YTtitle = 'YTtitle test'

    setYTinfo({ url: YTurl, title: YTtitle })

    // setEmbedURL('https://www.youtube.com/embed/Wxw1wNwlBbk')
    // setEmbedURL(`https://www.youtube.com/embed/${youtubeData.items[0].id['videoId']}`)
  }

  // create a user in MongoDB using Firebase login info
  const createUser: (fbUser: FirebaseUser | null) => Promise<void> = async (fbUser): Promise<void> => {

    // send a JWT from frontend to backend to access Firebase login info in backend/index.ts
    const token = await fbUser?.getIdToken()

    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "Authorization": "Bearer " + token
      }
    })
  }

  console.log('./App', fbUser?.email)
  // console.log('/./App discogsSongInfo', discogsSongInfo.discogsTitle)
  // console.log('./App YTinfo', YTinfo.title)

  useEffect(() => {
    getRandomDiscogsSong()
    getVideoURL()

    // onAuthStateChanged triggers when someone logs in or logs out
    const unsubscribe = auth.onAuthStateChanged(fbUser => {

      // set fbUser to logged in user upon login or null on logout
      setfbUser(fbUser)

      // createUser in MongoDB if user logged in
      if (fbUser) createUser(fbUser)
    })

    return unsubscribe
  }, [fbUser])


  return (
    <>
      <Header
        fbUser={fbUser}
      />
      <Container className="App">
        <Main
          fbUser={fbUser}
          discogsSongInfo={discogsSongInfo}
          YTinfo={YTinfo}
          getRandomDiscogsSong={getRandomDiscogsSong}
        />
      </Container>
    </>
  );
}

export default App;
