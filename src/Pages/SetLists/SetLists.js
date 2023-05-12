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
import { v4 as uuidv4 } from "uuid";
import * as utilities from "../../Utilities/FireStoreUtilities";

function SetLists(props) {
  const [isDeviceSmall, setIsDeviceSmall] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [selectedSetList, setSelectedSetList] = useState("set-list-1");
  const [allSetListSongs, setAllSetListSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  //When band data is valid, get first set list songs
  useEffect(() => {
    if (!props.band) return;
    setAllSetListSongs(props.band.setLists[selectedSetList].songs);
  }, [props.band]);

  //When selected set list changes, get set list songs
  useEffect(() => {
    if (!props.band) return;
    setAllSetListSongs(props.band.setLists[selectedSetList].songs);
  }, [selectedSetList]);

  const handleResize = () => {
    if (window.innerWidth < 1111) {
      setIsDeviceSmall(true);
    } else {
      setIsDeviceSmall(false);
    }
  };

  if (props.user.bands === undefined) return;
  if (props.user.bands.length === 0) {
    return (
      <BandCreation
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
    );
  }

  function changeSetList(event) {
    setSelectedSetList(event.target.value);
  }

  function selectSong(song) {
    setSelectedSong(song);
  }

  async function deleteSong(song) {
    await utilities.deleteSong(props.bandId, song, selectedSetList);
    setSelectedSong(null);
  }

  return (
    <div className="dashboard-page">
      <NavigationBar
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
      <div className="setlist-main-content">
        <div className="setlists">
          {!isDeviceSmall && (
            <>
              <div className="setlist-list-section">
                <div style={{ marginBottom: "20px" }}>
                  <Form.Select
                    style={{ fontSize: "19px", fontWeight: "bold" }}
                    onChange={(e) => changeSetList(e)}
                    defaultValue={"set-list-1"}
                  >
                    <option value="set-list-1">Set List 1</option>
                    <option value="set-list-2">Set List 2</option>
                    <option value="set-list-3">Set List 3</option>
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
                    setList={selectedSetList}
                    bandId={props.bandId}
                  />
                </div>

                <div className="song-list-scroll-container">
                  {allSetListSongs.map((song) => {
                    return (
                      <SongCard
                        song={song}
                        key={uuidv4()}
                        selectSong={() => selectSong(song)}
                        deleteSong={() => deleteSong(song)}
                      />
                    );
                  })}
                </div>
              </div>
              <div style={{ borderLeft: "2px solid grey" }} />
              <div className="setlist-song-section">
                <h3 style={{ marginBottom: "28px" }}>Selected Song</h3>

                <SongViewer
                  song={selectedSong}
                  bandId={props.bandId}
                  setList={selectedSetList}
                  selectSong={(song) => selectSong(song)}
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
