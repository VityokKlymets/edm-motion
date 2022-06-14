import { FC } from "react"
import { useDispatch } from "react-redux"
import { playSong } from "store/actions/playerActions"

import BaseBtn from "components/buttons/BaseBtn"
import PlayIcon from "./assets/play.svg"

interface IProps {
  className?: string
  title?: string
  song: ISongEntity
}

const PlayBtn: FC<IProps> = ({ className = "", title, song }) => {
  const dispatch = useDispatch()

  const onPlayClick = async () => {
    dispatch(playSong(song))
  }

  return <BaseBtn onClick={onPlayClick} Icon={PlayIcon} className={className} title={title} />
}

export default PlayBtn
