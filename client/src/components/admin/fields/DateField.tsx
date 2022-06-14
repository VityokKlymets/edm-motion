import { ChangeEvent, FC } from "react"
import SemanticDatepicker from "react-semantic-ui-datepickers"

interface IProps {
  field: IDateFieldType
  onChange: (field: IDateFieldType) => void
}

const DateField: FC<IProps> = ({ onChange, field }) => {
  const { value } = field
  const handleChange = (e: ChangeEvent<HTMLInputElement>, data) => {
    onChange({
      ...field,
      value: data.value || null
    })
  }
  return <SemanticDatepicker value={value ? new Date(value) : null} onChange={handleChange} />
}

export default DateField
