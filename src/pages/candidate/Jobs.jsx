import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  resumeRequiredAlert,
  confirmApplyAlert,
  updateAlert,
  appliedAlert,
  errorAlert,
  fetchErrorAlert,
  jobDetailsAlert,
} from "../../utils/alert";
import "./Jobs.css";

function Jobs() {
  // Holds list of jobs fetched from backend
  const [jobs, setJobs] = useState([]);

  // Used for navigation between routes
  const navigate = useNavigate();

  // Fetch all jobs from backend API
  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
      setJobs(res.data); // Update state with job data
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Fetch Jobs Error:", err); // Log error if API fails
      }
      fetchErrorAlert("jobs");
    }
  };

  // Handles job application logic
  const applyJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      // Get current logged-in user details from backend
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // sending JWT token for authentication
        },
      });

      const user = res.data; // store user data

      //  Check if user has uploaded resume or not
      if (!user.resume || user.resume.trim() === "") {
        resumeRequiredAlert(); // show warning alert

        localStorage.setItem("pendingJobId", jobId); // save job id for later use
        navigate("/resume"); // redirect user to upload resume page
        return;
      }

      // Show confirmation popup (Use existing OR Upload new)
      const result = await confirmApplyAlert();

      // Case 1: User selects "Use Existing Resume"
      if (result.isConfirmed) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/applications/${jobId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // send token for secure API call
            },
          },
        );

        // Check if application is updated or newly created
        if (response.data?.message?.includes("updated")) {
          updateAlert(); // show update success message
        } else {
          appliedAlert(); // show applied successfully message
        }
      }
      // Case 2: User selects "Upload New Resume"
      else if (result.dismiss === "cancel") {
        localStorage.setItem("pendingJobId", jobId); // store job id
        navigate("/resume"); // redirect to resume upload page
      }
    } catch (err) {
      // Only log in development
      if (import.meta.env.DEV) {
        console.error("FULL ERROR:", err.response?.data || err.message);
      }

      errorAlert();
    }
  };

  const showDetails = (job) => {
    jobDetailsAlert(job);
  };

  useEffect(() => {
    const loadJobs = async () => {
      await fetchJobs();
    };

    loadJobs();
  }, []);

  return (
    <div className="jobs-container">
      <h2>Available Jobs</h2>

      <div className="jobs-list">
        {/* Render job cards dynamically */}
        {jobs.map((job) => (
          <div className="job-card" key={job._id}>
            <h3>{job.title}</h3>

            <p className="job-desc">{job.description}</p>

            <p>
              <b>Location:</b> {job.location}
            </p>
            <p>
              <b>Salary:</b> {job.salary}
            </p>

            <button
              className="view-details-btn"
              onClick={() => showDetails(job)}
            >
              View Details
            </button>

            {/* Apply button triggers application workflow */}
            <button className="apply-button" onClick={() => applyJob(job._id)}>
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
