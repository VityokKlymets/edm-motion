import { ChangeEvent, useState } from "react"

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return { value, onChange }
}

export default useInput
