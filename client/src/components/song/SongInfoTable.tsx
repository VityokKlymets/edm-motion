import { FC } from "react"
import styles from "styles/song/song-info-table.module.sass"

interface IProps {
  data: object
}

const SongInfoTable: FC<IProps> = ({ data }) => {
  const keys = Object.keys(data)
  return (
    <div className={styles.table}>
      {keys.map((key) => (
        <div key={key} className={styles.tr}>
          <div className={styles.td}>{key}</div>
          <div className={styles.td}>{data[key]}</div>
        </div>
      ))}
    </div>
  )
}

export default SongInfoTable
