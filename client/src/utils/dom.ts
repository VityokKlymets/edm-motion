export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")

  a.href = url
  a.download = filename || "download"

  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url)
      a.removeEventListener("click", clickHandler)
    }, 150)
  }

  a.addEventListener("click", clickHandler, false)

  a.click()

  return a
}

export const documentOffsetTop = (el: HTMLElement) => {
  return el.offsetTop + (el.offsetParent ? documentOffsetTop(el.offsetParent as HTMLElement) : 0)
}
