---
id: introduction
title: Introduction
level: Beginner
---

# Introduction to Markdown

## What is Markdown?
Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats using a tool by the same name. It is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## History & Design Philosophy
Markdown was created by John Gruber in 2004, with significant contributions from Aaron Swartz. The goal was to enable people "to write using an easy-to-read, easy-to-write plain text format, and optionally convert it to structurally valid XHTML (or HTML)."

Key design goals:
- **Readability**: A Markdown-formatted document should be publishable as-is, as plain text, without looking like it's been marked up with tags or formatting instructions.
- **Portability**: Plain text can be opened on any device, in any editor, and will survive decades of software changes.

## Markdown vs. HTML
HTML (HyperText Markup Language) is a publishing format; Markdown is a writing format. Markdown’s formatting syntax only addresses issues that can be conveyed in plain text.

**Markdown:**
```markdown
**Bold Text**
```

**HTML:**
```html
<strong>Bold Text</strong>
```

## Common Misconceptions
- **"Markdown is just for programmers"**: No, it's used by writers, scientists, and educators everywhere.
- **"It's a standard"**: Not originally. There are many "flavors" (GitHub Flavored Markdown, CommonMark, MultiMarkdown) that add different features. We will cover these later.

## How it Works
Conceptually, a "parser" reads your text line by line.
1. It looks for patterns (like `#` for headings or `*` for lists).
2. It converts those patterns into an Abstract Syntax Tree (AST).
3. It renders that AST into HTML (or PDF, etc.).
