# Embed a video with a text fallback

Embed the bundled queue-recovery clip with playback controls. Under the player, give readers a direct video link and the descriptive transcript. Try removing the HTML block to inspect the fallback.

## Starter

~~~~markdown
[Watch the recovery](../media/queue-recovery.webm)
~~~~

## Hint

Place ordinary Markdown links in a new paragraph outside the HTML element. The Arena player accepts bundled course clips.

## Worked solution

~~~~markdown
<video controls src="../media/queue-recovery.webm" aria-label="Queue recovery over four minutes"></video>

[Open the recovery clip](../media/queue-recovery.webm) · [Read the transcript](../media/queue-recovery.txt)

The sample queue emptied at minute four.
~~~~

## Self-check

Start and pause the clip, then remove only the video element. Can a reader still reach both the file and its measurements?
