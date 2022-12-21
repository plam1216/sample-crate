import { useState, useEffect } from 'react'

import { User as FirebaseUser } from 'firebase/auth'

import YouTubeEmbed from '../../Components/YouTubeEmbed/YouTubeEmbed'
import Toolbar from '../../Components/Toolbar/Toolbar'
import SongHistory from '../../Components/SongHistory/SongHistory'

import { Song, YTinfo, DiscogsSongInfo } from '../../types'
import Playlist from '../../Components/Playlist/Playlist'


interface MainProps {
  fbUser?: FirebaseUser | null
  discogsSongInfo: DiscogsSongInfo
  YTinfo: YTinfo
  getRandomDiscogsSong: () => void
}


const Main = (props: MainProps) => {
  const [currUserPlaylist, setCurrUserPlaylist] = useState<Song[]>([] as Song[])

  const URL = "http://localhost:4000/users/"

  const getCurrUserPlaylist = async () => {
    if (props.fbUser?.email !== undefined) {
      let response = await fetch(URL + 'songs/' + `${props.fbUser?.email}/`)
      let data = await response.json()

      setCurrUserPlaylist(data)
    }
  }

  useEffect(() => {
    getCurrUserPlaylist()
  }, [props.discogsSongInfo])

  console.log('./Main', props.discogsSongInfo.discogsTitle)

  return (
    <>
      <YouTubeEmbed
        discogsSongInfo={props.discogsSongInfo}
        YTinfo={props.YTinfo}
      />
      <Toolbar
        fbUser={props.fbUser}
        discogsSongInfo={props.discogsSongInfo}
        YTinfo={props.YTinfo}
        currUserPlaylist={currUserPlaylist}
        getRandomDiscogsSong={props.getRandomDiscogsSong}
        getCurrUserPlaylist={getCurrUserPlaylist}
      />
      <Playlist />
      <SongHistory />
    </>
  )
}

export default Main