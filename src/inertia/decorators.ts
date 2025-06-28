import { SetMetadata } from '@nestjs/common'

/**
 * Mark a prop as optional - it will only be evaluated when specifically requested
 */
export function Optional<T>(callback: () => T | Promise<T>) {
  return {
    __inertia_optional: true,
    callback,
  }
}

/**
 * Mark a prop as deferred - it will be loaded after the initial page render
 */
export function Defer<T>(callback: () => T | Promise<T>, group?: string) {
  return {
    __inertia_defer: true,
    callback,
    group: group || 'default',
  }
}

/**
 * Mark a prop as mergeable for pagination or infinite scrolling
 */
export function Merge<T>(data: T) {
  return {
    __inertia_merge: true,
    data,
  }
}

/**
 * Always include this prop, even in partial reloads
 */
export function Always<T>(data: T) {
  return {
    __inertia_always: true,
    data,
  }
} 