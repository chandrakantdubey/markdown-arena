import { useState, useRef, useCallback, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import MarkdownViewer from '../components/MarkdownViewer';
import { Home, BookOpen, Layers, Maximize, Cpu, Image, Book, Swords, GraduationCap, Menu, X, Eye, PenLine, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

// ─── Content ────────────────────────────────────────────────────────────────

const CONTENT: Record<string, string> = {
    '/': `# Markdown Arena

A live environment for learning, writing, and testing Markdown.

## What is Markdown?

Markdown is a lightweight markup language that converts plain text to formatted HTML. It's used everywhere — GitHub, documentation sites, note-taking apps, blogs.

## How to use this app

- **Left pane** — edit raw Markdown source
- **Right pane** — see the live rendered preview
- **Sidebar** — navigate between topics

## Quick example

**Bold**, *italic*, ~~strikethrough~~, \`inline code\`

- Unordered list
  - Nested item

1. Ordered list
2. Auto-numbered

> Blockquote for emphasis

\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet("World"));
\`\`\`

| Page | What you'll learn |
| :--- | :--- |
| Tutorial | Step-by-step lessons for beginners |
| Foundations | History, philosophy, parsers |
| Core Markdown | Headings, lists, links, code |
| Extended | Tables, task lists, strikethrough |
| Advanced | Nesting, escaping, HTML, security |
| Visuals | Mermaid diagrams |
| Reference | Quick cheat sheet |
| The Arena | Free-form playground |
`,

    '/tutorial': `# Markdown Tutorial

Welcome to the interactive Markdown tutorial. Each section covers a key concept.

---

## Lesson 1: Headings

Use \`#\` symbols. One \`#\` = H1, two \`##\` = H2, up to six levels.

# Heading 1
## Heading 2
### Heading 3
#### Heading 4

---

## Lesson 2: Emphasis

**Bold** — double asterisks or double underscores
*Italic* — single asterisk or underscore
***Bold and italic*** — triple asterisks
~~Strikethrough~~ — double tildes

---

## Lesson 3: Lists

Unordered:

- Apples
- Bananas
  - Bing cherries
  - Rainier cherries
- Dates

Ordered:

1. Boil water
2. Add pasta
3. Cook for 8 minutes

---

## Lesson 4: Links and Images

[Visit Google](https://google.com)

![Sample](https://placehold.co/400x120/4f46e5/white?text=Markdown+Image)

---

## Lesson 5: Code

Inline: \`console.log("hello")\`

Block:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

---

## Lesson 6: Tables

| Name | Role | Level |
| :--- | :---: | ---: |
| Alice | Engineer | Senior |
| Bob | Designer | Mid |

---

## Lesson 7: Task Lists

- [x] Learn headings
- [x] Learn emphasis
- [x] Learn lists
- [ ] Learn tables
- [ ] Learn Mermaid

---

## 🎉 Done!

Head to **The Arena** to practice freely.
`,

    '/foundations': `# Foundations of Markdown

Markdown is a **lightweight markup language** created by John Gruber and Aaron Swartz in 2004.

## What Problem Does It Solve?

Before Markdown, writing formatted content meant raw HTML:

\`\`\`html
<h1>My Article</h1>
<p>This is a <strong>paragraph</strong> with <em>emphasis</em>.</p>
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>
\`\`\`

Markdown lets you write the same thing as:

\`\`\`markdown
# My Article

This is a **paragraph** with *emphasis*.

- Item one
- Item two
\`\`\`

## How Markdown Works

\`\`\`mermaid
graph LR
    A["Plain Text (.md)"] --> B[Markdown Parser]
    B --> C[HTML]
    B --> D[PDF]
    B --> E[DOCX]
\`\`\`

## Markdown Flavors

| Flavor | Creator | Key Additions |
| :--- | :--- | :--- |
| **CommonMark** | John MacFarlane et al. | Unambiguous spec |
| **GFM** | GitHub | Tables, task lists, strikethrough |
| **MultiMarkdown** | Fletcher Penney | Footnotes, citations |
| **Pandoc** | John MacFarlane | Many output formats |
| **MDX** | Hashicorp/Vercel | JSX inside Markdown |

## The Philosophy

> "The overriding design goal for Markdown's formatting syntax is to make it as readable as possible."
>
> — John Gruber, creator of Markdown
`,

    '/core': `# Core Markdown Syntax

The fundamental building blocks — supported by every parser.

## Headings

\`\`\`markdown
# H1 — Page Title
## H2 — Major Section
### H3 — Subsection
#### H4 — Sub-subsection
\`\`\`

## Paragraphs & Line Breaks

Separate paragraphs with a blank line. End a line with two spaces for a hard break.

## Emphasis

**Bold** — \`**text**\`
*Italic* — \`*text*\`
***Bold italic*** — \`***text***\`
~~Strikethrough~~ — \`~~text~~\`

## Lists

Unordered:

- Item one
- Item two
  - Nested item
  - Another nested

Ordered:

1. First step
2. Second step
3. Third step

## Links

[Link text](https://example.com)
[With title](https://example.com "Hover title")
<https://autolink.com>

## Images

![Alt text](https://placehold.co/300x80/4f46e5/white?text=Image)

## Blockquotes

> "Any fool can write code that a computer can understand.
> Good programmers write code that humans can understand."
> — Martin Fowler

## Code

Inline: \`const x = 1;\`

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(10)); // 55
\`\`\`

## Horizontal Rule

---

## Escaping

\\*Not italic\\* \\# Not a heading \\[Not a link\\]
`,

    '/extended': `# Extended Markdown (GFM)

GitHub Flavored Markdown extends CommonMark with powerful features.

## Tables

| Name | Role | Level |
| :--- | :---: | ---: |
| Alice | Engineer | Senior |
| Bob | Designer | Mid |
| Carol | Manager | Lead |

**Alignment:** \`:---\` = left, \`:---:\` = center, \`---:\` = right

## Task Lists

- [x] Initialize repository
- [x] Install dependencies
- [x] Configure linting
- [ ] Write unit tests
- [ ] Deploy to production

## Strikethrough

The price was ~~$99~~ **$49** — 50% off!

## Autolinks

Visit https://github.com for more information.

## Footnotes

Markdown was created by John Gruber[^1] and Aaron Swartz[^2] in 2004.

[^1]: John Gruber runs [Daring Fireball](https://daringfireball.net)
[^2]: Aaron Swartz was a programmer and internet activist (1986–2013)

## HTML in GFM

<details>
  <summary>Click to expand</summary>

  This content is hidden by default. You can use **Markdown** inside details tags.

  - Item one
  - Item two

</details>

Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> to open the command palette.

Water is H<sub>2</sub>O. Energy is E=mc<sup>2</sup>.
`,

    '/advanced': `# Advanced Markdown

Advanced techniques for power users.

## Nesting Elements

Code blocks inside lists:

1. Open your terminal
2. Run the following:

    \`\`\`bash
    npm install -g typescript
    \`\`\`

3. Verify:

    \`\`\`bash
    tsc --version
    \`\`\`

## Escaping Special Characters

\\*Not italic\\*
\\*\\*Not bold\\*\\*
\\# Not a heading
\\\`Not code\\\`

**Characters that can be escaped:**
\\ \` * _ { } [ ] ( ) # + - . ! |

## Raw HTML

<details>
  <summary><strong>Advanced Configuration</strong></summary>

  | Option | Default | Description |
  | :--- | :--- | :--- |
  | \`timeout\` | \`5000\` | Request timeout in ms |
  | \`retries\` | \`3\` | Number of retry attempts |
  | \`debug\` | \`false\` | Enable debug logging |

</details>

## Keyboard Keys

- Copy: <kbd>Ctrl</kbd>+<kbd>C</kbd>
- Paste: <kbd>Ctrl</kbd>+<kbd>V</kbd>
- Save: <kbd>Ctrl</kbd>+<kbd>S</kbd>

## Subscript / Superscript
H<sub>2</sub>SO<sub>4</sub> and E = mc<sup>2</sup>

## Frontmatter (used by static site generators)

\`\`\`yaml
---
title: My Blog Post
author: Jane Doe
date: 2024-01-15
tags: [markdown, tutorial]
---
\`\`\`

## Security

Markdown supports raw HTML, which can be a vector for XSS. This app uses **rehype-sanitize** to strip:
- \`javascript:\` URIs
- Event handlers (\`onclick\`, \`onerror\`, etc.)
- \`<script>\` tags
`,

    '/visuals': `# Visuals & Diagrams

This app supports **Mermaid.js** — diagrams from text.

## Flowchart

\`\`\`mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -- Yes --> C[Ship it! 🚀]
    B -- No --> D[Debug]
    D --> E[Fix the bug]
    E --> B
\`\`\`

## Sequence Diagram

\`\`\`mermaid
sequenceDiagram
    actor User
    participant Browser
    participant API
    participant DB

    User->>Browser: Click "Login"
    Browser->>API: POST /auth/login
    API->>DB: SELECT user WHERE email=?
    DB-->>API: User record
    API-->>Browser: JWT token
    Browser-->>User: Redirect to dashboard
\`\`\`

## Class Diagram

\`\`\`mermaid
classDiagram
    class Animal {
        +String name
        +makeSound() String
    }
    class Dog {
        +String breed
        +fetch() void
    }
    class Cat {
        +bool indoor
        +purr() void
    }
    Animal <|-- Dog
    Animal <|-- Cat
\`\`\`

## Entity Relationship

\`\`\`mermaid
erDiagram
    USER ||--o{ POST : "writes"
    POST ||--o{ COMMENT : "has"
    USER ||--o{ COMMENT : "writes"
\`\`\`

## Gantt Chart

\`\`\`mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements    :done, 2024-01-01, 7d
    Design          :done, 2024-01-08, 5d
    section Development
    Backend API     :active, 2024-01-13, 14d
    Frontend UI     :2024-01-13, 10d
    section Launch
    Testing         :2024-01-27, 7d
    Deployment      :2024-02-03, 2d
\`\`\`

## Git Graph

\`\`\`mermaid
gitGraph
    commit id: "Initial commit"
    commit id: "Add README"
    branch feature/auth
    checkout feature/auth
    commit id: "Add login"
    commit id: "Add JWT"
    checkout main
    merge feature/auth id: "Merge auth"
    commit id: "Release v1.0"
\`\`\`
`,

    '/reference': `# Markdown Reference

Complete cheat sheet for quick lookup.

## Headings

\`\`\`markdown
# H1  ## H2  ### H3  #### H4  ##### H5  ###### H6
\`\`\`

## Text Formatting

| Syntax | Result |
| :--- | :--- |
| \`**bold**\` | **bold** |
| \`*italic*\` | *italic* |
| \`***bold italic***\` | ***bold italic*** |
| \`~~strike~~\` | ~~strike~~ |
| \`\`code\`\` | \`code\` |

## Lists

\`\`\`markdown
- Unordered item
  - Nested item

1. Ordered item
2. Another item

- [x] Checked task
- [ ] Unchecked task
\`\`\`

## Links & Images

\`\`\`markdown
[Link text](https://url.com)
![Alt text](https://image.url)
<https://autolink.com>
\`\`\`

## Blockquotes

\`\`\`markdown
> Single line
> > Nested quote
\`\`\`

## Code

\`\`\`markdown
Inline: \`code\`

\`\`\`language
code block
\`\`\`
\`\`\`

## Tables

\`\`\`markdown
| Left | Center | Right |
| :--- | :---:  | ---:  |
| A    |   B    |     C |
\`\`\`

## HTML

\`\`\`markdown
<kbd>Ctrl</kbd>+<kbd>C</kbd>
H<sub>2</sub>O  E=mc<sup>2</sup>
<details><summary>Title</summary>Content</details>
\`\`\`

## Mermaid

\`\`\`markdown
\`\`\`mermaid
graph LR
    A --> B --> C
\`\`\`
\`\`\`

## Quick Reference

| Element | Syntax |
| :--- | :--- |
| H1 | \`# Heading\` |
| Bold | \`**text**\` |
| Italic | \`*text*\` |
| Link | \`[text](url)\` |
| Image | \`![alt](url)\` |
| Code | \`\`code\`\` |
| Blockquote | \`> text\` |
| Unordered list | \`- item\` |
| Ordered list | \`1. item\` |
| Task list | \`- [ ] item\` |
| Table | \`\| col \| col \|\` |
| HR | \`---\` |
`,

    '/arena': `# Welcome to the Arena

This is your **live Markdown playground**. Type on the left, see the result on the right — instantly.

## Try some GFM

| Feature | Supported | Notes |
| :--- | :---: | :--- |
| Tables | ✅ | Use pipes \`|\` |
| Task lists | ✅ | Use \`- [ ]\` |
| Strikethrough | ✅ | Use \`~~text~~\` |

## Try a list

- **Unordered** item one
- **Unordered** item two
  - Nested item
  - Another nested

1. First ordered item
2. Second ordered item
3. Third ordered item

## Try code

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

## Try a blockquote

> "The best documentation is the one that actually gets written."
> — Someone wise

## Try Mermaid

\`\`\`mermaid
graph LR
    A[Write Markdown] --> B[Parse]
    B --> C[Render HTML]
    C --> D[Beautiful Docs]
\`\`\`
`,
};

// ─── Nav ────────────────────────────────────────────────────────────────────

const NAV = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/tutorial', label: 'Tutorial', icon: GraduationCap },
    { to: '/foundations', label: 'Foundations', icon: BookOpen },
    { to: '/core', label: 'Core Markdown', icon: Layers },
    { to: '/extended', label: 'Extended', icon: Maximize },
    { to: '/advanced', label: 'Advanced', icon: Cpu },
    { to: '/visuals', label: 'Visuals & Diagrams', icon: Image },
    { to: '/reference', label: 'Reference', icon: Book },
    { to: '/arena', label: 'The Arena', icon: Swords },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function Arena() {
    const location = useLocation();
    const navigate = useNavigate();
    const initialContent = CONTENT[location.pathname] ?? CONTENT['/arena'];
    const [content, setContent] = useState(initialContent);
    const leftRef = useRef<HTMLTextAreaElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const syncing = useRef(false);

    // Layout state
    const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop sidebar
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile overlay
    const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

    const currentIndex = NAV.findIndex(n => n.to === location.pathname);
    const prevPage = NAV[currentIndex - 1];
    const nextPage = NAV[currentIndex + 1];

    // Reset content when route changes
    useEffect(() => {
        const next = CONTENT[location.pathname] ?? CONTENT['/arena'];
        setContent(next);
        setMobileMenuOpen(false);
    }, [location.pathname]);

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
                // Mobile: always fixed, sliding
                "md:relative",
                mobileMenuOpen ? "translate-x-0 w-64 shadow-xl" : "-translate-x-full md:translate-x-0",
                // Desktop: visible or collapsed based on sidebarOpen
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
                    Markdown Arena v0.1.0
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
                            <button
                                onClick={() => setContent(CONTENT[location.pathname] ?? CONTENT['/arena'])}
                                className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                Reset
                            </button>
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
