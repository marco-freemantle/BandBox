import "./Tasks.css";
import TaskInstance from "./TaskInstance";

function Tasks() {
  return (
    <div style={{ padding: "2%" }}>
      <h2>Tasks</h2>
      <div className="todos-overview">
        <TaskInstance title={"Go and buy a new guitar!"} date={"10/12/2023"} />
        <TaskInstance title={"Go and buy a new guitar!"} date={"10/12/2023"} />
        <TaskInstance title={"Go and buy a new guitar!"} date={"10/12/2023"} />
        <TaskInstance title={"Go and buy a new guitar!"} date={"10/12/2023"} />
        <TaskInstance title={"Go and buy a new guitar!"} date={"10/12/2023"} />
        <TaskInstance
          title={
            "Go and buy a new guitar Go and buy a new guitarGo and buy a new guitar!"
          }
          date={"10/12/2023"}
        />
      </div>
    </div>
  );
}

export default Tasks;
