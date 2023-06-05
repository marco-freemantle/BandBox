import "./Members.css";
import NavigationBar from "../../Components/NavigationBar";
import BandCreation from "../../Components/NewAccount/BandCreation";
import MembersMobile from "./Mobile/MembersMobile";

function Members(props) {
  //If the current user object.bands is not defined, return
  if (props.user.bands === undefined) return;
  //If current user has no bands, show band creation page
  if (props.user.bands.length === 0) {
    return (
      <BandCreation
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
    );
  }

  //If the current band object is undefined, return
  if (!props.band) return;

  return (
    <div className="members-page">
      <NavigationBar
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />

      <div className="members-main-content">
        <MembersMobile band={props.band} />
      </div>
    </div>
  );
}

export default Members;
