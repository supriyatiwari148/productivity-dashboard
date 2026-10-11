import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Habits from "./pages/Habits";
import Goals from "./pages/Goals";
import Notes from "./pages/Notes";
import Pomodoro from "./pages/Pomodoro";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="habits" element={<Habits />} />
        <Route path="goals" element={<Goals />} />
        <Route path="notes" element={<Notes />} />
        <Route path="pomodoro" element={<Pomodoro />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}