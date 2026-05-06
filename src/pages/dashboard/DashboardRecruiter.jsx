import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function DashboardRecruiter() {
  // Hook used for navigation between routes
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {/* Dashboard heading for recruiter role */}
      <h1 className="dashboard-title">Recruiter Dashboard</h1>

      {/* Container for recruiter action cards */}
      <div className="dashboard-cards">
        {/* Card → Navigate to job posting page */}
        <div className="card" onClick={() => navigate("/post-job")}>
          <div className="card-icon">➕</div>
          <h2>Post Job</h2>
          <p>Create a new job listing</p>
        </div>

        {/* Card → Navigate to recruiter’s posted jobs */}
        <div className="card" onClick={() => navigate("/my-jobs")}>
          <div className="card-icon">📋</div>
          <h2>My Jobs</h2>
          <p>Manage your posted jobs</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardRecruiter;
