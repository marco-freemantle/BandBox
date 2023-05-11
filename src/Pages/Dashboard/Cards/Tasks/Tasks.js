import "./Tasks.css";
import TaskInstance from "./TaskInstance";

function Tasks() {
  return (
    <div style={{ padding: "2%" }}>
      <h2>Tasks</h2>
      <div className="todos-overview">
        <TaskInstance title={"Create new setlist!"} date={"10/12/2023"} />
        <TaskInstance title={"Buy a new guitar!"} date={"10/12/2023"} />
        <TaskInstance title={"Send contract to Amy!"} date={"10/12/2023"} />
        <TaskInstance
          title={"Promote band on social media!"}
          date={"10/12/2023"}
        />
        <TaskInstance
          title={"Pay band members on Friday!"}
          date={"10/12/2023"}
        />
        <TaskInstance
          title={"Learn new Elton John song!"}
          date={"10/12/2023"}
        />
      </div>
    </div>
  );
}

export default Tasks;
