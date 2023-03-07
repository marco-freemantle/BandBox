import "./TaskInstance.css";

function TaskInstance(props) {
  return (
    <div className="task-instance">
      <p style={{ margin: "0px", fontWeight: "600" }}>{props.title}</p>
      <p
        style={{ margin: "0px", fontSize: "15px", color: "rgb(107, 110, 110)" }}
      >
        {props.date}
      </p>
    </div>
  );
}

export default TaskInstance;
