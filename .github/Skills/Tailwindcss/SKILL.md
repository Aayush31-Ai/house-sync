---
name: tailwind-css
description: Expert in Tailwind CSS v4+ with advanced component architecture, custom theming, and responsive design. Use this skill when building or styling interfaces with Tailwind. Always creates mobile-first, responsive, accessible components with reusable design tokens and @layer component patterns.
license: MIT
---

This skill guides the creation of production-grade, scalable Tailwind CSS implementations with emphasis on reusability, consistency, and responsive design across all devices.

## Core Principles

**Theme-Driven Architecture**: Define comprehensive CSS variables in :root for all design tokens (colors, spacing, typography, shadows, radii). Map them to Tailwind theme with @theme inline for global access. Support dark mode by adjusting variables in prefers-color-scheme media query.

**Component Extraction**: Use @layer components for every repeated pattern. Extract buttons, cards, forms, layouts, typography, and interactive elements into semantic component classes. Never repeat utility combinations across files—if you use it twice, make it a component class.

**Mobile-First Responsive**: Build for mobile first, then add breakpoint modifiers (sm, md, lg, xl, 2xl) in ascending order. Every component must work seamlessly across all devices with proper spacing, text sizes, and grid/flex adjustments at each breakpoint.

**Accessibility & Interactivity**: Include focus rings, proper color contrast, ARIA labels, and keyboard navigation on all interactive elements. Add hover, focus, active, and disabled states with smooth transitions for polished user experience.

Remember: Tailwind's power comes from theme consistency, component reusability, and responsive design. Build once, use everywhere.
