# Design a first-contribution guide

A first-time contributor wants to change a lesson. They have a fresh checkout and can run npm, but do not know which file drives the site or how to tell whether their change worked. Lead them through one small edit, local verification and a reviewable handoff. Include a recovery path for a failed course test.

## Starter

~~~~markdown
# Contribute

Read the code.
Make a PR.
~~~~

## Hint

Anchor each action to a file, command or screen the newcomer can find. Tell them what successful verification looks like.

## Worked solution

~~~~markdown
# Make your first lesson edit

## Prepare

From the course root, use Node.js 22.18 or newer and run `npm ci`. Start the preview with `npm run dev`.

## Change one example

1. Open `curriculum/lessons/core.md`.
2. Improve one link label so its destination is clear when read alone.
3. Visit `/core` in the preview and follow the edited link. Reset an older browser draft if it is masking the lesson source.

## Check and submit

Run `npm run check`. If a link check fails, resolve its path relative to the Markdown file that contains it. Include the before-and-after label and the check result in the pull request.
~~~~

## Self-check

Can a contributor complete this without already knowing the directory layout? Have them identify the edited source, confirm the rendered link and describe the change to a reviewer.
