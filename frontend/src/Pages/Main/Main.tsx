import { useState, useEffect } from 'react'

import { User as FirebaseUser } from 'firebase/auth'

import YouTubeEmbed from '../../Components/YouTubeEmbed/YouTubeEmbed'
import Toolbar from '../../Components/Toolbar/Toolbar'
import SongHistory from '../../Components/SongHistory/SongHistory'

import { Song, YTinfo, DiscogsSongInfo, SearchParams } from '../../types'
import Playlist from '../../Components/Playlist/Playlist'

import { URL } from '../../config'


interface MainProps {
  fbUser?: FirebaseUser | null
  discogsSongInfo: DiscogsSongInfo
  filteredSearch: SearchParams
  YTinfo: YTinfo
  getVideoURL: () => void
  changeCurrentVideo: (songTitle: string) => void
  getRandomDiscogsSong: () => void
  getFilteredDiscogsSong: (genre: string, year?: number) => void
}


const Main = (props: MainProps) => {
  const [currUserPlaylist, setCurrUserPlaylist] = useState<Song[]>([] as Song[])

  const getCurrUserPlaylist = async () => {
    if (props.fbUser?.email !== undefined) {
      let response = await fetch(URL + 'users/songs/' + props.fbUser?.uid + '/')
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
        filteredSearch={props.filteredSearch}
        YTinfo={props.YTinfo}
        currUserPlaylist={currUserPlaylist}
        getCurrUserPlaylist={getCurrUserPlaylist}
        getVideoURL={props.getVideoURL}
        getRandomDiscogsSong={props.getRandomDiscogsSong}
        getFilteredDiscogsSong={props.getFilteredDiscogsSong}
      />
      {
        props.fbUser ?
          <Playlist
            fbUser={props.fbUser}
            currUserPlaylist={currUserPlaylist}
            getCurrUserPlaylist={getCurrUserPlaylist}
            changeCurrentVideo={props.changeCurrentVideo}
          />
          :
          null
      }
      {/* <SongHistory /> */}
    </>
  )
}

export default Main