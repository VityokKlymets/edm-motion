import { ARTIST_ADD, ARTIST_LIST, ARTIST_UPDATE } from "config/api"
import { FieldTypes } from "typings"
import EntityPanel from "components/admin/forms/EntityPanel"

const fields: Field[] = [
  {
    type: FieldTypes.input,
    name: "name",
    required: true,
    value: "",
    placeholder: "Artist name",
  },
]

const ArtistPanel = () => {
  return (
    <EntityPanel
      fields={fields}
      entityType="Artist"
      apiRoutes={{
        addEntityURL: ARTIST_ADD,
        updateEntityURL: ARTIST_UPDATE,
        listEntityURL: ARTIST_LIST,
      }}
    />
  )
}
export default ArtistPanel
