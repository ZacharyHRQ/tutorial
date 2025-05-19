# Next.js Concepts

This section covers key concepts in Next.js 13+ using the App Router.

## App Router

Next.js 13+ introduces the App Router, a new paradigm for building applications that takes advantage of React Server Components and nested layouts.

### File-System Based Routing

- Files in the `app` directory automatically become routes
- Folders define the route segments
- Special files like `page.tsx`, `layout.tsx`, `loading.tsx`, and `error.tsx` have specific purposes
- Dynamic routes use square brackets (e.g., `[id]`)

### Layouts

- Layouts are UI that is shared between multiple pages
- They can be nested and inherit from parent layouts
- They preserve state and don't re-render on navigation
- They can be used to add UI elements that should appear on every page

## Server and Client Components

Next.js 13+ introduces a new paradigm for React components:

### Server Components (Default)

- Render on the server
- Can access server-side resources directly
- Reduce client-side JavaScript
- Can't use hooks or browser APIs
- Can pass data to Client Components

### Client Components

- Marked with `'use client'` directive
- Can use React hooks and browser APIs
- Can handle user interactions
- Can maintain client-side state
- Can't access server-side resources directly

## API Routes

Next.js provides a way to create API endpoints within your application:

- API routes are server-side only
- They can handle HTTP methods (GET, POST, etc.)
- They can access server-side resources
- They can be called from client components
- They can return JSON, text, or other content types

## Server-Side Rendering (SSR)

Next.js provides several rendering strategies:

- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- Client-Side Rendering (CSR)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Documentation](https://nextjs.org/docs/app/building-your-application/routing)
- [Server Components Documentation](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [API Routes Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) 