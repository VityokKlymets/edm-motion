import getAudioDurationInSeconds from "get-audio-duration"
import EntityServiceBase from "services/EntityServiceBase"
import { getConnection } from "typeorm"
import { File } from "formidable"

import Genre from "models/Genre"
import Artist from "models/Artist"
import Song from "models/Song"

import ImageService from "services/ImageService"
import { ImageOptions } from "classes/ImageUploader"

import { createAudioWaveformData } from "utils/waveform"
import { setMetadata } from "utils/files"
import { generateSpecificSiteMap } from "utils/sitemap"
import _ from "lodash"

interface IUploadSongFileResult {
  duration: number
  waveform: number[]
  path: string
  isTelegramUpload
}

class SongService extends EntityServiceBase {
  private imageService = new ImageService(process.env.SONG_COVERS_FOLDER)

  private coverImageOptions: ImageOptions = {
    width: 300,
    height: 300,
  }

  public async updateSong(data: ISongUpdateRequest) {
    const { id, path: songFile, title, cover: coverFile, isPreview } = data
    const song = await this.findById(Song, id)

    song.artists = await this.findByIds(Artist, _.values(_.mapValues(data.artists, "id")))

    if (data.genre) {
      song.genre = await this.findById(Genre, data.genre.id)
    } else {
      song.genre = null
    }

    if (typeof songFile !== "string") {
      this.writeMetadata(songFile, coverFile, {
        title: title,
        artist: song.artists.map((a) => a.name).join(", "),
        genre: song.genre ? song.genre.name : "",
        album: "",
        label: "",
        description: "",
        comment: "",
        lyrics: "",
        "lyrics-eng": "",
      })

      const { duration, waveform, path } = await this.uploadSongFile(songFile)
      song.duration = duration
      song.waveform = waveform
      song.path = path
    }

    song.cover = await this.imageService.reupload(song.cover, coverFile, this.coverImageOptions)

    song.title = title
    song.isPreview = isPreview

    await generateSpecificSiteMap(["song"])
    return this.update(Song, song)
  }

  public async addSong(data: ISongAddRequest) {
    const { title, path: songFile, cover: coverFile } = data

    const artists = await this.findByIds(Artist, _.values(_.mapValues(data.artists, "id")))

    const genre = data.genre ? await this.findById(Genre, data.genre.id) : null

    const cover = await this.imageService.upload(coverFile, this.coverImageOptions)

    this.writeMetadata(songFile, coverFile, {
      title: title,
      artist: artists.map((a) => a.name).join(", "),
      genre: genre ? genre.name : "",
      label: "",
      album: "",
      description: "",
      comment: "",
      lyrics: "",
      "lyrics-eng": "",
    })

    const uploadResult = await this.uploadSongFile(songFile)

    const entity = { ...data, ...uploadResult, artists, cover, genre }

    await generateSpecificSiteMap(["song"])
    return this.add(Song, entity)
  }

  public async listSongByPage(data: IEntityListByPageRequest) {
    const { page = 1, itemsPerPage = 10 } = data
    const qb = await this.getSongQueryBuilder()
    qb.orderBy("song.createdAt", "DESC")

    const [items, totalCount] = await this.paginateByPage(qb, page, itemsPerPage)
    return {
      items,
      itemsPerPage,
      totalCount,
    }
  }

  public async fetchSong(data: ISongFetchRequest) {
    const { id } = data
    const qb = await this.getSongQueryBuilder()

    qb.where("song.id = :id", { id })

    return qb.getOne()
  }

  public async top100Songs(data: ITop100ListRequest) {
    const { genre = "" } = data
    const qb = await this.getSongQueryBuilder()
    if (genre) {
      qb.where("genre.name = :genreName", { genreName: genre })
    }

    const items = qb.orderBy("song.listensCount", "DESC").take(100).getMany()
    return items
  }

  public async findSongsByIds(data: ISongFindByIdsRequest) {
    const qb = await this.getSongQueryBuilder()
    await qb.whereInIds(data.ids)
    return qb.getMany()
  }

  private async getAudioDuration(file: File) {
    const duration = await getAudioDurationInSeconds(file.path)
    return Math.ceil(duration)
  }

  private async uploadSongFile(songFile: File): Promise<IUploadSongFileResult> {
    const duration = await this.getAudioDuration(songFile)
    const waveform = await createAudioWaveformData(songFile)

    const { path, isTelegramUpload } = await this.uploadFile(songFile)

    return { duration, waveform, path, isTelegramUpload }
  }

  private async getSongQueryBuilder() {
    const connection = getConnection()
    const qb = connection.manager.getRepository(Song).createQueryBuilder("song")
    qb.leftJoinAndSelect("song.cover", "cover")
    qb.leftJoinAndSelect("song.artists", "artists")
    qb.leftJoinAndSelect("song.genre", "genre")
    return qb
  }

  private async writeMetadata(songFile: File, coverFile: File, metadata: IMetadata) {
    const options: IMetadataOptions = {}
    if (coverFile && typeof coverFile !== "string") {
      options.attachments = [coverFile.path]
    }
    if (songFile && typeof songFile !== "string") {
      await setMetadata(songFile.path, metadata, options)
    }
  }
}

export default SongService
