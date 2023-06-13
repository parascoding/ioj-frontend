import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./pages/public-routes/Home";
import AdminPrivateRoute from "./components/admin/AdminPrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateContest from "./pages/admin/CreateContest";
import AddProblemFiles from "./pages/admin/AddProblemFiles";
import UserPrivateRoute from "./components/user/UserPrivateRoute";
import SeeProblem from "./pages/user/SeeProblem"
import SubmitProblem from "./pages/user/SubmitProblem";

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Admin Private Routes */}
            <Route path="/admin" element={<AdminPrivateRoute />}>
              <Route path="home" element={<AdminDashboard />} />
              <Route path="createContest" element={<CreateContest />} />
              <Route path=":contestId/:problemId/addProblemFiles" element={<AddProblemFiles />}/>
            </Route>
            <Route path="/user" element={<UserPrivateRoute />}>
              <Route path="compete/:contestId/:problemId/" element={<SeeProblem />}/>
              <Route path="compete/:contestId/:problemId/submit" element={<SubmitProblem />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
