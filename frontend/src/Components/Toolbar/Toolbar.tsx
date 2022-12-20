import { User as FirebaseUser } from 'firebase/auth'

import AddToPlaylist from './AddToPlaylist/AddToPlaylist'
import DownloadVideo from './DownloadVideo/DownloadVideo'
import Filter from './Filter/Filter'
import NewVideo from './NewVideo/NewVideo'

import { User, YTinfo, DiscogsSongInfo } from '../../types'


interface ToolbarProps {
    currUser: User
    allUsers: User[]
    fbUser?: FirebaseUser | null
    discogsSongInfo: DiscogsSongInfo
    YTinfo: YTinfo
    getRandomDiscogsSong: () => void
}


const Toolbar = (props: ToolbarProps) => {
    return (
        <div className='toolbar'>
            <NewVideo
                getRandomDiscogsSong={props.getRandomDiscogsSong}
            />
            {
                props.fbUser ?
                    <AddToPlaylist
                        currUser={props.currUser}
                        allUsers={props.allUsers}
                        fbUser={props.fbUser}
                        discogsSongInfo={props.discogsSongInfo}
                        YTinfo={props.YTinfo}
                    />
                    :
                    null
            }
            <Filter />
            <DownloadVideo />
        </div>
    )
}

export default Toolbar