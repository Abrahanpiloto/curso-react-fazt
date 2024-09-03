import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useEffect, useState } from "react";
import { tasks as data } from "../tasks";
import "../styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    setTasks(data);
  }, []);

  // funcion que crea una nueva tarea:
  const createTask = (title, description) => {
    setTasks([
      ...tasks,
      {
        id: tasks.length,
        title,
        description,
        createdAt: new Date().toLocaleString(),
      },
    ]);
  };

  // funcion que elimina una tarea:
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // funcion que edita una tarea:
  const editTask = (task) => {
    setTaskToEdit(task); //Configura la tarea para editar
  };

  const updateTask = (updateTask) => {
    setTasks(
      tasks.map((task) => (task.id === updateTask.id ? updateTask : task))
    );
    setTaskToEdit(null); //reinicia el formulario despues de la edicion
  };
  return (
    <div>
      <TaskForm
        createTask={createTask}
        taskToEdit={taskToEdit}
        updateTask={updateTask}
      />
      <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
}

export default App;
