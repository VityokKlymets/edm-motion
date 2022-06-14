import BaseLayout from "components/layouts/BaseLayout"
import { FC } from "react"
import Header from "components/header/Header"

interface IProps {
  pageTitle?: string
  children?: React.ReactNode
  className?: string
  description?: string
}

const PageLayout: FC<IProps> = ({ pageTitle, children, className = "", description = "" }) => {
  return (
    <BaseLayout className={`page ${className}`} pageTitle={pageTitle} description={description}>
      <Header />
      {children}
    </BaseLayout>
  )
}

export default PageLayout
