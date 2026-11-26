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

## Extended writing studios

Choose a scenario below. Draft your answer from the brief before opening the model. Then change one assumption and revise the document. This second pass tests whether the structure holds when the facts change.

### Document a paginated API

An integration engineer needs to export every item in a collection. The fictional service returns two items per page and an opaque cursor. The client currently treats every successful response as the final page.

**Assignment.** Write an HTTP example, a matching response and instructions for requesting the next page. Specify what ends iteration and what to do when a page must be retried.

**Editing technique.** Walk through two requests with pencil and paper. A page containing exactly two items could still be the final page.

**Peer review.** Trace the IDs a, b and c. Interrupt processing after a, replay page one, and explain why the export still contains three distinct items.

[Open the document a paginated api workshop](../practice/api-guide.md)

### Write an incident review

A training simulation paused workers at 09:00 UTC. By 09:04 the queue held 120 jobs. Processing resumed then, and the backlog cleared at 09:08. The cause of the pause is still under investigation.

**Assignment.** Separate measured impact, chronology, uncertainty and follow-up actions. Use the supplied chart as evidence.

**Editing technique.** Choose one time zone and distinguish an observation from an inference. State which measurement would resolve an open question.

**Peer review.** A reader can identify the impact, reconstruct the recovery, name one unknown and verify completion of each action.

[Open the write an incident review workshop](../practice/incident-review.md)

### Design a first-contribution guide

A first-time contributor wants to change a lesson. They have a fresh checkout and can run npm, but do not know which file drives the site or how to tell whether their change worked.

**Assignment.** Lead them through one small edit, local verification and a reviewable handoff. Include a recovery path for a failed course test.

**Editing technique.** Anchor each action to a file, command or screen the newcomer can find. Tell them what successful verification looks like.

**Peer review.** Can a contributor complete this without already knowing the directory layout? Have them identify the edited source, confirm the rendered link and describe the change to a reviewer.

[Open the design a first-contribution guide workshop](../practice/onboarding.md)

### Publish an experiment note

A documentation team measured time to find an installation command. Three readers tried the original page and three different readers tried a revision. Their times in seconds were 42, 60, 48 and 30, 28, 35 respectively.

**Assignment.** Report the question, method, raw observations, median and one limitation. Propose a next experiment that addresses the limitation.

**Editing technique.** Sort each set of three values to find its middle observation. Keep the measured difference separate from the explanation for it.

**Peer review.** Another reader can recompute both medians from the page and explain why this trial alone does not establish causation.

[Open the publish an experiment note workshop](../practice/experiment-note.md)

### Write a support troubleshooting article

A learner says their edited lesson has disappeared after switching devices. Drafts live in browser storage, and resetting the page can remove the saved work.

**Assignment.** Write a symptom-led article. Start with checks that preserve the learner’s remaining copy. Make the distinction between refreshing a page and resetting a draft explicit.

**Editing technique.** Translate a complaint into an observable symptom. Put any action that could discard evidence after preservation steps.

**Peer review.** A reader with a surviving draft can recover it without an irreversible first step. A reader with cleared storage gets a realistic next action.

[Open the write a support troubleshooting article workshop](../practice/support-article.md)

### Write a version migration plan

The fictional Field Notes CLI replaces --output with --out. A team runs exports from a scheduled job and wants a rehearsal before upgrading that job.

**Assignment.** Create an operator checklist that covers discovery, rehearsal, cutover, acceptance and rollback. Use a separate destination for the trial.

**Editing technique.** A successful exit alone cannot prove that the data is complete. Pair each operational step with observable evidence.

**Peer review.** A teammate can rehearse without overwriting production output, recognize incomplete results and restore both parts of the previous configuration.

[Open the write a version migration plan workshop](../practice/migration-plan.md)

## Build a GitHub profile README

Open the [profile workshop](../practice/profile-readme.md). In the app, choose **Build from my details**. Enter a name, the problems you work on and a link to one project. Generate the draft, edit the Markdown, inspect the preview and download the result as `README.md`. The exported file contains your latest source edits.

Give readers a reason to follow the project link. “Added an example that gets a first-time contributor from clone to a passing test” describes a contribution a reader can inspect. A long list of tool badges gives them less to go on. Keep an image optional and write a description that makes sense if it never loads.

To publish on a personal GitHub profile, put the nonempty file at the root of a public repository named exactly like your username. For example, a user called mira would put it in the mira repository under that account. GitHub's profile README feature is unavailable for managed user accounts. Publishing is a separate step you control. [GitHub's profile README guide](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme)

## Turn one observation into three documents

Suppose a worker resumes after a pause and clears 120 queued jobs in four minutes. A reviewer wants the measurement and what changed. An operator wants a trigger, a check and an escalation point. A release-note reader wants to know whether they need to do anything. Try using the same [queue chart](../media/queue-depth.png) for all three, then change the caption for each audience.

## Follow a change from report to release

Use the fictional search interface from the issue workbook. A user searches for “fern”, sees two matches, then selects Clear. The list empties while the count still reads two. Write the following documents in order. Each handoff should preserve the facts its next reader needs.

1. **Issue.** Capture the sample index, search term and observable mismatch. “Count still shows 2 after Clear” gives the maintainer a repeatable check. A guess about caching belongs in a separate investigation note. [Write the issue](../practice/bug-report.md).
2. **Pull request.** Link the issue and describe the acceptance check. Add a second check for a pending search that resolves after Clear. State whether you ran that check or still need a reviewer to run it. [Prepare the review](../practice/pull-request.md).
3. **Release entry.** Write one sentence about the user-visible change. “Clearing a search now resets the result count immediately” is sufficient for a fix with no migration. Compare that entry with the command-line breaking change in the [changelog workshop](../practice/changelog.md).
4. **Support answer.** Start from the symptom a user can recognize. Tell them how to identify the version containing the fix and repeat the check. If the symptom persists, request the version and minimal reproduction. Practice organizing that kind of branching advice in the [support workshop](../practice/support-article.md).

**Revision drill.** Suppose the reviewer finds that rapidly searching again still reproduces the stale count. Update the issue with the new sequence and the PR with the open check. Hold the release claim until the verification matches it. Compare the four drafts and underline every sentence that depends on evidence someone else must supply.

## Turn a decision into durable documentation

Imagine the team agrees to store versioned screenshots beside a manual. A meeting note captures who agreed and who will move the files. A decision record preserves the constraint that led to the choice. A how-to page teaches the contributor where to put the next screenshot. Use the same example image for all three.

| Document | A sentence worth keeping | Review question |
| --- | --- | --- |
| Meeting note | Mira will move the version 2 setup image by Friday. | Can the owner recognize when the task is complete? |
| Decision record | The manual and its screenshot must describe the same checked-out release. | Could a later maintainer explain the storage choice after the original team leaves? |
| Contributor how-to | Put the screenshot beside the guide and preview its relative link from the guide’s own directory. | Can a new contributor verify the result from a fresh checkout? |

Draft the [meeting note](../practice/meeting-notes.md), then write the [decision record](../practice/decision-record.md) and [how-to](../practice/how-to.md). Move the guide one directory deeper as a final exercise. Identify which link needs a new path and which parts of the decision remain valid.

## Review a finished document

Give the draft to someone in its intended audience. Ask them to perform the task while you observe silently. Record the first heading they choose, the first point at which they have to guess and the evidence they use to declare success. If they choose the wrong section, revise the heading. If they choose the right section but cannot act, add the missing prerequisite or example. If they finish without knowing whether it worked, add an acceptance check. Run the same task again with the revised document.

## Move between publishers

Repository READMEs and wikis can resolve relative links from different directories. Issue comments have no file location in your checkout, so use a repository permalink for a file you cite there. An editor for a docs site may read front matter to populate navigation. A notebook may pair a Markdown cell with computed output in a separate code cell. Check what happens to code, assets and links in the destination preview before publishing.

Continue to the [media lab](media.md) to work with repository images, video and text fallbacks.
