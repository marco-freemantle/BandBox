import UseAnimations from "react-useanimations";
import "./Tasks.css";
import NavigationBar from "../../Components/NavigationBar";
import CreateTask from "./Modals/CreateTask";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import BandCreation from "../../Components/NewAccount/BandCreation";
import * as utilities from "../../Utilities/FireStoreUtilities";
import trash2 from "react-useanimations/lib/trash2";

const taskColumns = {
  [uuidv4()]: {
    name: "Ideas",
    items: [],
  },
  [uuidv4()]: {
    name: "To do",
    items: [],
  },
  [uuidv4()]: {
    name: "In Progress",
    items: [],
  },
  [uuidv4()]: {
    name: "Complete",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Tasks(props) {
  const [columns, setColumns] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalToAddTo, setModalToAddTo] = useState("");

  //When band data has loaded, populate columns with backend data
  useEffect(() => {
    if (!columns) {
      populateColumns();
    }
    // eslint-disable-next-line
  }, [props.band]);

  //Only update backend if columns have been set locally
  useEffect(() => {
    if (columns) {
      utilities.updateTaskList(props.bandId, columns);
    }
  }, [columns, props.bandId]);

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

  function populateColumns() {
    if (props.band) {
      for (const [key, value] of Object.entries(props.band.tasks)) {
        for (const [, items] of Object.entries(taskColumns)) {
          if (items.name === key) {
            items.items = value.items;
          }
        }
      }
      setColumns(taskColumns);
    }
  }

  function addNewTask(taskName, dueDate, columnId) {
    //Format date
    const dateparts = dueDate.split("-");
    const formattedDate = `${dateparts[2]}/${dateparts[1]}/${dateparts[0]}`;

    const newTask = {
      id: uuidv4(),
      content: taskName,
      date: formattedDate,
    };

    let columnsCopy = { ...columns };

    columnsCopy[columnId].items.push(newTask);
    setColumns(columnsCopy);
  }

  function removeTask(columnId, taskId) {
    const column = columns[columnId];
    const copiedItems = [...column.items];
    const newItems = copiedItems.filter((item) => item.id !== taskId);
    console.log(newItems);

    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: newItems,
      },
    });
  }

  if (!columns) return;

  return (
    <div className="tasks-page">
      <NavigationBar
        user={props.user}
        selectedBand={props.bandId}
        setSelectedBand={props.setSelectedBand}
      />
      <div className="tasks-main-content">
        <div className="task-list-container">
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([id, column]) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={id}
                >
                  <div className="column-container">
                    <div
                      style={{
                        display: "flex",
                        width: "90%",
                        justifyContent: "space-between",
                      }}
                    >
                      <h2>{column.name}</h2>
                      <button
                        style={{
                          border: "none",
                          outline: "none",
                          background: "none",
                          boxShadow: "none",
                        }}
                        onClick={() => {
                          setModalShow(true);
                          setModalToAddTo(id);
                        }}
                      >
                        <FaPlus size={20} />
                      </button>
                    </div>

                    <Droppable droppableId={id} key={id}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "lightblue"
                                : "#ffffff",
                            }}
                            className="task-column"
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 10,
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C86",
                                          color: "white",
                                          display: "flex",
                                          justifyContent: "space-between",
                                          ...provided.draggableProps.style,
                                        }}
                                        className="task-item"
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <p className="item-content">
                                            {item.content}
                                          </p>
                                          <p className="item-date">
                                            {item.date}
                                          </p>
                                        </div>
                                        <UseAnimations
                                          size={26}
                                          animation={trash2}
                                          strokeColor="white"
                                          className="delete-icon"
                                          onClick={() =>
                                            removeTask(id, item.id)
                                          }
                                        />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
            <CreateTask
              show={modalShow}
              onHide={() => setModalShow(false)}
              columnId={modalToAddTo}
              addNewTask={addNewTask}
            />
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
