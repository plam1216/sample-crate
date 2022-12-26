import { DiscogsSongInfo, YTinfo } from "../../types"


interface YouTubeEmbedProps {
    discogsSongInfo: DiscogsSongInfo
    YTinfo: YTinfo
}


const YouTubeEmbed = (props: YouTubeEmbedProps) => {
    let YTvideo = `https://www.youtube.com/embed/${props.YTinfo.videoID}`

    return (
        <div className="video-responsive">
            {
                props.YTinfo ?
                    <iframe
                        width="853"
                        height="480"
                        src={YTvideo}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                    :
                    'loading'
            }
        </div >
    )
}

export default YouTubeEmbed