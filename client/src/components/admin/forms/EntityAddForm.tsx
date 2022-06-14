import { FC, useContext } from "react"

import EntityPanelContext from "components/admin/context/EntityPanelContext"
import EntityForm from "components/admin/forms/EntityForm"

interface IProps {
  onSubmit: (entity: FormData) => Promise<IEntityAddResponse | IEntityUpdateResponse>
}
const EntityAddForm: FC<IProps> = ({ onSubmit }) => {
  const { setAddFormFields: setFields, entityAddFormFields: fields, entityFields } = useContext(
    EntityPanelContext
  )

  const onFormSubmit = async (data: FormData) => {
    const response = (await onSubmit(data)) as IEntityAddResponse

    if (response.status === "ok") {
      setFields(entityFields)
    }
    return response
  }

  return (
    <EntityForm formType="ADD_FORM" onSubmit={onFormSubmit} setFields={setFields} fields={fields} />
  )
}

export default EntityAddForm
