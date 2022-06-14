import { ChangeEvent, FC } from "react"
import { Form } from "semantic-ui-react"
import { SemanticWIDTHS } from "semantic-ui-react/dist/commonjs/generic"

interface IProps {
  onChange: (field: IInputFieldType) => void
  field: IInputFieldType
  inputWidth?: SemanticWIDTHS
}

const InputField: FC<IProps> = ({ onChange, field, inputWidth }) => {
  const { placeholder, value } = field

  const handleChange = (e: ChangeEvent<HTMLInputElement>, data) => {
    const newField = {
      ...field,
      value: data.value,
    }
    onChange(newField)
  }
  return (
    <Form.Input
      width={inputWidth}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  )
}

export default InputField
