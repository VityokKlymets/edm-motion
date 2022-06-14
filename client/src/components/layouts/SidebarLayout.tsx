import { FC } from "react"
import Sidebar from "components/navs/Sidebar"
import pageStyles from "styles/pages/pages.module.sass"
import BaseLayout from "components/layouts/BaseLayout"

interface IProps {
  children?: React.ReactNode
  pageTitle?: string
  className?: string
}

const SidebarLayout: FC<IProps> = ({ children, pageTitle, className = "" }) => {
  return (
    <BaseLayout pageTitle={pageTitle} className={`${pageStyles.sidebar_page} ${className}`}>
      <Sidebar className={pageStyles.sidebar_page_sidebar} />
      <div className={pageStyles.sidebar_content}>{children}</div>
    </BaseLayout>
  )
}

export default SidebarLayout
