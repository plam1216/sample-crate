import { useState, useEffect } from 'react'

import { User as FirebaseUser } from 'firebase/auth'

import YouTubeEmbed from '../../Components/YouTubeEmbed/YouTubeEmbed'
import Toolbar from '../../Components/Toolbar/Toolbar'
import SongHistory from '../../Components/SongHistory/SongHistory'

import { Song, YTinfo, DiscogsSongInfo } from '../../types'
import Playlist from '../../Components/Playlist/Playlist'

import { URL } from '../../config'


interface MainProps {
  fbUser?: FirebaseUser | null
  discogsSongInfo: DiscogsSongInfo
  YTinfo: YTinfo
  getRandomDiscogsSong: () => void
  getVideoURL: () => void
}


const Main = (props: MainProps) => {
  const [currUserPlaylist, setCurrUserPlaylist] = useState<Song[]>([] as Song[])

  const getCurrUserPlaylist = async () => {
    if (props.fbUser?.email !== undefined) {
      let response = await fetch(URL + 'songs/' + `${props.fbUser?.email}/`)
      let data = await response.json()

      setCurrUserPlaylist(data)
    } else {
      setCurrUserPlaylist([])
    }
  }

  useEffect(() => {
    getCurrUserPlaylist()
  }, [props.discogsSongInfo])

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
        getVideoURL={props.getVideoURL}
      />
      {
        props.fbUser ?
          <Playlist
            currUserPlaylist={currUserPlaylist}
            getCurrUserPlaylist={getCurrUserPlaylist}
            fbUser={props.fbUser}
          />
          :
          null
      }
      {/* <SongHistory /> */}
    </>
  )
}

export default Main