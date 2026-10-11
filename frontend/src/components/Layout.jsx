import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, CheckSquare, Repeat, Target, FileText,
  Timer, BarChart3, LogOut
} from "lucide-react";

const links = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/tasks", "Tasks", CheckSquare],
  ["/habits", "Habits", Repeat],
  ["/goals", "Goals", Target],
  ["/notes", "Notes", FileText],
  ["/pomodoro", "Pomodoro", Timer],
  ["/analytics", "Analytics", BarChart3],
];

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">P</div>
          <div>
            <strong>Productivity</strong>
            <span>Dashboard</span>
          </div>
        </div>

        <nav>
          {links.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button className="logout" onClick={logout}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}