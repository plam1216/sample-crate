import { User as FirebaseUser } from 'firebase/auth'

import { Container, Col, Row } from 'react-bootstrap'
import { XCircleFill } from 'react-bootstrap-icons'

import { Song } from '../../types'
import { URL } from '../../config'


interface PlaylistProps {
    fbUser: FirebaseUser
    currUserPlaylist: Song[]
    getCurrUserPlaylist: () => void
    changeCurrentVideo: (songTitle: string) => void
}


const Playlist = (props: PlaylistProps) => {
    const deleteFromPlaylist = async (discogsTitle: string) => {
        await fetch(URL + 'users/songs/' + `${props.fbUser.email}/` + `${discogsTitle}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "Application/json",
            },
        })

        props.getCurrUserPlaylist()
    }

    return (
        <Container fluid className='playlist'>
            {props.currUserPlaylist.map((song) => {
                return (
                    <Row className='playlist-song'>
                        <Col xs={{ span: 11 }} sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 1 }}>
                            <img
                                src={song.YTthumbnail}
                                style={{ borderRadius: 5 }}
                                className='YTthumbnail'
                                alt={song.YTtitle}
                                onClick={() => {
                                    props.changeCurrentVideo(song.discogsTitle)
                                }}
                            />
                        </Col>
                        <Col sm={{ span: 7, offset: 2 }} md={{ span: 8, offset: 1 }} lg={{ span: 9, offset: 1 }} className='playlist-song-info'>
                            {song.YTtitle}
                            <br />
                            {song.year}
                        </Col>
                        <Col sm={{ span: 1 }} md={{ span: 1 }} lg={{ span: 1 }} className='playlist-song-info'>
                            <XCircleFill onClick={() => deleteFromPlaylist(song.discogsTitle)}></XCircleFill>
                        </Col>
                    </Row>
                )
            })
            }
        </Container>
    )
}

export default Playlist