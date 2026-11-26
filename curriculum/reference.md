# Markdown syntax reference

Use the source column as an example and the last column to check what the reader should see.

| Feature | Source | Expected result |
| --- | --- | --- |
| Heading | `## Install` | Second-level section |
| Emphasis | `*optional*`, `**required**`, `***urgent***` | Emphasis, strong emphasis, or both |
| Literal marker | `\*literal\*` | Asterisks appear around the word |
| Code span | ``Use `npm ci`.`` | The command stays inline |
| Quote | `> Review requested.` | Quoted paragraph |
| Bullet or step | `- Archive` or `1. Unpack` | Item in a list |
| Explicit URL | `<https://example.org>` | Clickable URL |
| Named link | `[Guide](guide.md)` | Descriptive label |
| Image | `![Build passed](checks.png)` | Image with alternative text |
| Linked image | `[![Build passed](checks.png)](report.md)` | Clicking the image opens the report |
| Thematic break | `---` on a line with a blank line above | Section divider |
| GFM task | `- [x] Reviewed` | Checked item |
| GFM revision | `~~obsolete~~` | Struck-through text |
| HTML comment | `<!-- Confirm the date -->` | Note visible in source |
| Footnote | `Claim.[^a]` and a later definition `[^a]: Source.` | Reference and return link in supporting previews |

## Fences inside examples

Use a longer outer delimiter when the example contains its own fence. In the sample below, the opening and closing four backticks belong to the teaching page. The three-backtick fence is what its reader copies.

~~~~~markdown
````markdown
```sh
npm run build
```
````
~~~~~

## Troubleshoot by symptom

| Symptom | What to inspect |
| --- | --- |
| A title appears as text | Put a space after the hashes and close any earlier code fence |
| A separator became a heading | Insert a blank line before the three hyphens |
| A nested step escaped its parent | Align it with the parent's text column |
| A row has an extra column | Escape any literal pipe within the cell |
| A footnote stays literal | Match the label and check the renderer's extension support |
| A diagram appears as source | Check the mermaid fence label and renderer support |
| A formula stays literal | Check whether the target has a math renderer, then supply a plain-language version |
| A relative image broke after a move | Resolve its path from the document's new directory, including letter case |

Open the [original PDF](../docs/archive/Light.pdf) or return to the [first lesson](lessons/introduction.md).
