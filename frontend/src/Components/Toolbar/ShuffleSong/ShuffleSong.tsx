import { analytics } from '../../../services/firebase'
import { logEvent } from 'firebase/analytics'

import { Shuffle } from 'react-bootstrap-icons'

import { SearchParams } from '../../../types'


interface ShuffleSongProps {
  filteredSearch: SearchParams
  getVideoURL: () => void
  getRandomDiscogsSong: () => void
  getFilteredDiscogsSong: (genre: string, year?: number) => void
}

const ShuffleSong = (props: ShuffleSongProps) => {
  return (
    <div>
      <Shuffle
        onClick={() => {
          props.filteredSearch.genre ? props.getFilteredDiscogsSong(props.filteredSearch.genre, props.filteredSearch.year) : props.getRandomDiscogsSong()
          props.getVideoURL()
          logEvent(analytics, "shuffle", {})
        }}
        size={40}
        style={{ cursor: 'pointer' }}
      />
    </div>
  )
}

export default ShuffleSong