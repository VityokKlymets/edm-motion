import EntityPanel, { changeFieldValue } from "components/admin/forms/EntityPanel"
import { SONG_FIND_BY_IDS, NEWS_ADD, NEWS_LIST, NEWS_UPDATE } from "config/api"
import { FieldTypes } from "typings"
import { post } from "utils/api"
import { uniqBy } from "lodash"

const fields: Field[] = [
  {
    type: FieldTypes.input,
    name: "title",
    value: "",
    required: true,
  },
  {
    type: FieldTypes.text,
    name: "description",
    value: "",
    options: {
      maxTextSize: 50,
    },
  },
  {
    type: FieldTypes.image,
    name: "picture",
    placeholder: "No picture choosed.",
    value: null,
    options: {
      editOnly: true,
    },
  },
  {
    type: FieldTypes.entities,
    name: "songs",
    value: [],
    searchOption: {
      target: "Song",
      fields: ["string"],
    },
    options: {
      editOnly: true,
    },
    onChangeCallback: async (
      songsSelected = [],
      { entityAddFormFields, entityUpdateFormFields, setAddFormFields, setUpdateFormFields },
      formType
    ) => {
      const body: ISongFindByIdsRequest = {
        ids: songsSelected.map((s) => s.id),
      }
      const response = await post<ISongFindByIdsResponse>(SONG_FIND_BY_IDS, body)
      const { songs = [] } = response

      let genres = songs.map(({ genre: { name, id } }) => ({ id, title: name }))
      genres = uniqBy(genres, ({ id }) => id)

      const newFields = changeFieldValue(
        formType === "ADD_FORM" ? entityAddFormFields : entityUpdateFormFields,
        "genres",
        genres
      )
      formType === "ADD_FORM" ? setAddFormFields(newFields) : setUpdateFormFields(newFields)
    },
  },
  {
    type: FieldTypes.entities,
    name: "genres",
    value: [],
    searchOption: {
      target: "Genre",
      fields: ["name"],
    },
  },
  {
    type: FieldTypes.entities,
    name: "labels",
    value: [],
    searchOption: {
      target: "Label",
      fields: ["name"],
    },
  },
  { type: FieldTypes.date, name: "releaseDate", label: "release date", value: null },
  {
    type: FieldTypes.boolean,
    name: "published",
    value: false,
    placeholder: "publish news",
  },
  {
    type: FieldTypes.boolean,
    name: "isAttached",
    value: false,
    placeholder: "attach to the top",
    options: {
      editOnly: true,
    },
  },
]

const NewsPanel = () => (
  <EntityPanel
    entityType="News"
    fields={fields}
    apiRoutes={{ listEntityURL: NEWS_LIST, updateEntityURL: NEWS_UPDATE, addEntityURL: NEWS_ADD }}
  />
)

export default NewsPanel
