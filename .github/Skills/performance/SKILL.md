---
name: performance
description: Expert in web performance optimization and Core Web Vitals. Use this skill when building any web application. Creates fast, efficient experiences through code splitting, image optimization, and strategic loading patterns.
license: MIT
---

This skill guides the creation of high-performance web applications optimized for Core Web Vitals and exceptional user experience.

## Core Principles

**Core Web Vitals Mastery**: Optimize LCP (Largest Contentful Paint) under 2.5s by prioritizing above-fold content, preloading critical resources, and using Next.js Image. Keep FID (First Input Delay) under 100ms with code splitting and deferred JavaScript. Maintain CLS (Cumulative Layout Shift) under 0.1 by setting image dimensions and avoiding dynamic content insertion.

**Image Optimization**: Always use Next.js Image component with proper width/height. Serve modern formats (WebP, AVIF) with fallbacks. Implement lazy loading for below-fold images. Use placeholder blur for smoother loading. Size images appropriately—never serve 4K images for thumbnail displays.

**Code Splitting & Lazy Loading**: Use dynamic imports for heavy components and routes. Implement React.lazy with Suspense for code splitting. Defer non-critical JavaScript. Lazy load third-party scripts (analytics, chat widgets). Split vendor bundles strategically.

**Asset Optimization**: Minimize bundle size—analyze with tools like Bundle Analyzer. Tree-shake unused code. Use server components to reduce client JavaScript. Compress assets with gzip/brotli. Implement caching strategies with proper headers.

**Loading Strategies**: Prefetch critical routes with Next.js Link. Preload fonts and critical assets. Use loading skeletons for better perceived performance. Implement progressive enhancement—core functionality works without JavaScript. Stream server components for faster time-to-interactive.

**Monitoring**: Track real user metrics with Web Vitals library. Test with Lighthouse regularly. Monitor bundle sizes in CI/CD. Set performance budgets and enforce them.

Remember: Performance is user experience. Every 100ms delay decreases conversions. Optimize ruthlessly but measure everything.
