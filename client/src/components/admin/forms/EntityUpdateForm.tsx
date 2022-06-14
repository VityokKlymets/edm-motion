import { FC, useContext } from "react"
import EntityPanelContext from "components/admin/context/EntityPanelContext"
import EntityForm from "components/admin/forms/EntityForm"

interface IProps {
  onSubmit: (entity: FormData) => Promise<IEntityAddResponse | IEntityUpdateResponse>
}
const EntityUpdateForm: FC<IProps> = ({ onSubmit }) => {

  const { setUpdateFormFields: setFields, entityUpdateFormFields: fields } = useContext(EntityPanelContext)

  return (
    <EntityForm
      formType="UPDATE_FORM"
      onSubmit={onSubmit}
      setFields={setFields}
      fields={fields}
    />
  )
}

export default EntityUpdateForm
