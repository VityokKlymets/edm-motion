import { FC } from "react"

import { Form, Message } from "semantic-ui-react"

import FileField from "components/admin/fields/FileField"
import EntityField from "components/admin/fields/EntityField"
import EntitiesField from "components/admin/fields/EntitiesField"
import DateField from "components/admin/fields/DateField"
import TextField from "components/admin/fields/TextField"
import InputField from "components/admin/fields/InputField"
import NumberField from "components/admin/fields/NumberField"
import ImageField from "components/admin/fields/ImageField"
import BooleanField from "components/admin/fields/BooleanField"
import SpecialSearchField from "components/admin/fields/SpecialSearchField"

import { FieldTypes } from "typings"

import { has } from "lodash"

interface IProps {
  field: Field
  onChange: (field: Field) => void
  error?: ApiError
  formType: EntityFormType
}

const EntityFormField: FC<IProps> = ({ field, onChange, error: { errors = null }, formType }) => {
  return !field.options.listOnly ? (
    <Form.Field
      required={!!field.required}
      disabled={!!field.options && !!field.options.readOnly}
      key={field.name}
    >
      <label>{field.label || field.name}</label>

      {field.type === FieldTypes.file ? (
        <FileField field={field} onChange={onChange} />
      ) : field.type === FieldTypes.entity ? (
        <EntityField field={field} onChange={onChange} />
      ) : field.type === FieldTypes.entities ? (
        <EntitiesField formType={formType} field={field} onChange={onChange} />
      ) : field.type === FieldTypes.date ? (
        <DateField field={field} onChange={onChange} />
      ) : field.type === FieldTypes.text ? (
        <TextField field={field} onChange={onChange} />
      ) : field.type === FieldTypes.input ? (
        <InputField field={field} onChange={onChange} />
      ) : field.type === FieldTypes.number ? (
        <NumberField field={field} onChange={onChange} />
      ) : field.type === FieldTypes.image ? (
        <ImageField field={field} onChange={onChange} />
      ) : field.type === FieldTypes.boolean ? (
        <BooleanField field={field} onChange={onChange} />
      ) : field.type === FieldTypes.specialSearch ? (
        <SpecialSearchField field={field} onChange={onChange} />
      ) : null}
      {errors && has(errors, field.name) && <Message negative content={errors[field.name]} />}
    </Form.Field>
  ) : null
}

export default EntityFormField
