import NewsPaginationLayout, {
  createServerSideProps,
} from "components/layouts/NewsPaginationLayout"
import { NextPage } from "next"

const Page: NextPage = () => <NewsPaginationLayout />

export const getServerSideProps = createServerSideProps((ctx) => {
  const { name, page = 1 } = ctx.params
  const pagination: INewsPagination = {
    currentPage: parseInt(page.toString(), 10),
    label: name.toString(),
  }
  return pagination
})

export default Page
