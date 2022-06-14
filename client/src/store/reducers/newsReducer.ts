import { NewsActions, NewsTypes } from "store/types"
import { HYDRATE } from "next-redux-wrapper"

export interface INewsState {
  news: INewsEntity[]
  pagination: INewsPagination
}

const initalState: INewsState = {
  news: [],
  pagination: {
    itemsPerPage: 10,
    totalCount: 0,
    currentPage: 1,
    label: "",
    genre: "",
  },
}

const reducer = (state = initalState, action: NewsActions): INewsState => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.news }
    case NewsTypes.LOAD:
      return {
        ...state,
        news: action.news,
        pagination: action.pagination,
      }
    case NewsTypes.PAGINATION_LOAD:
      return {
        ...state,
        news: [...state.news, ...action.news],
        pagination: action.pagination,
      }
    default:
      return state
  }
}

export default reducer
