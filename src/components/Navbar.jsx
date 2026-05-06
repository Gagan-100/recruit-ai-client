import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { errorAlert, logoutSuccessAlert } from "../utils/alert";
import "./Navbar.css";

function Navbar() {
  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Hook to get current route path (used for conditional logic)
  const location = useLocation();

  // Retrieve user role and token from localStorage (persisted auth state)
  const role = localStorage.getItem("role")?.toLowerCase();
  const token = localStorage.getItem("token");

  // State to control visibility of profile dropdown
  const [showProfile, setShowProfile] = useState(false);

  // State to store logged-in user details fetched from backend
  const [user, setUser] = useState(null);

  // Ref used to detect clicks outside profile dropdown (for closing it)
  const profileRef = useRef();

  // Function to navigate user based on authentication status and role
  const goToDashboard = () => {
    // If user is on login/signup page, redirect to home
    if (location.pathname === "/login" || location.pathname === "/signup") {
      navigate("/");
      return;
    }

    // If not logged in → go to home
    if (!token) navigate("/");
    // Role-based navigation (RBAC: Role-Based Access Control)
    else if (role === "recruiter") navigate("/dashboard-recruiter");
    else navigate("/dashboard-candidate");
  };

  // Handles click on profile icon
  // Toggles dropdown and fetches user data (only once if not already loaded)
  const handleProfileClick = async () => {
    setShowProfile((prev) => !prev);

    // Fetch user data only if not already available (optimization)
    if (!user) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: {
            // Attach JWT token for authentication
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data); // Store user data in state
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error("API Error:", err);
        }

        errorAlert();
      }
    }
  };

  const handleLogout = () => {
    // clear data
    localStorage.clear(); // Remove stored token and user info
    setShowProfile(false); // Close dropdown
    setUser(null); // Reset user state

    // show alert
    logoutSuccessAlert();

    // delay navigation so user can see alert
    setTimeout(() => {
      navigate("/"); // Redirect to home page
    }, 1200);
  };

  // Effect to close profile dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup to avoid memory leaks
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect to automatically close dropdown when route changes
  useEffect(() => {
    setShowProfile(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      {/* Logo acts as a navigation trigger */}
      <h2 className="logo" onClick={goToDashboard}>
        Recruit-AI
      </h2>

      {/* Right section of navbar*/}
      <div className="nav-right">
        {token && (
          <div className="profile-wrapper" ref={profileRef}>
            {/* Profile icon to toggle dropdown */}
            <div className="profile-icon" onClick={handleProfileClick}>
              👤
            </div>

            {/* Conditional rendering of profile dropdown */}
            {showProfile && user && (
              <div className="profile-dropdown">
                <p>
                  <b>Name:</b> {user.name}
                </p>
                <p>
                  <b>Email:</b> {user.email}
                </p>
                <p>
                  <b>Role:</b> {user.role}
                </p>

                {/* Show resume link only if available */}
                {user.resume && (
                  <a href={user.resume} target="_blank" rel="noreferrer">
                    View Resume
                  </a>
                )}

                {/* Logout button */}
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
