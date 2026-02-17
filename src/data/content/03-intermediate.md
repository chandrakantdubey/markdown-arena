---
id: intermediate-syntax
title: Intermediate Syntax
level: Intermediate
---

# Intermediate Syntax

These features are widely supported but aren't part of the original Markdown spec. Most are from GitHub Flavored Markdown (GFM).

## Tables
Create tables using pipes `|` and hyphens `-`. Colons `:` used for alignment.

```markdown
| Left | Center | Right |
| :--- | :----: | ----: |
| Cell | Cell   | Cell  |
```

## Task Lists
Great for todo lists.

```markdown
- [x] Completed task
- [ ] Incomplete task
  - [ ] Nested task
```

## Strikethrough
Use double tildes `~~`.

```markdown
~~Mistake~~
```

## Footnotes
Supported in some parsers (like GFM + Extensions).

```markdown
Here is a note[^1].

[^1]: This is the footnote text.
```

## Definition Lists
A term followed by a colon and definition.

```markdown
Term
: Definition
```

## Automatic Layouts (URL)
Most parsers automatically link URLs.

```markdown
https://www.example.com
```
