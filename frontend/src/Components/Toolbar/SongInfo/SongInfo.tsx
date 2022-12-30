import { useState } from 'react'

import { analytics } from '../../../services/firebase'
import { logEvent } from 'firebase/analytics'

import { InfoCircle } from 'react-bootstrap-icons'
import { Modal } from 'react-bootstrap'

import { DiscogsSongInfo } from '../../../types'


interface SongInfoProps {
    discogsSongInfo: DiscogsSongInfo
}


const SongInfo = (props: SongInfoProps) => {
    const [show, setShow] = useState(false)

    // show modal on SongInfo click
    const handleShow = () => {
        console.log(props.discogsSongInfo.genre)
        setShow(true)
    }


    return (
        <div>
            <InfoCircle
                size={40}
                onClick={handleShow}
                style={{ cursor: 'pointer' }}
            />
            <Modal
                show={show}
                onHide={() => setShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Song Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Title: {props.discogsSongInfo?.discogsTitle}
                    </p>
                    <p>
                        Genre: {props.discogsSongInfo.genre?.map(genre => genre + '; ')}
                    </p>
                    <p>
                        Style: {props.discogsSongInfo.style?.map(style => style + '; ')}
                    </p>
                    <p>
                        Year: {props.discogsSongInfo?.year}
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SongInfo