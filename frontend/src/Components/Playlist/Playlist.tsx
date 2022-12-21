import { Song } from '../../types'


interface PlaylistProps {
    currUserPlaylist: Song[]
}


const Playlist = (props: PlaylistProps) => {
    console.log('playlist', props.currUserPlaylist)
    return (
        <div className='playlist'>
            {props.currUserPlaylist.map((song) => {
                return (
                    <div key={song.discogsTitle}>
                        <img src={song.YTthumbnail} />
                        {song.discogsTitle}
                        {song.year}
                    </div>
                )
            })
            }
        </div>
    )
}

export default Playlist