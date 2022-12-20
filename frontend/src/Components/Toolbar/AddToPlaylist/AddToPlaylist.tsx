import { useState, useEffect } from 'react'

import { Star, StarFill } from 'react-bootstrap-icons'

import { User as FirebaseUser } from 'firebase/auth'

import { Song, User, YTinfo, DiscogsSongInfo } from '../../../types'


interface AddToPlaylistProps {
    currUser: User
    allUsers: User[]
    fbUser: FirebaseUser | null
    discogsSongInfo: DiscogsSongInfo
    YTinfo: YTinfo
}


const AddToPlaylist = (props: AddToPlaylistProps) => {
    const [currUserPlaylist, setCurrUserPlaylist] = useState<Song[]>([] as Song[])

    const URL = "http://localhost:4000/users/"

    const getCurrUserPlaylist = async () => {
        if (props.currUser !== undefined) {
            let response = await fetch(URL + 'songs/' + `${props.currUser.email}/`)
            let data = await response.json()

            setCurrUserPlaylist(data)
        }
    }

    const addToCurrUserPlaylist = async () => {
        if (props.currUser !== undefined) {
            await fetch(URL + 'songs/', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify([props.currUser, props.discogsSongInfo, props.YTinfo])
            })

            await getCurrUserPlaylist()
        }
    }

    const handleFavorite = () => {
        // if (currUserPlaylist.length > 0) {

        // if the discogsSong song does not exist in currUserPlaylist
        // if (!currUserPlaylist.some(el => el.discogsTitle == props.discogsSongInfo.discogsTitle)) {
        // console.log('currUserPlaylist doesnt have discogsSongTitle')
        addToCurrUserPlaylist()
        getCurrUserPlaylist()
        // }

        // console.log('song exists')
        // }

        // console.log('playlist is empty, add song')
        // else {
        //     addToCurrUserPlaylist()
        //     getCurrUserPlaylist()
        // }
    }

    const handleUnfavorite = async () => {
        console.log('unfav')
        // if (props.currUser !== undefined) {
        await fetch(URL + 'songs/' + `${props.currUser.email}/` + `${props.discogsSongInfo.discogsTitle}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
            },
            // body: JSON.stringify([props.currUser, props.discogsSongInfo, props.YTinfo])
        })

        await getCurrUserPlaylist()
        // }
    }

    console.log('./AddToPlaylist', currUserPlaylist)
    console.log('./AddToPlaylist currUser', props.currUser)

    useEffect(() => {
        getCurrUserPlaylist()
    }, [props.currUser])

    return (
        <div>
            {(!currUserPlaylist.some(el => el.discogsTitle == props.discogsSongInfo.discogsTitle)) ?
                <Star onClick={handleFavorite} />
                :
                <StarFill onClick={handleUnfavorite} />
            }
        </div>
    )
}

export default AddToPlaylist