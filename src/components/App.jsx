import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { tasks as data } from "../tasks";
import "../styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(data);
    }
  }, []);

  // funcion que crea una nueva tarea:
  const createTask = (title, description) => {
    const updatedTasks = [
      ...tasks,
      {
        id: tasks.length,
        title,
        description,
        createdAt: new Date().toLocaleString(),
      },
    ];
    setTasks(updatedTasks);
    //Guarda en el localstorage:
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Función que solicita confirmación para eliminar una tarea:
  const confirmDelete = (taskId) => {
    setTaskToDelete(taskId);
    setShowModal(true);
  };
  // funcion que elimina una tarea:
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };
  // funcion que edita una tarea:
  const editTask = (task) => {
    setTaskToEdit(task); //Configura la tarea para editar
  };

  const updateTask = (updateTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updateTask.id ? updateTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTaskToEdit(null); //reinicia el formulario despues de la edicion
  };
  return (
    <div>
      <TaskForm
        createTask={createTask}
        taskToEdit={taskToEdit}
        updateTask={updateTask}
      />
      <Modal
        show={showModal}
        onClose={cancelDelete}
        onConfirm={deleteTask}
        taskId={taskToDelete} //pasar taskId al modal
        message="¿Estás seguro de que deseas eliminar esta tarea?"
      />

      <TaskList tasks={tasks} deleteTask={confirmDelete} editTask={editTask} />
    </div>
  );
}

export default App;
