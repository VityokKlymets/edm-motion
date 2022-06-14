import { Request, Response, json } from "express"
import BaseController from "controllers/BaseController"
import withFormData from "middlewares/withFormData"
import SongService from "services/SongService"
import TelegramUploader from "classes/TelegramUploader"
import GenreService from "services/GenreService"
import withAdmin from "middlewares/withAdmin"
import withClassValidation from "middlewares/withClassValidation"
import request from "request"

class SongController extends BaseController {
  private service = new SongService()
  constructor() {
    super()
    this.post("/add", [withAdmin(), withFormData(), withClassValidation(), this.add])
    this.post("/list", [withAdmin(), json(), this.list])
    this.post("/update", [withAdmin(), withFormData(), withClassValidation(), this.update])
    this.post("/findByIds", [withAdmin(), json(), this.findByIds])
    this.post("/top100", [json(), this.top100])
    this.post("/fetch", [json(), this.fetch])
    this.post("/lastSongs", [this.lastSongs])
    this.get("/play", this.play)
  }

  private add = async (req: Request, res: Response) => {
    const data: ISongAddRequest = req.body

    const song = await this.service.addSong(data)

    const response: IEntityAddResponse = {
      status: "ok",
      entities: [song],
    }

    res.json(response)
  }

  private list = async (req: Request, res: Response) => {
    const data: IEntityListByPageRequest = req.body

    const result = await this.service.listSongByPage(data)
    const response: IEntityListResponse = {
      status: "ok",
      ...result,
    }
    res.json(response)
  }

  private fetch = async (req: Request, res: Response) => {
    const data: ISongFetchRequest = req.body
    const song = await this.service.fetchSong(data)

    const response: ISongFetchResponse = {
      status: "ok",
      song,
    }

    res.json(response)
  }

  private update = async (req: Request, res: Response) => {
    const data: ISongUpdateRequest = req.body
    const song = await this.service.updateSong(data)

    const response: IEntityUpdateResponse = {
      status: "ok",
      entities: [song],
    }
    res.json(response)
  }

  private lastSongs = async (req: Request, res: Response) => {
    const { items } = await this.service.listSongByPage({ page: 1, itemsPerPage: 10 })
    const response: IEntityListResponse = {
      status: "ok",
      items,
    }
    res.json(response)
  }

  private play = async (req: Request, res: Response) => {
    const path = req.query.path as string
    if (!path) {
      res.send("")
    }

    const uploader: IFileUploader = new TelegramUploader()
    const result = await uploader.load(path)

    if (result.status === "ok") {
      request(result.path).pipe(res)
    } else {
      res.send("")
    }
  }

  private top100 = async (req: Request, res: Response) => {
    const data: ITop100ListRequest = req.body

    const items = await this.service.top100Songs(data)
    const genres = await (await new GenreService().getAll()).map((genre) => genre.name)

    const response: ITop100ListResponse = {
      status: "ok",
      items,
      genres,
    }

    res.json(response)
  }

  private findByIds = async (req: Request, res: Response) => {
    const data: ISongFindByIdsRequest = req.body
    const songs = await this.service.findSongsByIds(data)

    const responce: ISongFindByIdsResponse = {
      status: "ok",
      songs,
    }
    res.json(responce)
  }
}
export default SongController
