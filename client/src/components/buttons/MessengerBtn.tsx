import { FC, useEffect } from "react"
import BaseBtn from "components/buttons/BaseBtn"
import MessengerIcon from "./assets/messenger.svg"
import { initFacebookSdk } from "utils/fb"

interface IProps {
  className?: string
  title?: string
  url?: string
}

const MessengerBtn: FC<IProps> = ({ className = "", title, url }) => {
  useEffect(() => {
    initFacebookSdk()
  }, [])

  const onMessengerClick = () => {
    window.FB.ui({
      method: "send",
      link: url,
    })
  }

  return (
    <BaseBtn
      size="medium"
      onClick={onMessengerClick}
      Icon={MessengerIcon}
      className={className}
      title={title}
    />
  )
}

export default MessengerBtn
