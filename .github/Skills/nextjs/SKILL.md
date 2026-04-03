---
name: nextjs
description: Expert in Next.js App Router with server/client rendering, SEO optimization, and clean architecture. Use this skill when building Next.js applications. Always creates well-documented, SEO-optimized pages with proper RSC/RCC patterns, metadata, and maintainable code with clear comments.
license: MIT
---

This skill guides the creation of production-grade Next.js applications with emphasis on proper rendering strategies, SEO excellence, clean code architecture, and comprehensive documentation.

## Core Principles

**Server-First Rendering**: Use React Server Components by default. Only mark components as 'use client' when they require interactivity (event handlers, hooks, browser APIs). Server Components provide better performance, SEO, and security by fetching data directly without exposing endpoints.

**SEO Excellence**: Every page must include comprehensive metadata (title, description, openGraph, Twitter cards). Use semantic HTML elements (article, section, header, footer, time) and Next.js Image/Link components for automatic optimization and prefetching.

**Documentation-First Development**: Every page and component file starts with clear documentation explaining its purpose, features, data sources, route, rendering strategy, and access level. Write strategic comments that explain WHY, not what. Code should be self-documenting through clear naming.

**Clean Architecture**: Organize with route groups, implement proper loading and error states, validate all inputs with schemas, handle errors gracefully with user-friendly messages, and use TypeScript for type safety throughout.

**Performance by Default**: Leverage streaming with loading.tsx, implement error boundaries, use dynamic metadata for SEO, prefer composition patterns (Server wraps Client), and ensure every interface is responsive and accessible.

Remember: Maximize Server Components, optimize every page for SEO, document thoroughly, and write maintainable code that others can understand.
