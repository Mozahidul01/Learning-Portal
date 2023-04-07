import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "./../../utils/PublicRouter";
import StudentLogin from "./../studentPortal/StudentLogin";
import StudentRegistration from "./../studentPortal/StudentRegistration";
import StudentRoute from "./../../utils/StudentRouter";
import CoursePlayer from "./../studentPortal/CoursePlayer";
import StudentQuiz from "./../studentPortal/StudentQuiz";
import LeaderBoard from "./../studentPortal/LeaderBoard";
import AdminLogin from "./../adminPortal/AdminLogin";
import AdminRoute from "./../../utils/AdminRoute";
import Dashboard from "./../adminPortal/Dashboard";
import Videos from "./../adminPortal/Videos";
import AddVideo from "./../adminPortal/AddVideo";
import EditVideo from "../adminPortal/EditVideo";
import Assignments from "./../adminPortal/Assignments";
import AddAssignment from "./../adminPortal/AddAssignment";
import Quizzes from "./../adminPortal/Quizzes";
import AddQuiz from "./../adminPortal/AddQuiz";
import AssignmentMarks from "./../adminPortal/AssignmentMarks";
import NotFound from "./../NotFound";
import EditAssignment from "../adminPortal/EditAssignment";
import EditQuizzes from "../adminPortal/EditQuizzes";

export default function PagesRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <StudentRegistration />
            </PublicRoute>
          }
        />
        <Route
          path="/course/:id"
          element={
            <StudentRoute>
              <CoursePlayer />
            </StudentRoute>
          }
        />
        <Route
          path="/quiz/:vId"
          element={
            <StudentRoute>
              <StudentQuiz />
            </StudentRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <StudentRoute>
              <LeaderBoard />
            </StudentRoute>
          }
        />
        <Route
          path="/admin/login"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <AdminRoute>
              <Videos />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/addVideo"
          element={
            <AdminRoute>
              <AddVideo />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/editVideo/:id"
          element={
            <AdminRoute>
              <EditVideo />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/assignments"
          element={
            <AdminRoute>
              <Assignments />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/addAssignment"
          element={
            <AdminRoute>
              <AddAssignment />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/editAssignment/:id"
          element={
            <AdminRoute>
              <EditAssignment />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <AdminRoute>
              <Quizzes />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/addQuiz"
          element={
            <AdminRoute>
              <AddQuiz />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/editQuiz/:id"
          element={
            <AdminRoute>
              <EditQuizzes />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/assignmentMarks"
          element={
            <AdminRoute>
              <AssignmentMarks />
            </AdminRoute>
          }
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}
