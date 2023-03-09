import "./Tasks.css";
import NavigationBar from "../../Components/NavigationBar";
import CreateTask from "./Modals/CreateTask";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const itemsFromBackend = [
  { id: uuidv4(), content: "First Task" },
  { id: uuidv4(), content: "Second Task" },
  { id: uuidv4(), content: "Third Task" },
  { id: uuidv4(), content: "Fourth Task" },
  { id: uuidv4(), content: "Fifth Task" },
  { id: uuidv4(), content: "First Task" },
  { id: uuidv4(), content: "Second Task" },
  { id: uuidv4(), content: "Third Task" },
  { id: uuidv4(), content: "Fourth Task" },
  { id: uuidv4(), content: "Fifth Task" },
  { id: uuidv4(), content: "First Task" },
  { id: uuidv4(), content: "Second Task" },
  { id: uuidv4(), content: "Third Task" },
  { id: uuidv4(), content: "Fourth Task" },
  { id: uuidv4(), content: "Fifth Task" },
];

const columnsFromBackend = {
  [uuidv4()]: {
    name: "Ideas",
    items: itemsFromBackend,
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

function Tasks() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="tasks-page">
      <NavigationBar />
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
                        onClick={() => setModalShow(true)}
                      >
                        <FaPlus size={20} />
                      </button>
                      <CreateTask
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
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
                                          padding: 16,
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C86",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                        className="task-item"
                                      >
                                        {item.content}
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
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
