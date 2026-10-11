# Productivity Dashboard

A full-stack productivity management web application built with the **MERN stack**. It helps users organize daily tasks, build consistent habits, track goals, save notes, run focused Pomodoro sessions, and review productivity analytics from one dashboard.

## Features

- **User Authentication** — Register and log in with password-based authentication.
- **Dashboard Overview** — View completed and pending tasks, overdue tasks, current streak, goal progress, and productivity score.
- **Task Management** — Create, update, organize, and complete tasks with priority, status, and due dates.
- **Habit Tracking** — Track recurring habits and monitor consistency.
- **Goal Management** — Create goals and follow progress toward them.
- **Notes** — Create and manage personal notes.
- **Pomodoro Timer** — Run focus sessions and record sessions.
- **Analytics** — Review productivity and activity summaries.
- **Persistent Storage** — Store user and productivity data in MongoDB.
- **Responsive Interface** — Navigate between dashboard sections with a modern React interface.

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Recharts
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- CORS

## Project Structure

```text
productivity-dashboard/
├── backend/
│   ├── config/           # Database connection
│   ├── controllers/      # Request handlers and CRUD logic
│   ├── middleware/       # Authentication and error handling
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── services/         # Analytics, scoring, and streak logic
│   ├── utils/            # Shared utilities
│   ├── seed.js           # Optional demo data
│   ├── server.js         # Express entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # Shared UI components
│   │   ├── pages/        # Dashboard and feature pages
│   │   └── services/     # API client
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── package.json
```

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) — An active LTS version is recommended.
- npm — Included with Node.js.
- [MongoDB Atlas](https://www.mongodb.com/atlas) or a local MongoDB server.
- Git — Optional, for cloning the repository.

## Getting Started

### 1. Get the Project

Clone your repository or extract the project ZIP. Open a terminal in the project root (`productivity-dashboard`).

### 2. Configure Environment Variables

Create a file named `.env` inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
```

Replace `MONGO_URI` with your MongoDB connection string and set `JWT_SECRET` to a long, private random value.

**Important:** Never commit your `.env` file or publish your database credentials and secrets.

### 3. Install Backend Dependencies

Open a terminal in the project root and run:

```bash
cd backend
npm install
```

### 4. Start the Backend

From the `backend` folder, run:

```bash
npm run dev
```

The API is intended to run at:

```text
http://localhost:5000
```

If configured, check the health endpoint at:

```text
http://localhost:5000/api/health
```

### 5. Install Frontend Dependencies

Open a second terminal in the project root and run:

```bash
cd frontend
npm install
```

### 6. Start the Frontend

From the `frontend` folder, run:

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

## Optional Demo Data

If the project includes the seed script and its corresponding npm commands, configure the backend `.env` file and run the seed command from the project root:

```bash
npm run seed
```

Demo credentials, if configured by the seed script:

- **Email:** `demo@example.com`
- **Password:** `demo1234`

**Important:** Check the seed script before running it. It may remove existing records belonging to the demo account before recreating sample data. Use demo credentials for local development only.

## API Overview

The backend API is organized into the following route groups:

| Endpoint | Purpose |
|---|---|
| `/api/health` | API health check |
| `/api/auth` | Registration and login |
| `/api/tasks` | Task management |
| `/api/habits` | Habit tracking |
| `/api/goals` | Goal management |
| `/api/notes` | Notes management |
| `/api/pomodoro` | Focus-session tracking |
| `/api/analytics` | Productivity statistics and analytics |

Authenticated requests use a JWT bearer token. The frontend API client may store the token in browser `localStorage` and attach it to API requests, depending on the implementation.

## Available Scripts

### Root Directory

```bash
npm run backend
npm run seed
```

### Backend (`backend/`)

```bash
npm run dev
npm start
npm run seed
```

### Frontend (`frontend/`)

```bash
npm run dev
npm run build
npm run preview
```

Run only the commands that are defined in the corresponding `package.json` file.

## Troubleshooting

- **Backend fails to start:** Check that `backend/.env` exists and contains valid configuration.
- **MongoDB connection error:** Verify the connection string, network access rules, and database user permissions.
- **Login or API requests return 401:** Log in again and check authentication configuration.
- **Frontend cannot reach the API:** Confirm the backend is running and the frontend API URL is configured correctly.
- **Port already in use:** Stop the process using the port or configure an available port.

## Security Notes

- Keep `.env` files and database credentials private.
- Use a strong, unique JWT secret.
- Configure HTTPS and secure environment variables before deploying.
- Use demo accounts only for development.
- Validate and sanitize user input on the backend.

## Future Improvements

- Add automated tests for API routes and UI flows.
- Add reminders and calendar integration.
- Improve accessibility and mobile navigation.
- Add production deployment configuration and continuous integration.

## Author
Supriya Tiwari - Computer Engineering Student

Developed as a full-stack productivity dashboard project using React, Node.js, Express.js, and MongoDB.
