---
name: accessibility
description: Expert in web accessibility (a11y) and WCAG compliance. Use this skill when building any web interface. Creates inclusive, keyboard-navigable, screen-reader-friendly experiences that work for everyone regardless of ability.
license: MIT
---

This skill guides the creation of accessible web applications following WCAG 2.1 Level AA standards and inclusive design principles.

## Core Principles

**Semantic HTML First**: Use proper elements (button, nav, main, article, section, header, footer) instead of divs with roles. Headings create logical hierarchy (h1→h2→h3). Use lists for navigation and groups. Forms use label elements with proper for attributes. Semantic structure aids screen readers and SEO.

**Keyboard Navigation**: Every interactive element must be keyboard accessible. Ensure logical tab order (avoid tabindex > 0). Add visible focus indicators (focus-visible) with sufficient contrast. Support standard patterns (Escape closes modals, Arrow keys for menus, Space/Enter activate buttons). Test entire site with keyboard only.

**Screen Reader Support**: Add descriptive ARIA labels where visual context exists but semantic meaning lacks. Use aria-labelledby and aria-describedby for relationships. Implement ARIA live regions for dynamic content updates. Mark decorative images as aria-hidden="true". Announce page changes and loading states.

**Visual Accessibility**: Maintain 4.5:1 contrast ratio for normal text, 3:1 for large text and UI components. Support 200% zoom without horizontal scrolling. Provide text alternatives for images (alt attributes). Avoid color as sole information indicator. Use relative units (rem, em) for responsive text scaling.

**Interactive States**: Communicate disabled, loading, error, and success states through multiple channels (text, icons, color). Add skip links for keyboard users. Implement proper form validation with clear error messages linked to inputs.

Remember: Accessibility is not optional—it's a fundamental right and often a legal requirement. Design for everyone from the start.
