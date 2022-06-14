import EntityPanel from "components/admin/forms/EntityPanel"
import { LABEL_ADD, LABEL_UPDATE } from "config/api"
import { FieldTypes } from "typings"

const fields: Field[] = [
  {
    type: FieldTypes.input,
    name: "name",
    value: "",
    placeholder: "label name",
    required: true,
  },
]

const LabelPanel = () => (
  <EntityPanel
    entityType="Label"
    apiRoutes={{
      addEntityURL: LABEL_ADD,
      updateEntityURL: LABEL_UPDATE,
    }}
    fields={fields}
  />
)

export default LabelPanel
