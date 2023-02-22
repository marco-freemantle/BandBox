import "./NavigationBar.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

function NavigationBar() {
  return (
    <Sidebar>
      <Menu>
        <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default NavigationBar;
