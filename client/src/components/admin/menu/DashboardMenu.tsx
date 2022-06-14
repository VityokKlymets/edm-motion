import { Menu } from "semantic-ui-react"
import { SyntheticEvent, FC } from "react"
interface IProps {
  activeItem: string
  handleItemClick: (e: SyntheticEvent, data: object) => void
}
const DashboardMenu: FC<IProps> = ({ activeItem, handleItemClick }) => {
  return (
    <Menu secondary={true} vertical={true}>
      <Menu.Item name="Song" active={activeItem === "Song"} onClick={handleItemClick}>
        Songs
      </Menu.Item>
      <Menu.Item name="Artist" active={activeItem === "Artist"} onClick={handleItemClick}>
        Artists
      </Menu.Item>
      <Menu.Item name="News" active={activeItem === "News"} onClick={handleItemClick}>
        News
      </Menu.Item>
      <Menu.Item name="Genre" active={activeItem === "Genre"} onClick={handleItemClick}>
        Genres
      </Menu.Item>
      <Menu.Item name="Label" active={activeItem === "Label"} onClick={handleItemClick}>
        Labels
      </Menu.Item>
      <Menu.Item name="User" active={activeItem === "User"} onClick={handleItemClick}>
        Users
      </Menu.Item>
    </Menu>
  )
}
export default DashboardMenu
