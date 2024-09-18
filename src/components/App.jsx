import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Modal from "../components/Modal";
import Login from "../components/Login";
import Logout from "../components/Logout";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

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
import "../styles/Pagination.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  // Verifica si hay un usuario autenticado al cargar la aplicación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Limpia el listener cuando se desmonte el componente
  }, []);

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
    setTasks([{ id: docRef.id, ...newTask }, ...tasks]);
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

  // Manejo de paginación
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className={
        location.pathname === "/" ? "login-background" : "tasks-background"
      }
    >
      <Router>
        <Routes>
          {/* Página de login */}
          <Route
            path="/"
            element={user ? <Navigate to="/tasks" /> : <Login />}
          />

          {/* Página de tareas, accesible solo si el usuario está autenticado */}
          <Route
            path="/tasks"
            element={
              user ? (
                <>
                  <div className="container-app">
                    <div className="form-container">
                      <TaskForm
                        createTask={createTask}
                        taskToEdit={taskToEdit}
                        updateTask={updateTask}
                      />
                    </div>

                    <div className="list-container">
                      <div className="container-logout">
                        <Logout />
                      </div>
                      <TaskList
                        tasks={currentTasks}
                        deleteTask={confirmDelete}
                        editTask={editTask}
                      />
                      <Modal
                        show={showModal}
                        onClose={cancelDelete}
                        onConfirm={deleteTask}
                        taskId={taskToDelete} //pasar taskId al modal
                        message="¿Estás seguro de que deseas eliminar esta tarea?"
                      />
                      {tasks.length > tasksPerPage && (
                        <div className="pagination">
                          {/* Botón de Anterior */}
                          <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1} // Deshabilitar si estamos en la primera página
                          >
                            Anterior
                          </button>

                          {/* Botones de las páginas */}
                          {Array.from(
                            { length: Math.ceil(tasks.length / tasksPerPage) },
                            (_, index) => (
                              <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={
                                  index + 1 === currentPage ? "active" : ""
                                }
                              >
                                {index + 1}
                              </button>
                            )
                          )}

                          {/* Botón de Siguiente */}
                          <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={
                              currentPage ===
                              Math.ceil(tasks.length / tasksPerPage)
                            } // Deshabilitar si estamos en la última página
                          >
                            Siguiente
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <Navigate to="/" /> // Redirige a la página de login si no está autenticado
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
