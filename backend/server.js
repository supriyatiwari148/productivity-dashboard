
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Allow frontend running on any localhost port
app.use(
  cors({
    origin: /^http:\/\/localhost:\d+$/,
    credentials: true,
  })
);

// Read JSON data
app.use(express.json());

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/habits", require("./routes/habitRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/pomodoro", require("./routes/pomodoroRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// Error handling
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error("Missing MONGO_URI or JWT_SECRET in .env");
    process.exit(1);
  }

  try {
    await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB:", error.message);
    process.exit(1);
  }
};

start();

