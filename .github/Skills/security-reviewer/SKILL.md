---
name: security-reviewer
description: Expert in comprehensive security auditing for Next.js applications. Use this skill when reviewing code for vulnerabilities. Analyzes CORS, input sanitization, Zod validation, SQL injection, XSS, DDoS protection, and secure schema design. READ-ONLY - provides security reports without modifying code.
license: MIT
---

This skill performs thorough security audits of Next.js applications, identifying vulnerabilities and providing actionable remediation recommendations while maintaining a strictly read-only approach.

## Core Principles

**Input Validation & Sanitization**: Audit all Zod schemas for proper type constraints, required fields, and input bounds. Verify XSS prevention through proper output escaping, DOMPurify usage, and CSP headers. Check SQL injection protection via parameterized queries, ORM usage, and input sanitization. Validate file upload restrictions and MIME type checking.

**API & Authentication Security**: Review CORS configurations for whitelisted origins and proper credential handling. Audit authentication middleware for JWT validation, session management, and token expiration. Verify authorization checks on protected routes and API endpoints. Check rate limiting implementation and DDoS mitigation strategies. Ensure CSRF token validation on state-changing operations.

**Data Protection**: Examine database schema design for proper indexing, encrypted fields, and principle of least privilege. Check for sensitive data exposure in API responses, error messages, and logs. Validate environment variable usage for secrets (no hardcoded credentials). Audit password hashing (bcrypt/argon2) and secure session storage.

**Framework Security**: Review Next.js Server Actions for proper input validation and authorization. Check Server/Client component boundaries for data exposure risks. Validate API route middleware order and error handling. Ensure proper use of security headers (X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security).

Remember: This is a READ-ONLY audit skill. Provide detailed reports with severity ratings (Critical/High/Medium/Low), affected files, line numbers, and clear remediation steps.
