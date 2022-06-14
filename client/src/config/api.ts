import { getApiHost } from "utils/api"

const API_HOST = getApiHost()

export const SONG_PLAY = `${API_HOST}/song/play`
export const SONG_ADD = `${API_HOST}/song/add`
export const SONG_UPDATE = `${API_HOST}/song/update`
export const SONG_LIST_BY_PAGE = `${API_HOST}/song/list`
export const SONG_TOP100 = `${API_HOST}/song/top100`
export const SONG_FETCH = `${API_HOST}/song/fetch`
export const SONG_LAST = `${API_HOST}/song/lastSongs`
export const SONG_FIND_BY_IDS = `${API_HOST}/song/findByIds`

export const ARTIST_ADD = `${API_HOST}/artist/add`
export const ARTIST_UPDATE = `${API_HOST}/artist/update`
export const ARTIST_LIST = `${API_HOST}/artist/list`
export const ARTIST_LIST_CLIENT = `${API_HOST}/artist/listClient`

export const GENRE_ADD = `${API_HOST}/genre/add`
export const GENRE_UPDATE = `${API_HOST}/genre/update`

export const LABEL_ADD = `${API_HOST}/label/add`
export const LABEL_UPDATE = `${API_HOST}/label/update`

export const NEWS_LIST = `${API_HOST}/news/list`
export const NEWS_LIST_CLIENT = `${API_HOST}/news/listClient`
export const NEWS_ADD = `${API_HOST}/news/add`
export const NEWS_UPDATE = `${API_HOST}/news/update`
export const NEWS_SEARCH = `${API_HOST}/news/search`

export const ENTITY_FIND_BY_FIELDS = `${API_HOST}/entity/findByFields`
export const ENTITY_FIND_BY_IDS = `${API_HOST}/entity/findByIds`
export const ENTITY_DELETE_BY_ID = `${API_HOST}/entity/delete`
export const ENTITY_UPDATE = `${API_HOST}/entity/update`
export const ENTITY_LIST = `${API_HOST}/entity/list`

export const USER_LOGIN = `${API_HOST}/user/login`
export const USER_SIGNUP = `${API_HOST}/user/register`
export const USER_AUTHORIZE = `${API_HOST}/user/authorize`

export const ADMIN_AUTH = `${API_HOST}/user/authorize`
