import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { wrapper } from "store"
import { pageview } from "utils/gtag"

import "styles/main.sass"

const Player = dynamic(() => import("components/player/Player"), {
  ssr: false,
})

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])
  
  return (
    <>
      <Component {...pageProps} />
      <Player />
    </>
  )
}

export default wrapper.withRedux(MyApp)
