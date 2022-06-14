import { useEffect, useState } from "react"

const useWindowWith = (initialValue: number | null = null) => {
  const [windowWidth, setWindowWidth] = useState(initialValue)

  const resiseHandler = () => setWindowWidth(window.innerWidth)

  useEffect(() => {
    resiseHandler()
    window.addEventListener("resize", resiseHandler)
    return () => window.removeEventListener("resize", resiseHandler)
  }, [])

  return windowWidth
}

export default useWindowWith
