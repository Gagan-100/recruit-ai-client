import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  loadJobErrorAlert,
  jobUpdatedAlert,
  updateFailedAlert,
} from "../../utils/alert";
import "./PostJob.css";

function EditJob() {
  // Extract job ID from URL parameters
  const { id } = useParams();

  // Hook for navigation after update
  const navigate = useNavigate();

  // State to manage form data for job editing
  const [form, setForm] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    experience: "",
    location: "",
    salary: "",
  });

  // Handle input changes dynamically
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Fetch all jobs from backend
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);

        // Find the specific job using ID from URL
        const job = res.data.find((j) => j._id === id);

        if (job) {
          // Fill form with existing job data
          // Convert skills array → comma-separated string for input field
          setForm({
            ...job,
            skillsRequired: job.skillsRequired.join(","),
          });
        }
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error("Fetch Job Error:", err);
        }

        updateFailedAlert(err.response?.data?.message);
      }
    };

    fetchJob();
  }, [id]);

  // Update job
  const handleUpdate = async () => {
    try {
      // Retrieve JWT token for authenticated request
      const token = localStorage.getItem("token");

      // Send PATCH request to update job
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/jobs/${id}`,
        {
          ...form,
          // Convert skills back to array before sending to backend
          skillsRequired: form.skillsRequired.split(","),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      jobUpdatedAlert();

      // Redirect to recruiter’s job list page
      navigate("/my-jobs");
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Update Error:", err.response?.data || err.message);
      }
      loadJobErrorAlert();
    }
  };

  return (
    <div className="postjob-container">
      <div className="postjob-card">
        <h2>Edit Job</h2>

        <input name="title" value={form.title} onChange={handleChange} />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="skillsRequired"
          value={form.skillsRequired}
          onChange={handleChange}
        />
        <input
          name="experience"
          value={form.experience}
          onChange={handleChange}
        />
        <input name="location" value={form.location} onChange={handleChange} />
        <input name="salary" value={form.salary} onChange={handleChange} />

        <button onClick={handleUpdate}>Update Job</button>
      </div>
    </div>
  );
}

export default EditJob;
