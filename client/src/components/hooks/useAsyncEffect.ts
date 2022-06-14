import { DependencyList, useEffect } from "react"

const useAsyncEffect = <T>(func: () => Promise<T>, deps: DependencyList) => {
  return useEffect(() => {
    ;(async () => {
      await func()
    })()
  }, deps)
}

export default useAsyncEffect
