import Genre from "models/Genre"
import News from "models/News"
import Song from "models/Song"
import Label from "models/Label"
import EntityServiceBase from "services/EntityServiceBase"
import ImageService from "services/ImageService"
import { generateSpecificSiteMap } from "utils/sitemap"
import _ from "lodash"

class NewsService extends EntityServiceBase {
  private imageService = new ImageService(process.env.NEWS_PICTURES_FOLDER)

  public async listNewsByPage(data: IEntityListByPageRequest) {
    const { page = 1, itemsPerPage = 10 } = data
    const qb = await this.getNewsJoinQueryBuilder()
    qb.orderBy("news.createdAt", "DESC")

    const [items, totalCount] = await this.paginateByPage(qb, page, itemsPerPage)
    return {
      items,
      totalCount,
      itemsPerPage,
    }
  }

  public async searchNews(data: IEntitySearchByFieldsRequest) {
    const { fields, query = "", page = 1, itemsPerPage = 10 } = data
    const qb = await this.getNewsJoinQueryBuilder()

    fields.forEach((field) =>
      qb.where(`LOWER(news.${field}) LIKE :query`, { query: `%${query.toLowerCase()}%` })
    )

    qb.andWhere("news.published = true")

    qb.orderBy({ "news.isAttached": "DESC", "news.createdAt": "DESC" })

    const [items, totalCount] = await this.paginateByPage(qb, page, itemsPerPage)
    return {
      items,
      totalCount,
      itemsPerPage,
    }
  }

  public async listNewsClient(data: INewsClientListRequest) {
    const {pagination = {} as INewsPagination} =  data 
    const {
      currentPage = 1,
      genre = "",
      label = "",
      itemsPerPage = 10,
      fields = [],
      query = "",
    } = pagination

    const qb = await this.getNewsJoinQueryBuilder()

    if (fields.length > 0) {
      fields.forEach((field) =>
        qb.where(`LOWER(news.${field}) LIKE :query`, { query: `%${query.toLowerCase()}%` })
      )
      qb.andWhere("news.published = true")
    } else {
      qb.where({ published: true })
    }

    if (genre) {
      qb.andWhere("genres.name IN (:...genres)", { genres: [genre] })
    }

    if (label) {
      qb.andWhere("labels.name IN (:...labels)", { labels: [label] })
    }
    qb.orderBy({ "news.isAttached": "DESC", "news.createdAt": "DESC" })

    const [items, totalCount] = await this.paginateByPage(qb, currentPage, itemsPerPage)

    return {
      items,
      totalCount,
      itemsPerPage,
    }
  }

  public async addNews(data: INewsAddRequest) {
    const { picture: pictureFile, isAttached } = data

    const songs = await this.findByIds(Song, _.values(_.mapValues(data.songs, "id")))
    const genres = await this.findByIds(Genre, _.values(_.mapValues(data.genres, "id")))
    const labels = await this.findByIds(Label, _.values(_.mapValues(data.labels, "id")))

    const picture = await this.imageService.upload(pictureFile)

    if (isAttached) {
      await this.resetPreviousAttachedNews()
    }

    const entity = {
      ...data,
      songs,
      genres,
      labels,
      picture,
      isAttached,
    }

    await generateSpecificSiteMap(["news","label",'genre'])
    return this.add(News, entity)
  }

  public async updateNews(data: INewsUpdateRequest) {
    const {
      id,
      description,
      title,
      releaseDate,
      picture: pictureFile,
      published,
      isAttached,
    } = data

    const news = await this.findById(News, id)

    const songs = await this.findByIds(Song, _.values(_.mapValues(data.songs, "id")))
    const genres = await this.findByIds(Genre, _.values(_.mapValues(data.genres, "id")))
    const labels = await this.findByIds(Label, _.values(_.mapValues(data.labels, "id")))

    news.songs = songs
    news.genres = genres
    news.labels = labels

    news.description = description
    news.title = title
    news.releaseDate = releaseDate
    news.published = published
    news.isAttached = isAttached

    news.picture = await this.imageService.reupload(news.picture, pictureFile)

    if (isAttached) {
      const previousAttachedNews = await this.resetPreviousAttachedNews(id)
      if (previousAttachedNews) {
        return [previousAttachedNews, this.update(News, news)]
      }
    }
    await generateSpecificSiteMap(["news","label",'genre'])
    return [this.update(News, news)]
  }

  private async resetPreviousAttachedNews(id?: number) {
    const qb = await this.getNewsJoinQueryBuilder()
    const lastAttachedNews = await qb
      .where({
        isAttached: true,
      })
      .getOne()

    if (lastAttachedNews && lastAttachedNews.id !== id) {
      lastAttachedNews.isAttached = false
      return this.update(News, lastAttachedNews)
    } else {
      return null
    }
  }

  private getNewsQueryBuilder() {
    return this.connection.manager.getRepository(News).createQueryBuilder("news")
  }

  private async getNewsJoinQueryBuilder() {
    const qb = this.getNewsQueryBuilder()

    return qb
      .leftJoinAndSelect("news.songs", "songs")
      .leftJoinAndSelect("news.genres", "genres")
      .leftJoinAndSelect("news.labels", "labels")
      .leftJoinAndSelect("news.picture", "picture")
      .leftJoinAndSelect("songs.artists", "artists")
      .leftJoinAndSelect("songs.cover", "covers")
  }
}

export default NewsService
