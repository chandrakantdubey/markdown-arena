# Markdown across platforms

Markdown is a family of formats. A document that renders in the Arena may not render identically elsewhere. Use the destination's preview before publishing.

| Feature | CommonMark | GitHub | MDX | Obsidian | Documentation sites |
| --- | --- | --- | --- | --- | --- |
| Headings, emphasis, links, lists | Yes | Yes | Yes | Yes | Usually |
| Fenced code | Yes | Yes | Yes | Yes | Usually |
| Tables and task lists | Extension | Yes | With plugins | Yes | Depends |
| Footnotes | Extension | Yes | With plugins | Yes | Depends |
| Mermaid | Extension | Supported contexts | With integration | Yes | Depends |
| Math | Extension | Supported contexts | With plugins | Yes | Depends |
| JSX components | No | No | Yes | No | MDX only |
| Wiki links | No | No | No by default | Yes | Depends |
| Front matter | No | Context dependent | Toolchain dependent | Properties | Often |

## CommonMark: portable baseline

Prefer ATX headings, explicit links, ordinary lists and fenced code. Blank lines around blocks make intent clearer. CommonMark does not define GFM tables, task lists or footnotes.

~~~markdown
# Getting started

1. Install the package.
2. Run the example.

[Read the documentation](https://example.com)
~~~

Reference: [CommonMark specification](https://spec.commonmark.org/).

## GitHub Flavored Markdown

GitHub adds tables, task lists, strikethrough and autolinks to the CommonMark baseline. GitHub also supports features beyond the GFM specification in selected contexts, including alerts and diagrams. Do not assume arbitrary HTML, iframes, JavaScript or custom CSS will survive sanitization.

~~~markdown
| Check | Result |
| --- | --- |
| Tests | Passed |

- [x] Review completed

> [!NOTE]
> This alert is specific to supported GitHub contexts.
~~~

Reference: [GFM specification](https://github.github.com/gfm/) and [GitHub Markdown documentation](https://docs.github.com/en/get-started/writing-on-github).

## MDX

MDX mixes Markdown with JSX and JavaScript expressions. Components must be available to the build environment. Never compile untrusted MDX as executable code. The Arena intentionally does not execute MDX.

~~~mdx
import Callout from './Callout'

# Migration

<Callout>Back up your data first.</Callout>
~~~

Reference: [MDX documentation](https://mdxjs.com/).

## Obsidian

Obsidian adds wiki links, embeds, callouts, properties and other conventions. Wiki links depend on vault resolution; use regular relative Markdown links when exporting to other publishers.

~~~markdown
[[Project notes]]

![[architecture.png]]

> [!tip]
> Keep notes small and link related concepts.
~~~

Reference: [Obsidian help](https://help.obsidian.md/).

## Documentation platforms

Docusaurus can use MDX, MkDocs uses Python-Markdown and configured extensions, and other generators have their own front matter and routing rules. Test sidebar links, image paths and plugins in the actual build.

~~~yaml
---
title: Getting started
description: Install and verify the example.
---
~~~

References: [Docusaurus](https://docusaurus.io/docs/markdown-features), [MkDocs](https://www.mkdocs.org/user-guide/writing-your-docs/).

## Publishing checklist

- [ ] Confirm which Markdown flavor the destination supports.
- [ ] Replace unsupported components with text alternatives.
- [ ] Verify relative links, images and heading anchors.
- [ ] Remove secrets and private identifiers.
- [ ] Build or preview in the destination.

The Arena previews GFM, sanitized HTML and Mermaid; it does not emulate every publisher.
