---
name: mdx-markdown
description: Expert in MDX and Markdown for content-rich applications. Use this skill when building blogs, documentation, or content management. Integrates MDX seamlessly with Next.js for dynamic, component-rich content.
license: MIT
---

This skill guides the implementation of MDX/Markdown content systems with proper parsing, syntax highlighting, and component integration.

## Core Principles

**MDX Setup**: Use next-mdx-remote or contentlayer for Next.js integration. Configure MDX to support JSX components within markdown. Set up proper TypeScript types for MDX files. Structure content in organized directories with frontmatter metadata.

**Content Architecture**: Store MDX files in content directory with clear naming (blog/slug.mdx, projects/name.mdx). Define frontmatter schema with required fields (title, description, date, tags). Use gray-matter or frontmatter parsers for metadata extraction. Implement content collections for type safety.

**Component Integration**: Create custom MDX components for enhanced content (Callout, CodeBlock, ImageGrid). Override default markdown elements (h1, p, code, pre) with styled versions. Pass components through MDXProvider or components prop. Build reusable content blocks that authors can use.

**Syntax Highlighting**: Use rehype-prism-plus or rehype-highlight for code blocks. Support multiple languages and themes. Add line numbers and copy buttons. Implement language labels. Style code blocks consistently with design system.

**Rich Features**: Implement table of contents generation from headings. Add reading time estimation. Support embedded videos and interactive demos. Enable math rendering with remark-math and rehype-katex. Create custom remark/rehype plugins for special syntax.

**Performance**: Generate static pages at build time for blogs. Use ISR for frequently updated content. Implement proper caching strategies. Lazy load heavy components embedded in MDX.

Remember: MDX combines markdown simplicity with React power—perfect for content that needs both readability and interactivity.
