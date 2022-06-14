import { ChangeEvent, FC } from "react"
import { Checkbox } from "semantic-ui-react"

interface IProps {
  onChange: (field: IBooleanFieldType) => void
  field: IBooleanFieldType
}

const BooleanField: FC<IProps> = ({ onChange, field }) => {
  const { value, placeholder } = field

  const handleChange = (e: ChangeEvent<HTMLInputElement>, { checked }) => {
    onChange({
      ...field,
      value: checked,
    })
  }
  
  return <Checkbox checked={value} label={placeholder} onChange={handleChange} />
}

export default BooleanField
