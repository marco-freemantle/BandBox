import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { useState, useEffect } from "react";
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

function App() {
  const { collapseSidebar } = useProSidebar();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="App">
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

          <MenuItem icon={<FaHome size={"25px"} />} className="menu-item">
            Dashboard
          </MenuItem>
          <MenuItem icon={<FaEnvelope size={"25px"} />} className="menu-item">
            Band Chat
          </MenuItem>
          <MenuItem
            icon={<FaClipboardCheck size={"25px"} />}
            className="menu-item"
          >
            Tasks
          </MenuItem>
          <MenuItem
            icon={<FaCalendarAlt size={"25px"} />}
            className="menu-item"
          >
            Events
          </MenuItem>
          <MenuItem icon={<FaChartLine size={"25px"} />} className="menu-item">
            Finances
          </MenuItem>
          <MenuItem icon={<FaListOl size={"25px"} />} className="menu-item">
            Set Lists
          </MenuItem>
          <MenuItem icon={<FaUsers size={"25px"} />} className="menu-item">
            Members
          </MenuItem>

          <div className="menu-bottom"></div>
          <MenuItem icon={<FaCog size={"25px"} />} className="menu-item">
            Settings
          </MenuItem>
          <MenuItem icon={<FaPowerOff size={"25px"} />} className="menu-item">
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <h1>Dashboard</h1>
      </main>
    </div>
  );
}

export default App;
