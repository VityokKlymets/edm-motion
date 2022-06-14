import { ChangeEvent, FC } from "react"
import { TextArea } from "semantic-ui-react"

interface IProps {
  onChange: (field: ITextFieldType) => void
  field: ITextFieldType
}
const TextField: FC<IProps> = ({ onChange, field }) => {
  const { value, placeholder } = field
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>, data) => {
    onChange({
      ...field,
      value: data.value
    })
  }
  return <TextArea value={value} onChange={handleChange} placeholder={placeholder} />
}

export default TextField
