# Hide optional logs behind a summary

Keep the required recovery step visible. Put two diagnostic lines in a fenced block inside an expandable disclosure called “Build log”.

## Starter

~~~~markdown
Retry the build once.

Build log
Cache miss
Retry succeeded
~~~~

## Hint

Leave a blank line before and after the Markdown fence inside the HTML block.

## Worked solution

~~~~markdown
Retry the build once.

<details>
<summary>Build log</summary>

```text
Cache miss
Retry succeeded
```

</details>
~~~~

## Self-check

The recovery step is visible while collapsed. Opening Build log reveals two lines with preserved whitespace.
