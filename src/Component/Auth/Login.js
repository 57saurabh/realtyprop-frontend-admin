import React, { useContext, useState } from 'react';
import './login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from '../utils/loader/Loader';
import {  useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

const Login = () => {
  const { login } = useContext(UserContext);
  const {token_d} = useContext(UserContext)
  // const [loding , setLoding]= useState(true);
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });


  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Start loading

      const formData = {
        email: loginFormData.email,
        password: loginFormData.password,
      };

      const response = await axios.post("https://realtyprop-backend-production-d2c6.up.railway.app/auth/login", formData);

      const {  token  } = response.data;
      // token(token);
      token_d(token);

      const successMessage = response.data.message || "Login successful!";
      displayToastMessage(successMessage, "success");
    } catch (error) {
      console.error("Login failed:", error);

      const errorMessage = error.message || "Login failed. Please try again.";
      displayToastMessage(errorMessage, "error");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const displayToastMessage = (message, type) => {
    // Clear any previous messages
    // Assuming 'setSuccess' and 'setError' are state-setting functions
    setSuccess("");
    setError("");

    // Display the new message using toast
    toast[type](message, {
      position: "bottom-right",
      autoClose: 5000,
    });

    if (type === "success") {
      // Define your 'navigate' function to handle navigation on successful login
      // import { navigate } from 'your-router-library';
      navigate("/");
    }
  };

  return (
    <div className="container-box">
       {loading ? (
         // Conditionally render the loader
         <div style={{margin:'auto'}}>
           <Loader/>
         </div>
        ) : (
      <div className="form-container">
        <h2>Login</h2>
       
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={loginFormData.email}
              onChange={(e) => {
                setLoginFormData({ ...loginFormData, email: e.target.value });
                setErrors({ ...errors, email: '' });
              }}
              required
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={loginFormData.password}
              onChange={(e) => {
                setLoginFormData({ ...loginFormData, password: e.target.value });
                setErrors({ ...errors, password: '' });
              }}
              required
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
           )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
