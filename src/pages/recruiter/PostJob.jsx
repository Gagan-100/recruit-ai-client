import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { jobPostedAlert, jobPostFailedAlert } from "../../utils/alert";
import "./PostJob.css";

function PostJob() {
  // Hook for navigation after successful job creation
  const navigate = useNavigate();

  // State to manage form inputs for job posting
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

  // Handle job submission (POST request)
  const handleSubmit = async () => {
    try {
      // Retrieve JWT token for authenticated request
      const token = localStorage.getItem("token");

      // Send job data to backend
      await axios.post(
        `${import.meta.env.VITE_API_URL}/jobs`,
        {
          ...form,
          // Convert comma-separated skills → array format
          skillsRequired: form.skillsRequired
            .split(",")
            .map((skill) => skill.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      jobPostedAlert();

      // Reset form fields after successful submission
      setForm({
        title: "",
        description: "",
        skillsRequired: "",
        experience: "",
        location: "",
        salary: "",
      });

      // Redirect recruiter to dashboard
      navigate("/dashboard-recruiter");
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Post Job Error:", err);
      }

      jobPostFailedAlert();
    }
  };

  return (
    <div className="postjob-container">
      <div className="postjob-card">
        <h2>Post a Job</h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Job Description"
        />

        <input
          name="skillsRequired"
          value={form.skillsRequired}
          onChange={handleChange}
          placeholder="Skills"
        />

        <input
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Experience"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
        />

        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
        />

        <button onClick={handleSubmit}>Post Job</button>
      </div>
    </div>
  );
}

export default PostJob;
