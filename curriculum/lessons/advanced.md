# Extensions and media

Turn a change log into release notes that a reviewer can act on. Begin with the information you need to convey, then check whether the destination supports the syntax you chose.

## Compare values in a table

```markdown
| Check | Result | Time (ms) |
| :--- | :---: | ---: |
| Build | Pass | 420 |
| Lint \| format | Pass | 85 |
```

The delimiter row defines the columns. Colons request left, center or right alignment. Use a backslash before a pipe that belongs to cell content. Keep units in the header and numeric measurements in one column. When every cell needs a paragraph, use a heading and list per item instead.

[Practice tables](../practice/tables.md)

## Track work and revisions

```markdown
- [x] Build the archive
- [ ] Verify the checksum

The published filename changed from ~~bundle.tgz~~ to `release.tgz`.
```

GFM recognizes a space or an x inside brackets at the beginning of a list item. In the Arena, edit the source to change the state. A checked task records a claim by the author. Link the evidence when readers need to verify it.

[Practice task lists](../practice/tasks.md)

## Add a footnote or a disclosure

```markdown
Measurements use a warm cache.[^cache]

[^cache]: Run the query once before recording its duration.

<details>
<summary>Measurement conditions</summary>

- One client
- Three recorded runs

</details>
```

Give each note a distinct label and use the same label at the reference and definition. Keep the definition outside lists unless you intentionally nest it. For a second paragraph within a footnote, indent that continuation by four spaces after a blank line. Test the jump to the note and the return link. Footnotes are supported here and on GitHub, and extend the formal GFM specification.

A disclosure works well for optional logs. Put required recovery steps in visible text. Blank lines separate Markdown inside the disclosure from its HTML tags. HTML comments can carry editing notes but remain visible to anyone reading the source.

[Practice footnotes](../practice/footnotes.md) · [Practice disclosures](../practice/disclosures.md)

## Choose a portable fallback

| Input | Arena behavior | Fallback a reader can use |
| --- | --- | --- |
| A linked image | Displays an image that opens the link | Descriptive text link next to it |
| A video or audio URL | Opens the linked destination | Link with a title and transcript |
| Inline or display math | Dollar delimiters remain visible | Plain-language formula or code span |
| GitHub alert marker | Ordinary quoted text | Start a blockquote with a bold label |
| Definition list or emoji shortcode | Ordinary text | A term in bold or a Unicode character |
| Raw HTML | The preview filters elements and attributes | Markdown structure with meaningful text |

For a video thumbnail, wrap an image in a link, for example `[![Watch the install walkthrough](poster.png)](walkthrough.mp4)`. Use a plain link if the poster has no value on its own. A portable expression for throughput is `completed requests / elapsed seconds`. A math-enabled publisher may also accept `$r = n/t$` inline or a separate formula between double-dollar lines.

For theme-specific images, check the target publisher's picture-element support and supply an ordinary fallback image. Captions, useful alt text and sufficient contrast in both themes travel further than renderer-specific sizing tricks.

[Practice renderer fallbacks](../practice/portability.md). Try the [media lab](media.md) for a working video, images and a transcript. Continue to [Diagrams](visuals.md).
