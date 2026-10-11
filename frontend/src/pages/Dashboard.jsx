import { useEffect, useState } from "react";
import { CheckCircle2, Clock3, Flame, Target, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [tasks, setTasks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadDashboard = async () => {
    try {
      const [analytics, taskRes] = await Promise.all([
        api.get("/analytics"),
        api.get("/tasks")
      ]);
      setStats(analytics.data.stats || {});
      setTasks(taskRes.data || []);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
    }
  };

  useEffect(() => { loadDashboard(); }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await api.post("/tasks", {
        title: title.trim(), priority, dueDate: dueDate || null, status: "Pending"
      });
      setTitle(""); setPriority("Medium"); setDueDate(""); setShowAdd(false);
      await loadDashboard();
    } catch (err) {
      alert(err.response?.data?.message || "Could not create task. Please login first.");
    } finally { setLoading(false); }
  };

  const completeTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, { status: "Completed" });
      await loadDashboard();
    } catch (err) { alert(err.response?.data?.message || "Could not update task."); }
  };

  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return <>
    <header className="page-header">
      <div><p className="eyebrow">{today}</p><h1>Good day 👋</h1><p className="muted">Stay focused and make progress today.</p></div>
      <button className="primary-btn" onClick={() => setShowAdd(true)}>+ Add Task</button>
    </header>

    <section className="stats-grid">
      <StatCard title="Completed Tasks" value={stats.tasksCompletedToday ?? 0} subtitle="Today" icon={<CheckCircle2 />} />
      <StatCard title="Pending Tasks" value={stats.tasksPending ?? 0} subtitle={`${stats.tasksOverdue ?? 0} overdue`} icon={<Clock3 />} />
      <StatCard title="Current Streak" value={`${stats.currentStreak ?? 0} days`} subtitle="Keep going!" icon={<Flame />} />
      <StatCard title="Goal Progress" value={`${stats.goalProgress ?? 0}%`} subtitle="Across your goals" icon={<Target />} />
    </section>

    <section className="dashboard-grid">
      <div className="panel large-panel">
        <div className="panel-title"><div><h3>Today's Tasks</h3><p className="muted">Click a task to mark it complete.</p></div></div>
        <div className="list">
          {tasks.filter(t => t.status !== "Completed").length === 0 ? <div className="empty-state compact"><CheckCircle2 size={40}/><h3>No pending tasks</h3><p>Add a task to get started.</p><button className="secondary-btn" onClick={() => setShowAdd(true)}>Create Task</button></div> :
            tasks.filter(t => t.status !== "Completed").slice(0, 6).map(task => <div className="list-item" key={task._id}>
              <div><strong>{task.title}</strong><small>{task.priority} · {task.status}{task.dueDate ? ` · Due ${new Date(task.dueDate).toLocaleDateString()}` : ""}</small></div>
              <button className="check-btn" onClick={() => completeTask(task)} title="Complete">✓</button>
            </div>)}
        </div>
      </div>

      <div className="panel">
        <h3>Productivity Score</h3>
        <div className="score">{stats.productivityScore ?? 0}<span>/100</span></div>
        <div className="progress"><div style={{ width: `${stats.productivityScore ?? 0}%` }} /></div>
        <p className="muted">Complete tasks, habits and focus sessions to improve your score.</p>
      </div>
    </section>

    {showAdd && <div className="modal-backdrop" onMouseDown={() => setShowAdd(false)}>
      <div className="modal" onMouseDown={e => e.stopPropagation()}>
        <div className="modal-header"><div><h2>Add Task</h2><p className="muted">Create a task and save it to MongoDB.</p></div><button className="icon-btn" onClick={() => setShowAdd(false)}><X /></button></div>
        <form onSubmit={addTask} className="modal-form">
          <label>Task title<input autoFocus required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Study Java for 1 hour" /></label>
          <div className="form-row"><label>Priority<select value={priority} onChange={e => setPriority(e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label><label>Due date<input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} /></label></div>
          <div className="modal-actions"><button type="button" className="secondary-btn" onClick={() => setShowAdd(false)}>Cancel</button><button className="primary-btn" disabled={loading}>{loading ? "Saving..." : "Save Task"}</button></div>
        </form>
      </div>
    </div>}
  </>;
}
