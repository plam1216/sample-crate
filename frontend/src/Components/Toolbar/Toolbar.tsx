import { User as FirebaseUser } from 'firebase/auth'

import AddToPlaylist from './AddToPlaylist/AddToPlaylist'
import DownloadVideo from './DownloadVideo/DownloadVideo'
import Filter from './Filter/Filter'
import NewVideo from './NewVideo/NewVideo'

import { Song, YTinfo, DiscogsSongInfo } from '../../types'


interface ToolbarProps {
    fbUser?: FirebaseUser | null
    discogsSongInfo: DiscogsSongInfo
    YTinfo: YTinfo
    currUserPlaylist: Song[]
    getRandomDiscogsSong: () => void
    getCurrUserPlaylist: () => void
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
                        fbUser={props.fbUser}
                        discogsSongInfo={props.discogsSongInfo}
                        YTinfo={props.YTinfo}
                        currUserPlaylist={props.currUserPlaylist}
                        getCurrUserPlaylist={props.getCurrUserPlaylist}
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