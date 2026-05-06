import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { fetchErrorAlert } from "../../utils/alert";
import "./ViewApplicants.css";

function ViewApplicants() {
  // Extract jobId from URL (dynamic routing)
  const { jobId } = useParams();

  // State to store all applicants for a specific job
  const [applications, setApplications] = useState([]);

  // Fetch applicants data for the given job
  const fetchApplicants = async () => {
    try {
      // Retrieve JWT token for authenticated request
      const token = localStorage.getItem("token");

      // API call to get applications for this job
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/applications/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Store fetched applications in state
      setApplications(res.data);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Fetch Applicants Error", err);
      }
      fetchErrorAlert("applicants");
    }
  };

  // Run once on component mount → fetch applicants
  // useEffect(() => {
  //   fetchApplicants();
  // }, []);

   useEffect(() => {
    const loadApplicants = async ()=>{
      await fetchApplicants();
    }

    loadApplicants();
  }, []);

  return (
    <div className="applicants-container">
      <h2>Applicants Ranking 🧠</h2>

      <div className="applicants-list">
        {/* Loop through applicants and render cards */}
        {applications.map((app, index) => (
          <div className="applicant-card" key={app._id}>
            {/* Rank based on index (sorted list from backend) */}
            <div className="rank">🏆 Rank #{index + 1}</div>

            {/* Applicant basic details */}
            <h3>{app.userId?.name}</h3>
            <p>
              <b>Email:</b> {app.userId?.email}
            </p>

            {/* Matching score (AI/logic-based ranking) */}
            <p className="score">Score: {app.score}%</p>

            {/* Display matched skills */}
            <p>
              <b>Matched Skills:</b> {app.matchedSkills?.join(", ") || "None"}
            </p>

            {/* Resume link */}
            {app.resume && (
              <a
                href={app.resume}
                target="_blank"
                rel="noreferrer"
                className="resume-btn"
              >
                View Resume 📄
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewApplicants;
