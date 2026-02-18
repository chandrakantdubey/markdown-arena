## Page 1 — Intro (Home + Foundations)

This page answers **“What is Markdown and why does it exist?”**
No syntax overload yet. This is about orientation and mental models.

### Content Scope

**1. What Markdown Is**

* Plain-text markup language
* Readable without rendering
* Designed for humans first, machines second
* Markdown as *a writing interface*, not just syntax

**2. Why Markdown Exists**

* Pain points of raw HTML
* Separation of content from presentation
* Markdown as a portability layer
* Why developers, writers, and tools converged on it

**3. Markdown vs HTML vs WYSIWYG**

* Abstraction trade-offs
* Control vs simplicity
* When Markdown breaks down
* Why Markdown often embeds HTML instead of replacing it

**4. How Markdown Works (Conceptual)**

* Markdown → Parser → AST → Renderer
* Why different parsers produce different results
* Why “Markdown is not a standard”

**5. Flavors and Dialects (High-Level)**

* CommonMark
* GitHub Flavored Markdown
* Platform-specific Markdown
* Why portability is hard

**6. Where Markdown Is Used**

* README files
* Documentation
* Blogs and static sites
* Notes and knowledge bases
* Chat, comments, issues, wikis

This page sets expectations: Markdown is simple, but not trivial.

---

## Page 2 — Core Markdown (Tutorial + Reference)

This page is **the spine of the project**.
Everything here should be widely supported and predictable.

### Core Syntax (Tutorial Flow)

**Text and Structure**

* Paragraphs
* Line breaks (soft vs hard)
* Headings (H1–H6)
* Horizontal rules

**Emphasis**

* Bold
* Italic
* Bold + Italic
* Strikethrough (not core, but common)

**Lists**

* Unordered lists
* Ordered lists
* Nested lists
* List edge cases

**Code**

* Inline code
* Fenced code blocks
* Language identifiers
* Syntax highlighting (conceptual)

**Links**

* Inline links
* Reference-style links
* Auto-links
* Link pitfalls

**Images**

* Basic image syntax
* Alt text importance
* Images vs links

**Blockquotes**

* Quotes
* Nested quotes
* Quotes vs callouts

---

### Core Reference Layer (Same Page)

For each syntax:

* Minimal syntax
* Rendered output
* Common mistakes
* Compatibility note

This page must work as:

* a guided tutorial
* a fast cheatsheet
* a reliable reference

---

## Page 3 — Advanced Markdown (Extended + Media)

This page answers **“How far can Markdown go?”**

### Extended Syntax

**Tables**

* Basic tables
* Alignment
* Readability vs maintainability
* Why tables are controversial in Markdown

**Task Lists**

* Checkboxes
* Interactive vs static behavior
* Platform support differences

**Footnotes**

* Inline references
* Multi-paragraph footnotes
* When footnotes are appropriate

**HTML in Markdown**

* Why raw HTML exists
* What is usually allowed
* What is usually blocked
* Security implications

**Comments**

* HTML comments
* Hidden content
* Tooling behavior

---

### Media and Rich Content

**Images (Advanced)**

* Linked images
* Theme-based images
* Image sizing hacks
* Accessibility concerns

**Video**

* YouTube embeds via images
* Markdown limitations
* Platform-specific embedding rules

**Audio / Music**

* Audio embeds via HTML
* Markdown as a wrapper, not a player

**Math**

* Inline math
* Block math
* LaTeX-based systems
* Renderer dependency

**Dropdowns / Disclosure**

* `<details>` and `<summary>`
* Content hiding patterns
* Documentation UX use cases

This page makes it clear: Markdown becomes powerful by **cooperating with other systems**, not by replacing them.

---

## Page 4 — Visuals & Diagrams

This page is about **thinking visually with Markdown**.

### Diagram Systems

**Mermaid**

* Flowcharts
* Direction variants (TD, LR, BT, RL)
* Sequence diagrams
* State diagrams
* Gantt charts
* When Mermaid works well
* When it fails

**Other Diagram Approaches**

* ASCII diagrams
* Embedded SVG
* Image-based diagrams
* Trade-offs

---

### Visual Thinking in Markdown

* Markdown as a diagram container
* Diagrams vs images vs charts
* Version control benefits
* Diff-friendly visuals

This page reframes Markdown as a **visual coordination language**, not just text formatting.

---

## Page 5 — Arena (Practice & Experimentation)

This is the **interactive brain** of the project.

### Conceptual Purpose

The Arena answers:

* “What happens if I type this?”
* “Why does this render differently?”
* “What syntax belongs to what category?”

### Core Behavior

* User types Markdown on the left
* Output renders on the right
* Live feedback loop

### Topic-Driven Practice

* List of **all topics across all pages**
* Clicking a topic:

  * Inserts starter syntax
  * Explains expectations
* User modifies freely

### Learning Enhancements

* Syntax hints
* Flavor awareness
* Visual vs textual feedback
* Safe sandbox for breaking things

This page turns Markdown from **static knowledge into muscle memory**.

---

## Final Compression Summary

You now have:

1. **Intro** — Why Markdown exists and how it works
2. **Core** — Stable, universal Markdown mastery
3. **Advanced** — Power features, media, and real-world usage
4. **Visuals** — Diagrams and visual reasoning
5. **Arena** — Practice, experimentation, and synthesis
