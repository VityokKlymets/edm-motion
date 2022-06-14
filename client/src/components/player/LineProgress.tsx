import { FC, useEffect, useRef, TouchEvent, MouseEvent } from "react"
import styles from "styles/player/line-progress.module.sass"

interface IProps {
  getProgress: () => number
  onProgress: (progress: number) => void
}

const LineProgress: FC<IProps> = ({ getProgress, onProgress }) => {
  const container = useRef<HTMLDivElement>()
  const line = useRef<HTMLDivElement>()
  const slider = useRef<HTMLDivElement>()

  let req
  let touchStart = false

  const loop = () => {
    if (!line.current) return
    const progress = getProgress()
    line.current.style.width = `${progress * 100}%`

    req = requestAnimationFrame(loop)
  }

  useEffect(() => {
    loop()
    return () => cancelAnimationFrame(req)
  }, [])

  const progressHanler = (x: number) => {
    const { width, left } = container.current.getBoundingClientRect()
    const progress = (x - left) / width

    if (progress && progress < 1) {
      onProgress(progress)
    }
  }

  const touchStartHandler = (e: TouchEvent<HTMLDivElement>) => {
    touchStart = true
  }

  const touchEndHandler = (e: TouchEvent<HTMLDivElement>) => {
    touchStart = false
  }

  const touchMoveHandler = (e: TouchEvent<HTMLDivElement>) => {
    if (!touchStart && e.touches.length > 1) return

    const { clientX } = e.touches[0]
    progressHanler(clientX)
  }

  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX } = e
    progressHanler(clientX)
  }

  return (
    <div
      ref={container}
      onTouchStart={touchStartHandler}
      onTouchEnd={touchEndHandler}
      onTouchMove={touchMoveHandler}
      onClick={onClickHandler}
      className={styles.container}
    >
      <div className={`${styles.line} ${styles.main_line}`}>
        <div ref={line} className={`${styles.line} ${styles.progress_line}`}>
          <div ref={slider} className={styles.slider} />
        </div>
      </div>
    </div>
  )
}

export default LineProgress
