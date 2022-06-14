import { FC } from "react"
import styles from "styles/forms/loading-spinner.module.sass"

interface IProps {
  loading?: boolean
}

const LoadingSpinner: FC<IProps> = ({ loading = false }) => (
  <div className={`${styles.spinner} ${loading && styles.spinner_active}`}>
    <div className={styles.spin} />
  </div>
)

export default LoadingSpinner
