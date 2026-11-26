# Core Markdown

Build the quick-start section of a README. A reader should be able to scan it, copy one command and follow a reference without guessing where it leads.

## Headings, paragraphs and line breaks

Use one document title and give each major section a second-level heading. A subsection of that section gets three hashes. Leave a space between the hashes and the words. Choose the level by the outline.

```markdown
# Field notes

## Install

Download the bundle.
Unpack it in your project.

## Troubleshooting

Keep the original archive.
```

The two adjacent lines under Install belong to one paragraph. A blank line starts a new paragraph. For an intentional line break within a paragraph, end a line with a backslash or two spaces. The backslash is easier to see in a diff. A line containing three hyphens can form a thematic break. Leave a blank line above it, since hyphens immediately under text can turn that text into a heading.

[Practice headings](../practice/headings.md) · [Practice line breaks and emphasis](../practice/text.md)

## Emphasis, literals and quotations

```markdown
Choose **Run** for the required action. A *draft* can still change.
Enter `--dry-run` exactly. Display a literal asterisk with \*.

> Reviewers should be able to repeat each step.
>
> Keep the command and its expected output together.
```

Keep spaces outside emphasis markers. To quote several paragraphs, continue the quote with a marker on the blank line. Nest a quotation with a second marker. To show literal Markdown, use a code span or fenced example.

[Practice quotations](../practice/quotes.md)

## Lists and nesting

```markdown
1. Download the archive.
2. Check the contents.
   - A README
   - A checksum
3. Unpack the files.
```

Align each child marker with the start of its parent's text. Here the text following `2. ` begins in column four. If the marker becomes `10. `, the continuation needs another space. Indent a second paragraph to that same text column to keep it inside the item. A blank line between items can give the rendered list more vertical spacing.

[Repair a nested procedure](../practice/lists.md)

## Inline code and fences

Use a code span for a token inside a sentence. A longer delimiter can contain a shorter one. For example, the source below displays a command containing a backtick.

~~~markdown
Use ``printf '%s' '`'`` to print one backtick.
~~~

A fence preserves line breaks and indentation. Its optional language label lets the renderer highlight the code. To teach a three-backtick fence, surround the whole example with four backticks or with tildes.

~~~~markdown
```sh
npm ci
npm run dev
```
~~~~

Copy the commands from the rendered block. A copied command should contain neither Markdown delimiters nor a shell prompt. [Practice fenced code](../practice/code.md).

## Links, references and images

~~~markdown
Read the [installation guide](install.md).
Compare the [core grammar][spec] with the local preview.

[spec]: https://spec.commonmark.org/

![Two reviewers approve the release](review-flow.png)
~~~

A relative destination resolves from the document's location on GitHub. Keep the image alongside the document or adjust its path when moving it. An image starts with an exclamation mark. Give it alternative text that communicates the information a reader needs when the image is unavailable. To make it clickable, put the image expression inside the label of a link.

Angle brackets make an explicit autolink, such as `<https://example.org>`. Turning a bare URL into a link is an extension. Prefer descriptive link text when the destination serves a specific task. Define each reference label once and keep the definitions outside code fences.

[Practice links](../practice/links.md) · [Practice images](../practice/images.md)

## Check your quick start

Read just the headings, then just the numbered steps. Each should make sense in isolation. Confirm that a child list stays inside its parent, the command can be copied intact, and the guide link identifies its destination.

Continue to [Extensions and media](advanced.md).
