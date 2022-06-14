import { useState } from "react"
import Link from "next/link"
import SearchBar from "components/forms/SearchBar"

import { useDispatch, useSelector } from "react-redux"
import { post } from "utils/api"
import { newsFetchPagination } from "utils/fetch"

import { getNewsState } from "store/selectors/newsSelector"
import { getAppState } from "store/selectors/appSelectors"
import { newsLoad } from "store/actions/newsActions"
import { setPlaylist } from "store/actions/playerActions"

import styles from "styles/header/header.module.sass"

const Header = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const { pagination: currentPagination } = useSelector(getNewsState)
  const { logoLoading } = useSelector(getAppState)

  const searchHandler = async (query: string) => {
    setLoading(true)
    await newsFetchPagination(
      currentPagination,
      { currentPage: 1, query, fields: ["title"] },
      post,
      dispatch,
      (news, pagination) => newsLoad(news, pagination),
      (playlist) => setPlaylist(playlist)
    )
    setLoading(false)
  }

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={`${styles.logo} ${logoLoading ? styles.logo_loading : ""}`}>edm-motion</a>
      </Link>
      <SearchBar loading={loading} search={searchHandler} />
    </header>
  )
}

export default Header
