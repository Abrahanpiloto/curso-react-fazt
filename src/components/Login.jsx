import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import beach from "../images/beach.jpg";
import flag from "../images/flag.jpg";
import merida from "../images/merida.jpg";
import "../styles/Carrusel.css";
import "../styles/Login.css";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para redireccionar
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para la confirmación

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/tasks"); // Redirige a la página de tareas después del inicio de sesión
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/tasks");
    } catch (err) {
      setError(err.message);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Alterna entre mostrar y ocultar contraseña
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Alterna entre mostrar y ocultar confirmación
  };

  return (
    <div className="row container p-4 h-100">
      {/* esta seccion es para el Carrusel de imagenes */}
      <div className="col-md-8 h-100 d-flex align-items-center justify-content-center">
        <div id="carouselExampleIndicators" className="carousel slide h-100">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner h-100">
            <div className="carousel-item h-100">
              <img src={flag} alt="" className="image-size d-block rounded-4" />
            </div>
            <div className="carousel-item active h-100">
              <img
                src={beach}
                alt=""
                className="image-size d-block rounded-4"
              />
            </div>
            <div className="carousel-item h-100">
              <img
                src={merida}
                alt=""
                className="image-size d-block rounded-4"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* esta seccion sera para el login */}
      <div className="col-md-4 h-100 d-flex align-items-center justify-content-center">
        <div className="login-box">
          <h2>{isRegistering ? "Registrar nuevo usuario" : "Login"}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"} // Cambia entre "text" y "password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          {isRegistering && (
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"} // Cambia entre "text" y "password"
                placeholder="Repeat Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                />
              </span>
            </div>
          )}
          <button
            className="button"
            onClick={isRegistering ? handleRegister : handleLogin}
          >
            {isRegistering ? "Add new user" : "Login"}
          </button>
          <p
            onClick={() => setIsRegistering(!isRegistering)}
            className="toggle-link"
          >
            {isRegistering
              ? "¿Ya tienes una cuenta? Inicia sesión"
              : "¿No tienes una cuenta? Regístrate"}
          </p>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
