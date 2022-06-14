import { HYDRATE } from "next-redux-wrapper"

export enum PlayerTypes {
  SET_PLAYLIST = "SET_PLAYLIST",
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  NEXT_SONG = "NEXT_SONG",
  PREV_SONG = "PREV_SONG",
  APPEND_PLAYLIST = "APPEND_PLAYLIST",
}

export const DEFAULT_LIST_NAME = "default"

export interface ISongList {
  songs?: ISongEntity[]
}

interface IPlayAction {
  type: typeof PlayerTypes.PLAY
  song?: ISongEntity
}

interface ISetPlaylistAction {
  type: typeof PlayerTypes.SET_PLAYLIST
  playlist: IPlaylist
}

interface IPauseAction {
  type: typeof PlayerTypes.PAUSE
}

interface INextSongAction {
  type: typeof PlayerTypes.NEXT_SONG
}

interface IPrevSongAction {
  type: typeof PlayerTypes.PREV_SONG
}

interface ISongHydrateAction {
  type: typeof HYDRATE
  payload: any
}

interface IAppendPlaylistAction {
  type: typeof PlayerTypes.APPEND_PLAYLIST
  playlist: IPlaylist
}

export interface IPlaylist {
  name: string
  songs: ISongEntity[]
}

export type PlayerActions =
  | IPlayAction
  | IPauseAction
  | INextSongAction
  | IPrevSongAction
  | ISetPlaylistAction
  | ISongHydrateAction
  | IAppendPlaylistAction

export enum MessageTypes {
  SET_MESSAGE,
}

interface ISetMessageAction {
  type: typeof MessageTypes.SET_MESSAGE
  message: string
  error?: boolean
  success?: boolean
}

export type MessageActions = ISetMessageAction

export enum UserTypes {
  AUTHORIZE = "AUTHORIZE",
  LOGOUT = "LOGOUT",
}

interface IUserAuthorizeAction {
  type: typeof UserTypes.AUTHORIZE
  user: IUserEntity
}

interface IUserLogoutAction {
  type: typeof UserTypes.LOGOUT
}

export type UserActions = IUserAuthorizeAction | IUserLogoutAction

export enum NewsTypes {
  LOAD = "LOAD",
  PAGINATION_LOAD = "PAGINATION_LOAD",
}

interface INewsLoadAction {
  type: typeof NewsTypes.LOAD
  news: INewsEntity[]
  pagination: IPagination
}

interface INewsPaginationLoadAction {
  type: typeof NewsTypes.PAGINATION_LOAD
  news: INewsEntity[]
  pagination: IPagination
}

interface INewsHydrateAction {
  type: typeof HYDRATE
  payload: any
}

export type NewsActions = INewsLoadAction | INewsPaginationLoadAction | INewsHydrateAction

export enum AppTypes {
  SET_LOGO_LOADING = "SET_LOGO_LOADING",
  ENABLE_SMART_SCROLL = "ENABLE_SMART_SCROLL",
}

interface ISetLogoLoadingAction {
  type: typeof AppTypes.SET_LOGO_LOADING
  loading: boolean
}

interface IEnableSmartScrollAction {
  type: typeof AppTypes.ENABLE_SMART_SCROLL
  enable: boolean
}

export type AppActions = ISetLogoLoadingAction | IEnableSmartScrollAction
