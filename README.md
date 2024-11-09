# nextExample

A modern Next.js application showcasing authentication, task management, and theming capabilities.

## Features

- 🔐 Authentication with better-auth
- 🎨 Dark/Light theme support
- 🗃️ PostgreSQL database support with Kysely
- 📁 File storage with MinIO
- 🎯 Type-safe database operations
- 🎨 Styled with Tailwind CSS and shadcn/ui

## Prerequisites

- Node.js 18+ 
- PostgreSQL
    - use a local docker-instance or use a free remote instance from [supabase](https://supabase.com)
- MinIO server (for file storage)

## Environment Variables

copy the `.env.example` file to `.env` and fill in with your values.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create Kysely database schema:

```bash
npm run generate-types-postgres
```

3. Run database migrations:

```bash
npm run migrate
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/ # Next.js app directory
├── components/ # React components
├── database/ # Database configuration and migrations
├── lib/ # Utility functions and configurations
└── middleware.ts # Authentication middleware
```

## Authentication

The project uses `better-auth` for authentication. Protected routes are handled by the middleware, which redirects unauthenticated users to the sign-in page.

## Styling

The project uses Tailwind CSS with shadcn/ui components. Theme configuration can be found in:
- `tailwind.config.ts`
- `src/app/globals.css`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run migrate` - Run database migrations
- `npm run generate-types-postgres` - Generate TypeScript types for PostgreSQL
- `npm run generate-types-sqlite` - Generate TypeScript types for SQLite

## License

MIT