import { Col, Container, Row } from 'react-bootstrap'
import { Song } from '../../types'


interface PlaylistProps {
    currUserPlaylist: Song[]
}


const Playlist = (props: PlaylistProps) => {
    return (
        <Container fluid className='playlist'>
            {props.currUserPlaylist.map((song) => {
                return (
                    <Row className='playlist-song'>
                        <Col xs={{ span: 12 }} sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 1 }}>
                            <img src={song.YTthumbnail} style={{ borderRadius: 5 }} className='YTthumbnail' />
                        </Col>
                        <Col xs={{ span: 7, offset: 2 }} sm={{ span: 8, offset: 2 }} md={{ span: 2, offset: 1 }} lg={{ span: 10, offset: 1 }} className='playlist-song-info'>
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