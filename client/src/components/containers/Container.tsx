import { FC, ReactNode } from "react"
import styles from "styles/containers/container.module.sass"

interface IProps {
  children?: ReactNode
}

const Container: FC<IProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default Container
