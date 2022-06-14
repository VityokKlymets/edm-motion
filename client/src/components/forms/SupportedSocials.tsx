import { FC } from "react"
import facebookIcon from "./assets/facebook.svg"
import styles from "styles/forms/supported-socials.module.sass"

interface IProps {
  iconSize?: number
}

interface ISocial {
  name: string
  icon: string
}

const socials: ISocial[] = [{ name: "facebook", icon: facebookIcon }]

const SupportedSocials: FC<IProps> = ({ iconSize }) => (
  <div className={styles.container}>
    {socials.map(({ name, icon }) => (
      <div
        key={name}
        style={{
          backgroundImage: `url(${icon})`,
          width: iconSize,
          height: iconSize,
        }}
        className={styles.icon}
      />
    ))}
  </div>
)

export default SupportedSocials
