---
name: forms-validation
description: Expert in form handling, validation, and submission for React/Next.js. Use this skill when building contact forms, user inputs, or data collection. Creates type-safe, accessible forms with proper validation and error handling.
license: MIT
---

This skill guides the creation of robust, user-friendly forms with proper validation, error handling, and submission flows.

## Core Principles

**Form Architecture**: Use React Hook Form for performance (uncontrolled components, minimal re-renders). Define validation schemas with Zod for type-safe runtime validation. Structure forms with proper fieldsets, legends, and labels. Implement controlled components only when necessary (real-time formatting, dependent fields).

**Validation Strategy**: Validate on blur for better UX (not on every keystroke). Show errors after user finishes typing or attempts submission. Use Zod schemas for client and server validation consistency. Provide specific, actionable error messages. Validate email format, required fields, string lengths, and data types.

**Error Handling**: Display errors inline near their fields with aria-describedby. Use semantic error colors with icons (not color alone). Prevent form submission with invalid data. Show global errors for submission failures. Implement retry logic for network errors. Never lose user data on validation failure.

**Submission Flow**: Disable submit button during submission to prevent duplicates. Show loading states with spinners or progress indicators. Handle success with clear feedback (toast, redirect, success message). Send data to API routes with proper error handling. Implement CSRF protection and rate limiting on server.

**Accessibility**: Associate labels with inputs using htmlFor. Mark required fields clearly. Use aria-invalid and aria-describedby for error states. Ensure keyboard navigation works perfectly. Announce dynamic errors to screen readers.

**Email Integration**: Use Resend or SendGrid for contact forms. Validate email server-side. Implement honeypot fields for spam prevention. Send confirmation emails when appropriate.

Remember: Forms are conversion points—make them effortless to complete correctly and impossible to submit incorrectly.
