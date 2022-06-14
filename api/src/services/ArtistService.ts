import Artist from "models/Artist"
import EntityServiceBase from "services/EntityServiceBase"
import ImageService from "services/ImageService"

class ArtistService extends EntityServiceBase {
  private imageService = new ImageService(process.env.ARTIST_PICTURES_FOLDER)

  public async addArtist(data: IArtistAddRequest) {
    const { picture: pictureFile } = data

    const picture = await this.imageService.upload(pictureFile)

    const entity = { ...data, picture }
    return this.add(Artist, entity)
  }

  public async updateArtist(data: IArtistUpdateRequest) {
    const { name, id, picture: pictureFile, staticPage, textShort } = data
    const artist = await this.findById(Artist, id, { relations: ["picture"] })

    artist.name = name
    artist.staticPage = staticPage
    artist.textShort = textShort
    artist.picture = await this.imageService.reupload(artist.picture, pictureFile)

    return [this.update(Artist, artist)]
  }

  public async listArtistClient(data: IEntityListByPageRequest) {
    const { page = 1, itemsPerPage = 10 } = data
    const qb = await this.getArtistQueryBuilder()
    qb.where("artist.staticPage != :staticPage", { staticPage: "" }).orderBy("artist.views", "DESC")
    qb.orderBy("artist.createdAt", "DESC")

    const [items, totalCount] = await this.paginateByPage(qb, page, itemsPerPage)

    return {
      items,
      totalCount,
      itemsPerPage,
    }
  }

  public async listArtistByPage(data: IEntityListByPageRequest) {
    const { page = 1, itemsPerPage = 10 } = data
    const qb = await this.getArtistQueryBuilder()
    qb.orderBy("artist.createdAt", "DESC")

    const [items, totalCount] = await this.paginateByPage(qb, page, itemsPerPage)
    return {
      items,
      itemsPerPage,
      totalCount,
    }
  }

  private getArtistQueryBuilder() {
    const qb = this.connection.manager.getRepository(Artist).createQueryBuilder("artist")
    qb.leftJoinAndSelect("artist.picture", "picture")
    return qb
  }
}

export default ArtistService
