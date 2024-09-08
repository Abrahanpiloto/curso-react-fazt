import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { tasks as data } from "../tasks";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
// import { db } from "../firebase"; // Asegúrate de que el archivo de configuración esté bien ubicado
import { db } from "../../firebase/firebase";
import "../styles/App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Obtener tareas desde Firestore al cargar la página:
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tasksArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksArray);
    };
    fetchTasks();
  }, []);

  // Función para crear una nueva tarea en Firebase:
  const createTask = async (title, description) => {
    const newTask = {
      title,
      description,
      createdAt: new Date().toLocaleString(),
    };
    //Agrega la tarea a Firestore:
    const docRef = await addDoc(collection(db, "tasks"), newTask);

    //Actualiza el estado con la nueva tarea:
    setTasks([...tasks, { id: docRef.id, ...newTask }]);
  };

  // Función que solicita confirmación para eliminar una tarea:
  const confirmDelete = (taskId) => {
    setTaskToDelete(taskId);
    setShowModal(true);
  };

  //Función para eliminar una tarea desde Firebase:
  const deleteTask = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
    //Actualiza el estado localmente:
    const updatedTask = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTask);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };
  // funcion que edita una tarea:
  const editTask = (task) => {
    setTaskToEdit(task); //Configura la tarea para editar
  };

  //Funcion que actualiza una tarea en Firebase
  const updateTask = async (updatedTask) => {
    // Actualiza la tarea en Firestore
    const taskRef = doc(db, "tasks", updatedTask.id);
    await updateDoc(taskRef, {
      title: updatedTask.title,
      description: updatedTask.description,
    });

    // Actualiza el estado localmente
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setTaskToEdit(null); // Reinicia el formulario después de la edición
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
