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
  FaPlus,
} from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { uuidv4 } from "@firebase/util";
import { Form } from "react-bootstrap";
import AddBandModal from "./AddBandModal/AddBandModal";

function NavigationBar(props) {
  const { collapseSidebar } = useProSidebar();

  const [collapsed, setCollapsed] = useState(false);

  const [modalShow, setModalShow] = useState(false);

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

  //Set selected band in app.js
  function handleBandChange(event) {
    props.setSelectedBand(event.target.value);
  }

  if (!props.user) return;

  let workspaceDropDown;
  if (props.user.bands.length > 0) {
    workspaceDropDown = (
      <div className="band-select-dropdown">
        <Form.Select
          style={{ maxWidth: "90%", marginBottom: "5px" }}
          onChange={handleBandChange}
          value={props.selectedBand}
        >
          {props.user.bands.map((band) => {
            return (
              <option value={band.bandId} key={uuidv4()}>
                {band.bandName}
              </option>
            );
          })}
        </Form.Select>
        <div style={{ width: "90%" }}>
          <button
            className="add-band-button"
            onClick={() => setModalShow(true)}
          >
            Add Band
            <FaPlus style={{ marginTop: "-3px", marginLeft: "10px" }} />
          </button>
        </div>
        <AddBandModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          handleBandChange={handleBandChange}
        />
      </div>
    );
  } else {
    workspaceDropDown = (
      <div className="band-select-dropdown">
        <Form.Select style={{ maxWidth: "92%" }}>
          <option value="noworkspaces">No Bands</option>
        </Form.Select>
      </div>
    );
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

          {!collapsed && workspaceDropDown}

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
