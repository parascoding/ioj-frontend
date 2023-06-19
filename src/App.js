import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./pages/public-routes/Home";
import AdminPrivateRoute from "./components/admin/AdminPrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateContest from "./pages/admin/CreateContest";
import AddProblemFiles from "./pages/admin/AddProblemFiles";
import UserPrivateRoute from "./components/user/UserPrivateRoute";
import SeeProblem from "./pages/user/SeeProblem";
import SubmitProblem from "./pages/user/SubmitProblem";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./pages/public-routes/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ContestPage from "./pages/user/SeeCompete";
import SeeContest from "./pages/user/SeeContest";
import UserDashboard from "./pages/user/HomeDashboard";
import CreateProblem from "./pages/admin/AddProblem";
import NavBar from "./components/NavBar";
import Signup from "./pages/public-routes/Signup";
function App() {
  return (
    <>
      {/* <NavBar /> */}
      <ThemeProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            {/* Admin Private Routes */}
            <Route path="/admin" element={<AdminPrivateRoute />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="createContest" element={<CreateContest />} />
              <Route
                path=":contestId/createProblem"
                element={<CreateProblem />}
              />
              <Route
                path=":contestId/:problemId/addProblemFiles"
                element={<AddProblemFiles />}
              />
            </Route>
            <Route path="/user" element={<UserPrivateRoute />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="compete" element={<ContestPage />} />
              <Route path="compete/:contestId/" element={<SeeContest />} />
              <Route
                path="compete/:contestId/:problemId/"
                element={<SeeProblem />}
              />
              <Route
                path="compete/:contestId/:problemId/submit"
                element={<SubmitProblem />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
