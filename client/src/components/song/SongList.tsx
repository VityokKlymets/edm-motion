import { FC } from "react"
import SongSingle from "components/song/SongSingle"
import styles from "styles/song/song-list.module.sass"

interface IProps {
  songs: ISongEntity[]
  className?: string
  grid?: boolean
  centered?: boolean
}

const SongList: FC<IProps> = ({ songs = [], className = "", grid = false, centered = false }) => (
  <div
    className={`${styles.song_list} ${className} ${grid && styles.song_list_grid} ${centered &&
      styles.song_list_centered}`}
  >
    {songs.map((song) => (
      <SongSingle showCover={grid} key={song.id} song={song} />
    ))}
  </div>
)

export default SongList
