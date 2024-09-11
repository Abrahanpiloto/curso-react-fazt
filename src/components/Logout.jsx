import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
const Logout = () => {
  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra sesión en Firebase
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  return (
    <div className="header">
      <h1>Tus Tareas</h1>
      <button onClick={handleLogout} className="logout-button">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Logout;
