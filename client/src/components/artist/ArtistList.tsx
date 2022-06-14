import { FC } from "react"
import styles from "styles/artist/artist-list.module.sass"
import ArtistSingle from "components/artist/ArtistSingle"

interface IProps {
  artists: IArtistEntity[]
  className?: string
}

const ArtistList: FC<IProps> = ({ artists, className = "" }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {artists.map((artist) => (
        <ArtistSingle key={artist.id} artist={artist} />
      ))}
    </div>
  )
}

export default ArtistList
