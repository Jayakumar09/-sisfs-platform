# SISFS Frontend

Solar Installation System Finance System - React + Vite frontend application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

The frontend runs on `http://localhost:3000` and connects to the backend API at `http://localhost:5000`.

## Admin Login

- **Email:** `admin@sisfs.com`
- **Password:** `admin123`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/me` - Get current user (authenticated)

### Leads
- `GET /api/leads` - List leads (authenticated)
- `POST /api/leads` - Create lead (authenticated)
- `PUT /api/leads/:id` - Update lead (authenticated)
- `DELETE /api/leads/:id` - Delete lead (authenticated)

## Tech Stack

- React 18
- Vite
- React Router v6
- Axios
- Tailwind CSS
