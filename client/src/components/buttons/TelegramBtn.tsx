import { FC } from "react"

import BaseBtn from "components/buttons/BaseBtn"
import TelegramIcon from "./assets/telegram.svg"

interface IProps {
  className?: string
  title?: string
  url?: string
  text: string
}

const TelegramBtn: FC<IProps> = ({ className = "", title, text, url }) => {
  return (
    <a target="_blank" href={`https://t.me/share/url?url=${url}&text=${text}`}>
      <BaseBtn size="medium" Icon={TelegramIcon} className={className} title={title} />
    </a>
  )
}

export default TelegramBtn
