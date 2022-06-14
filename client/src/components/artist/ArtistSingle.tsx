import { FC } from "react"
import styles from "styles/artist/artist-single.module.sass"
import Image from "next/image"
import Link from "next/link"

interface IProps {
  artist: IArtistEntity
}

const ArtistSingle: FC<IProps> = ({ artist: { picture, staticPage, name, textShort } }) => {
  return (
    <div className={styles.container}>
      <Link href={`/artists/${staticPage}`}>
        <a className={styles.name}>{name}</a>
      </Link>
      {picture && (
        <Link href={`/artists/${staticPage}`}>
          <a>
            <Image src={picture.path} alt={name} width={picture.width} height={picture.height} />
          </a>
        </Link>
      )}
      <div className={styles.text}>{textShort}</div>
    </div>
  )
}

export default ArtistSingle
