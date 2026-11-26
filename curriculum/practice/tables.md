# Compare measurements in a table

Build a three-column table with a left-aligned check, a centered result, and a right-aligned duration. Keep the pipe in “Lint | format” inside the first cell.

## Starter

~~~~markdown
Check, Result, Time (ms)
Build, Pass, 420
Lint | format, Pass, 85
~~~~

## Hint

Put the alignment markers in the delimiter row. Escape a literal pipe inside a cell.

## Worked solution

~~~~markdown
| Check | Result | Time (ms) |
| :--- | :---: | ---: |
| Build | Pass | 420 |
| Lint \| format | Pass | 85 |
~~~~

## Self-check

The preview has three columns and two measurements. Both durations align at the right edge and the second check keeps its full name.
