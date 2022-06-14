import { NewsActions, NewsTypes } from "store/types"

export const newsLoad = (news: INewsEntity[], pagination: IPagination): NewsActions => ({
  type: NewsTypes.LOAD,
  news,
  pagination,
})

export const newsPaginationLoad = (news: INewsEntity[], pagination: IPagination): NewsActions => ({
  type: NewsTypes.PAGINATION_LOAD,
  news,
  pagination,
})
