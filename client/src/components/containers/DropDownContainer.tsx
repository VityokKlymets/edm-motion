import { ReactNode, forwardRef } from "react"
import styles from "styles/containers/dropdown.module.sass"

interface IProps {
  className?: string
  children?: ReactNode
}

const DropDownContainer = forwardRef<HTMLDivElement, IProps>(
  ({ className, children = null }, ref) => {
    return (
      <div ref={ref} className={`${styles.container} ${className}`}>
        {children}
      </div>
    )
  }
)

export default DropDownContainer
