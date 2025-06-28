# Devkarti Blog - Laravel Inertia React

This is a Laravel-based blog application using Inertia.js and React, migrated from an Astro static site.

## Features

- 📝 Blog posts with markdown content
- 🏷️ Tag-based categorization
- 🔍 Full-text search
- 📱 Responsive design with Tailwind CSS
- ⚡ Server-side rendering with Inertia.js
- 🎨 Dark mode support
- 📄 Static pages (About, Hire Me)
- 🔄 Astro markdown migration tools

## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React with TypeScript
- **Routing**: Inertia.js
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Database**: SQLite (configurable)

## Installation

1. Clone the repository
2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install Node dependencies:
   ```bash
   npm install
   ```

4. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Run database migrations:
   ```bash
   php artisan migrate
   ```

7. Migrate content from Astro (if you have an existing Astro blog):
   ```bash
   # Migrate markdown posts from Astro
   php artisan astro:migrate-posts ../src/content/blog
   
   # Copy images from Astro public directory
   php artisan astro:copy-images ../public
   ```

8. Build frontend assets:
   ```bash
   npm run build
   ```

## Development

To run the application in development mode:

1. Start the Laravel server:
   ```bash
   php artisan serve
   ```

2. In another terminal, start the Vite dev server:
   ```bash
   npm run dev
   ```

Visit `http://localhost:8000` to see the application.

## Astro Migration Commands

This project includes custom Artisan commands to migrate content from an Astro blog:

### Migrate Posts
```bash
php artisan astro:migrate-posts {path?}
```
- Reads markdown files from the specified directory (default: `../src/content/blog`)
- Extracts frontmatter (YAML) and content
- Converts markdown to HTML
- Creates posts and tags in the database
- Handles various date formats
- Skips posts that already exist (based on slug)

### Copy Images
```bash
php artisan astro:copy-images {source?} {--force}
```
- Copies images from Astro public directory (default: `../public`)
- Copies post images, assets, and favicon files
- Use `--force` to overwrite existing files
- Maintains directory structure

## Project Structure

```
devkarti-laravel/
├── app/
│   ├── Console/
│   │   └── Commands/
│   │       ├── MigrateAstroPosts.php  # Astro migration command
│   │       └── CopyAstroImages.php    # Image copy command
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── PostController.php
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php
│   └── Models/
│       ├── Post.php
│       └── Tag.php
├── config/
│   └── site.php              # Site configuration
├── database/
│   ├── migrations/           # Database migrations
│   └── seeders/             # Database seeders
├── resources/
│   ├── css/
│   │   └── app.css          # Global styles
│   ├── js/
│   │   ├── Components/      # React components
│   │   ├── Layouts/         # Layout components
│   │   ├── Pages/           # Page components
│   │   └── app.tsx          # Main entry point
│   └── views/
│       └── app.blade.php    # Root template
├── routes/
│   └── web.php              # Web routes
└── package.json             # Node dependencies
```

## Configuration

Site configuration can be found in `config/site.php`. This includes:
- Site name and description
- Author information
- Social links
- Posts per page

## Adding New Posts

To add new posts, you can:

1. Create markdown files in a directory and use the migration command:
   ```bash
   php artisan astro:migrate-posts /path/to/markdown/files
   ```

2. Create posts directly in the database using Laravel Tinker:
   ```bash
   php artisan tinker
   ```

3. Build an admin interface (not included in this migration)

## Markdown Format

The migration command expects markdown files with YAML frontmatter:

```markdown
---
title: Post Title
slug: post-slug
author: Author Name
pubDatetime: 2024-02-23T15:22:00Z
modDatetime: 2024-02-24T10:00:00Z
description: Post description
featured: false
draft: false
tags:
  - tag1
  - tag2
---

Post content in markdown...
```

## Deployment

For production deployment:

1. Set up your production environment variables in `.env`
2. Run migrations: `php artisan migrate --force`
3. Build assets: `npm run build`
4. Configure your web server (Nginx/Apache) to point to the `public` directory
5. Set up SSL certificates
6. Configure queue workers if needed

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
