# Keep measurement context close

Attach a named footnote to the latency claim. Give the note two paragraphs explaining the warm-up and sample size, then follow its link in each direction.

## Starter

~~~~markdown
Latency was 35 ms.

Warm the cache once.
Three samples were recorded.
~~~~

## Hint

Indent the second paragraph of the definition by four spaces.

## Worked solution

~~~~markdown
Latency was 35 ms.[^method]

[^method]: Warm the cache once.

    Three samples were recorded.
~~~~

## Self-check

Both method paragraphs appear in one note. The numbered reference jumps to it and the return link leads back to the claim.
