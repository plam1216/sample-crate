import { useEffect } from 'react'

import { User as FirebaseUser } from 'firebase/auth'

import YouTubeEmbed from '../../Components/YouTubeEmbed/YouTubeEmbed'
import Toolbar from '../../Components/Toolbar/Toolbar'

import { User, YTinfo, DiscogsSongInfo } from '../../types'


interface MainProps {
  currUser: User
  allUsers: User[]
  fbUser?: FirebaseUser | null
  discogsSongInfo: DiscogsSongInfo
  YTinfo: YTinfo
  getRandomDiscogsSong: () => void
}


const Main = (props: MainProps) => {
  useEffect(() => {

  }, [props.discogsSongInfo])

  // console.log('./Main', props.discogsSongInfo.discogsTitle)

  return (
    <>
      <YouTubeEmbed
        discogsSongInfo={props.discogsSongInfo}
        YTinfo={props.YTinfo}
      />
      <Toolbar
        currUser={props.currUser}
        allUsers={props.allUsers}
        fbUser={props.fbUser}
        discogsSongInfo={props.discogsSongInfo}
        YTinfo={props.YTinfo}
        getRandomDiscogsSong={props.getRandomDiscogsSong}
      />
    </>
  )
}

export default Main