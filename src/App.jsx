import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/home/HomePage";
import Login from "./pages/login/LoginPage";
import Signup from "./pages/signup/SignupPage";
import DashboardCandidate from "./pages/dashboard/DashboardCandidate";
import DashboardRecruiter from "./pages/dashboard/DashboardRecruiter";
import PostJob from "./pages/recruiter/PostJob";
import MyJobs from "./pages/recruiter/MyJobs";
import EditJob from "./pages/recruiter/EditJob";
import Jobs from "./pages/candidate/Jobs";
import MyApplications from "./pages/candidate/MyApplications";
import Resume from "./pages/resume/Resume";
import ViewApplicants from "./pages/applicants/ViewApplicants";

function App() {
  return (
    // BrowserRouter enables client-side routing (no page reloads)
    <BrowserRouter>

      {/* Navbar is placed outside Routes so it appears on all pages */}
      <Navbar />

      {/* Define all application routes */}
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Candidate routes */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/dashboard-candidate" element={<DashboardCandidate />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/resume" element={<Resume />} />

        {/* Recruiter routes */}
        <Route path="/dashboard-recruiter" element={<DashboardRecruiter />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/my-jobs" element={<MyJobs />} />

        {/* Dynamic routes */}
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="/view-applicants/:jobId" element={<ViewApplicants />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;