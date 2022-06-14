import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { pauseSong, playSong } from "store/actions/playerActions"

import PlayIcon from "components/player/assets/play.svg"
import PauseIcon from "components/player/assets/pause.svg"
import MusicIcon from "components/player/assets/music.svg"

import { getPlayerState } from "store/selectors/playerSelectors"
import styles from "styles/song/song-play-btn.module.sass"

interface IProps {
  song: ISongEntity
}

const SongPlayBtn: FC<IProps> = ({ song }) => {
  const dispatch = useDispatch()
  const { song: currentSong, play } = useSelector(getPlayerState)

  const isCurrent = !!currentSong && currentSong.uniqueId === song.uniqueId
  const onSongPlayClick = () => {
    const action = play && isCurrent ? pauseSong() : playSong(song)
    dispatch(action)
  }

  const currentClassName = isCurrent ? styles.btn_current : ""
  const playClassName = play ? styles.btn_play : ""

  return (
    <div onClick={onSongPlayClick} className={`${styles.btn} ${currentClassName} ${playClassName}`}>
      <PlayIcon className={`${styles.btn_icon} ${styles.play_icon}`} />
      <MusicIcon className={`${styles.btn_icon} ${styles.music_icon}`} />
      <PauseIcon className={`${styles.btn_icon} ${styles.pause_icon}`} />
    </div>
  )
}

export default SongPlayBtn
