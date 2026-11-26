# Write a version migration plan

The fictional Field Notes CLI replaces --output with --out. A team runs exports from a scheduled job and wants a rehearsal before upgrading that job. Create an operator checklist that covers discovery, rehearsal, cutover, acceptance and rollback. Use a separate destination for the trial.

## Starter

~~~~markdown
# Upgrade

Install the new version and see if it works.
~~~~

## Hint

A successful exit alone cannot prove that the data is complete. Pair each operational step with observable evidence.

## Worked solution

~~~~markdown
# Migrate the scheduled export

## Inventory

- [ ] Find scheduled calls that pass `--output`.
- [ ] Record the current package version, command and destination.

## Rehearse

With version 2 in an isolated environment, run `field-notes export --out trial.md` against the same sample input. Compare the headings and record counts with an export from version 1. Keep the existing scheduled output intact.

## Cut over

Update the pinned version and flag together. Monitor the first scheduled run. Accept the change when the job exits successfully and the expected records appear in the normal destination.

## Roll back

If the job fails or output is incomplete, restore the recorded version and command together. Rerun on the sample input and confirm the original output shape before resuming the schedule.
~~~~

## Self-check

A teammate can rehearse without overwriting production output, recognize incomplete results and restore both parts of the previous configuration.
