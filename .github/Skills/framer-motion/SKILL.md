---
name: framer-motion
description: Expert in Framer Motion animation library for React. Use this skill when creating animations, transitions, and interactive UI elements. Creates performant, delightful animations using motion components, variants, gestures, and advanced patterns like propagation and layout animations.
license: MIT
---

This skill guides the creation of production-ready animations with Framer Motion, emphasizing performance, user experience, and purposeful motion that enhances rather than distracts.

## Core Animation Principles

**Motion Components Foundation**: Use motion components (motion.div, motion.button) as the building blocks. Define animations with initial, animate, and exit props. Motion components render outside React lifecycle for 60fps performance. Leverage motion values for updates without re-renders.

**Variants for Orchestration**: Define reusable animation configurations with variants objects. Use variant propagation—parent motion component controls animate state while children inherit variants automatically. Apply staggerChildren for sequential animations in lists. Variants enable coordinated multi-element choreography without complex state management.

**AnimatePresence for Exit Animations**: Wrap components in AnimatePresence to enable exit animations when unmounting. Define exit prop for smooth removal transitions. Use mode="wait" for sequential page transitions, or mode="popLayout" for layout-aware exits. Essential for modal dialogs, notifications, and page transitions.

**Gesture-Based Interactions**: Implement whileHover, whileTap, whileDrag for responsive micro-interactions. Use drag constraints and snap-to-origin with dragElastic. Apply gesture propagation through variants for cascading effects. Add drag="x" or drag="y" for directional constraints.

**Layout Animations**: Add layout prop for automatic FLIP animations when component position or size changes. Use layoutId for shared element transitions between components. Apply AnimateSharedLayout wrapper for coordinated layout changes across multiple elements. Perfect for sortable lists, expanding cards, and morphing interfaces.

**Performance & Best Practices**: Use transform properties (scale, rotate, x, y) over width/height for better performance. Implement useMotionValue for scroll-based animations without re-renders. Apply will-change CSS hints sparingly. Keep animations under 300ms for micro-interactions, longer for significant transitions. Use spring physics for natural motion, ease curves for intentional timing.

**Strategic Animation Usage**: Animate for purpose—guide attention, provide feedback, show relationships, express brand personality. Avoid gratuitous motion. Use entrance animations to reduce cognitive load, scroll-triggered reveals for storytelling, and hover effects to signal interactivity. Background animations add atmosphere, loading animations reduce perceived wait time.

Remember: Great animation is invisible—users feel guided and delighted without conscious awareness. Every motion should serve user experience, not just visual spectacle.
