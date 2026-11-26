# Record a design decision

A docs team needs stable screenshots for a versioned manual. Compare storing images with the manual against linking to a shared mutable folder. Record a decision and a condition for revisiting it.

## Starter

~~~~markdown
Screenshot storage
Use the repo?
~~~~

## Hint

Name a constraint that makes one option a better fit today. Give a future maintainer something measurable to revisit.

## Worked solution

~~~~markdown
# Store manual screenshots alongside the guide

**Status:** Accepted for the example manual.

## Context

A reader checking out version 1.2 needs screenshots that match its interface.

## Options

| Option | Benefit | Cost |
| --- | --- | --- |
| Commit images with the manual | A revision includes matching text and images | Binary history grows |
| Link to a shared folder | Authors can replace an image once | A replacement can change an older manual |

## Decision

Commit compressed screenshots beside the guide and reference them with relative paths.

## Revisit when

Measure checkout size after each release. Revisit hosting if images exceed the team’s agreed size budget.
~~~~

## Self-check

A reader can recover the original constraint, see a real downside of the chosen option, and tell when the choice should be reopened.
