import { Link } from "react-router-dom";
import "./HomePage.css";

function Landing() {
  return (
    <div className="container">
      {/* Main heading (project branding) */}
      <h1 className="title">Recruit-AI 🚀</h1>

      {/* Short description explaining purpose of the system */}
      <p className="subtitle">Smart Resume Parser & AI Job Matching System</p>

      {/* Button group for user authentication actions */}
      <div className="btn-group">
        {/* Link to login page */}
        <Link to="/login">
          <button className="btn login-btn">Login</button>
        </Link>

        {/* Link to signup/registration page */}
        <Link to="/signup">
          <button className="btn signup-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
