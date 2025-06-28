# DevKarti - NestJS + Inertia.js + React

This project has been converted from Astro to a NestJS backend with Inertia.js and React frontend.

## Architecture

- **Backend**: NestJS with TypeORM (PostgreSQL)
- **Frontend**: React with Inertia.js
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=devkarti

   # Application
   NODE_ENV=development
   PORT=3000

   # Site Configuration
   SITE_TITLE=DevKarti
   SITE_DESCRIPTION=A personal blog about science, programming, and technology
   SITE_AUTHOR=Karthick
   SITE_URL=http://localhost:3000
   ```

3. **Create the database**:
   ```bash
   createdb devkarti
   ```

4. **Run database migrations**:
   ```bash
   npm run migration:run
   ```

5. **Migrate existing blog posts**:
   ```bash
   npx ts-node scripts/migrate-posts.ts
   ```

6. **Build frontend assets**:
   ```bash
   npm run build:frontend
   ```

7. **Start the development server**:
   ```bash
   npm run start:dev
   ```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── blog/               # Blog module (controllers, services, DTOs)
├── database/           # Database configuration and entities
├── inertia/           # Inertia.js integration
├── app.module.ts      # Main application module
└── main.ts           # Application entry point

resources/
├── js/
│   ├── components/   # React components
│   ├── layouts/      # Layout components
│   ├── pages/        # Page components
│   └── app.tsx      # React app entry point
└── css/
    └── app.css      # Tailwind CSS styles

views/
└── app.html         # HTML template for SSR
```

## Features Implemented

- ✅ Database models for posts and tags
- ✅ Blog service with CRUD operations
- ✅ Inertia.js integration
- ✅ React components for displaying posts
- ✅ Migration script for existing content
- ✅ Tailwind CSS styling
- ✅ TypeORM with PostgreSQL

## TODO

- [ ] Implement search functionality
- [ ] Add admin panel for content management
- [ ] Implement markdown rendering in React
- [ ] Add pagination component
- [ ] Implement tag filtering
- [ ] Add RSS feed generation
- [ ] Implement image optimization
- [ ] Add SEO meta tags
- [ ] Implement comments system
- [ ] Add authentication for admin

## API Endpoints

- `GET /` - Home page
- `GET /posts` - List all posts
- `GET /posts/:slug` - View single post
- `GET /tags` - List all tags
- `GET /search` - Search page
- `POST /api/posts` - Create new post (API)
- `PUT /api/posts/:id` - Update post (API)
- `DELETE /api/posts/:id` - Delete post (API)

## Development Commands

```bash
# Start development server
npm run start:dev

# Build for production
npm run build

# Run tests
npm run test

# Generate migration
npm run migration:generate -- -n MigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
``` 