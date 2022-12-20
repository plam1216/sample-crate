import { DiscogsSongInfo, YTinfo } from "../../types"


interface YouTubeEmbedProps {
    discogsSongInfo: DiscogsSongInfo
    YTinfo: YTinfo
}


const YouTubeEmbed = (props: YouTubeEmbedProps) => {
    console.log('YT Embed Props', props.discogsSongInfo.discogsTitle)
    // console.log(props.YTinfo)
    return (
        <div className="video-responsive">
            {
                // props.YTinfo.url ?
                props.YTinfo ?
                <iframe
                width="853"
                height="480"
                src={props.YTinfo.url}
                // frameBorder="0"
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