import { ChangeEvent, FC, useState, useRef, useEffect } from "react"
import SearchIcon from "./assets/search.svg"
import styles from "styles/forms/searchbar.module.sass"

interface IProps {
  className?: string
  placeholder?: string
  loading?: boolean
  search: (query: string) => Promise<any>
}

const SearchBar: FC<IProps> = ({
  className = "",
  placeholder = "Search...",
  search,
  loading = false,
}) => {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>()
  const interval = useRef(null)

  const timeToWait = 300

  const onValueChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = e.target
    setValue(newValue)
    if (interval.current) {
      clearTimeout(interval.current)
    }
    interval.current = setTimeout(() => {
      onChange(newValue)
    }, timeToWait)
  }

  const onChange = (val: string) => {
    search(val)
  }

  const clearInput = () => {
    setValue("")
    setTimeout(() => {
      onChange("")
    }, timeToWait)
  }
  const onSearchClick = () => {
    if (active) {
      clearInput()
    } else {
      inputRef.current.focus()
    }
    setActive(!active)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      onSearchClick()
    }
  }

  useEffect(() => {
    inputRef.current.addEventListener("keydown", onKeyDown)
  }, [])
  const activeClassName = active ? styles.search_box__active : ""
  const loadingClassName = loading ? styles.search_box__loading : ""
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.search_box} ${loadingClassName} ${activeClassName}`}>
        <input
          ref={inputRef}
          maxLength={30}
          onChange={onValueChange}
          value={value}
          placeholder={placeholder}
          className={styles.input}
        />
        <div onClick={onSearchClick} className={styles.btn}>
          <SearchIcon />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
