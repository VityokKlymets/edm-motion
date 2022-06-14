import { Button, Form, Message } from "semantic-ui-react"
import { FC, useContext, useState } from "react"
import { FieldTypes } from "typings"

import EntityFormField from "components/admin/forms/EntityFormField"
import EntityPanelContext from "components/admin/context/EntityPanelContext"
import { findIndex } from "lodash"

interface IProps {
  onSubmit: (entity: FormData) => Promise<IEntityAddResponse | IEntityUpdateResponse>
  setFields: (fields: Field[]) => void
  fields: Field[]
  formType: EntityFormType
}

interface IMessage {
  success: boolean
  error: boolean
  header: string
  content: string
}

export const createEntityFormData = (fields: Field[], entityType: Entities) => {
  const data = new FormData()

  fields.forEach(({ name, value, type: fieldType }) => {
    if (fieldType === FieldTypes.file || fieldType === FieldTypes.image) {
      data.append(name, value instanceof File ? value : JSON.stringify(value))
    } else {
      data.append(name, JSON.stringify(value))
    }
  })
  data.append("target", JSON.stringify(entityType))

  return data
}

const EntityForm: FC<IProps> = ({ onSubmit, fields, setFields, formType }) => {
  const { entityType } = useContext(EntityPanelContext)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<IMessage>(null)
  const [error, setError] = useState<ApiError>({ message: null, errors: null })

  const submitHandler = async () => {
    setLoading(true)
    setMessage(null)
    setError({ message: null, errors: null })

    const formData = createEntityFormData(fields, entityType)

    const { status, error: apiError } = await onSubmit(formData)

    if (status === "ok") {
      setMessage({
        success: true,
        error: false,
        header: "Success",
        content: "operation complete!",
      })
    }
    if (status === "error") {
      if (apiError.message) {
        setMessage({
          success: false,
          error: true,
          header: "Error",
          content: apiError.message,
        })
      }

      setError(apiError)
    }
    setLoading(false)
  }

  const onFieldChange = (field: Field) => {
    const idx = findIndex(fields, { name: field.name })
    const data = fields.slice()
    data.splice(idx, 1, field)
    setFields(data)
  }

  return (
    <>
      {message && (
        <Message
          header={message.header}
          content={message.content}
          success={message.success}
          error={message.error}
        />
      )}
      <Form loading={loading} onSubmit={submitHandler}>
        {fields.map((field, idx) => (
          <EntityFormField
            formType={formType}
            error={error}
            key={idx}
            field={field}
            onChange={onFieldChange}
          />
        ))}
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default EntityForm
