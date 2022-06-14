import { Segment, Header, Icon, Button } from "semantic-ui-react"
import { SyntheticEvent, useState, useRef, ChangeEvent, FC, useEffect } from "react"

interface IProps {
  field: IFileFieldType
  onChange: (field: IFileFieldType) => void
}

const FileField: FC<IProps> = ({ field, field: { value, placeholder }, onChange }) => {
  const [filename, setFilename] = useState("")
  const fileInput = useRef(null)

  const handleClick = (e: SyntheticEvent) => {
    if (fileInput) {
      fileInput.current.click()
    }
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>, UIData?) => {
    const file = e.target.files[0]
    const newField = {
      ...field,
      value: file,
    }
    onChange(newField)
    setFilename(file.name)
  }

  useEffect(() => {
    if (!value) return setFilename("")
    setFilename(typeof value === "string" ? value : value.name)
  }, [value])

  return (
    <Segment placeholder={true}>
      <Header icon={true}>
        <Icon name="file outline" />
        {(typeof value === "string" && value) || filename || placeholder || "No file choosed."}
      </Header>
      <Button as="div" onClick={handleClick} primary={true}>
        {typeof value === "string" ? "Change" : "Choose"}
      </Button>
      <input
        style={{
          display: "none",
        }}
        ref={fileInput}
        onChange={handleChange}
        type="file"
      />
    </Segment>
  )
}

export default FileField
