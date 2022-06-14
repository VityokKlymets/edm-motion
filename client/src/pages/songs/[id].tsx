import { NextPage } from "next"
import { wrapper } from "store"
import PageLayout from "components/layouts/PageLayout"
import SongInfo from "components/song/SongInfo"
import SongService from "services/SongService"
import { getSongDescription } from "utils/seo"
import Container from "components/containers/Container"
import SongList from "components/song/SongList"
import { setPlaylist } from "store/actions/playerActions"
import { IPlaylist } from "store/types"

interface IProps {
  song: ISongEntity
  lastSongs: ISongEntity[]
}

const Page: NextPage<IProps> = ({ song, lastSongs }) => (
  <PageLayout description={getSongDescription(song)}>
    <Container>
      <SongInfo song={song} />
      <h3 className="page-title"> Latest Releases</h3>
      <div className="page-subtitle">the ten latest releases </div>
      <SongList centered songs={lastSongs} />
    </Container>
  </PageLayout>
)

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const {
    params: { id },
    res,
    store,
  } = ctx
  const service = new SongService(ctx)
  const { song = null } = await service.getOne(id.toString())
  const { items: lastSongs } = await service.fetchLastSongs()

  if (!song) {
    res.setHeader("location", "/")
    res.statusCode = 302
    res.end()
    return { song, lastSongs: [] }
  }

  const playlist: IPlaylist = {
    name: "SONG_PLAYLIST",
    songs: [song, ...lastSongs],
  }

  store.dispatch(setPlaylist(playlist))
  return { props: { song, lastSongs } }
})

export default Page
