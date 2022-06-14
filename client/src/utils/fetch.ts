import { post } from "utils/api"
import { GetServerSidePropsContext } from "next-redux-wrapper"
import { NEWS_LIST_CLIENT } from "config/api"
import { IPlaylist } from "store/types"
import { createPlaylist } from "store/selectors/newsSelector"

export const fetchArtistStaticPages = async (query: string) => {
  return post<ISearchResult[]>("/api/fetchArtistStaticPages", { query })
}

export const newsFetchPagination = async (
  currentPagination: INewsPagination,
  nextPagination: INewsPagination,
  fetchFunc: (
    url: string,
    body: any,
    ctx?: GetServerSidePropsContext
  ) => Promise<IEntityListResponse>,
  dispatch: (action: any) => void,
  newsActionToDispach: (news: INewsEntity[], newsPagination: INewsPagination) => object,
  playlistActionToDispatch: (playlist: IPlaylist) => object,
  ctx?: GetServerSidePropsContext
) => {
  const body: INewsClientListRequest = {
    pagination: {
      ...currentPagination,
      ...nextPagination,
    },
  }

  const response: IEntityListResponse = await fetchFunc(NEWS_LIST_CLIENT, body, ctx)

  const { items = [], totalCount = 0, itemsPerPage = 10} = response

  const pagination: IPagination = {
    ...body.pagination,
    totalCount,
    itemsPerPage,
  }

  dispatch(newsActionToDispach(items, pagination))

  const playlist = createPlaylist(items)
  dispatch(playlistActionToDispatch(playlist))
}
