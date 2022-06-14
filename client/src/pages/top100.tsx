import React from "react"
import dynamic from "next/dynamic"
import Header from "components/header/Header"
import Head from "next/head"

import styles from "styles/player/player.module.sass"
import pageStyles from "styles/pages/pages.module.sass"

import Sidebar from "components/navs/Sidebar"
import SongList from "components/song/SongList"

import { isomorphicFetch } from "utils/api"
import { SONG_TOP100 } from "config/api"
import { wrapper } from "store"
import { NextPage } from "next"
import useWindowWith from "components/hooks/useWindowWidth"
import Link from "next/link"
import { IPlaylist } from "store/types"

const Player = dynamic(() => import("components/player/Player"), {
  ssr: false,
})

interface IProps {
  songs: ISongEntity[]
  genres: string[]
  genre: string
}

const Page: NextPage<IProps> = ({ songs = [], genres = [], genre: currentGenre = "" }) => {
  const windowWidth = useWindowWith(null)

  const playlist: IPlaylist = {
    name: "top 100",
    songs,
  }

  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE} | Top100</title>
      </Head>
      <div className={`page top100_page ${pageStyles.sidebar_page} ${styles.player_page}`}>
        <Header />
        <Sidebar className={pageStyles.sidebar_page_sidebar} />
        <div className={pageStyles.sidebar_page_content}>
          <h1 className="page-title">Top 100</h1>
          <p className="page-description">Our top 100 of the most listening songs of all time</p>
          <p>
            <strong>check by genre:</strong>
            <span className="genre-list">
              {genres.map((genre) => (
                <Link key={genre} href={{ pathname: "top100", query: { genre } }}>
                  <a className={`genre-link ${currentGenre === genre && "text-bold"}`}>{genre}</a>
                </Link>
              ))}
            </span>
          </p>
          <SongList grid={!windowWidth || windowWidth > 979} songs={songs} />
        </div>
        <Player />
      </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const { genre = "" } = ctx.query
  
  const body: ITop100ListRequest = {
    genre,
  }
  const { items: songs, genres } = await isomorphicFetch<ITop100ListResponse>(
    SONG_TOP100,
    body,
    ctx
  )
  return {
    props: { songs, genres, genre },
  }
})

export default Page
