---
name: typescript
description: Expert in TypeScript for type-safe React and Next.js development. Use this skill when writing components, pages, or utilities. Always creates fully-typed code with proper interfaces, type guards, and generics for maintainability and developer experience.
license: MIT
---

This skill guides the creation of type-safe applications using TypeScript best practices for React, Next.js, and modern web development.

## Core Principles

**Type Everything**: Define interfaces for all component props, API responses, function parameters, and return types. Use type inference where obvious but be explicit for public APIs. Never use 'any'—prefer 'unknown' when type is truly uncertain, then narrow with type guards.

**Component Typing**: Use React.FC sparingly; prefer explicit prop interfaces with function components. Define children as React.ReactNode. Type events properly (React.MouseEvent, React.ChangeEvent). Use generics for reusable components. Export prop interfaces for component consumers.

**Data Structures**: Create types for API responses, database models, and state shapes. Use utility types (Partial, Pick, Omit, Required) to derive related types. Implement discriminated unions for state machines and variants. Define enums or const objects with 'as const' for fixed values.

**Type Safety Patterns**: Use type guards (typeof, instanceof, custom guards) to narrow types. Implement branded types for IDs and special strings. Apply strict null checks—handle undefined/null explicitly. Use optional chaining and nullish coalescing operators.

**Configuration**: Enable strict mode in tsconfig.json (strictNullChecks, noImplicitAny, strictFunctionTypes). Configure path aliases for clean imports. Set proper module resolution and target for your environment.

Remember: TypeScript catches bugs at compile time, not runtime. Invest in types early—they're documentation that never lies and refactoring safety nets.
