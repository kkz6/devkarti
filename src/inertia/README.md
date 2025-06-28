# NestJS Inertia Module

This module provides Inertia.js integration for NestJS applications, inspired by the Supercharge framework's implementation.

## Features

- **Decorator-based routing**: Use `@Render()` decorator to specify Inertia components
- **Shared data**: Share data globally across all Inertia responses
- **Deferred props**: Load data after initial page render for better performance
- **Optional props**: Only evaluate props when specifically requested
- **Always props**: Include props even in partial reloads
- **Merge props**: Support for pagination and infinite scrolling
- **Flash messages**: Support for flash data between requests
- **SSR support**: Server-side rendering configuration
- **History encryption**: Protect sensitive data in browser history

## Basic Usage

### 1. Import the module

```typescript
import { InertiaModule } from './inertia';

@Module({
  imports: [InertiaModule],
  // ...
})
export class AppModule {}
```

### 2. Use in controllers

```typescript
import { Render, InertiaService } from '../inertia';

@Controller()
export class BlogController {
  constructor(
    private readonly inertiaService: InertiaService,
  ) {
    // Share global data
    this.inertiaService.share({
      appName: 'My App',
    });
  }

  @Get()
  @Render('Home')
  async home() {
    return { 
      posts: await this.postsService.findAll(),
    };
  }
}
```

## Advanced Features

### Shared Data

Share data globally that will be available in all Inertia responses:

```typescript
// In constructor or service
this.inertiaService.share('user', currentUser);
this.inertiaService.share({
  appName: 'My App',
  version: '1.0.0',
});
```

### Deferred Props

Load expensive data after the initial page render:

```typescript
import { Defer } from '../inertia';

@Get()
@Render('Dashboard')
async dashboard() {
  return {
    quickStats: { users: 100, posts: 50 },
    // This will load after initial render
    detailedStats: Defer(async () => {
      return await this.statsService.calculateDetailedStats();
    }),
  };
}
```

### Optional Props

Only evaluate when specifically requested in partial reloads:

```typescript
import { Optional } from '../inertia';

@Get()
@Render('Users')
async users() {
  return {
    users: await this.userService.findAll(),
    // Only loaded when specifically requested
    permissions: Optional(async () => {
      return await this.permissionService.findAll();
    }),
  };
}
```

### Always Props

Include props even in partial reloads:

```typescript
import { Always } from '../inertia';

@Get()
@Render('Page')
async page() {
  return {
    content: 'Page content',
    // Always included, even in partial reloads
    meta: Always({
      title: 'Page Title',
      description: 'Page description',
    }),
  };
}
```

### Merge Props

Support for pagination and infinite scrolling:

```typescript
import { Merge } from '../inertia';

@Get()
@Render('Posts')
async posts(@Query('page') page = 1) {
  const posts = await this.postService.paginate(page);
  return {
    // Will be merged with existing data on frontend
    posts: Merge(posts),
  };
}
```

## Configuration

Create a configuration file at `src/config/inertia.config.ts`:

```typescript
export const inertiaConfig = {
  rootView: 'app',
  version: () => process.env.APP_VERSION || Date.now().toString(),
  ssr: {
    enabled: false,
    url: 'http://localhost:13714',
  },
  encryptHistory: false,
};
```

## Patterns Inspired by Supercharge

This implementation adopts several patterns from the [Supercharge Inertia adapter](https://github.com/supercharge/inertia):

1. **Service-based architecture**: Central `InertiaService` for managing shared data
2. **Decorator-driven API**: Clean, declarative syntax for Inertia responses
3. **Advanced prop handling**: Support for deferred, optional, and mergeable props
4. **Configuration-based setup**: Centralized configuration for Inertia settings
5. **Middleware composition**: Interceptor-based approach for handling Inertia requests

## Future Enhancements

- Full SSR support
- Validation error handling
- Testing utilities
- Asset versioning from manifest files
- Request-specific shared data
- Lazy evaluation of shared data 