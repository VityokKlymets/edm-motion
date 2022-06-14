import { HYDRATE } from "next-redux-wrapper"
import { PlayerTypes, PlayerActions, IPlaylist, DEFAULT_LIST_NAME } from "store/types"

import { concat } from "lodash"

export interface IPlayerState {
  playlist?: IPlaylist
  song?: ISongEntity
  play: boolean
}

const initalState: IPlayerState = {
  playlist: {
    name: DEFAULT_LIST_NAME,
    songs: [],
  },
  play: false,
  song: null,
}

const reducer = (state = initalState, action: PlayerActions): IPlayerState => {
  const {
    playlist: { songs },
    song,
  } = state
  const currentSongIndex =
    songs.length && song ? songs.findIndex((el) => el.uniqueId === state.song.uniqueId) : 0

  switch (action.type) {
    case HYDRATE:
      return { ...state, playlist: action.payload.player.playlist }
    case PlayerTypes.PLAY:
      if (!action.song) {
        return { ...state, play: true }
      }

      return {
        ...state,
        play: true,
        song: action.song,
      }

    case PlayerTypes.PAUSE:
      return {
        ...state,
        play: false,
      }

    case PlayerTypes.NEXT_SONG:
      if (currentSongIndex < 0) {
        return state
      }
      const nextIndex =
        currentSongIndex + 1 < state.playlist.songs.length ? currentSongIndex + 1 : 0
      return {
        ...state,
        song: state.playlist.songs[nextIndex],
      }

    case PlayerTypes.PREV_SONG:
      if (currentSongIndex < 0) {
        return state
      }
      const prevIndex = currentSongIndex - 1 >= 0 ? currentSongIndex - 1 : 0
      return {
        ...state,
        song: state.playlist.songs[prevIndex],
      }

    case PlayerTypes.SET_PLAYLIST:
      return {
        ...state,
        playlist: action.playlist,
      }
    case PlayerTypes.APPEND_PLAYLIST:
      return {
        ...state,
        playlist: { ...state.playlist, songs: concat(state.playlist.songs, action.playlist.songs) },
      }
    default:
      return state
  }
}

export default reducer
