import { SONG_ADD, SONG_LIST_BY_PAGE, SONG_UPDATE } from "config/api"
import { FieldTypes } from "typings"
import EntityPanel from "components/admin/forms/EntityPanel"

const fields: Field[] = [
  {
    type: FieldTypes.input,
    name: "title",
    value: "",
    required: true,
  },
  {
    type: FieldTypes.file,
    name: "path",
    value: null,
    required: true,
    options: {
      editOnly: true,
    },
  },
  {
    type: FieldTypes.image,
    name: "cover",
    placeholder: "No cover choosed.",
    value: null,
    options: {
      editOnly: true,
    },
  },
  {
    type: FieldTypes.entities,
    name: "artists",
    value: [],
    searchOption: {
      target: "Artist",
      fields: ["name"],
    },
  },
  {
    type: FieldTypes.entity,
    name: "genre",
    value: null,
    searchOption: {
      target: "Genre",
      fields: ["name"],
    },
  }
]

const SongPanel = () => (
  <EntityPanel
    entityType="Song"
    fields={fields}
    apiRoutes={{
      addEntityURL: SONG_ADD,
      listEntityURL: SONG_LIST_BY_PAGE,
      updateEntityURL: SONG_UPDATE,
    }}
  />
)

export default SongPanel
