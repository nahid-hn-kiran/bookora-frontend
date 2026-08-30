# Bookora Frontend

Frontend application for Bookora, an escape room booking and management platform.

## Production

**Live Application:** https://bookora-3gf4.onrender.com/

**Backend API:** https://bookora-api-rea1.onrender.com/

The frontend and backend are deployed separately on Render.

## Overview

The Bookora frontend provides the user-facing interface for discovering venues and rooms, checking availability, creating bookings, managing accounts, and interacting with administrative features.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack React Query
- React Hook Form
- Zod
- Axios
- Lucide React
- Sonner
- Render

## Core Features

- Responsive user interface
- Authentication flows
- Google OAuth integration
- Venue browsing
- Room browsing
- Time-slot selection
- Booking flows
- Booking management
- Payment flow integration
- User account interfaces
- Administrative dashboard interfaces
- Form validation
- Server-state management with TanStack React Query
- Loading, error, and notification states

## Project Structure

```text
bookora-frontend/
├── src/
│   ├── app/
│   ├── components/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── public/
├── Dockerfile
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

## Local Development

### Requirements

- Node.js
- npm

### Installation

```bash
cd bookora-frontend
npm install
```

Create the required environment variables and configure the backend API URL.

Run the development server:

```bash
npm run dev
```

Default local URL:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
```

Run the production application with:

```bash
npm start
```

## Backend Connection

Production backend:

```text
https://bookora-api-rea1.onrender.com/
```

For local development, configure the frontend API base URL to point to the local backend:

```text
http://localhost:5000
```

## UI and Component System

The project uses Tailwind CSS for styling and shadcn/ui for reusable UI components.

UI components are organized under:

```text
src/components/ui/
```

Lucide React is used for icons and Sonner is used for notifications.

## Data Management

TanStack React Query is used for server-state management, including:

- API requests
- Loading states
- Error states
- Caching
- Mutations
- Query invalidation

Axios is used for HTTP communication with the backend.

## Forms and Validation

Forms are implemented with React Hook Form and validated with Zod where applicable.

## Docker

The frontend includes a Dockerfile for containerized deployment.

It can also be started as part of the full Bookora Docker Compose setup from the repository root.

## Author

Nahid Hasan
