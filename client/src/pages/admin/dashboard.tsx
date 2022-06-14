import { NextPage, NextPageContext } from "next"
import { Grid, Container, Segment } from "semantic-ui-react"

import { useState } from "react"

import DashboardTopMenu from "components/admin/menu/DashboardTopMenu"
import DashboardMenu from "components/admin/menu/DashboardMenu"

import ArtistPanel from "components/admin/panels/ArtistPanel"
import SongPanel from "components/admin/panels/SongPanel"
import NewsPanel from "components/admin/panels/NewsPanel"
import GenrePanel from "components/admin/panels/GenrePanel"
import LabelPanel from "components/admin/panels/LabelPanel"

import BaseLayout from "components/layouts/BaseLayout"

import AdminMessage from "components/admin/message/AdminMessage"
import Head from "next/head"

import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css"
import { getBaseUrl } from "utils/api"

const Dasboard: NextPage = () => {
  const [activeItem, setActiveItem] = useState("Song")
  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  return (
    <BaseLayout pageTitle="Admin">
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <meta name="robots" content="noindex" />
      </Head>
      <Segment
        style={{
          background: "#fff",
          height: "100vh",
        }}
        basic
        padded
        fluid
        as={Container}
      >
        <Grid padded>
          <Grid.Row>
            <DashboardTopMenu />
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width="3">
              <DashboardMenu handleItemClick={handleItemClick} activeItem={activeItem} />
            </Grid.Column>
            <Grid.Column width="13" floated="left">
              <AdminMessage />
              {activeItem === "Artist" && <ArtistPanel />}
              {activeItem === "Song" && <SongPanel />}
              {activeItem === "News" && <NewsPanel />}
              {activeItem === "Genre" && <GenrePanel />}
              {activeItem === "Label" && <LabelPanel />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </BaseLayout>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const redirect = require("next-redirect")
  const USER_AUTHORIZE = require("config/api").USER_AUTHORIZE
  const baseUrl = getBaseUrl(ctx)
  const getToken = require("utils/auth").getToken
  const fetch = require("isomorphic-unfetch")

  const token = getToken(ctx)

  const response = await fetch(`${baseUrl}${USER_AUTHORIZE}`, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
    },
  })

  if (response.ok) {
    const json: IUserAuthorizeResponse = await response.json()
    const { status, user } = json
    if (status === "ok") {
      if (user.role === "admin") {
        return { props: { user } }
      }
    }
  }

  redirect(ctx, "/admin/login")

  return {
    props: {},
  }
}

export default Dasboard
