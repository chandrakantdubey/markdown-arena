---
id: advanced-topics
title: Advanced Topics
level: Advanced
---

# Advanced Topics

## Markdown Flavors
Since the original Markdown script was ambiguous in some edge cases, distinct "flavors" emerged.

- **CommonMark**: A strictly specified standard to resolve ambiguities.
- **GitHub Flavored Markdown (GFM)**: A superset of CommonMark used by GitHub. Adds tables, strikethrough, auto-links, and task lists.
- **MultiMarkdown**: Adds metadata, equations, tables, and more.
- **Pandoc**: A universal syntax widely used in academia.

## Front Matter
Often used in static site generators (Jekyll, Hugo). It's a block of YAML at the top of the file.

```markdown
---
title: "My Post"
date: 2023-01-01
---
```

## The AST (Abstract Syntax Tree)
Developers using Markdown often interact with the AST. Libraries like `remark` or `unified` parse Markdown into a tree of nodes (Paragraph, Heading, Text, etc.) which can be programmatically transformed before rendering.

## Security (XSS)
Markdown allows raw HTML. If you render user-generated Markdown, you are vulnerable to Cross-Site Scripting (XSS).
**Always sanitize** the output HTML (using libraries like `rehype-sanitize`) to strip malicious scripts.

## Processing Pipelines
A typical modern pipeline:
1. **Parse**: Markdown Text -> AST (Remark)
2. **Transform**: AST Manipulation (Linting, TOC generation)
3. **Convert**: Markdown AST -> HTML AST (Rehype)
4. **Stringify**: HTML AST -> HTML String
