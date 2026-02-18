import { useState, useRef, useCallback, useEffect } from 'react';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router';
import MarkdownViewer from '../components/MarkdownViewer';
import { Home, Layers, Cpu, Image, Swords, Menu, X, Eye, PenLine, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

// ─── Content ────────────────────────────────────────────────────────────────

const CONTENT: Record<string, string> = {
    '/': `# Markdown Arena

Markdown is a **plain-text markup language** created to make writing structured documents simple, readable, and portable.

Unlike visual editors or verbose markup languages, Markdown is designed so that the raw text itself remains meaningful. You can read a Markdown file without rendering it and still understand its structure, emphasis, and intent.

Markdown is not just a syntax.  
It is a **writing interface between humans and machines**.

---

## What Markdown Is

Markdown is a way to describe document structure using ordinary text characters.

It allows authors to express:
- hierarchy (headings),
- emphasis (bold, italic),
- grouping (lists),
- references (links),
- and meaning (code, quotes),

without relying on complex markup or visual tools.

A defining property of Markdown is **readability without rendering**.  
Even when viewed as plain text, Markdown documents remain understandable. This makes them ideal for environments where rendering is optional, delayed, or unavailable.

Markdown was designed for **humans first, machines second**.  
The syntax favors what is easy to read and write over what is perfectly precise.

---

## Why Markdown Exists

Before Markdown became popular, content creators faced two unsatisfying extremes.

The first was **raw HTML**.  
HTML is powerful and explicit, but it is verbose and noisy. Writing even simple documents in HTML requires constant attention to tags, nesting, and syntax correctness. This distracts from the act of writing itself.

The second was **WYSIWYG editors** (What You See Is What You Get).  
These tools hide structure behind buttons and formatting panels. While easy to start with, they often produce fragile documents that are hard to version, migrate, or reason about outside the editor that created them.

Markdown exists as a **middle layer**.

It separates:
- **content** (what you are saying)
- from **presentation** (how it will look)

This separation makes Markdown:
- portable across tools,
- friendly to version control,
- resilient over time.

Writers, developers, and tools converged on Markdown because it solves a shared problem:  
**how to write once and publish anywhere**.

---

## Markdown vs HTML vs WYSIWYG

Markdown, HTML, and WYSIWYG editors represent different levels of abstraction.

HTML gives you **full control**.  
You decide exactly how content is structured and rendered. The cost is verbosity and cognitive load.

WYSIWYG editors give you **immediate visual feedback**.  
The cost is hidden structure and poor portability.

Markdown sits between them.

It provides:
- enough structure to be meaningful,
- enough simplicity to stay readable,
- enough abstraction to remain flexible.

Markdown breaks down when:
- precise layout matters,
- complex interactions are required,
- visual design is the primary concern.

This is why Markdown often **embeds HTML instead of replacing it**.  
When Markdown reaches its limits, HTML acts as an escape hatch.

Markdown is intentionally incomplete.

---

## How Markdown Works (Conceptual)

Markdown does not render itself.  
It must be interpreted by a program.

Conceptually, the process looks like this:

Markdown text  
→ **Parser**  
→ **Abstract Syntax Tree (AST)**  
→ **Renderer**  
→ Output (HTML, PDF, etc.)

The parser reads Markdown and converts it into a structured representation of the document.  
The renderer then turns that structure into a final format.

Different parsers make different decisions.  
Some support tables, others do not.  
Some allow raw HTML, others sanitize it.

This is why the same Markdown can render differently across platforms.

Markdown is not a single, universal standard.  
It is a **family of interpretations**.

---

## Flavors and Dialects

Because Markdown has no single authoritative specification, multiple dialects exist.

**CommonMark**  
Attempts to define a strict, unambiguous core specification for Markdown.

**GitHub Flavored Markdown (GFM)**  
Adds practical extensions like tables, task lists, and strikethrough, optimized for collaboration and documentation.

**Platform-Specific Markdown**  
Tools like note-taking apps, documentation generators, and editors often introduce their own extensions and limitations.

Portability is hard because:
- not all features exist everywhere,
- rendering rules differ,
- extensions are not universal.

Writing portable Markdown means understanding what belongs to the core and what does not.

---

## Where Markdown Is Used

Markdown is used anywhere text needs to be:
- easy to write,
- easy to review,
- easy to move.

Common environments include:
- README files in code repositories
- technical documentation
- blogs and static websites
- personal notes and knowledge bases
- chat messages, comments, issues, and wikis

Markdown thrives in collaborative spaces because it is:
- diff-friendly,
- merge-friendly,
- tool-agnostic.

---

Markdown is often described as “simple,” but it is not trivial.

Its simplicity hides a set of trade-offs that reward understanding.  
This project exists to make those trade-offs visible.
`,

    '/core': `# Core Markdown

This page covers the **foundational Markdown syntax** that is widely supported, predictable, and safe to use across platforms.

Everything here forms the **spine of Markdown**.  
If you master this page, you can write Markdown almost anywhere with confidence.

This page works as:
- a guided tutorial when read top to bottom
- a practical reference when used selectively

---

## Text and Structure

### Paragraphs

Markdown treats text as paragraphs separated by **blank lines**.

\`\`\`
This is the first paragraph.

This is the second paragraph.
\`\`\`

A single line break does **not** usually create a new paragraph.  
Markdown favors readable text over strict layout control.

Paragraphs are the most basic building block of any Markdown document.

---

### Line Breaks (Soft vs Hard)

By default, Markdown uses **soft line breaks**.

\`\`\`
This line
continues on the same line when rendered.
\`\`\`

Some platforms support **hard line breaks**, where a line break is preserved.  
Because support varies, blank lines are the most reliable way to separate content.

---

### Headings

Headings define the **structure and hierarchy** of a document.

\`\`\`
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
\`\`\`

Key principles:
- Headings describe meaning, not appearance
- Use them in order
- Avoid skipping levels
- One top-level heading per document is a common convention

Headings are often used to generate navigation and tables of contents.

---

### Horizontal Rules

Horizontal rules visually separate major sections.

\`\`\`
---
\`\`\`

They should be used sparingly to divide **ideas**, not individual paragraphs.

---

## Emphasis

Emphasis communicates importance and nuance in text.

### Bold

\`\`\`
**Bold text**
\`\`\`

Bold is commonly used for:
- strong emphasis
- key terms
- labels inside paragraphs

---

### Italic

\`\`\`
*Italic text*
\`\`\`

Italic is typically used for:
- subtle emphasis
- titles
- tone or voice

---

### Bold and Italic

\`\`\`
***Bold and italic text***
\`\`\`

Combining both increases emphasis but should be used carefully.

---

### Strikethrough

\`\`\`
~~Strikethrough text~~
\`\`\`

Strikethrough is not part of the original Markdown specification, but it is widely supported.  
It is often used to indicate removal, correction, or change of intent.

---

## Lists

Lists group related items and express sequence or hierarchy.

### Unordered Lists

\`\`\`
- Item one
- Item two
- Item three
\`\`\`

Unordered lists describe collections where order does not matter.

---

### Ordered Lists

\`\`\`
1. First item
2. Second item
3. Third item
\`\`\`

The numbers define order, but most Markdown renderers automatically renumber items.  
The actual numbers you type are less important than their sequence.

---

### Nested Lists

\`\`\`
- Parent item
  - Child item
  - Another child
\`\`\`

Nesting is controlled by **indentation**, not symbols.  
Consistent spacing is critical for correct rendering.

---

### List Edge Cases

Lists can break unexpectedly when:
- indentation is inconsistent
- blank lines are missing or misplaced
- other elements interrupt list flow

Keeping list items simple improves portability.

---

## Code

Markdown treats code as a first-class citizen.

### Inline Code

\`\`\`
Use \`npm install\` to install dependencies.
\`\`\`

Inline code is used for:
- commands
- filenames
- keywords
- short snippets

---

### Fenced Code Blocks

\`\`\`
This is a code block.
\`\`\`

Code blocks preserve whitespace and formatting.

---

### Language Identifiers

\`\`\`
\`\`\`js
console.log("Hello, world");
\`\`\`
\`\`\`

Language identifiers enable syntax highlighting when supported.  
They do not affect the meaning of the code itself.

---

### Syntax Highlighting (Conceptual)

Syntax highlighting is not part of Markdown itself.  
It is applied by the renderer, based on the language identifier.

Different platforms highlight differently, even for the same language.

---

## Links

Links connect documents and ideas.

### Inline Links

\`\`\`
[Link text](https://example.com)
\`\`\`

Inline links are the most common and readable form.

---

### Reference-Style Links

\`\`\`
[Link text][ref]

[ref]: https://example.com
\`\`\`

Reference-style links improve readability in long documents.

---

### Auto-Links

\`\`\`
https://example.com
\`\`\`

Some platforms automatically convert URLs into links.  
Support varies by renderer.

---

### Link Pitfalls

Links can fail due to:
- missing protocols
- unsupported schemes
- platform restrictions

Always test important links in their target environment.

---

## Images

Images use syntax similar to links.

### Basic Image Syntax

\`\`\`
![Alt text](image.png)
\`\`\`

Images embed visual content into documents.

---

### Alt Text Importance

Alt text is essential for:
- accessibility
- screen readers
- broken images
- search engines

Alt text should describe the **meaning** of the image, not its appearance.

---

### Images vs Links

Images display content.  
Links reference content.

Markdown treats images as **content**, not decoration.

---

## Blockquotes

Blockquotes represent quoted or referenced content.

### Quotes

\`\`\`
> This is a quote.
\`\`\`

Blockquotes are commonly used for:
- citations
- excerpts
- referenced material

---

### Nested Quotes

\`\`\`
> Outer quote
> > Inner quote
\`\`\`

Nested blockquotes represent quoted material within quoted material.

---

### Quotes vs Callouts

Blockquotes indicate **quotation**, not emphasis or warnings.  
Using them purely for styling can reduce clarity and portability.

---

## Core Markdown Summary

Everything on this page is:
- widely supported
- stable over time
- safe across platforms

This is the foundation on which all advanced Markdown features are built.
`,

    '/advanced': `# Advanced Markdown

This page explores **extended and advanced Markdown features** that go beyond the core syntax.
These features are powerful, widely used, but **not universally supported**.

Advanced Markdown is about understanding:
- where Markdown ends,
- where extensions begin,
- and how Markdown cooperates with other systems.

---

## Extended Syntax vs Core Syntax

Core Markdown focuses on structure and readability.
Advanced Markdown focuses on **capability and expressiveness**.

Extended features usually depend on:
- the Markdown flavor,
- the parser,
- or the platform rendering the content.

Understanding this distinction prevents portability issues.

---

## Tables

Tables allow Markdown documents to represent structured data.

---
| Name | Score | Status |
| :--- | ---: | :---: |
| Alice | 92 | ✅ |
| Bob | 78 | ❌ |
---

Key points:
- Tables are not part of original Markdown
- Alignment is controlled with colons
- Tables are difficult to edit and diff
- Despite limitations, they are widely supported

Use tables for **data**, not layout.

---

## Task Lists (Checkboxes)

Task lists represent actionable items.

---
- [x] Write content
- [ ] Review content
- [ ] Publish
---

Important considerations:
- Interactivity is platform-dependent
- Some platforms allow clicking checkboxes
- Others render them as static symbols

Task lists are semantic indicators, not logic.

---

## Footnotes

Footnotes allow references without interrupting reading flow.

---
This sentence needs context.[^1]

[^1]: This is the footnote text.
---

Footnotes are useful for:
- academic writing
- documentation
- long explanations

Support varies between Markdown flavors.

---

## Definition Lists

Some Markdown implementations support definition lists.

---
Term
: Definition of the term
---

These are useful for glossaries but are not universally supported.

---

## HTML in Markdown

Markdown allows raw HTML when syntax is insufficient.

---
<details>
  <summary>More details</summary>
  Hidden content here
</details>
---

HTML is:
- powerful
- flexible
- potentially unsafe

Many platforms sanitize or restrict HTML for security reasons.

---

## Comments

Comments allow hidden notes in Markdown.

---
Visible text
<!-- This comment will not render -->
More visible text
---

Comments are useful for:
- internal notes
- explanations for editors
- temporarily hiding content

---

## Media in Markdown

Markdown itself cannot embed rich media.
Instead, it **references** or **wraps** media handled by the renderer.

---

### Images (Advanced Usage)

---
![Alt text](image.png)
---

Advanced considerations:
- Responsive behavior varies
- Theme-based images may be supported
- Alt text is critical for accessibility

Markdown treats images as content, not decoration.

---

### Linked Images

---
[![Alt text](image.png)](https://example.com)
---

Linked images act as visual hyperlinks.

---

### Video Content

Markdown cannot embed video directly.

Common workaround:
- Use an image thumbnail linked to the video
- Let the platform handle embedding

True embedding is platform-specific.

---

### Audio Content

Audio embedding requires HTML.

---
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>
---

Markdown acts as a container, not a media player.

---

## Simple Mathematics Example

Mathematics in Markdown is written inline with text or displayed as a block for clarity.

### Inline Equation

This is a simple inline equation showing addition:

When $a + b = c$, the value of $c$ is the sum of $a$ and $b$.

---

### Block Equation

For better readability, the same equation can be written as a block:

$$
a + b = c
$$

---

This example demonstrates the most basic mathematical expression and is useful for testing whether math rendering is working correctly.

---

## Admonitions and Callouts

Some platforms support special callout syntax.

---
> **Note:** This is important.
---

These are stylistic conventions, not Markdown features.

---

## Escaping Characters

Special characters can be escaped.

---
\*literal asterisk\*
---

Escaping ensures characters render as text, not syntax.

---

## Markdown Flavors and Extensions

Different platforms extend Markdown differently.

Common examples:
- GitHub Flavored Markdown
- Documentation tool extensions
- Note-taking app syntax

Extensions improve usability but reduce portability.

---

## Markdown as a Transformation Language

Markdown is often used as an **intermediate format**.

Typical pipelines:
- Markdown → HTML
- Markdown → PDF
- Markdown → Static Site

Markdown excels at describing **structure**, not presentation.

---

## Security Considerations

Markdown rendering can introduce risks:
- XSS via raw HTML
- Embedded scripts
- Unsafe links

Most platforms sanitize content automatically.

---

## Advanced Markdown Summary

Advanced Markdown expands capability at the cost of predictability.

To use it effectively:
- know what belongs to core Markdown
- understand platform limitations
- test where content will be rendered

Markdown remains powerful because it stays simple at its core.

`,

    '/visuals': `# Visuals & Diagrams in Markdown

Markdown is primarily a text-based language, but it is also widely used to **describe visuals, diagrams, and structured relationships**.
Instead of drawing pixels directly, Markdown focuses on **describing intent and structure**, which tools then render visually.

This page explores how visuals work in Markdown, where they shine, and where their limits are.

---

## Visual Thinking in Markdown

Markdown does not aim to replace design tools or graphic editors.
Its strength lies in **expressing relationships and structure** in a way that is:
- readable as text,
- easy to review,
- friendly to version control.

Visuals in Markdown are usually:
- generated from text descriptions, or
- embedded as external resources.

This makes Markdown especially powerful for technical documentation.

---

## Images in Markdown

Images are the most basic visual element supported by Markdown.

---
![Alt text](image.png)
---

Images allow you to:
- illustrate concepts,
- show screenshots,
- include diagrams created elsewhere.

Markdown does not control image size, alignment, or layout.
Those details are handled by the renderer or by embedded HTML.

---

## Accessibility and Images

Alt text is not optional decoration.
It is essential for:
- screen readers,
- accessibility compliance,
- understanding when images fail to load.

Good alt text explains the **purpose** of the image, not just what it looks like.

---

## Diagrams as Text

One of Markdown’s most powerful ideas is that **diagrams can be written as text**.

Text-based diagrams are:
- diff-friendly,
- reviewable in pull requests,
- easy to update,
- portable across systems.

This approach trades visual precision for clarity and maintainability.

---

## Mermaid Diagrams

Mermaid is a popular diagramming language designed to work inside Markdown.

\`\`\`mermaid
graph TD
  A[Idea] --> B[Markdown]
  B --> C[Parser]
  C --> D[Rendered Output]
\`\`\`

Mermaid diagrams are written as plain text and rendered by supporting platforms.

---

## Mermaid Flow Directions

Mermaid supports multiple layout directions.

\`\`\`mermaid
graph LR
  A --> B --> C
\`\`\`

Available directions:
- TD (Top to Bottom)
- LR (Left to Right)
- BT (Bottom to Top)
- RL (Right to Left)

Direction affects readability and should be chosen based on content flow.

---

## Common Mermaid Diagram Types

Mermaid supports several diagram categories, including:
- flowcharts
- sequence diagrams
- state diagrams
- class diagrams
- Gantt charts

Not all platforms support every type equally.

---

## When Mermaid Works Well

Mermaid is well suited for:
- process flows,
- system overviews,
- decision trees,
- documentation diagrams.

It works best when diagrams focus on **relationships**, not design.

---

## Limitations of Mermaid

Mermaid is not ideal for:
- precise visual layouts,
- complex artistic diagrams,
- pixel-perfect control.

Rendering may vary between platforms and versions.

---

## ASCII Diagrams

Simple diagrams can be represented using plain text.

\`\`\`
A --> B --> C
\`\`\`

ASCII diagrams are:
- universally supported,
- extremely portable,
- limited in expressiveness.

They are useful for quick explanations.

---

## Embedded SVG and Images

For complex visuals, authors often embed:
- SVG images,
- PNG or JPEG diagrams,
- externally generated charts.

Markdown acts as a container, not a drawing tool.

---

## Charts and Graphs

Markdown itself does not define chart syntax.
Charts are typically handled by:
- embedded images,
- JavaScript-based renderers,
- platform-specific extensions.

This reinforces Markdown’s role as a **descriptive layer**, not a visualization engine.

---

## Visual Portability Concerns

Visual content can break due to:
- unsupported renderers,
- missing extensions,
- security restrictions.

When portability matters, prefer:
- images for guaranteed rendering,
- text diagrams for long-term maintainability.

---

## Visuals and Version Control

One major advantage of text-based visuals is compatibility with version control.

Benefits include:
- readable diffs,
- meaningful change history,
- easier collaboration.

Binary images do not offer these benefits.

---

## Choosing the Right Visual Approach

Use:
- **text diagrams** for structure and relationships,
- **images** for visual detail,
- **SVG** when scalability matters.

Markdown excels when visuals support understanding, not decoration.

---

## Visuals & Diagrams Summary

Markdown does not draw.
It **describes**.

By focusing on structure and relationships, Markdown allows visuals to remain:
- understandable,
- maintainable,
- and collaborative.

This makes it uniquely suited for technical and educational documentation.

## Flowchart

\`\`\`mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -- Yes --> C[Deploy]
    B -- No --> D[Debug]
\`\`\`

## Sequence

\`\`\`mermaid
sequenceDiagram
    User->>Browser: Load Page
    Browser->>API: Fetch Data
    API-->>Browser: JSON
    Browser-->>User: Render View
\`\`\`

## State Diagram

\`\`\`mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Processing : Event
    Processing --> Idle : Done
\`\`\`

## Gantt

\`\`\`mermaid
gantt
    title Project Plan
    section Phase 1
    Discovery :done, 2024-01-01, 7d
    Design    :active, 5d
\`\`\`
`,

    '/arena': `# The Arena

**Experimentation Lab.**
Type on the left, see results on the right.

### Try a Topic:

*   [Headings](/arena?topic=headings)
*   [Lists](/arena?topic=lists)
*   [Code Blocks](/arena?topic=code)
*   [Tables](/arena?topic=tables)
*   [Mermaid Diagrams](/arena?topic=mermaid)

Or just start typing below!
`
};

// ─── Starter Topics for Arena ───────────────────────────────────────────────

const TOPICS: Record<string, string> = {
    'headings': `# Headings Practice

# H1
## H2
### H3
#### H4
##### H5
###### H6

Try changing the hashes!
`,
    'lists': `# Lists Practice

- Item 1
- Item 2
  - Sub-item A
  - Sub-item B

1. Ordered 1
2. Ordered 2
   1. Nested ordered

- [ ] Task to do
- [x] Task done
`,
    'code': `# Code Practice

Inline: \`const x = 10;\`

Block:

\`\`\`javascript
function add(a, b) {
  return a + b;
}
console.log(add(2, 3));
\`\`\`
`,
    'tables': `# Tables Practice

| Feature | Supported | Notes |
| :--- | :---: | ---: |
| Tables | Yes | Pipes |
| Alignment | Yes | Colons |

Try adding a row!
`,
    'mermaid': `# Mermaid Practice

\`\`\`mermaid
graph LR
    A[Start] --> B(Round Edge)
    B --> C{Decision}
    C -->|One| D[Result 1]
    C -->|Two| E[Result 2]
\`\`\`
`
};

// ─── Nav ────────────────────────────────────────────────────────────────────

const NAV = [
    { to: '/', label: '1. Introduction', icon: Home },
    { to: '/core', label: '2. Core Markdown', icon: Layers },
    { to: '/advanced', label: '3. Advanced', icon: Cpu },
    { to: '/visuals', label: '4. Visuals', icon: Image },
    { to: '/arena', label: '5. The Arena', icon: Swords },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function Arena() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Determine content based on route + topic query param
    const getInitialContent = () => {
        const topic = searchParams.get('topic');
        if (location.pathname === '/arena' && topic && TOPICS[topic]) {
            return TOPICS[topic];
        }
        return CONTENT[location.pathname] ?? CONTENT['/arena'];
    };

    const [content, setContent] = useState(getInitialContent);
    const leftRef = useRef<HTMLTextAreaElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const syncing = useRef(false);

    // Layout state
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

    const currentIndex = NAV.findIndex(n => n.to === location.pathname);
    const prevPage = NAV[currentIndex - 1];
    const nextPage = NAV[currentIndex + 1];

    // Effect: Handle navigation or topic change
    useEffect(() => {
        const topic = searchParams.get('topic');
        if (location.pathname === '/arena' && topic && TOPICS[topic]) {
            setContent(TOPICS[topic]);
        } else {
            setContent(CONTENT[location.pathname] ?? CONTENT['/arena']);
        }
        setMobileMenuOpen(false);
    }, [location.pathname, searchParams]); // React to topic changes too

    const onLeftScroll = useCallback(() => {
        if (syncing.current) return;
        syncing.current = true;
        const l = leftRef.current, r = rightRef.current;
        if (l && r) {
            const ratio = l.scrollTop / (l.scrollHeight - l.clientHeight || 1);
            r.scrollTop = ratio * (r.scrollHeight - r.clientHeight);
        }
        syncing.current = false;
    }, []);

    const onRightScroll = useCallback(() => {
        if (syncing.current) return;
        syncing.current = true;
        const l = leftRef.current, r = rightRef.current;
        if (l && r) {
            const ratio = r.scrollTop / (r.scrollHeight - r.clientHeight || 1);
            l.scrollTop = ratio * (l.scrollHeight - l.clientHeight);
        }
        syncing.current = false;
    }, []);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-white overflow-hidden relative">
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 z-20 flex-shrink-0">
                <button onClick={() => setMobileMenuOpen(true)} className="p-1 text-slate-600">
                    <Menu size={20} />
                </button>
                <span className="font-bold text-slate-900 flex items-center gap-1">
                    <span className="text-indigo-600">MD</span> Arena
                </span>
                <div className="w-8" />
            </header>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                "fixed inset-y-0 left-0 bg-slate-50 border-r border-slate-200 flex flex-col z-40 transition-all duration-300",
                "md:relative", // Relative on desktop
                mobileMenuOpen ? "translate-x-0 w-64 shadow-xl" : "-translate-x-full md:translate-x-0",
                !mobileMenuOpen && (sidebarOpen ? "md:w-56" : "md:w-0 md:border-none md:overflow-hidden")
            )}>
                <div className="px-4 py-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
                    <span className="text-base font-bold text-slate-900 flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
                        <span className="text-indigo-600">MD</span> Arena
                    </span>
                    <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-500">
                        <X size={20} />
                    </button>
                </div>
                <nav className="flex-1 py-2 overflow-y-auto whitespace-nowrap overflow-hidden">
                    {NAV.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) =>
                                `flex items-center gap-2.5 px-3 py-1.5 mx-2 my-0.5 rounded text-sm transition-colors ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`
                            }
                        >
                            <Icon size={15} className="flex-shrink-0" />
                            {label}
                        </NavLink>
                    ))}
                </nav>
                <div className="px-4 py-3 border-t border-slate-200 text-xs text-slate-400 whitespace-nowrap overflow-hidden flex-shrink-0">
                    Markdown Arena v1.2.0
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full relative">

                {/* Desktop Header */}
                <div className="hidden md:flex items-center justify-between px-4 py-2 border-b border-slate-200 bg-white flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                            title="Toggle Sidebar"
                        >
                            <Menu size={18} />
                        </button>
                        <span className="text-sm font-medium text-slate-500">
                            {NAV[currentIndex]?.label || 'Arena'}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => prevPage && navigate(prevPage.to)}
                            disabled={!prevPage}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
                            title={prevPage ? `Previous: ${prevPage.label}` : 'No previous page'}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={() => nextPage && navigate(nextPage.to)}
                            disabled={!nextPage}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500 transition-colors"
                            title={nextPage ? `Next: ${nextPage.label}` : 'No next page'}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Mobile Tab Switcher */}
                <div className="md:hidden flex border-b border-slate-200 bg-slate-50 flex-shrink-0">
                    <button
                        onClick={() => setActiveTab('editor')}
                        className={clsx(
                            "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2",
                            activeTab === 'editor'
                                ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                                : "text-slate-500 hover:text-slate-700"
                        )}
                    >
                        <PenLine size={16} /> Editor
                    </button>
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={clsx(
                            "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2",
                            activeTab === 'preview'
                                ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                                : "text-slate-500 hover:text-slate-700"
                        )}
                    >
                        <Eye size={16} /> Preview
                    </button>
                </div>

                {/* Content Panes */}
                <div className="flex-1 flex md:flex-row flex-col min-h-0 overflow-hidden relative">

                    {/* Editor Pane */}
                    <div className={clsx(
                        "flex-1 flex flex-col border-r border-slate-200 min-w-0 bg-white transition-all duration-200 absolute inset-0 md:static",
                        activeTab === 'editor' ? "z-10 opacity-100" : "z-0 opacity-0 md:opacity-100 md:z-auto pointer-events-none md:pointer-events-auto"
                    )}>
                        <div className="hidden md:flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200 flex-shrink-0">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Raw Markdown</span>
                            <div className="flex items-center gap-2">
                                {location.pathname === '/arena' && (
                                    <button
                                        onClick={() => {
                                            setSearchParams({});
                                            setContent(CONTENT['/arena']); // Reset to default arena welcome
                                        }}
                                        className="text-xs text-slate-400 hover:text-slate-600 transition-colors mr-2"
                                    >
                                        Clear Topic
                                    </button>
                                )}
                                <button
                                    onClick={() => setContent(CONTENT[location.pathname] ?? CONTENT['/arena'])}
                                    className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                        <textarea
                            ref={leftRef}
                            className="flex-1 w-full p-4 font-mono text-sm bg-white text-slate-800 resize-none focus:outline-none leading-relaxed"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onScroll={onLeftScroll}
                            spellCheck={false}
                            placeholder="Type Markdown here..."
                        />
                    </div>

                    {/* Preview Pane */}
                    <div className={clsx(
                        "flex-1 flex flex-col min-w-0 bg-white transition-all duration-200 absolute inset-0 md:static",
                        activeTab === 'preview' ? "z-10 opacity-100" : "z-0 opacity-0 md:opacity-100 md:z-auto pointer-events-none md:pointer-events-auto"
                    )}>
                        <div className="hidden md:flex px-4 py-2 bg-slate-50 border-b border-slate-200 flex-shrink-0">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Live Preview</span>
                        </div>
                        <div
                            ref={rightRef}
                            className="flex-1 overflow-auto p-4 md:p-6"
                            onScroll={onRightScroll}
                        >
                            <MarkdownViewer content={content} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
