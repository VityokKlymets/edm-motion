import { FC, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import MusicIcon from "components/player/assets/music.svg"

import MyAudio from "components/player/MyAudio"
import { getPlayerState } from "store/selectors/playerSelectors"
import { getAppState } from "store/selectors/appSelectors"
import { pauseSong, playSong } from "store/actions/playerActions"

import { enableSmartScroll } from "store/actions/appActions"

import { documentOffsetTop } from "utils/dom"

import styles from "styles/song/song-single.module.sass"
import DownloadBtn from "components/buttons/DownloadBtn"
import SongPlayBtn from "components/song/buttons/SongPlayBtn"

interface IProps {
  song: ISongEntity
  showCover?: boolean
  className?: string
}

const SongSingle: FC<IProps> = ({ song, className = "", showCover = false }) => {
  const TIMEOUT_TO_SCROLL = 30000

  const dispatch = useDispatch()

  const { song: currentSong, play } = useSelector(getPlayerState)
  const { smartScroll } = useSelector(getAppState)
  const container = useRef<HTMLDivElement>()
  const timeout = useRef(null)

  const { uniqueId, title, artists, duration, url, string: songString, id } = song

  const isCurrentSong = currentSong && currentSong.uniqueId === uniqueId
  const isPlaying = isCurrentSong && play

  const onSongPlayClick = () => {
    const action = isCurrentSong ? (play ? pauseSong() : playSong()) : playSong(song)
    dispatch(action)
  }

  const onContainerClick = () => {
    if (showCover) {
      if (!isCurrentSong) {
        onSongPlayClick()
      }
    }
  }

  const runTimeout = () => {
    timeout.current = setTimeout(() => {
      dispatch(enableSmartScroll(true))
    }, TIMEOUT_TO_SCROLL)
  }

  const onWindowScroll = () => {
    clearTimeout(timeout.current)
    if (smartScroll) {
      dispatch(enableSmartScroll(false))
    }
    runTimeout()
  }

  useEffect(() => {
    if (smartScroll && isPlaying && !showCover) {
      const top = documentOffsetTop(container.current) - window.innerHeight / 2
      window.scrollTo({
        top,
        behavior: "smooth",
      })
    }
  }, [isPlaying, smartScroll])

  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll)
    return () => {
      window.removeEventListener("scroll", onWindowScroll)
    }
  }, [])

  const renderDivTitle = () => <div className={styles.song_title}>{title}</div>
  const renderLinkTitle = () => (
    <a href={`/songs/${id}`} className={styles.song_title}>
      {title}
    </a>
  )

  return (
    <div
      onClick={onContainerClick}
      className={`${styles.song_single} ${className} ${showCover ? styles.show_cover : ""}`}
      ref={container}
    >
      {!showCover && <SongPlayBtn song={song} />}

      <div className={styles.cover}>
        {song.cover ? (
          <img alt={song.title} className={styles.cover_image} src={song.cover.path} />
        ) : (
          <MusicIcon className={styles.cover_image} />
        )}
      </div>

      <div className={styles.song_info}>
        {showCover ? renderDivTitle() : renderLinkTitle()}
        <div className={styles.song_artist}>{artists.map((a) => a.name).join(", ")}</div>
      </div>

      <div className={styles.btns}>
        <DownloadBtn className={styles.btn} downloadUrl={url} fileName={`${songString}.mp3`} />
      </div>
      <div className={styles.song_duration}>{MyAudio.timeToString(duration)}</div>
    </div>
  )
}

export default SongSingle
