import { FC } from "react"
import styles from "styles/buttons/buttons.module.sass"

interface IProps {
  title?: string
  className?: string
  size?: ButtonSize
  Icon: FC
  onClick?: () => void
}

export type ButtonSize = "normal" | "medium"

const BaseBtn: FC<IProps> = ({ onClick = null, title, className, Icon, size = "normal" }) => {
  return (
    <div onClick={onClick} className={`${styles.btn} ${styles[`btn_${size}`]} ${className}`}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.icon}>
        <Icon />
      </div>
    </div>
  )
}

export default BaseBtn
