import NavigationBar from "../NavigationBar";
import "./InvalidPermissions.css";

function InvalidPermissions(props) {
  return (
    <div style={{ display: "flex", backgroundColor: "#f3f3f5" }}>
      <NavigationBar
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
      <div className="invalid-perms-card">
        <h2 style={{ marginBottom: "30px" }}>Invalid Permissions</h2>
        <p>
          You do not have the appropriate permissions to view this page. If you
          think this is a mistake, contact the band owner so that they can
          change your permissions on the 'Members' page.
        </p>
      </div>
    </div>
  );
}

export default InvalidPermissions;
