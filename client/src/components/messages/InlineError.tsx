import { FC } from "react"
import styles from "styles/messages/message.module.sass"

interface IProps {
  message: string
}

const InlineError: FC<IProps> = ({ message }) => (
  <div className={styles.inline_error}>{message}</div>
)

export default InlineError;