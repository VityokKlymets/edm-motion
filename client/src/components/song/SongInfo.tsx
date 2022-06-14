import { FC } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import SongInfoTable from "components/song/SongInfoTable"
import MyAudio from "components/player/MyAudio"
import DownloadBtn from "components/buttons/DownloadBtn"
import TelegramBtn from "components/buttons/TelegramBtn"
import MessengerBtn from "components/buttons/MessengerBtn"
import PlayBtn from "components/buttons/PlayBtn"
import styles from "styles/song/song-info.module.sass"
import { getAbsolutePath } from "utils/api"

interface IProps {
  song: ISongEntity
}

const SongInfo: FC<IProps> = ({ song }) => {
  const { cover, title, artists, duration, createdAt, url, string: songString } = song
  const router = useRouter()
  const currentPath = getAbsolutePath(router.asPath)
  return (
    <div className={styles.info}>
      <div className={styles.image}>
        <Image width={cover.width} height={cover.height} alt={title} src={cover.path} />
      </div>

      <div className={styles.info_inner}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.artists}>
          <strong>by: </strong>
          {artists.map((a) => a.name).join(", ")}
        </div>
        <SongInfoTable
          data={{
            "Bitrate:": "320 kb/s",
            "Duration:": MyAudio.timeToString(duration),
            "Added:": new Date(createdAt).toLocaleDateString(),
          }}
        />
        <div className={styles.btns}>
          <DownloadBtn
            title="Download"
            className={`${styles.btn} ${styles.download_btn}`}
            downloadUrl={url}
            fileName={`${songString}.mp3`}
          />
          <PlayBtn title="Play" song={song} className={`${styles.btn} ${styles.play_btn}`} />
        </div>
        <div className={styles.share_text}>Share:</div>
        <div className={styles.share}>
          <TelegramBtn text={songString} url={currentPath} />
          <MessengerBtn url={currentPath} />
        </div>
      </div>
    </div>
  )
}

export default SongInfo
