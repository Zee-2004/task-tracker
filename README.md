# Task Tracker

A task tracking web app built with Next.js, TypeScript, Prisma, and PostgreSQL (Supabase).

## Features
- Authentication (sign up / login / logout) via NextAuth credentials provider
- Create, edit, delete tasks with title, description, priority, status, due date
- Dashboard with task counts by status and overdue highlighting
- Responsive layout (375px – 1280px+)
- Atomic Design component structure
- Error monitoring via Sentry

## Tech Stack
- Next.js 16 (App Router) + TypeScript
- Prisma ORM + PostgreSQL (Supabase, pooled connection)
- Tailwind CSS
- NextAuth (credentials provider)
- Sentry for error monitoring

## Local Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in your values
3. `npx prisma db push`
4. `npm run dev`
5. `npm run lint` to verify linting (should be clean)

## Environment Variables
See `.env.example`. You need:
- `DATABASE_URL` — Supabase pooled connection string
- `NEXTAUTH_SECRET` — random string for session encryption
- `NEXTAUTH_URL` — your app's base URL

## Known Limitations
- Status changes via dropdown rather than drag-and-drop
- No automated test coverage due to time constraints
- GraphQL/tRPC bonus not implemented; REST API routes used instead
- Mobile navigation uses a simplified top bar rather than a collapsible sidebar

## Folder Structure
```
src/
  components/
    atoms/       -> Button, Badge, Input, Label
    molecules/   -> TaskCard, PriorityBadge, FormField
    organisms/   -> TaskBoard, TaskForm, Navbar, DashboardStats
    templates/   -> DashboardLayout, AuthLayout
  app/           -> Next.js pages + API routes
  lib/           -> prisma client, auth helpers
prisma/
  schema.prisma
```