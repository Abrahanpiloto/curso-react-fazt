import "../styles/TaskCard.css";

import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

function TaskCard({ task, deleteTask, editTask }) {
  return (
    <div className="task-card">
      <h2 className="task-card-header">{capitalizeFirstLetter(task.title)}</h2>
      <p className="task-card-body">{task.description}</p>
      <p className="time">{task.createdAt}</p>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
      <button onClick={() => editTask(task)}>Edit</button>
    </div>
  );
}

// ----------------------------------
export default TaskCard;
