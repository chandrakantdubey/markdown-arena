---
id: basic-syntax
title: Basic Syntax
level: Beginner
---

# Basic Syntax

This section covers the core syntax that works across almost all Markdown applications (standard implementations).

## Headings
Use `#` for headings. The number of hash signs corresponds to the heading level (h1 through h6).

```markdown
# Heading 1
## Heading 2
### Heading 3
```

## Paragraphs
To create a paragraph, just type text. **Important**: You must leave a blank line between paragraphs.

```markdown
This is paragraph one.

This is paragraph two.
```

## Line Breaks
To force a line break line (<br>) without starting a new paragraph, end a line with two or more spaces, or a backslash `\`, and then hit enter.

```markdown
This is the first line.  
And this is the second line.
```

## Emphasis
- **Bold**: Wrap text in `**` or `__`.
- *Italic*: Wrap text in `*` or `_`.
- ***Bold & Italic***: Wrap text in `***` or `___`.

```markdown
**Bold** and *Italic*
```

## Blockquotes
Use `>` to create blockquotes. You can nest them.

```markdown
> This is a quote.
>> This is a nested quote.
```

## Lists

### Unordered
Use `-`, `+`, or `*`.

```markdown
- Item 1
- Item 2
  - Sub-item
```

### Ordered
Use numbers followed by a period. The actual numbers don't have to be sequential!

```markdown
1. First item
1. Second item
1. Third item
```

## Code
Wrap inline code in single backticks: ` ` `.

```markdown
Use `git status` to check your repo.
```

## Links
`[Link Text](URL)`

```markdown
[Google](https://google.com)
```

## Images
`![Alt Text](URL)`

```markdown
![Logo](/1.jpeg)
```

## Horizontal Rules
Three or more dashes, asterisks, or underscores.

```markdown
---
***
___
```
