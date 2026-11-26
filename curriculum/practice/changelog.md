# Write release notes for an upgrade

The sample CLI renamed --output to --out in version 2.0. Write a changelog entry explaining who must act and show one migrated command.

## Starter

~~~~markdown
2.0
Changed output flag.
~~~~

## Hint

Write for the person upgrading an existing script. Show a complete command they can adapt.

## Worked solution

~~~~markdown
## 2.0.0

### Breaking changes

Scripts that pass `--output` must switch to `--out`. Calls that rely on the default output path need no edits.

```sh
field-notes export --out notes.md
```

After upgrading, run the command and check that `notes.md` appears at the expected location.
~~~~

## Self-check

An upgrader can identify the affected scripts, the replacement flag, and the output file to verify.
