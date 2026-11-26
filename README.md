# Markdown Arena

Learn Markdown by publishing a profile README, documenting a project and explaining technical work with media. The course works in two places. Read the lessons and workbooks here on GitHub, or run the React app to edit their source alongside a live preview.

[Open the interactive course](https://markdown-arena.vercel.app/)

## Learning path

Start with the first lesson if Markdown is new to you. If you already write READMEs, try the capstone first and use its self-check to choose what to practice.

| Stage | What you will produce | Practice |
| --- | --- | --- |
| [1. Foundations](curriculum/lessons/introduction.md) | A release note with a navigable outline | [Headings](curriculum/practice/headings.md) |
| [2. Core Markdown](curriculum/lessons/core.md) | A copyable quick start with links and nested steps | [Text](curriculum/practice/text.md), [quotes](curriculum/practice/quotes.md), [lists](curriculum/practice/lists.md), [code](curriculum/practice/code.md), [links](curriculum/practice/links.md), [images](curriculum/practice/images.md) |
| [3. Extensions and media](curriculum/lessons/advanced.md) | Release notes with measurements, tasks and optional context | [Tables](curriculum/practice/tables.md), [tasks](curriculum/practice/tasks.md), [footnotes](curriculum/practice/footnotes.md), [disclosures](curriculum/practice/disclosures.md), [fallbacks](curriculum/practice/portability.md) |
| [4. Diagrams](curriculum/lessons/visuals.md) | A review process a reader can trace | [Flowcharts](curriculum/practice/mermaid.md), [sequences](curriculum/practice/sequence.md), [states](curriculum/practice/states.md), [schedules](curriculum/practice/schedule.md) |
| [5. Markdown at work](curriculum/lessons/applications.md) | Documents for maintainers, collaborators and operators | [Profile README](curriculum/practice/profile-readme.md), [issue](curriculum/practice/bug-report.md), [pull request](curriculum/practice/pull-request.md), [changelog](curriculum/practice/changelog.md), [decision record](curriculum/practice/decision-record.md), [runbook](curriculum/practice/runbook.md), [how-to](curriculum/practice/how-to.md), [meeting notes](curriculum/practice/meeting-notes.md) |
| [6. Media lab](curriculum/lessons/media.md) | A gallery with accessible descriptions and an embedded clip | [Chart caption](curriculum/practice/chart-caption.md), [linked thumbnail](curriculum/practice/linked-thumbnail.md), [video and transcript](curriculum/practice/video-embed.md) |
| [7. Capstone](curriculum/practice/capstone.md) | A complete release README for a sample CLI | Six acceptance criteria and a worked example |

For each exercise, edit the starter, compare the rendered result to the self-check, then inspect the worked solution. Several correct answers are possible. On GitHub, copy the starter into a Markdown file in the same directory to try it. In the app, select **Practice** or follow an exercise link inside a lesson. The free-practice notebook is available from the exercise selector.

In the app, open **Profile builder** to generate a personal draft, edit it and download `README.md`. The **Media lab** uses the [sample assets](curriculum/media/) directly. They include original PNG illustrations, a silent five-second WebM clip and its descriptive transcript. The queue readings are simulated teaching data.

Use the [syntax reference](curriculum/reference.md) for a quick lookup. The [original PDF](docs/archive/Light.pdf) is available as a supplementary download.

## Run locally

Use Node.js 22.18 or newer and npm. From a fresh checkout run:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. On a narrow screen, use the Source and Preview controls. Each lesson, exercise and free-practice notebook keeps its own draft in this browser. Reset draft restores the selected item's original source. Clearing browser storage removes the drafts.

| Command | Result |
| --- | --- |
| `npm test` | Checks exercise structure, the course links, examples and capstone rubric |
| `npm run lint` | Checks the TypeScript and React code |
| `npm run build` | Type-checks and produces the static site in `dist/` |
| `npm run check` | Runs all three checks |
| `npm run test:browser` | Exercises desktop and mobile flows against `dist/` using installed Chrome (or set `CHROME_PATH` to Chromium) |
| `npm run preview` | Serves the production build locally |

## Maintain the course

- Edit a chapter in `curriculum/lessons/`. The app imports the same Markdown that GitHub displays.
- Add an exercise in `curriculum/practice/`. Use an existing file as the template. Preserve its Starter, Hint, Worked solution and Self-check sections and the four-tilde fences around editable Markdown. The filename becomes its stable topic ID.
- Link the new exercise from a chapter and the learning path above. The practice selector discovers it automatically.
- Keep links relative to the source document. Put shared PNG, JPG, WebP, WebM or text assets in `curriculum/media/`. The production build discovers those files automatically.
- Preview a change in both the app and GitHub. The Arena supports GFM, footnotes, sanitized HTML and Mermaid. Features such as math typesetting and platform-specific alerts depend on the publisher.

The app uses React, TypeScript and Vite. Routes are `/`, `/core`, `/advanced`, `/visuals` `/use-cases`, `/media`, `/profile`, `/reference` and `/arena?topic=<id>`. A static host must serve `index.html` for app routes. The repository includes the Vercel rewrite. GitHub Actions runs the checks and browser tests for pull requests and pushes to main.
