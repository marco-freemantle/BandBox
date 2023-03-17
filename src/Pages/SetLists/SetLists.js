import "./SetLists.css";
import NavigationBar from "../../Components/NavigationBar";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { FaPlus } from "react-icons/fa";
import SongCard from "./SongCard/SongCard";
import AddSongModal from "./Modal/AddSongModal";
import SongViewer from "./SongViewer/SongViewer";
import SongViewerMobile from "./SongViewerMobile/SongViewerMobile";
import BandCreation from "../../Components/NewAccount/BandCreation";

function SetLists(props) {
  const [isDeviceSmall, setIsDeviceSmall] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [selectedSong, setSelectedSong] = useState("");

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  const handleResize = () => {
    if (window.innerWidth < 1111) {
      setIsDeviceSmall(true);
    } else {
      setIsDeviceSmall(false);
    }
  };

  if (props.user.bandName === "") {
    return <BandCreation />;
  }

  return (
    <div className="dashboard-page">
      <NavigationBar />
      <div className="setlist-main-content">
        <div className="setlists">
          {!isDeviceSmall && (
            <>
              <div className="setlist-list-section">
                <div style={{ marginBottom: "20px" }}>
                  <Form.Select style={{ fontSize: "19px", fontWeight: "bold" }}>
                    <option value="set-list-1">Set List 1</option>
                    <option value="set-list-2">Set List 2</option>
                  </Form.Select>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1%",
                  }}
                >
                  <h4 style={{ marginBottom: "20px" }}>Songs</h4>
                  <button
                    className="add-song-button"
                    onClick={() => setModalShow(true)}
                  >
                    Add Song{" "}
                    <FaPlus style={{ marginTop: "-2px", marginLeft: "10px" }} />
                  </button>
                  <AddSongModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </div>

                <div className="song-list-scroll-container">
                  <SongCard title={"Valerie"} artist={"Amy Winehouse"} />
                  <SongCard
                    title={"I'm Still Standing"}
                    artist={"Elton John"}
                  />
                </div>
              </div>
              <div style={{ borderLeft: "2px solid grey" }} />
              <div className="setlist-song-section">
                <h3 style={{ marginBottom: "28px" }}>Selected Song</h3>

                <SongViewer
                  songName={"Valerie"}
                  artistName={"Amy Winehouse"}
                  notes={""}
                />
              </div>
            </>
          )}
          {isDeviceSmall && <SongViewerMobile />}
        </div>
      </div>
    </div>
  );
}

export default SetLists;
