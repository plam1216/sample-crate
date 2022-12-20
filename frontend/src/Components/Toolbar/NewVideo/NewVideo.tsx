import { Shuffle } from 'react-bootstrap-icons'


interface NewVideoProps {
  getRandomDiscogsSong: () => void
}

const NewVideo = (props: NewVideoProps) => {
  return (
    <div>
      <Shuffle onClick={props.getRandomDiscogsSong}/>
    </div>
  )
}

export default NewVideo