import { useState, useEffect } from 'react'

import { CloudDownload } from 'react-bootstrap-icons'

import { YTinfo } from '../../../types'


interface DownloadMP3Props {
  YTinfo: YTinfo
}


const DownloadMP3 = (props: DownloadMP3Props) => {
  const [downloadLink, setDownloadLink] = useState<string>('')

  const convertToMP3 = async () => {
    const ytmp3key = await fetch(URL + 'ytmp3key/')
    const ytmp3keyData = await ytmp3key.text()

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${ytmp3keyData}`,
        'X-RapidAPI-Host': 't-one-youtube-converter.p.rapidapi.com'
      }
    };

    const response = await fetch('https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D' + props.YTinfo.videoID + '&format=mp3&responseFormat=json&lang=en', options)
    const data = await response.json()

    setDownloadLink(data.file)
  }

  useEffect(() => {
    convertToMP3()
  }, [props.YTinfo])

  return (
    <div>
      <a href={downloadLink} style={{ textDecoration: 'none' }}>
        <CloudDownload
          size={40}
          style={{ cursor: 'pointer' }}
        ></CloudDownload>
      </a>
    </div>
  )
}

export default DownloadMP3