import { User as FirebaseUser } from 'firebase/auth'

import AddToPlaylist from './AddToPlaylist/AddToPlaylist'
import DownloadMP3 from './DownloadMP3/DownloadMP3'
import Filter from './Filter/Filter'
import ShuffleSong from './ShuffleSong/ShuffleSong'

import { Song, YTinfo, DiscogsSongInfo, SearchParams } from '../../types'


interface ToolbarProps {
    fbUser?: FirebaseUser | null
    discogsSongInfo: DiscogsSongInfo
    filteredSearch: SearchParams
    YTinfo: YTinfo
    currUserPlaylist: Song[]
    getCurrUserPlaylist: () => void
    getVideoURL: () => void
    getRandomDiscogsSong: () => void
    getFilteredDiscogsSong: (genre: string, year?: number) => void
}


const Toolbar = (props: ToolbarProps) => {
    return (
        <div className='toolbar'>
            <ShuffleSong
                getRandomDiscogsSong={props.getRandomDiscogsSong}
                getFilteredDiscogsSong={props.getFilteredDiscogsSong}
                getVideoURL={props.getVideoURL}
                filteredSearch={props.filteredSearch}
                
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
            <Filter
                getFilteredDiscogsSong={props.getFilteredDiscogsSong}
                getVideoURL={props.getVideoURL}
            />
            <DownloadMP3
                YTinfo={props.YTinfo}
            />
        </div>
    )
}

export default Toolbar