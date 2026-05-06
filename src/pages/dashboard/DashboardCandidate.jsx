import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function DashboardCandidate() {
  // Hook used for navigation between routes
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* Dashboard heading */}
      <h1 className="dashboard-title">Candidate Dashboard</h1>

      {/* Container holding all dashboard action cards */}
      <div className="dashboard-cards">
        {/* Card → Navigate to jobs page */}
        <div className="card" onClick={() => navigate("/jobs")}>
          <div className="card-icon">💼</div>
          <h2>View Jobs</h2>
          <p>Browse and apply for jobs</p>
        </div>

        {/* Card → Navigate to user's applications page */}
        <div className="card" onClick={() => navigate("/my-applications")}>
          <div className="card-icon">📄</div>
          <h2>My Applications</h2>
          <p>Track your job applications</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardCandidate;
