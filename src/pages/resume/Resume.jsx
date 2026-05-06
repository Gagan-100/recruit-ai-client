import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { applyResultAlert, warningAlert, errorAlert } from "../../utils/alert";
import "./Resume.css";

function Resume() {
  // Hook for navigation after upload
  const navigate = useNavigate();

  // State to store selected file object
  const [file, setFile] = useState(null);

  // State to display selected file name in UI
  const [fileName, setFileName] = useState("");

  // State to handle loading (disable button + show progress text)
  const [loading, setLoading] = useState(false);

  // Handle file selection from input
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setFileName(selected ? selected.name : "");
  };

  // Handle resume upload + optional auto-apply flow
  const handleUpload = async () => {
    // No file selected
    if (!file) {
      warningAlert("No File Selected ⚠️", "Please select a resume first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const token = localStorage.getItem("token");

      // Upload resume
      await axios.post(
        `${import.meta.env.VITE_API_URL}/resume/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // get job id (if user came from apply flow)
      const pendingJobId = localStorage.getItem("pendingJobId");

      // Apply
      if (pendingJobId) {
        try {
          // Imp.: store response
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/applications/${pendingJobId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );


          applyResultAlert(res.data.type, res.data.message);
          // applyResultAlert(res.data.type);


        } catch (applyErr) {
          if (import.meta.env.DEV) {
            console.error(
              "APPLY ERROR:",
              applyErr.response?.data || applyErr.message,
            );
          }


          warningAlert(
            "Application Failed ⚠️",
            applyErr?.response?.data?.message ||
              "Resume uploaded but application failed",
          );
        }

        // clear stored job id
        localStorage.removeItem("pendingJobId");
      }

      // reset state
      setFile(null);
      setFileName("");

      navigate("/jobs");
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Upload Error:", err.response?.data || err.message);
      }


      errorAlert(
        "Upload Failed ❌",
        err?.response?.data?.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-container">
      <div className="resume-card">
        <h2>Upload Your Resume</h2>

        <p className="resume-subtext">
          Upload PDF/DOCX for better job matching
        </p>

        <label className="file-upload">
          <input type="file" onChange={handleFileChange} />
          <span>Select Resume</span>
        </label>

        {fileName && <p className="file-name">📄 {fileName}</p>}

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
      </div>
    </div>
  );
}

export default Resume;
