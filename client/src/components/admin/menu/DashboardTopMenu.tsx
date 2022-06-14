import { Menu, Container } from "semantic-ui-react"

const DashboardTopMenu = () => (
  <Menu fixed="top" color="teal" borderless={false} inverted={true}>
    <Container>
      <Menu.Item color="black" position="left" header={true}>
        Edm-motion
      </Menu.Item>
    </Container>
  </Menu>
)

export default DashboardTopMenu
