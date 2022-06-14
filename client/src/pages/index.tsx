import NewsPaginationLayout, {
  createServerSideProps,
} from "components/layouts/NewsPaginationLayout"
import { NextPage } from "next"

const Home: NextPage = () => <NewsPaginationLayout />

export const getServerSideProps = createServerSideProps((ctx) => {
  const {
    query: { page = 1, genre = "", label = "" },
  } = ctx

  const pagination: INewsPagination = {
    currentPage: Number(page),
    genre: String(genre),
    label: String(label),
    fields: [],
    query: "",
  }
  return pagination
})

export default Home
