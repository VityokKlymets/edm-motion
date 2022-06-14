import { Segment, Header, Icon, Button, Image } from "semantic-ui-react"
import { SyntheticEvent, useState, useRef, ChangeEvent, FC, useEffect } from "react"

interface IProps {
  field: IImageFieldType
  onChange: (field: IImageFieldType) => void
}

const readFile = (file: File) =>
  new Promise<ArrayBuffer | string>((resolve, reject) => {
    if (!file) reject()
    const reader = new FileReader()

    reader.onload = (event: ProgressEvent<FileReader>) => {
      resolve(event.target.result)
    }

    reader.readAsDataURL(file)
  })

const ImageField: FC<IProps> = ({ field, field: { value, placeholder }, onChange }) => {
  const [filename, setFilename] = useState("")
  const [image, setImage] = useState(null)

  const imageInput = useRef(null)

  const handleClick = (e: SyntheticEvent) => {
    if (imageInput) {
      imageInput.current.click()
    }
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>, UIData?) => {
    const file = e.target.files[0]

    onChange({
      ...field,
      value: file,
    })

    setFilename(file.name)
  }

  useEffect(() => {
    ;(async () => {
      if (!value) {
        setImage(null)
        setFilename("")
        return
      }

      if (value instanceof File) {
        const res = await readFile(value)
        setImage(res)
      } else {
        setImage(value.path)
      }
    })()
  }, [value])

  return (
    <Segment placeholder={true}>
      <Header icon={true}>
        {image ? <Image src={image} /> : <Icon name="image" />}
        {!value ? filename || placeholder || "No image choosed." : null}
      </Header>
      <Button as="div" onClick={handleClick} primary={true}>
        {value ? "Change" : "Choose"}
      </Button>
      <input
        style={{
          display: "none",
        }}
        ref={imageInput}
        onChange={handleChange}
        type="file"
      />
    </Segment>
  )
}

export default ImageField
