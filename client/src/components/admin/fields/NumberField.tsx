import { ChangeEvent, FC } from "react"
import { Form } from "semantic-ui-react"
import { SemanticWIDTHS } from "semantic-ui-react/dist/commonjs/generic"

interface IProps {
  onChange: (field: INumberFieldType) => void
  field: INumberFieldType
  inputWidth?: SemanticWIDTHS
}

const NumberField: FC<IProps> = ({ onChange, field, inputWidth }) => {
  const { value, placeholder } = field
  const handleChange = (e: ChangeEvent<HTMLInputElement>, data) => {
    onChange({
      ...field,
      value: data.value,
    })
  }
  return (
    <Form.Input
      width={inputWidth}
      value={value}
      type="number"
      onChange={handleChange}
      placeholder={placeholder}
    />
  )
}

export default NumberField
