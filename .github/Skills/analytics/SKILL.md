---
name: analytics
description: Expert in web analytics and user tracking. Use this skill when implementing analytics, events, or user behavior monitoring. Implements privacy-first tracking with proper consent management and insightful metrics.
license: MIT
---

This skill guides the implementation of analytics solutions that balance insights with user privacy and performance.

## Core Principles

**Privacy-First Approach**: Use privacy-focused analytics (Plausible, Fathom) when possible—no cookies, GDPR compliant by default. For Google Analytics, implement proper consent management with cookie banners. Anonymize IP addresses. Respect Do Not Track headers. Store minimal personal data.

**Analytics Setup**: Use Vercel Analytics or Google Analytics 4 with Next.js. Implement script tag in _document.js or with next/script component. Use Script strategy="afterInteractive" for non-critical analytics. Configure proper measurement IDs and tracking codes.

**Event Tracking**: Track meaningful actions (button clicks, form submissions, video plays, scroll depth). Use consistent naming conventions for events (category_action_label). Implement custom events through analytics library. Track conversions and goal completions. Monitor user journey through funnels.

**Performance Monitoring**: Track Core Web Vitals automatically. Monitor page load times and JavaScript errors. Use Web Vitals library for real user metrics. Send performance data to analytics. Set up alerts for degraded performance.

**Data Analysis**: Define key metrics before implementing (conversion rate, bounce rate, engagement time). Create custom dashboards for important metrics. Track A/B test results. Monitor traffic sources and user demographics. Analyze user behavior patterns.

**Consent Management**: Implement cookie consent banner for GDPR/CCPA compliance. Block analytics until user consents. Provide opt-out mechanisms. Store consent preferences. Use consent mode in Google Analytics.

Remember: Analytics should improve user experience, not invade privacy. Collect only what you'll actually use and respect user choices.
