import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { successToast,loginErrorAlert } from "../../utils/alert";
import "./LoginPage.css";

function Login() {
  // State to manage login form inputs (email & password)
  const [form, setForm] = useState({ email: "", password: "" });

  // Handle input field changes dynamically
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Hook for navigation after login
  const navigate = useNavigate();

  // Handle login form submission
  const handleSubmit = async () => {
    try {
      // Send login request to backend with user credentials
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        form,
      );

      // Store authentication data in localStorage (persistent login)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // Show success notification using SweetAlert
      successToast("Welcome back 🚀");

      // Role-based navigation (RBAC: Role-Based Access Control)
      const role = res.data.user.role;

      if (role === "candidate") {
        navigate("/dashboard-candidate");
      } else if (role === "recruiter") {
        navigate("/dashboard-recruiter");
      } else {
        navigate("/"); // Fallback route
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Login Error:", err);
      }
      
      loginErrorAlert();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Login form title */}
        <h2 className="login-title">Login</h2>

        {/* Email input field */}
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="login-input"
        />

        {/* Password input field */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="login-input"
        />

        {/* Submit button triggers login process */}
        <button className="btn login-button" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
