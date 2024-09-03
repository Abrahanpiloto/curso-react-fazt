import "../styles/TaskCard.css";
import PropTypes from "prop-types";
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

//---Este script PropTypes solo se agrego para eliminar los errores que daba ESLint 🤦-----
// `PropTypes` es una herramienta en React que se utiliza
// para verificar los tipos de las propiedades (props) que recibe un componente.
// Ayuda a garantizar que el componente reciba los datos correctos
// y emite advertencias en la consola durante el desarrollo si el tipo de datos es incorrecto.
// PropTypes para validar las propiedades del componente:
TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};
// ----------------------------------
export default TaskCard;
