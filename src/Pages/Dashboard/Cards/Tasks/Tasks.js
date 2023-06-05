import "./Tasks.css";
import TaskInstance from "./TaskInstance";
import { v4 as uuidv4 } from "uuid";

function Tasks(props) {
  if (!props.band) return;
  return (
    <div style={{ padding: "2%" }}>
      <h2>Tasks</h2>
      <div className="todos-overview">
        {props.band.tasks["To do"].items.map((item) => {
          return (
            <TaskInstance
              title={item.content}
              date={item.date}
              key={uuidv4()}
            />
          );
        })}
        {props.band.tasks["To do"].items.length === 0 && (
          <h4 className="no-tasks-text">You have no upcoming tasks</h4>
        )}
      </div>
    </div>
  );
}

export default Tasks;
