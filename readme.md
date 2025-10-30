# 🎮 Gamedashboard

A full-stack game session tracking dashboard built with React and Express. Tracks your gaming sessions.

### Student:

_Magnus Nilsson_

---

<br>

## 🛠️ Tech Stacks:

### 🎨 Frontend

-   React 18 - UI library
-   TypeScript - Type safety
-   Vite - Build tool and dev server
-   TanStack Query (React Query) - Server state management and caching
-   TanStack Form - Form state management
-   React Router - Client-side routing
-   Zustand - Global state management (active user, toast notifications)
-   Chart.js with react-chartjs-2 - Data visualization
-   Axios - HTTP client
-   Zod - Schema validation
-   CSS - Styling (no CSS frameworks)
-   Eslint - linting.

### 💾 Backend Tech Stack

-   Node.js - Runtime environment
-   TypeScript - Type safety
-   Express 5 - Web framework
-   Prisma - ORM for PostgreSQL
-   PostgreSQL - Relational database
-   Zod - Request validation
-   CORS - Cross-origin resource sharing
-   tsx - TypeScript execution for development
-   dotenv - Environment variable management
-   Eslint - linting.

<br>

## 📦 Installation & Setup

### Prerequisites

-   **Node.js** (v18+)
-   **PostgreSQL** database
-   **npm** or **pnpm**

### Root Setup

Clone the repository:

```bash
git clone https://github.com/MagNilsInSchool/gameDashboard
cd gameDashboard
```

### Backend Setup

```bash
cd backend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and DEV_MODE setting

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data
npx prisma db seed

# Start the backend server
npm run dev
```

<br>

> [!IMPORTANT]
> If DEV_MODE in .env is set to "true" then session times are multiplied by 60. Meaning seconds become minutes for testing purposes.

<br>

> [!NOTE]
> Backend runs on http://localhost:1338

<br>

### Frontend Setup

```bash
cd frontend
npm install

# Start the development server
npm run dev
```

<br>

> [!NOTE]
> Frontend runs on http://localhost:1337

<br>

## 📁 Project Structure

```
gameDashboard/
├── backend/
│   ├── handlers/           # Request handlers for routes
│   ├── interfaces/         # TypeScript interfaces
│   ├── prisma/            # Database schema and migrations
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   ├── routes/            # Express route definitions
│   ├── schemas/           # Zod validation schemas
│   ├── utils/             # Utility functions and response handlers
│   ├── .env.example       # Environment variables template
│   ├── server.ts          # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── api/          # API handlers and queries
│   │   │   ├── handlers/     # Axios API calls
│   │   │   ├── mutations/    # TanStack Query mutations
│   │   │   ├── queries/      # TanStack Query queries
│   │   │   └── errorHandler/ # Error handling utilities
│   │   ├── components/   # React components
│   │   ├── interfaces/   # TypeScript interfaces
│   │   ├── pages/        # Page components
│   │   ├── routes/       # React Router setup
│   │   ├── schemas/      # Zod validation schemas
│   │   ├── stores/       # Zustand state management
│   │   ├── utils/        # Utility functions
│   │   ├── App.tsx       # Root component
│   │   └── main.tsx      # Application entry point
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
└── README.md

```

<br>

## ERD

![Entity relation model showing User, Game and GameStat models.](./frontend/public/assets/images/erdDashboard.jpg)

<br>

## Screenshots of routes:

![Showing front-page.](./frontend/public/assets/images/frontpage.jpg)
![Showing games.](./frontend/public/assets/images/games.jpg)
![Showing playing.](./frontend/public/assets/images/playing.jpg)
![Showing profile.](./frontend/public/assets/images/profile.jpg)
![Showing profile continuation.](./frontend/public/assets/images/profile1.jpg)
![Showing profile continuation.](./frontend/public/assets/images/registration.jpg)
