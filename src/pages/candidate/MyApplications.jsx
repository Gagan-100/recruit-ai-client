import { useEffect, useState } from "react";
import axios from "axios";
import { fetchErrorAlert } from "../../utils/alert";
import "./MyApplications.css";

function MyApplications() {
  // State to store all applications of the logged-in user
  const [applications, setApplications] = useState([]);

  // Fetch user's job applications from backend
  const fetchApplications = async () => {
    try {
      // Retrieve JWT token from localStorage
      const token = localStorage.getItem("token");

      // Send authenticated request to backend
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/applications/my-applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token for auth
          },
        },
      );

      // Store applications data in state
      setApplications(res.data);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Fetch Applications Error", err);
      }

      fetchErrorAlert("applications");
    }
  };

  // Runs once when component mounts → fetch applications
  // useEffect(() => {
  //   fetchApplications();
  // }, []);

  useEffect(() => {
    const loadApplications = async () => {
      await fetchApplications();
    };

    loadApplications();
  }, []);

  return (
    <div className="applications-container">
      <h2>My Applications</h2>

      <div className="applications-list">
        {/* Loop through applications and render each one */}
        {applications.map((app) => (
          <div className="application-card" key={app._id}>
            <h3>{app.jobId?.title || "Job Not Available"}</h3>

            <p className="application-desc">
              {app.jobId?.description || "No description available"}
            </p>

            <p>
              <b>Location:</b> {app.jobId?.location || "N/A"}
            </p>

            <p>
              <b>Salary:</b> {app.jobId?.salary || "N/A"}
            </p>

            <div className="application-bottom">
              <p>
                <b>Applied On:</b>{" "}
                {new Date(app.createdAt).toLocaleDateString("en-GB")}
              </p>

              <p className={`status ${app.status}`}>
                {app.status.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyApplications;
