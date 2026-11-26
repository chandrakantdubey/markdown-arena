# Reuse a reference link

Use one definition for both references to CommonMark. Make the first label “core grammar” and the second “syntax examples”. Add an explicit autolink to https://example.org as a separate paragraph.

## Starter

~~~~markdown
Consult the core grammar.

Compare the syntax examples.

https://example.org
~~~~

## Hint

Both links can share the same bracketed reference identifier.

## Worked solution

~~~~markdown
Consult the [core grammar][cm].

Compare the [syntax examples][cm].

[cm]: https://spec.commonmark.org/

<https://example.org>
~~~~

## Self-check

The two descriptive links have the same destination. Their definition is absent from the preview. Altering that definition updates both destinations.
