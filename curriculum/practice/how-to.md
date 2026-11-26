# Write a task-based how-to page

A first-time contributor wants to preview the course. Write a docs page with prerequisites, commands, an observable success condition and one recovery step.

## Starter

~~~~markdown
How to run
Install stuff and open it.
~~~~

## Hint

Put the success condition next to the command. Keep site-generator metadata separate from the instructions so the page also reads well on GitHub.

## Worked solution

~~~~markdown
# Preview the course locally

## Before you start

Use Node.js 22.18 or newer and npm. Open a terminal in a fresh course checkout.

## Preview

```sh
npm ci
npm run dev
```

Open the URL that Vite prints. The page should show Markdown source and a preview; narrow screens have a switch between them.

## If installation fails

Check `node --version` against the prerequisite and confirm that the terminal is in the directory containing `package-lock.json`.
~~~~

## Self-check

Can a reader identify the starting directory, copy the commands, observe the result and diagnose one common setup error?
