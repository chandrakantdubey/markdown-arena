# Reading Markdown like a document

Start with a release note. Someone reading the raw file in a terminal needs to find the change. Someone reading the rendered page needs the same information. Markdown lets one file serve both readers.

```markdown
# Search release

Saved searches now include archived projects.

## Try it

1. Open **Search**.
2. Select **Include archived**.
3. Search for `release notes`.
```

Look at the first character of each line. The hash marks give the document an outline. The numbered items describe actions in sequence. Inside a sentence, a pair of backticks marks the exact text to type. Delete the blank line above the list and compare the result. Then remove the space after the first hash. Only the second edit changes that heading into a paragraph.

## From text to preview

A parser groups lines into blocks such as headings, paragraphs and lists. It then interprets inline content such as emphasis and links inside those blocks. A renderer turns that structure into a page. The theme controls its appearance. Two previews can show the same heading at different sizes while agreeing on its level.

A visual editor is handy when page layout is the deliverable. Markdown is handy when a reader should be able to review a one-line change in Git, copy the instructions into an issue, or read them without the publishing tool. For exact print layout, keep the source document and typesetting concerns separate.

## Choose a target

| Feature | What to expect in the Arena |
| --- | --- |
| CommonMark headings, lists, links and code | Rendered as document structure |
| GFM tables, task lists, bare links and strikethrough | Rendered by the GFM extension |
| Footnotes | Linked notes supplied by the preview plugin |
| Mermaid fences | Rendered as diagrams |
| HTML disclosure | A readable summary with expandable content |
| Dollar-delimited math and emoji shortcodes | Literal source text. Use Unicode for portable emoji. |

CommonMark specifies the core grammar. The GFM specification adds extensions. GitHub also has platform features such as issue references and math rendering. A README preview, issue comment and static documentation site can each apply different rules to the same source.

## First checkpoint

Write a title, a one-sentence change and two steps. Inspect the source and the preview. A reader should be able to point to the title and tell which step comes first. [Open the headings exercise](../practice/headings.md).

Continue to [Core Markdown](core.md). For exact syntax rules see the [CommonMark specification](https://spec.commonmark.org/) and the [GFM specification](https://github.github.com/gfm/).
