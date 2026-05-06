import Swal from "sweetalert2";

// Common alert style
const baseConfig = {
  timer: 2000,
  showConfirmButton: false,
  background: "#1e293b",
  color: "#fff",
};

// Generic error alert
export const errorAlert = (
  title = "Something went wrong",
  text = "Please try again later",
) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    ...baseConfig,
  });
};

// Login failed alert
export const loginErrorAlert = () => {
  return Swal.fire({
    icon: "error",
    title: "Login Failed ❌",
    text: "Invalid email or password",
    ...baseConfig,
  });
};

// Warning alert
export const warningAlert = (title, text) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonColor: "#f59e0b",
    ...baseConfig,
  });
};


// Success alert
export const successAlert = (title, text = "") => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    ...baseConfig,
  });
};

// Success toast message
export const successToast = (title) => {
  return Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    background: "linear-gradient(135deg, #1e293b, #4c1d95)",
    color: "#fff",
    iconColor: "#22c55e",
  });
};

// Resume updated alert
export const updateAlert = () => {
  return successAlert(
    "Updated 🔄",
    "Your application has been updated with a new resume",
  );
};

// Job apply success alert
export const appliedAlert = () => {
  return successAlert("Applied Successfully 🎉");
};

// Resume required alert
export const resumeRequiredAlert = () => {
  return warningAlert("Resume Required", "Please upload resume first");
};

// Confirm apply alert
export const confirmApplyAlert = async () => {
  return await Swal.fire({
    title: "Apply with Resume 📄",
    text: "Use existing resume or upload new?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Use Existing",
    cancelButtonText: "Upload New",
    confirmButtonColor: "#6366f1",
    cancelButtonColor: "#f59e0b",
    background: "#1e293b",
    color: "#fff",
  });
};

// Fetch error alert
export const fetchErrorAlert = (entity = "data") => {
  return errorAlert(`Failed to load ${entity} ❌`, "Please try again later");
};

// Job details popup
export const jobDetailsAlert = (job) => {
  return Swal.fire({
    title: job?.title || "Job Details",
    html: `
      <p><b>Description:</b> ${job?.description || "N/A"}</p>
      <p><b>Location:</b> ${job?.location || "N/A"}</p>
      <p><b>Salary:</b> ${job?.salary || "N/A"}</p>
    `,
    confirmButtonText: "Close",
    confirmButtonColor: "#6366f1",
    background: "#1e293b",
    color: "#fff",
  });
};

// Load job details error
export const loadJobErrorAlert = () => {
  return errorAlert("Failed to load job details ❌", "Please try again later");
};

// Job updated success alert
export const jobUpdatedAlert = () => {
  return successAlert("Updated ✅", "Job updated successfully");
};

// Job update failed alert
export const updateFailedAlert = (msg) => {
  return Swal.fire({
    icon: "error",
    title: "Update Failed ❌",
    text: msg || "Something went wrong",
    confirmButtonColor: "#ef4444",
    ...baseConfig,
  });
};

// Fetch recruiter jobs error
export const fetchMyJobsErrorAlert = () => {
  return errorAlert("Failed to load your jobs ❌", "Please try again later");
};

// Delete success alert
export const deleteSuccessAlert = () => {
  return successAlert("Deleted 🗑️", "Job has been deleted successfully");
};

// Delete failed alert
export const deleteFailedAlert = () => {
  return errorAlert(
    "Delete Failed ❌",
    "Unable to delete job. Please try again",
  );
};

// Job post success alert
export const jobPostedAlert = () => {
  return successAlert("Job Posted 🚀", "Your job has been posted successfully");
};

// Job post failed alert
export const jobPostFailedAlert = () => {
  return Swal.fire({
    icon: "error",
    title: "Failed ❌",
    text: "Error posting job",
    confirmButtonColor: "#ef4444",
    timer: 2000,
    showConfirmButton: false,
    background: "#1e293b",
    color: "#fff",
  });
};

// Apply result alert
export const applyResultAlert = (type, message) => {
  return successAlert(
    type === "updated" ? "Application Updated 🔄" : "Applied Successfully 🚀",
    message,
  );
};

// Job posted success alert
export const jobPostedSuccessAlert = () => {
  return successAlert("Job Posted 🚀", "Your job has been posted successfully");
};

// Logout success alert
export const logoutSuccessAlert = () => {
  return successToast("Logged out successfully 👋");
};
