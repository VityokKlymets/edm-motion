import { Context } from "react"
import { FieldTypes } from "typings"
declare global {
  interface Window {
    dataLayer?: object[]
    fbAsyncInit: () => void
  }

  interface IFieldOptions {
    readOnly?: boolean
    listOnly?: boolean
    editOnly?: boolean
    maxWidth?: number
    minWidth?: number
    maxTextSize?: number
  }

  interface IEntityApiRoutes {
    addEntityURL: string
    updateEntityURL?: string
    deleteEntityURL?: string
    listEntityURL?: string
  }

  interface IEntityPanelState {
    entityFields: Field[]
    entityAddFormFields: Field[]
    entityUpdateFormFields: Field[]
    selectedEntity: IEntity
    entities: any[]
    entityType: Entities
    apiRoutes: IEntityApiRoutes
    setEntityFields?: (fields: Field[]) => void
    setAddFormFields?: (fields: Field[]) => void
    setUpdateFormFields?: (fields: Field[]) => void
    setEntities?: (entities: IEntity[]) => void
    selectEntity?: (entity: IEntity) => void
  }



  type EntityFormType = "ADD_FORM" | "UPDATE_FORM"

  interface IFieldTypeBase {
    name: string
    value: any
    label?: string
    placeholder?: string
    required?: boolean
    options?: IFieldOptions
  }

  interface ISearchResult {
    title: string
  }

  interface IEntitySearchResult extends ISearchResult {
    id: number
  }

  interface IEntityFieldType extends IFieldTypeBase {
    type: typeof FieldTypes.entity
    value: any
    searchOption: ISearchEntityOptions
  }

  interface ISpecialSearchFieldType extends IFieldTypeBase {
    type: typeof FieldTypes.specialSearch
    value: string
    search: (query: string) => Promise<IEntityFindResult>
  }

  interface IEntitiesFieldType extends IFieldTypeBase {
    type: typeof FieldTypes.entities
    value: any[]
    onChangeCallback?: (value: any, context: IEntityPanelState,formType:EntityFormType) => void
    searchOption: ISearchEntityOptions
  }

  interface ITextFieldType extends IFieldTypeBase {
    type: typeof FieldTypes.text
  }

  interface IFileFieldType extends IFieldTypeBase {
    type: typeof FieldTypes.file
    value: File
  }

  interface IDateFieldType extends IFieldTypeBase {
    type: typeof FieldTypes.date
    value: Date
  }

  interface IInputFieldType extends IFieldTypeBase {
    type: typeof FieldTypes.input
  }

  interface INumberFieldType extends IFieldTypeBase {
    type: typeof FieldTypes.number
  }

  interface IImageFieldType extends IFieldTypeBase {
    type: typeof FieldTypes.image
    value: File | IImageEntity
  }

  interface IBooleanFieldType extends IFieldTypeBase {
    type: typeof FieldTypes.boolean
    value: boolean
  }

  type Field =
    | IEntityFieldType
    | ITextFieldType
    | IFileFieldType
    | IDateFieldType
    | IInputFieldType
    | INumberFieldType
    | IImageFieldType
    | IBooleanFieldType
    | IEntitiesFieldType
    | ISpecialSearchFieldType

  enum EntityAction {
    add,
    delete,
    update,
    find,
    list,
  }

  interface IEntity {
    id: number
    string: string
    createdAt: Date
  }

  interface IArtistEntity extends IEntity {
    name: string
    picture: IImageEntity
    staticPage: string
    textShort: string
  }

  interface IGenreEntity extends IEntity {
    name: string
  }

  interface ILabelEntity extends IEntity {
    name: string
  }

  interface IImageEntity extends IEntity {
    width: number
    height: number
    path: string
  }

  interface ISongEntity extends IEntity {
    title: string
    duration: number
    waveform: number[]
    artists: IArtistEntity[]
    genre: IGenreEntity
    cover: IImageEntity
    url: string
    uniqueId: string
  }

  interface INewsEntity extends IEntity {
    elapsedTime: string
    title: string
    songs: ISongEntity[]
    description: string
    genres: IGenreEntity[]
    labels: ILabelEntity[]
    releaseDate: string
    picture: IImageEntity
    songs: ISongEntity[]
    isAttached: boolean
  }

  interface IUserEntity extends IEntity {
    email: string
  }
}
