import { FC } from "react"
import Head from "next/head"
import { GA_TRACKING_ID } from "utils/gtag"
import { DEFAULT_PAGE_DESCRIPTION } from "utils/seo"

interface IProps {
  pageTitle?: string
  children?: React.ReactNode
  className?: string
  description?: string
}

const BaseLayout: FC<IProps> = ({ pageTitle, children, className = "", description = "" }) => {
  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_TITLE}
          {pageTitle ? ` | ${pageTitle}` : ""}
        </title>
        <link type="image/x-icon" rel="shortcut icon" href="/favicon.ico" />
        <link type="image/png" sizes="16x16" rel="icon" href="/logo-16x16.png" />
        <link type="image/png" sizes="32x32" rel="icon" href="/logo-32x32.png" />
        <link type="image/png" sizes="96x96" rel="icon" href="/logo-96x96.png" />
        <link type="image/png" sizes="120x120" rel="icon" href="/logo-120x120.png" />
        <meta name="description" content={description ? description : DEFAULT_PAGE_DESCRIPTION} />
        {process.env.NODE_ENV === "production" && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `,
          }}
        />
      </Head>
      <div lang="en" className={className}>
        {children}
      </div>
    </>
  )
}

export default BaseLayout
