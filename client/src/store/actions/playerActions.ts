import { PlayerTypes, PlayerActions, IPlaylist } from "store/types"

export const setPlaylist = (playlist: IPlaylist): PlayerActions => ({
  type: PlayerTypes.SET_PLAYLIST,
  playlist,
})

export const appendPlaylist = (playlist: IPlaylist): PlayerActions => ({
  type: PlayerTypes.APPEND_PLAYLIST,
  playlist,
})

export const playSong = (song?: ISongEntity): PlayerActions => ({
  type: PlayerTypes.PLAY,
  song,
})

export const pauseSong = (): PlayerActions => ({
  type: PlayerTypes.PAUSE,
})

export const nextSong = (): PlayerActions => ({
  type: PlayerTypes.NEXT_SONG,
})

export const prevSong = (): PlayerActions => ({
  type: PlayerTypes.PREV_SONG,
})
