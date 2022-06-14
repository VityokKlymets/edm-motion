import { NextPage } from "next"
import React from "react"

import styles from "styles/player/player.module.sass"
import pageStyles from "styles/pages/pages.module.sass"
import Head from "next/head"
import Player from "components/player/Player"
import Sidebar from "components/navs/Sidebar"
import Header from "components/header/Header"
import { wrapper } from "store"
import { isomorphicFetch } from "utils/api"
import { ARTIST_LIST_CLIENT } from "config/api"
import ArtistList from "components/artist/ArtistList"

interface IProps {
  artists: IArtistEntity[]
}

const Page: NextPage<IProps> = ({ artists }) => {
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE} | Artists</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={`page ${pageStyles.sidebar_page} ${styles.player_page}`}>
        <Header />
        <Sidebar className={pageStyles.sidebar_page_sidebar} />
        <div className={pageStyles.sidebar_page_content}>
          <h1 className="page-title">Artists</h1>
          <p className="page-description">
            These are the producers we regularly follow for new releases
          </p>
          <ArtistList artists={artists} />
        </div>
        <Sidebar className={pageStyles.sidebar_page_sidebar} />
        <Player />
      </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const { page = 1 } = ctx.query

  const body: IEntityListByPageRequest = {
    page: parseInt(page.toString(), 10),
  }

  const { items: artists = [] } = await isomorphicFetch<IEntityListResponse>(
    ARTIST_LIST_CLIENT,
    body,
    ctx
  )
  return {
    props: { artists },
  }
})

export default Page
