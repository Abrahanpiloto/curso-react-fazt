import "../styles/TaskCard.css";

import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

function TaskCard({ task, deleteTask, editTask }) {
  return (
    <div className="task-card">
      <h2 className="task-card-header">{capitalizeFirstLetter(task.title)}</h2>
      <p className="task-card-body">{task.description}</p>
      <p className="time">{task.createdAt}</p>
      <div className="button-container">
        <button
          className="button-card-delete"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        <button className="button-card-edit" onClick={() => editTask(task)}>
          Edit
        </button>
      </div>
    </div>
  );
}

// ----------------------------------
export default TaskCard;
