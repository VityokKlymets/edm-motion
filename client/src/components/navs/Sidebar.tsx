import { FC } from "react"
import styles from "styles/navs/sidebar.module.sass"
import Top100Icon from "./assets/top100icon.svg"
import HomeIcon from "./assets/home_icon.svg"
import StarIcon from "./assets/star_icon.svg"

import { useRouter } from "next/router"

import Link from "next/link"

interface IProps {
  className?: string
}

interface ISidebarLink {
  href: string
  title: string
  Icon: FC
}

const links: ISidebarLink[] = [
  { href: "/", title: "News", Icon: HomeIcon },
  { href: "/top100", title: "top 100", Icon: Top100Icon },
  { href: "/artists", title: "artists", Icon: StarIcon },
  // { href: "/genres", title: "genres", Icon: VinylIcon },
]

const Sidebar: FC<IProps> = ({ className = "" }) => {
  const router = useRouter()

  const renderLink = (href: string, title: string, Icon: FC) => {
    const isActive = router.pathname === href
    return (
      <Link key={href} href={href}>
        <a className={`${styles.link} ${isActive && styles.link_active}`}>
          <div className={styles.link_icon}>
            <Icon />
          </div>
          {title}
        </a>
      </Link>
    )
  }

  return (
    <nav className={`${styles.sidebar} ${className}`}>
      {links.map(({ href, title, Icon }) => renderLink(href, title, Icon))}
    </nav>
  )
}

export default Sidebar
