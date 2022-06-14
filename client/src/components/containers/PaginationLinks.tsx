import { FC } from "react"
import { range } from "lodash"

interface IProps {
  pagination: IPagination
  maxPagesToShow?: number
  className?: string
  render: (pages: number[]) => JSX.Element[]
}

const MAX_PAGES_TO_SHOW_DEFAULT = 9

const PaginationLinks: FC<IProps> = ({
  pagination: { totalCount, itemsPerPage, currentPage },
  maxPagesToShow = MAX_PAGES_TO_SHOW_DEFAULT,
  className = "",
  render,
}) => {
  const totalPages = totalCount !== 0 ? Math.ceil(totalCount / itemsPerPage) : 0

  const middle = Math.floor(maxPagesToShow / 2)

  let left = currentPage - middle
  let right = currentPage + middle

  const temp = right

  right += left > 0 ? 0 : Math.abs(left + 1)

  left -= temp > totalPages ? temp - totalPages : 0

  right = right > totalPages ? totalPages : right
  left = left > 0 ? left : 1

  const pages = range(left, right + 1, 1)
  return <div className={className}>{render(pages)}</div>
}

export default PaginationLinks
