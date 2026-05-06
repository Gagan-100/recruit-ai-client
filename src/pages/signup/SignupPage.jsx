import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "animate.css";
import { warningAlert, successToast, errorAlert } from "../../utils/alert";
import "./SignupPage.css";

function Signup() {
  // State to manage form inputs
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  // Loading state to disable button and show progress
  const [loading, setLoading] = useState(false);

  // Hook for navigation after signup
  const navigate = useNavigate();

  // Handle input changes dynamically
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle signup submission
  const handleSubmit = async () => {
    // Basic client-side validation
    if (!form.name || !form.email || !form.password) {
      warningAlert("All fields required ⚠️");
      return;
    }

    try {
      setLoading(true); // Start loading

      // Send signup request to backend
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, form);

      // signnup sucess alert
      successToast("Account created successfully 🎉");

      // Reset form fields
      setForm({
        name: "",
        email: "",
        password: "",
        role: "candidate",
      });

      // Redirect to login page after short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      //sign up failed alert
      errorAlert(
        "Signup Failed ❌",
        err?.response?.data?.message || "Something went wrong",
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Page title */}
        <h2 className="signup-title">Create Account</h2>

        {/* Name input */}
        <input
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={handleChange}
          className="signup-input"
        />

        {/* Email input */}
        <input
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          className="signup-input"
        />

        {/* Password input */}
        <input
          name="password"
          value={form.password}
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="signup-input"
        />

        {/* Role selection for RBAC (candidate / recruiter) */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="signup-select"
        >
          <option value="candidate">Candidate</option>
          <option value="recruiter">Recruiter</option>
        </select>

        {/* Submit button with loading state */}
        <button
          className="btn signup-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Signup"}
        </button>
      </div>
    </div>
  );
}

export default Signup;
