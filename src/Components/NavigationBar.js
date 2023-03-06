import "./NavigationBar.css";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { useState } from "react";
import {
  FaAlignJustify,
  FaHome,
  FaEnvelope,
  FaClipboardCheck,
  FaCalendarAlt,
  FaChartLine,
  FaListOl,
  FaUsers,
  FaCog,
  FaPowerOff,
} from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

function NavigationBar() {
  const { collapseSidebar } = useProSidebar();

  const [collapsed, setCollapsed] = useState(false);

  /**
   * Logs the user out
   */
  function Logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Signout successful");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="sidebar-main">
      <Sidebar
        backgroundColor="rgb(16,44,76)"
        className="sidebar"
        collapsed={collapsed}
      >
        <Menu
          menuItemStyles={{
            button: ({ active, disabled }) => {
              return {
                color: disabled ? "#ffffff" : "#ffffff",
                backgroundColor: active ? "#102c4c" : undefined,
                "&:hover": {
                  backgroundColor: "#08448c",
                },
              };
            },
          }}
        >
          <div className="sidebar-flex">
            {!collapsed && <h2 className="sidebar-title">BandBox</h2>}
            <button
              onClick={() => {
                collapseSidebar();
                setCollapsed(!collapsed);
              }}
              className="nav-toggle"
            >
              <FaAlignJustify size={"30px"} />
            </button>
          </div>

          <MenuItem
            icon={<FaHome size={"25px"} />}
            className="menu-item"
            component={<Link to="/" />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<FaEnvelope size={"25px"} />}
            className="menu-item"
            component={<Link to="/bandchat" />}
          >
            Band Chat
          </MenuItem>
          <MenuItem
            icon={<FaClipboardCheck size={"25px"} />}
            className="menu-item"
            component={<Link to="/tasks" />}
          >
            Tasks
          </MenuItem>
          <MenuItem
            icon={<FaCalendarAlt size={"25px"} />}
            className="menu-item"
            component={<Link to="/events" />}
          >
            Events
          </MenuItem>
          <MenuItem
            icon={<FaChartLine size={"25px"} />}
            className="menu-item"
            component={<Link to="/finances" />}
          >
            Finances
          </MenuItem>
          <MenuItem
            icon={<FaListOl size={"25px"} />}
            className="menu-item"
            component={<Link to="/setlists" />}
          >
            Set Lists
          </MenuItem>
          <MenuItem
            icon={<FaUsers size={"25px"} />}
            className="menu-item"
            component={<Link to="/members" />}
          >
            Members
          </MenuItem>

          <MenuItem icon={<FaCog size={"25px"} />} className="menu-item">
            Settings
          </MenuItem>
          <MenuItem
            icon={<FaPowerOff size={"25px"} />}
            className="menu-item"
            onClick={Logout}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default NavigationBar;
