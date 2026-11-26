# Explain a chart with Markdown

Use the bundled chart and transcript to state what changed, give the image meaningful alt text, and write a caption that interprets the measurement.

## Starter

~~~~markdown
![Chart](../media/queue-depth.png)

Add a caption.
~~~~

## Hint

The description should convey the trend. Use the caption to explain why it matters to the reader.

## Worked solution

~~~~markdown
![Queue depth falls from 120 waiting jobs at minute zero to none at minute four](../media/queue-depth.png)

The sample backlog drained at 30 jobs per minute. [Read the five observations](../media/queue-recovery.txt).
~~~~

## Self-check

Can someone recover the time range, endpoints and rate without seeing the chart? Follow the transcript link and verify the arithmetic.
