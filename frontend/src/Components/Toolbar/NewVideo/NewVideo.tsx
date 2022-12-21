import { Shuffle } from 'react-bootstrap-icons'


interface NewVideoProps {
  getRandomDiscogsSong: () => void
  getVideoURL: () => void
}

const NewVideo = (props: NewVideoProps) => {
  return (
    <div>
      <Shuffle
        onClick={() => {
          props.getRandomDiscogsSong()
          props.getVideoURL()
        }}
        size={40}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )
}

export default NewVideo