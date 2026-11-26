# Where people use Markdown

Start with a reader and the decision they need to make. The same project can need a profile, a bug report, a review request and a runbook. Each document earns its place by helping someone take a different next step.

## Choose a writing task

| Where the document lives | Who opens it | What they should be able to do | Workshop |
| --- | --- | --- | --- |
| GitHub profile README | A future collaborator | Find a relevant project and inspect your work | [Build a profile README](../practice/profile-readme.md) |
| Project README | A first-time user | Reproduce one successful run | [Release README capstone](../practice/capstone.md) |
| Issue body | A maintainer | Reproduce a bug and observe the difference | [Write a reproducible issue](../practice/bug-report.md) |
| Pull request description | A reviewer | Find the changed behavior and the evidence | [Prepare a PR for review](../practice/pull-request.md) |
| Changelog | A person upgrading | Decide whether their workflow needs to change | [Write release notes](../practice/changelog.md) |
| Architecture decision record | A future maintainer | Understand why a choice was reasonable at the time | [Record a design decision](../practice/decision-record.md) |
| Operations runbook | An on-call engineer | Recognize the condition and verify recovery | [Write a recovery procedure](../practice/runbook.md) |
| Docs site or knowledge base | Someone completing a task | Follow a short guide and confirm its outcome | [Write a how-to page](../practice/how-to.md) |
| Meeting notes or a shared wiki | Someone who missed the meeting | Locate the decision, owner and due date | [Turn notes into actions](../practice/meeting-notes.md) |

## Build a GitHub profile README

Open the [profile workshop](../practice/profile-readme.md). In the app, choose **Build from my details**. Enter a name, the problems you work on and a link to one project. Generate the draft, edit the Markdown, inspect the preview and download the result as `README.md`. The exported file contains your latest source edits.

Give readers a reason to follow the project link. “Added an example that gets a first-time contributor from clone to a passing test” describes a contribution a reader can inspect. A long list of tool badges gives them less to go on. Keep an image optional and write a description that makes sense if it never loads.

To publish on a personal GitHub profile, put the nonempty file at the root of a public repository named exactly like your username. For example, a user called mira would put it in the mira repository under that account. GitHub's profile README feature is unavailable for managed user accounts. Publishing is a separate step you control. [GitHub's profile README guide](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme)

## Turn one observation into three documents

Suppose a worker resumes after a pause and clears 120 queued jobs in four minutes. A reviewer wants the measurement and what changed. An operator wants a trigger, a check and an escalation point. A release-note reader wants to know whether they need to do anything. Try using the same [queue chart](../media/queue-depth.png) for all three, then change the caption for each audience.

## Move between publishers

Repository READMEs and wikis can resolve relative links from different directories. Issue comments have no file location in your checkout, so use a repository permalink for a file you cite there. An editor for a docs site may read front matter to populate navigation. A notebook may pair a Markdown cell with computed output in a separate code cell. Check what happens to code, assets and links in the destination preview before publishing.

Continue to the [media lab](media.md) to work with repository images, video and text fallbacks.
