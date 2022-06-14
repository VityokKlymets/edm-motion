import { FC, useRef } from "react"

import NewsItem from "components/news/NewsList/NewsItem"
import PaginationLinks from "components/containers/PaginationLinks"
import Link from "next/link"

import useIsBottomReached from "components/hooks/useIsBottomReached"
import useAsyncEffect from "components/hooks/useAsyncEffect"
import { useDispatch, useSelector } from "react-redux"

import { post } from "utils/api"
import { newsFetchPagination } from "utils/fetch"

import { getNewsState } from "store/selectors/newsSelector"
import { newsPaginationLoad } from "store/actions/newsActions"
import { appendPlaylist } from "store/actions/playerActions"
import { setLogoLoading } from "store/actions/appActions"

const NewsList: FC = () => {
  const container = useRef<HTMLDivElement>()
  const isReached = useIsBottomReached(container, 50)

  const dispatch = useDispatch()

  const { news, pagination } = useSelector(getNewsState)

  useAsyncEffect(async () => {
    if (isReached) {
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
  }, [isReached])

  return (
    <div ref={container}>
      {news.map((n) => (
        <NewsItem key={n.id} news={n} />
      ))}
      <PaginationLinks
        pagination={pagination}
        className="d-none"
        render={(pages) => {
          return pages.map((p) => (
            <Link
              key={p}
              href={{
                pathname: "/",
                query: { page: p },
              }}
            >
              <a>{p}</a>
            </Link>
          ))
        }}
      />
    </div>
  )
}

export default NewsList
