import User from "models/User"
import Artist from "models/Artist"
import News from "models/News"
import Song from "models/Song"
import Genre from "models/Genre"
import Label from "models/Label"
import Image from "models/Image"

import { File } from "formidable"
import { Request, Response } from "express"

declare global {
  interface IError {
    [name: string]: string
  }

  type Status = "ok" | "error" | "admin-message" | ""
  type Entities = "Artist" | "Genre" | "News" | "Playlist" | "Song" | "User" | "Label" | "Image"

  interface IApiResponse {
    status: Status
    error?: ApiError
  }

  interface IEntitySearchResult {
    id: number
    title: string
  }

  interface IController {
    post: (req: Request, res: Response) => any
    get: (req: Request, res: Response) => any
  }

  interface IFileUploaderResponse extends IApiResponse {
    path?: string
  }

  interface IFileUploader {
    upload(path: string): Promise<IFileUploaderResponse>
    load(path: string): Promise<IFileUploaderResponse>
  }

  interface IEntityListResponse extends IApiResponse {
    items: any[]
    totalCount?: number
    itemsPerPage?: number
  }

  interface ITop100ListResponse extends IEntityListResponse {
    genres: string[]
  }

  interface IEntityFindResponse extends IApiResponse {
    entities: any[]
  }

  interface IEntitySearchResponse extends IApiResponse {
    result: IEntitySearchResult[]
  }

  interface IEntityDeleteResponse extends IApiResponse {
    affected: number
  }

  interface IEntityUpdateResponse extends IApiResponse {
    entities: any[]
  }

  interface IEntityAddResponse extends IApiResponse {
    entities: any[]
  }

  interface ISongAddResponse extends IApiResponse {
    song: Song
  }

  interface ISongFetchResponse extends IApiResponse {
    song?: Song
  }

  interface ISongUpdateResponse extends IApiResponse {
    song: Song
  }

  interface INewsAddResponse extends IApiResponse {
    news?: News
  }

  interface INewsUpdateResponse extends IApiResponse {
    news?: News
  }

  interface IArtistAddResponse extends IApiResponse {
    artist: Artist
  }

  interface IArtistUpdateResponse extends IApiResponse {
    affected: number
  }

  interface IGenreAddResponse extends IApiResponse {
    genre: Genre
  }

  interface IGenreUpdateResponse extends IApiResponse {
    genre: Genre
  }

  interface ILabelAddResponse extends IApiResponse {
    label: Label
  }

  interface ILabelUpdateResponse extends IApiResponse {
    label: Label
  }

  interface IUserLoginResponse extends IApiResponse {
    token?: string
    user?: User
  }

  interface IUserAuthorizeResponse extends IApiResponse {
    user: User
  }

  interface IUserAddResponse extends IApiResponse {
    user: User
  }

  interface IUserSignupResponse extends IApiResponse {
    user: User
    token: string
  }

  interface ISongFindByIdsResponse extends IApiResponse {
    songs: Song[]
  }

  interface IEntityListByPageRequest {
    page: number
    itemsPerPage?: number
  }

  interface IEntityRequest {
    target: Entities
  }

  interface IEntityUpdateRequest extends IEntityRequest {
    id: number
  }

  interface IEntityListRequest extends IEntityRequest {
    page: number
  }

  interface IEntitySearchByFieldsRequest extends IEntityRequest, IEntityListByPageRequest {
    fields: string[]
    query: string
  }

  interface IEntityFindByIdsRequest extends IEntityRequest {
    ids: number[]
  }

  interface IEntityDeleteRequest extends IEntityRequest {
    id: number
  }

  interface INewsAddRequest {
    title: string
    description: string
    picture: File
    genres: IEntitySearchResult[]
    songs: IEntitySearchResult[]
    labels: IEntitySearchResult[]
    releaseDate: Date
    isAttached: boolean
    createdAt: Date
  }

  interface INewsClientListRequest {
    pagination: INewsPagination
  }

  interface INewsUpdateRequest {
    id: number
    title?: string
    description?: string
    picture?: File | Image
    genres?: IEntitySearchResult[]
    songs?: IEntitySearchResult[]
    labels?: IEntitySearchResult[]
    published?: boolean
    isAttached?: boolean
    releaseDate?: Date
    createdAt?: Date
  }

  interface ISongAddRequest {
    title: string
    artists: IEntitySearchResult[]
    genre?: IEntitySearchResult
    path: File
    cover?: File
  }

  interface ISongFetchRequest {
    id: number | string
  }

  interface ITop100ListRequest {
    genre?: string | string[]
  }

  interface ISongUpdateRequest {
    id: number
    title?: string
    artists?: IEntitySearchResult[]
    genre?: IEntitySearchResult
    isPreview?: boolean
    path?: File | string
    cover?: File | Image
  }

  interface ISongFindByIdsRequest {
    ids: number[]
  }

  interface IArtistAddRequest {
    name: string
    textShort?: string
    picture?: File
    staticPage?: string
  }

  interface IArtistUpdateRequest {
    id: number
    name: string
    picture?: File | Image
    staticPage?: string
    textShort?: string
  }

  interface IGenreAddRequest {
    name: string
  }

  interface IGenreUpdateRequest {
    id: number
    name: string
  }

  interface ILabelAddRequest {
    name: string
  }

  interface ILabelUpdateRequest {
    id: number
    name: string
  }

  interface IUserLoginRequest {
    email: string
    password: string
    remember?: boolean
  }
  interface IUserSignupRequest {
    email: string
    password: string
  }

  interface IUserAddRequest {
    email: string
    password: string
  }

  interface ApiError {
    errors: IError
    message: string
  }

  interface IPagination {
    itemsPerPage?: number
    totalCount?: number
    currentPage: number
  }

  interface INewsPagination extends IPagination {
    genre?: string
    label?: string
    query?: string
    fields?: string[]
  }

  interface IMetadataOptions {
    attachments?: string[]
  }

  interface IMetadata {
    artist?: string
    album?: string
    title?: string
    track?: string
    disc?: string
    label?: string
    data?: string
    genre?: string
    comment?: string
    lyrics?: string
    "lyrics-eng"?: string
    youtube?: string
    description?: string
  }
}
