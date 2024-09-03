import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/TaskForm.css";

function TaskForm({ createTask, taskToEdit, updateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskToEdit) {
      updateTask({ ...taskToEdit, title, description });
    } else {
      createTask(title, description);
    }

    setTitle("");
    setDescription("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        placeholder="Writing here your task"
        onChange={(e) => setTitle(e.target.value)}
        className="task-input"
        required
        autoFocus
      />
      <textarea
        type="text"
        value={description}
        placeholder="Writing here your description"
        onChange={(e) => setDescription(e.target.value)}
        required
        onKeyDown={handleKeyDown}
        className="task-textarea"
      />
      <button type="submit" className="submit-button">
        {taskToEdit ? "Edit Task" : "Save Task"}
      </button>
    </form>
  );
}
//--Este codigo es solo para eliminar el error que da ESLint🤦-----
TaskForm.propTypes = {
  createTask: PropTypes.func.isRequired,
};
//---------------
export default TaskForm;
