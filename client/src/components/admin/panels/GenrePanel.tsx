import EntityPanel from "components/admin/forms/EntityPanel"
import { GENRE_ADD, GENRE_UPDATE } from "config/api"
import { FieldTypes } from "typings"

const fields: Field[] = [
  {
    type: FieldTypes.input,
    name: "name",
    value: "",
    placeholder: "genre name",
    required: true,
  },
]

const GenrePanel = () => (
  <EntityPanel
    entityType="Genre"
    apiRoutes={{
      addEntityURL: GENRE_ADD,
      updateEntityURL: GENRE_UPDATE,
    }}
    fields={fields}
  />
)

export default GenrePanel
