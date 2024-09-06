import { v4 as uuidv4 } from "uuid";
import TaskCard from "./TaskCard";
import "../styles/TaskList.css";

function TaskList({ tasks, deleteTask, editTask }) {
  if (tasks.length === 0) {
    return <h1 className="no-tasks">No tasks...</h1>;
  }
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={uuidv4()} className="task-card-container">
          <TaskCard task={task} deleteTask={deleteTask} editTask={editTask} />
        </div>
      ))}
    </div>
  );
}

export default TaskList;
