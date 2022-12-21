import React from 'react'

import { CloudDownload } from 'react-bootstrap-icons'

const DownloadVideo = () => {
  // youtube to mp3 api
  return (
    <div>
      <CloudDownload
        size={40}
        style={{cursor: 'pointer'}}
      ></CloudDownload>
    </div>
  )
}

export default DownloadVideo