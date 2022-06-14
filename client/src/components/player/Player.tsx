import React, { useEffect, useRef, useState } from "react"

import { getNewsState } from "store/selectors/newsSelector"
import { newsPaginationLoad } from "store/actions/newsActions"

import { getPlayerState } from "store/selectors/playerSelectors"
import {
  nextSong,
  pauseSong,
  prevSong,
  playSong,
  appendPlaylist,
} from "store/actions/playerActions"
import { setLogoLoading } from "store/actions/appActions"

import Playlist from "components/player/Playlist"
import WaveProgress from "components/player/WaveProgress"
import LineProgress from "components/player/LineProgress"
import MyAudio from "components/player/MyAudio"
import Contols from "components/player/Contols"

import { useDispatch, useSelector } from "react-redux"
import useWindowWith from "components/hooks/useWindowWidth"

import NoCoverImage from "./assets/no-cover.svg"
import styles from "styles/player/player.module.sass"

import { getApiHost, post } from "utils/api"
import { newsFetchPagination } from "utils/fetch"
import { last } from "lodash"

const TABLET_BREAKPOINT = 979

const Player = () => {
  const {
    song,
    play,
    playlist: { songs },
  } = useSelector(getPlayerState)
  const { pagination } = useSelector(getNewsState)
  const container = useRef<HTMLDivElement>(null)
  const windowWidth = useWindowWith()

  const repeat = useRef(false)
  const [repeatActive, setRepeatActive] = useState(repeat.current)

  const [playlistOpen, setPlaylistOpen] = useState(false)

  const [currentTime, setCurrentTime] = useState("0:00")

  const dispatch = useDispatch()

  const progressHandler = (progress: number) => {
    MyAudio.setProgress(progress)
  }

  const getProgress = () => MyAudio.getProgress()

  const pauseHandler = () => {
    MyAudio.pause()
    dispatch(pauseSong())
  }

  const playHander = () => {
    MyAudio.play()
    dispatch(playSong())
  }

  const endedHandler = async () => {
    MyAudio.setProgress(0)
    if (repeat.current) {
      MyAudio.play()
      return
    }
    if (song && last(songs).uniqueId === song.uniqueId) {
      dispatch(setLogoLoading(true))
      await newsFetchPagination(
        pagination,
        {
          currentPage: pagination.currentPage + 1,
        },
        post,
        dispatch,
        (newNews, newPagination) => newsPaginationLoad(newNews, newPagination),
        (playlist) => appendPlaylist(playlist)
      )
      dispatch(setLogoLoading(false))
    }
    dispatch(nextSong())
    MyAudio.play()
  }

  const nextHandler = () => {
    dispatch(nextSong())
  }

  const prevHandler = () => {
    dispatch(prevSong())
  }

  const repeatHandler = () => {
    repeat.current = !repeat.current
    setRepeatActive(repeat.current)
  }
  const playlistHandler = () => {
    setPlaylistOpen(!playlistOpen)
  }

  const timeUpdateHandler = (e) => {
    setCurrentTime(MyAudio.getTime())
  }

  useEffect(() => {
    MyAudio.init()

    MyAudio.addEvent("ended", () => endedHandler())
    MyAudio.addEvent("timeupdate", timeUpdateHandler)
    return () => {
      MyAudio.removeEvent("ended", endedHandler)
      MyAudio.removeEvent("timeupdate", timeUpdateHandler)
    }
  }, [])

  useEffect(() => {
    if (play) {
      MyAudio.play(getApiHost() + song.url)
    } else {
      MyAudio.pause()
    }
  }, [song, play])

  useEffect(() => {
    if (container.current) {
      const { height } = container.current.getBoundingClientRect()
      const page = document.querySelector(".page") as HTMLDivElement
      page.style.paddingBottom = `${height + 20}px`
    }
  }, [song, windowWidth])

  const contentExpanded = windowWidth > TABLET_BREAKPOINT

  return song ? (
    <div ref={container} className={styles.player}>
      <div className={styles.player_content_inner}>
        {song.cover ? (
          <img className={styles.player_song_cover} src={song.cover.path} alt={song.title} />
        ) : (
          <NoCoverImage
            className={`${styles.player_song_cover} ${styles.player_song_no_cover_image}`}
          />
        )}

        <div className={styles.player_song_info}>
          <div className={styles.player_song_info_inner}>
            <div className={styles.player_song_info_artists}>
              {song.artists.map(({ id, name }) => (
                <div key={id} className={styles.player_song_info_artist}>
                  {name}
                </div>
              ))}
            </div>
            <div className={styles.player_song_info_title}>{song.title}</div>
          </div>
        </div>

        <div className={styles.player_time_wrapper}>
          <div className={styles.player_time_info}>
            <div className={styles.player_time}> {currentTime}</div>
            <div className={styles.player_time_divider}>/</div>
            <div className={styles.player_time_duration}>{MyAudio.timeToString(song.duration)}</div>
          </div>
          {contentExpanded ? (
            <WaveProgress
              getProgress={getProgress}
              onProgress={progressHandler}
              waveform={song.waveform}
            />
          ) : (
            <LineProgress getProgress={getProgress} onProgress={progressHandler} />
          )}
        </div>
      </div>
      <Contols
        playing={play}
        repeatBtnActive={repeatActive}
        playlistBtnActive={playlistOpen}
        onPauseClick={pauseHandler}
        onPlayClick={playHander}
        onNextClick={nextHandler}
        onPrevClick={prevHandler}
        onRepeatClick={repeatHandler}
        onPlaylistClick={playlistHandler}
      />

      <Playlist playlistOpen={playlistOpen} setPlaylistOpen={setPlaylistOpen} />
    </div>
  ) : null
}

export default Player
