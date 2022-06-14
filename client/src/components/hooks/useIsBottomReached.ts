import { MutableRefObject, useEffect, useState } from "react"

// hook that checks if user reached to bottom of the target container

const useIsBottomReached = (target: MutableRefObject<HTMLDivElement>, offset: number = 0) => {
  const [isReached, setIsReached] = useState(false)

  const scrollHandler = () => {
    const { innerHeight, scrollY } = window

    const {
      current: { offsetHeight },
    } = target

    const reached = innerHeight + scrollY >= offsetHeight - offset
      setIsReached(reached)
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler)
    return () => {
      window.removeEventListener("scroll", scrollHandler)
    }
  }, [])

  return isReached
}

export default useIsBottomReached
