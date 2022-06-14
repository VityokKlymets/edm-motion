import { FC } from "react"
import SongList from "components/song/SongList"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import styles from "styles/news/news.module.sass"

interface IProps {
  news: INewsEntity
}

const NewsItem: FC<IProps> = ({ news }) => {
  const {
    elapsedTime,
    title,
    songs,
    description,
    genres,
    labels,
    releaseDate,
    picture,
    isAttached,
  } = news

  return (
    <div className={`${styles.news_item} ${isAttached && styles.news_item_attached}`}>
      <div className={styles.elapsed_time}>{elapsedTime}</div>
      <h3 className={styles.news_item_title}>{title}</h3>
      <div className={styles.news_item_content}>
        <div className={styles.news_item_info}>
          {genres && genres.length > 0 && (
            <div className={styles.news_item_genre}>
              <span>Style: </span>
              {genres.map(({ id, name }) => (
                <Link
                  key={id}
                  href={{
                    pathname: `/genre/${name}/1`,
                  }}
                >
                  <a>{name}</a>
                </Link>
              ))}
            </div>
          )}
          {releaseDate && (
            <div className={styles.news_item_release_date}>
              <span>Release date: </span> <span>{moment(releaseDate).format("YYYY.MM.D")}</span>
            </div>
          )}
          {labels && labels.length > 0 && (
            <div className={styles.news_item_labels}>
              <span>Label: </span>
              {labels.map(({ id, name }) => (
                <Link
                  key={id}
                  href={{
                    pathname: `/label/${name}/1`,
                  }}
                >
                  <a>{name}</a>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className={styles.news_item_description}>{description}</div>
        {picture && (
          <Image
            className={styles.news_item_picture}
            src={picture.path}
            width={picture.width}
            alt={title}
            height={picture.height}
          />
        )}
        <SongList songs={songs} />
      </div>
    </div>
  )
}

export default NewsItem
