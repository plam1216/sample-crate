import { Col, Container, Row } from 'react-bootstrap'
import { Song } from '../../types'


interface PlaylistProps {
    currUserPlaylist: Song[]
}


const Playlist = (props: PlaylistProps) => {
    return (
        <Container className='playlist'>
            {props.currUserPlaylist.map((song) => {
                return (
                    <Row className='playlist-song'>
                        <Col md={{ span: 1}}>
                            <img src={song.YTthumbnail} style={{borderRadius: 5}}/>
                        </Col>
                        <Col md={{ span: 10, offset: 1 }} className='playlist-song-info'>
                            {song.YTtitle}
                            <br />
                            {song.year}
                        </Col>
                    </Row>
                )
            })
            }
        </Container>
    )
}

export default Playlist