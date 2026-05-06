import axios from "axios";

// Create a reusable Axios instance with a predefined base URL
// This helps maintain consistency and avoids repeating the server URL in every request

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor to automatically attach JWT token (if available)
// This ensures all protected API routes receive the Authorization header
API.interceptors.request.use((req) => {
  // Check if user authentication data exists in localStorage
  if (localStorage.getItem("profile")) {
    // Parse stored user data and attach token in Authorization header
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }
  return req; // Return the modified request object
});

// Authentication Routes

// Sends user credentials to backend for authentication
// Backend validates and returns JWT token + user data
export const signIn = (formData) => API.post("/auth/signin", formData);

// Sends user registration data to backend to create a new account
// Backend stores user and returns authentication response
export const signUp = (formData) => API.post("/auth/signup", formData);

// Job Routes

// Fetches all available jobs from backend
// Used in job listing page
export const fetchJobs = () => API.get("/jobs");
