// Login.jsx
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // Ajusta la ruta según tu estructura
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Asegúrate de importar el CSS

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para redireccionar

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/tasks"); // Redirige a la página de tareas después del inicio de sesión
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <button onClick={handleGoogleLogin} className="button-login">
          Sign in with Google
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
