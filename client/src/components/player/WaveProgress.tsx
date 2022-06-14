import { FC, useEffect, useRef, MouseEvent } from "react"

interface IProps {
  waveform: number[]
  getProgress: () => number
  onProgress: (progress: number) => void
}

interface IRectStyle {
  fillColor?: string
}

const WaveProgress: FC<IProps> = ({ waveform, onProgress, getProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const initialWidth = 400

  const drawRectSegment = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    style: IRectStyle = {
      fillColor: "#52B2CF",
    }
  ) => {
    ctx.beginPath()
    const { fillColor } = style
    ctx.lineWidth = 0.2
    ctx.fillStyle = fillColor
    ctx.fillRect(x, y, width, height)
    ctx.stroke()
  }

  const drawWaveform = (
    ctx: CanvasRenderingContext2D,
    waveformData: number[],
    canvasWidth: number
  ) => {
    const { offsetHeight: canvasHeight } = ctx.canvas as HTMLCanvasElement

    let length = waveformData.length
    let data = waveformData
    let step = canvasWidth / waveformData.length
    let width = step - 0.5

    if (step < devicePixelRatio) {
      const newStep = devicePixelRatio
      const newLength = canvasWidth / newStep
      const newData = []

      const m = length / newLength
      for (let i = 0; i < length; i++) {
        const j = Math.round(i * m)
        newData.push(waveformData[j])
      }

      data = newData
      step = newStep
      length = newLength
      width = step - 0.1
    }

    for (let i = 0; i < length; i++) {
      const x = i * step
      const amp = data[i]
      const height = amp * canvasHeight

      drawRectSegment(ctx, x, (canvasHeight - height) / 2, width, height, {
        fillColor: "#ccc",
      })
    }
  }

  const drawProgressWaveform = (
    ctx,
    waveformData: number[],
    progress: number,
    canvasWidth: number
  ) => {
    const { offsetHeight: canvasHeight } = ctx.canvas as HTMLCanvasElement

    let length = waveformData.length
    let data = waveformData
    let step = canvasWidth / waveformData.length
    let width = step - 0.5

    if (step < devicePixelRatio) {
      const newStep = devicePixelRatio
      const newLength = canvasWidth / newStep
      const newData = []

      const m = length / newLength

      for (let i = 0; i < length; i++) {
        const j = Math.round(i * m)
        newData.push(waveformData[j])
      }

      data = newData
      step = newStep
      length = newLength
      width = step - 0.1
    }

    for (let i = 0; i < length * progress; i++) {
      const x = i * step
      const amp = data[i]
      const height = amp * canvasHeight

      drawRectSegment(ctx, x, (canvasHeight - height) / 2, width, height, {
        fillColor: "#339989",
      })
    }
  }

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const target = event.target as HTMLCanvasElement
    const { width } = target
    const x = event.pageX - target.offsetLeft
    const progress = x / width
    onProgress(progress)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const { offsetHeight: canvasHeight } = canvas
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")

    let req

    const loop = () => {
      const parrent = canvas.offsetParent
      let canvasWidth: number
      const {
        paddingLeft: pl,
        paddingRight: pr,
        marginLeft: ml,
        marginRight: mr,
      } = getComputedStyle(parrent)

      const offsetX = parseInt(pl, 10) + parseInt(pr, 10) + parseInt(ml, 10) + parseInt(mr, 10)
      const { clientWidth } = parrent

      const width = clientWidth - offsetX
      if (width < initialWidth) {
        ctx.clearRect(0, 0, initialWidth, canvasHeight)
        canvasWidth = width
      } else {
        canvasWidth = initialWidth
      }

      canvas.setAttribute("width", canvasWidth.toString())

      const progress = getProgress()

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      drawWaveform(ctx, waveform, canvasWidth)
      drawProgressWaveform(ctx, waveform, progress, canvasWidth)

      req = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(req)
    }
  }, [])

  return <canvas height={30} onClick={onClick} ref={canvasRef} />
}
export default WaveProgress
