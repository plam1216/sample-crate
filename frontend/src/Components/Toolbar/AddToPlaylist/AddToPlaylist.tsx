import { Star, StarFill } from 'react-bootstrap-icons'

import { User as FirebaseUser } from 'firebase/auth'

import { Song, YTinfo, DiscogsSongInfo } from '../../../types'


interface AddToPlaylistProps {
    fbUser: FirebaseUser | null
    discogsSongInfo: DiscogsSongInfo
    YTinfo: YTinfo
    currUserPlaylist: Song[]
    getCurrUserPlaylist: () => void
}


const AddToPlaylist = (props: AddToPlaylistProps) => {
    const URL = "http://localhost:4000/users/"

    const handleFavorite = async () => {
        if (props.fbUser !== undefined) {
            await fetch(URL + 'songs/', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify([props.fbUser, props.discogsSongInfo, props.YTinfo])
            })
        }
        props.getCurrUserPlaylist()
    }

    const handleUnfavorite = async () => {
        await fetch(URL + 'songs/' + `${props.fbUser?.email}/` + `${props.discogsSongInfo.discogsTitle}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
            },
        })
        props.getCurrUserPlaylist()
    }

    console.log('./AddToPlaylist', props.currUserPlaylist)

    return (
        <div>
            {(!props.currUserPlaylist.some(el => el.discogsTitle === props.discogsSongInfo.discogsTitle)) ?
                <Star
                    onClick={handleFavorite}
                    size={40}
                    style={{ cursor: 'pointer' }}
                />
                :
                <StarFill
                    onClick={handleUnfavorite}
                    size={40}
                    style={{ cursor: 'pointer' }}
                />
            }
        </div>
    )
}

export default AddToPlaylist