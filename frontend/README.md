# SISFS Frontend Simple

A simple React + Vite frontend for the SISFS backend.

## Setup

1. Copy `.env.example` to `.env`
2. Update `VITE_API_URL` if needed
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run development server:
   ```bash
   npm run dev
   ```

## Connected APIs

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`
- GET `/api/leads`
- POST `/api/leads`
- PUT `/api/leads/:id`
- DELETE `/api/leads/:id`
