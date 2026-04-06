# SISFS Backend Starter

## Includes
- Auth API: register, login, me
- Leads API: create, list, single, update, delete
- Prisma 6.16.3 + PostgreSQL
- JWT auth middleware

## Setup
1. Copy `.env.example` to `.env`
2. Update `DATABASE_URL`
3. Run `npm install`
4. Run `npx prisma generate`
5. Run `npx prisma db push`
6. Run `npm run dev`

## Auth routes
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

## Lead routes
All require `Authorization: Bearer <token>`
- POST `/api/leads`
- GET `/api/leads`
- GET `/api/leads/:id`
- PUT `/api/leads/:id`
- DELETE `/api/leads/:id`
