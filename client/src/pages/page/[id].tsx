import { NextPage } from "next"
import NewsPaginationLayout, {
  createServerSideProps,
} from "components/layouts/NewsPaginationLayout"

const Page: NextPage = () => <NewsPaginationLayout />

export const getServerSideProps = createServerSideProps((ctx) => {
  const { id = 1 } = ctx.params
  const pagination: INewsPagination = {
    currentPage: parseInt(id.toString(), 10),
  }
  return pagination
})

export default Page
