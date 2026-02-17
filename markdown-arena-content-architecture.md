# Markdown Arena: Content Architecture and Structured Syllabus

## 1) High-Level Content Architecture

### 1.1 Purpose of the Platform
Markdown Arena is structured as a dual-use system:
- **Learning system**: progressive, layered curriculum from fundamentals to advanced behavior.
- **Reference system**: fast lookup for syntax, support, and portability decisions.

### 1.2 Primary Sections
1. **Orientation and Conceptual Foundations**
   - Establishes what Markdown is, where it came from, and why behavior differs.
2. **Core Markdown (Beginner Track)**
   - Covers baseline syntax expected across most parsers.
3. **Extended Markdown (Intermediate Track)**
   - Covers features common in modern ecosystems but not guaranteed everywhere.
4. **Advanced Markdown Systems**
   - Treats Markdown as a parsing/rendering pipeline with dialects and extension ecosystems.
5. **Diagrams and Visual Content**
   - Dedicated treatment of Mermaid and visual semantics.
6. **Media and Embeds**
   - Structured handling of images, linked media, and embed fallbacks.
7. **Platform and Flavor Behavior**
   - Cross-platform compatibility comparisons and portability strategies.
8. **Editor / Arena (Conceptual Learning Lab)**
   - Experimental learning layer for validating assumptions against real renderers.
9. **Reference and Cheatsheet Layer**
   - Compact syntax index mapped to behavior and support.

### 1.3 User Navigation Model
- **Path A: Guided learner path**
  - Foundations → Core → Extended → Advanced → Platform behavior.
- **Path B: Task-driven practitioner path**
  - Reference lookup → Compatibility matrix → Arena validation.
- **Path C: Writer/maintainer path**
  - Portability guidance → Platform section → Governance and style conventions.

### 1.4 Cross-Linking Rules
- Every syntax topic links to:
  - conceptual rationale,
  - portability notes,
  - platform differences,
  - related reference entry.
- Every advanced/system topic links back to beginner-safe usage recommendations.

---

## 2) Foundations: What Markdown Is

### 2.1 Scope and Boundaries
- **Markdown is**: a lightweight plain-text authoring syntax intended for readable source text.
- **Markdown is not**:
  - a single universal specification with complete feature parity,
  - a guaranteed WYSIWYG format,
  - a replacement for all structured document standards.

### 2.2 Historical and Design Context
- Origin and readability-first philosophy.
- Divergence into multiple implementations (“flavors”).
- Tension between minimal core and practical extensions.

### 2.3 Markdown vs HTML (Conceptual)
- Markdown as authoring shorthand; HTML as explicit document structure.
- Cases where Markdown maps cleanly to HTML.
- Cases requiring raw HTML or extension syntax.
- Tradeoffs: readability, control, portability, security.

### 2.4 Parsing and Rendering Concept Model
- Source text → tokenizer/parser → syntax tree/intermediate model → renderer.
- Why identical source can produce different output:
  - parser rules,
  - enabled extensions,
  - sanitizer policies,
  - CSS/host rendering context.

### 2.5 Why Inconsistency Is Expected
- No universally enforced full-feature standard in practice.
- Host platform policy differences (security, UX, allowed HTML, plugin support).
- Importance of testing in target environment.

### 2.6 Foundational Learning Outcomes
Learners should leave Foundations able to:
- explain portability risk before using advanced syntax,
- distinguish authoring syntax from rendering outcome,
- predict when feature fallbacks are needed.

---

## 3) Core Markdown (Beginner)

### 3.1 Section Goal
Teach syntax with the highest baseline support while building durable mental models.

### 3.2 Module Sequence

#### Module A — Document Structure and Reading Flow
- Headings (levels, hierarchy discipline, skip-level pitfalls).
- Paragraphs and line breaks (soft vs hard break behavior).
- Horizontal rules as section delimiters.

**Common pitfalls:**
- using headings for styling rather than structure,
- ambiguous line break expectations.

#### Module B — Text Semantics and Emphasis
- Italic, bold, bold+italic.
- Strikethrough (marked as often supported but not guaranteed in strict cores).
- Inline code for exact literals.

**Mental model:** semantic emphasis vs visual styling intent.

#### Module C — Lists and Structured Thinking
- Unordered lists.
- Ordered lists (auto-numbering behavior and source numbering strategy).
- Nested lists and indentation sensitivity.

**Pitfalls:** mixed indentation widths, accidental code blocks, broken nesting.

#### Module D — Quotations and Verbatim Blocks
- Blockquotes and multi-paragraph quotes.
- Fenced code blocks and language identifiers.
- Distinguish code block content from executable/runtime behavior.

#### Module E — Links and Basic Images
- Inline links.
- Basic image syntax.
- Linked images as composition pattern.

**Pitfalls:** relative vs absolute path assumptions, broken alt text habits.

### 3.3 Beginner Competency Targets
- Produce readable, structured docs using portable syntax first.
- Avoid syntax that silently degrades without noticing.
- Identify when moving to Extended section is necessary.

---

## 4) Extended Markdown (Intermediate)

### 4.1 Section Goal
Introduce high-utility features that are common but not universally portable.

### 4.2 Support Classification Framework
Each topic is labeled:
- **Widely supported extension** (common on major platforms).
- **Flavor-dependent extension** (requires specific parser/platform).
- **Context-restricted extension** (works only in certain rendering surfaces).

### 4.3 Module Sequence

#### Module A — Structured Data in Text
- Tables.
- Column alignment conventions.
- Table readability and fallback alternatives.

#### Module B — Workflow-Oriented Syntax
- Task lists / checkboxes.
- Interaction assumptions (static render vs interactive state).
- Use cases: planning, issue tracking, progress docs.

#### Module C — Scholarly and Long-Form Features
- Footnotes.
- Reference-style links and link definition management.
- Citation-like writing patterns in Markdown.

#### Module D — Controlled HTML Interop
- Raw HTML inside Markdown.
- `<details>` / `<summary>` for collapsible disclosure patterns.
- HTML comments in Markdown source.

#### Module E — Content Organization Patterns
- Progressive disclosure (summary-first writing).
- Dense vs scannable formatting strategies.
- Authoring for both raw-source readability and rendered output clarity.

### 4.4 Intermediate Competency Targets
- Choose extension features intentionally based on support profile.
- Add portability notes when using non-core syntax.
- Design fallback content where degradation risk is high.

---

## 5) Advanced Markdown

### 5.1 Section Goal
Position Markdown as a technical system with parser, flavor, and transformation implications.

### 5.2 Advanced Modules

#### Module A — Flavors, Dialects, and Specification Boundaries
- CommonMark, GFM, and ecosystem-specific dialects (conceptual comparison).
- Ambiguity resolution differences across parsers.
- Authoring strategies for multi-target outputs.

#### Module B — Extension Architecture and Parser Behavior
- Parser extension points and plugin-driven syntax.
- Preprocessing/postprocessing effects.
- Deterministic vs context-dependent rendering behavior.

#### Module C — Embedded DSLs in Markdown
- Mermaid as a fenced-code DSL interpreted by host tooling.
- Math syntax as renderer-dependent DSL.
- Risks of writing to DSLs not available in all targets.

#### Module D — Security and Trust Boundaries
- Raw HTML sanitization models.
- Script/style/event attribute filtering.
- Safe authoring in untrusted collaboration contexts.

#### Module E — Markdown as Intermediate Representation
- Markdown → AST → HTML/PDF/Docs pipeline mental model.
- Transform tooling implications (linting, normalization, migration).
- Round-tripping limitations and lossiness concerns.

### 5.3 Advanced Competency Targets
- Diagnose rendering discrepancies by reasoning about parser and renderer stages.
- Evaluate syntax choices against security and portability constraints.
- Treat Markdown sources as maintainable artifacts across toolchains.

---

## 6) Diagrams and Visual Content

### 6.1 Section Goal
Separate visual semantics from media embedding and teach diagram portability explicitly.

### 6.2 Diagram Curriculum Structure

#### Module A — Diagram Semantics vs Static Visuals
- Diagrams as executable textual models vs images as fixed output.
- When to choose one over the other.

#### Module B — Mermaid Fundamentals
- Mermaid fenced block conventions.
- Directional/layout variants and their conceptual implications.
  - top-down,
  - bottom-up,
  - left-right,
  - right-left.
- Diagram readability and complexity management.

#### Module C — Rendering Responsibility Model
- Markdown contains the diagram definition.
- External renderer/tooling produces the final visual.
- Failure modes when renderer is absent.

#### Module D — Portability and Fallbacks
- Graceful degradation options:
  - provide textual summary,
  - include alternate static image,
  - document expected renderer requirements.

### 6.3 Learning Outcomes
- Understand that Mermaid support is not a Markdown core guarantee.
- Produce diagram content that remains interpretable when not rendered.

---

## 7) Media and Embeds

### 7.1 Section Goal
Organize image and embed practices around accessibility, reliability, and host constraints.

### 7.2 Media Modules

#### Module A — Images as Core Media
- Standard image syntax.
- Alt text quality model (decorative vs informative images).
- Pathing strategy (relative paths, repository moves, link rot awareness).

#### Module B — Linked and Themed Images
- Linked images for navigation and callouts.
- Theme-aware image patterns (light/dark context handling).
- Fallback behavior when theme-switch support is absent.

#### Module C — Video and Rich Embeds
- Why native video embedding is often platform-limited.
- Thumbnail + link patterns (e.g., video via linked image).
- Degradation-safe embed strategy.

#### Module D — Accessibility and Inclusive Media Authoring
- Alt text, captions, and surrounding context.
- Keyboard/screen-reader implications of collapsible media sections.

#### Module E — Platform Constraints
- Host restrictions on iframes/raw HTML/media domains.
- Content policy impacts on rendered outcomes.

### 7.3 Learning Outcomes
- Select media patterns that preserve meaning under restricted rendering policies.
- Author with accessibility as a first-order requirement.

---

## 8) Platform and Flavor Behavior

### 8.1 Section Goal
Provide a comparison-first framework for predicting behavior across ecosystems.

### 8.2 Comparison Axes
- Syntax support (core vs extension).
- HTML allowance and sanitization strictness.
- Math and diagram enablement.
- Table/task-list/footnote behavior.
- Autolinking and emoji handling.
- Heading ID generation and anchor behavior.

### 8.3 Environment Categories
- Code hosting platforms.
- Note-taking tools.
- Static documentation generators.
- Editor previews/local renderers.

### 8.4 Portability Trap Catalog
- Works in preview, breaks in production renderer.
- HTML-based features stripped by sanitizer.
- Mermaid/math visible as raw text in unsupported contexts.
- Reference link collisions and anchor mismatches.

### 8.5 Decision Guides
- “Portable baseline” authoring profile.
- “Enhanced target-specific” profile with explicit dependency declaration.
- Migration checklist when moving content between platforms.

---

## 9) Editor / Arena Page (Conceptual Design)

### 9.1 Learning Purpose
The Arena serves as an experimentation environment where users validate Markdown assumptions against rendering outcomes.

### 9.2 Educational Functions
- Immediate feedback on syntax correctness.
- Visibility into ambiguity cases (same source, different interpretation).
- Demonstration of extension toggles (core vs extended behavior).
- Comparative rendering mindset: source intent vs actual output.

### 9.3 Conceptual Learning Workflows
- **Explore workflow**: write syntax → observe output → inspect compatibility notes.
- **Compare workflow**: run same snippet against flavor profiles → detect deltas.
- **Debug workflow**: isolate failing construct → test fallback rewrite.

### 9.4 Conceptual Outcomes
- Build intuition for parser-dependent behavior.
- Develop habits of portability testing before publication.
- Understand transformation pipeline effects on final artifacts.

---

## 10) Reference and Cheatsheet Layer

### 10.1 Section Goal
Provide high-speed retrieval without replacing conceptual learning modules.

### 10.2 Reference Information Model
Each entry follows a compact schema:
1. **Syntax pattern**
2. **Purpose/semantics**
3. **Output expectation**
4. **Support classification** (core / widely supported / flavor-dependent)
5. **Platform notes**
6. **Fallback pattern**
7. **Related advanced caveats**

### 10.3 Required Reference Surfaces
- Alphabetical syntax index.
- Task-oriented index (e.g., “make collapsible content,” “embed video safely”).
- Compatibility matrix by platform category.
- Pitfall index (“why this renders as plain text”).

### 10.4 Relationship to Learning Tracks
- Reference entries must link back to full conceptual lessons.
- Learning lessons must end with “quick reference pointers.”
- Advanced modules must include direct links to compatibility matrix rows.

### 10.5 Maintenance and Governance Model
- Versioned support notes to reflect platform changes.
- Consistent tagging of syntax stability and risk level.
- Periodic review workflow for outdated compatibility assumptions.

---

## Baseline Inventory Mapping (from Existing Cheatsheet to New Architecture)

- **Core Markdown**: headings, emphasis, inline code, code blocks, lists, blockquotes, horizontal rules, links, images.
- **Extended Markdown**: tables/alignment, task lists, footnotes, reference links, HTML comments, `<details>/<summary>`, raw HTML.
- **Advanced / DSL Layer**: Mermaid diagrams, mathematical expressions, renderer-dependent embed patterns.
- **Media and Embed Layer**: linked images, theme-based images, video via image links.
- **Platform Behavior Layer**: emoji rendering differences, HTML sanitization differences, extension support variance.
