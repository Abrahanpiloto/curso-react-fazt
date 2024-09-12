import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import "../styles/Logout.css";
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
    <div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Logout;
