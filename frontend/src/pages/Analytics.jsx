import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", tasks: 0 }, { day: "Tue", tasks: 0 }, { day: "Wed", tasks: 0 },
  { day: "Thu", tasks: 0 }, { day: "Fri", tasks: 0 }, { day: "Sat", tasks: 0 }, { day: "Sun", tasks: 0 }
];

export default function Analytics() {
  return (
    <>
      <header className="page-header"><div><p className="eyebrow">INSIGHTS</p><h1>Analytics</h1><p className="muted">Understand your productivity trends.</p></div></header>
      <div className="panel chart-panel">
        <h3>Weekly Completed Tasks</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="tasks" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}