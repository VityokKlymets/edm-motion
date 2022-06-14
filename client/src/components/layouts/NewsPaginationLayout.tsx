import React from "react"
import { NextPage } from "next"
import { wrapper } from "store"
import { GetServerSidePropsContext } from "next-redux-wrapper"

import { isomorphicFetch } from "utils/api"
import { newsFetchPagination } from "utils/fetch"

import NewsList from "components/news/NewsList/NewsList"
import PageLayout from "components/layouts/PageLayout"
import { newsLoad } from "store/actions/newsActions"
import { setPlaylist } from "store/actions/playerActions"

const NewsPaginationLayout: NextPage = () => (
  <PageLayout>
    <NewsList />
  </PageLayout>
)

export const createServerSideProps = (func: (ctx: GetServerSidePropsContext) => INewsPagination) =>
  wrapper.getServerSideProps(async (ctx) => {
    const { store } = ctx

    const pagination = func(ctx)
    const currentPagination = store.getState().news.pagination


    await newsFetchPagination(
      currentPagination,
      pagination,
      isomorphicFetch,
      store.dispatch,
      (news, newPagination) => newsLoad(news, newPagination),
      (playlist) => setPlaylist(playlist),
      ctx
    )
  })

export default NewsPaginationLayout
