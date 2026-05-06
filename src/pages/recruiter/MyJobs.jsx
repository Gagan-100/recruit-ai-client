import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchMyJobsErrorAlert, deleteSuccessAlert, deleteFailedAlert } from "../../utils/alert";
import "./MyJobs.css";


function MyJobs() {
  // State to store jobs posted by the recruiter
  const [jobs, setJobs] = useState([]);

  // Hook for navigation between routes
  const navigate = useNavigate();

  // Fetch jobs posted by the logged-in recruiter
  const fetchJobs = async () => {
    try {
      // Retrieve JWT token for authenticated request
      const token = localStorage.getItem("token");

      // API call to get recruiter-specific jobs
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/jobs/my-jobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setJobs(res.data); // Store jobs in state
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Fetch My Jobs Error:", err);
      }

      fetchMyJobsErrorAlert();
    }
  };

  // Delete a specific job by ID
  const deleteJob = async (id) => {
    try {
      const token = localStorage.getItem("token");

      // Send DELETE request to backend
      await axios.delete(`${import.meta.env.VITE_API_URL}/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      deleteSuccessAlert();

      // Refresh job list after deletion
      fetchJobs();
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Delete Job Error:", err);
      }
      deleteFailedAlert();
    }
  };

  // useEffect(() => {
  //   fetchJobs();
  // }, []);


  useEffect(() => {
  const loadJobs = async () => {
    await fetchJobs();
  };

  loadJobs();
}, []);


  return (
    <div className="myjobs-container">
      <h2>My Posted Jobs</h2>

      <div className="jobs-list">
        {/* Render all jobs dynamically */}
        {jobs.map((job) => (
          <div className="job-card" key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>

            <p>
              <b>Location:</b> {job.location}
            </p>
            <p>
              <b>Salary:</b> {job.salary}
            </p>

            <div className="button-group">
              <button
                className="view-button"
                onClick={() => navigate(`/view-applicants/${job._id}`)}
              >
                View Applicants
              </button>

              <button
                className="edit-button"
                onClick={() => navigate(`/edit-job/${job._id}`)}
              >
                Edit
              </button>

              <button
                className="delete-button"
                onClick={() => deleteJob(job._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyJobs;
