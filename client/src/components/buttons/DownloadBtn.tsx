import { FC } from "react"
import { getApiHost } from "utils/api"
import { downloadBlob } from "utils/dom"

import BaseBtn from "components/buttons/BaseBtn"
import DownloadIcon from "./assets/download.svg"

interface IProps {
  className?: string
  title?: string
  downloadUrl: string
  fileName: string
}

const DownloadBtn: FC<IProps> = ({ className = "", downloadUrl, fileName, title }) => {
  
  const onDownloadClick = async () => {
    const absoluteUrl = getApiHost() + downloadUrl
    const response = await fetch(absoluteUrl)
    const blob = await response.blob()

    downloadBlob(blob, fileName)
  }

  return (
    <BaseBtn onClick={onDownloadClick} Icon={DownloadIcon} className={className} title={title} />
  )
}

export default DownloadBtn
