import React, { FC } from "react"
import styles from "styles/player/player.module.sass"
import PlayIcon from "./assets/play.svg"
import PauseIcon from "./assets/pause.svg"
import NextIcon from "./assets/next.svg"
import RepeatIcon from "./assets/repeat.svg"
import PlaylistIcon from "./assets/playlist.svg"

interface IProps {
  playing: boolean
  repeatBtnActive?: boolean
  playlistBtnActive?: boolean
  onPlayClick()
  onPauseClick()
  onNextClick()
  onPrevClick()
  onRepeatClick()
  onPlaylistClick()
}

const Contols: FC<IProps> = ({
  playing = false,
  onPlayClick,
  onPauseClick,
  onNextClick,
  onPrevClick,
  onRepeatClick,
  onPlaylistClick,
  repeatBtnActive = false,
  playlistBtnActive = false,
}) => {
  const renderBtn = (Icon: FC, onClick, className = "") => (
    <div className={`${styles.controls_button} ${className}`} onClick={onClick}>
      <div className={styles.controls_icon}>
        <Icon />
      </div>
    </div>
  )

  return (
    <div className={styles.controls}>
      {renderBtn(NextIcon, onPrevClick, styles.controls_button_prev)}
      {playing
        ? renderBtn(PauseIcon, onPauseClick, styles.controls_button_pause)
        : renderBtn(PlayIcon, onPlayClick, styles.controls_button_play)}
      {renderBtn(NextIcon, onNextClick, styles.controls_button_next)}

      {renderBtn(
        RepeatIcon,
        onRepeatClick,
        ` ${styles.controls_btn_secondary} ${styles.controls_button_repeat} ${
          repeatBtnActive ? styles.controls_btn_active : ""
        }`
      )}
      {renderBtn(
        PlaylistIcon,
        onPlaylistClick,
        `${styles.controls_btn_secondary} ${styles.controls_button_playlist} ${
          playlistBtnActive ? styles.controls_btn_active : ""
        }`
      )}
    </div>
  )
}

export default Contols
