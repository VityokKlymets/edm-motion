import { createSelector, Selector } from "reselect"
import { IState } from "store"
import { INewsState } from "store/reducers/newsReducer"
import { DEFAULT_LIST_NAME, IPlaylist } from "store/types"

const newsSelector = (state) => state.news

export const getNewsState: Selector<IState, INewsState> = createSelector(
  newsSelector,
  (news) => news
)

export const createPlaylist = (news: INewsEntity[], name = DEFAULT_LIST_NAME) => {
  const songs = news.flatMap((n) => n.songs || [])
  const playlist: IPlaylist = {
    name,
    songs,
  }
  return playlist
}

export const getNews = createSelector(newsSelector, (news) => news.news)
