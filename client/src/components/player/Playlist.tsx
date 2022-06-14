import { FC, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { getPlayerState } from "store/selectors/playerSelectors"
import SongSingle from "components/song/SongSingle"

import styles from "styles/player/playlist.module.sass"
import songStyles from "styles/song/song-single.module.sass"

import CloseIcon from "./assets/close.svg"

interface IProps {
  className?: string
  playlistOpen: boolean
  setPlaylistOpen: (value: boolean) => void
}

const Playlist: FC<IProps> = ({ className = "", playlistOpen, setPlaylistOpen }) => {
  const { song, playlist } = useSelector(getPlayerState)

  const container = useRef<HTMLDivElement>()
  const head = useRef<HTMLDivElement>()
  const [headCollapsed, setHeadCollapsed] = useState(false)

  const onListClick = () => {
    setPlaylistOpen(!playlistOpen)
  }

  const scrollHandler = (e) => {
    const scrollY = container.current.scrollTop
    if (scrollY > 0) {
      setHeadCollapsed(true)
    } else {
      setHeadCollapsed(false)
    }
  }

  useEffect(() => {
    if (container.current) {
      container.current.addEventListener("scroll", scrollHandler)
    }
  }, [container.current])

  return song && playlistOpen ? (
    <>
      <div
        className={`${styles.playlist} ${
          headCollapsed ? styles.playlist_head_collapsed : ""
        } ${className}`}
      >
        <div ref={head} className={`${styles.playlist_head} `}>
          <div>current playlist:</div>
          <div onClick={onListClick} className={styles.close_btn}>
            <CloseIcon />
          </div>
        </div>
        <div ref={container} className={styles.playlist_list}>
          {playlist.songs.map((s) => (
            <SongSingle
              showCover={true}
              key={s.uniqueId}
              song={s}
              className={songStyles.song_single_playlist_list}
            />
          ))}
        </div>
      </div>
      <div onClick={onListClick} className={styles.playlist_overlay} />
    </>
  ) : null
}

export default Playlist
