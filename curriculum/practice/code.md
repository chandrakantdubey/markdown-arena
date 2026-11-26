# Write a copyable quick start

Format npm as an inline tool name. Fence the two shell commands as one shell block and keep the expected output in a separate text block.

## Starter

~~~~markdown
Install with npm.

npm ci
npm run dev

Expected output
Server ready
~~~~

## Hint

Close the shell fence before adding the expected-output label.

## Worked solution

~~~~markdown
Install with `npm`.

```sh
npm ci
npm run dev
```

Expected output

```text
Server ready
```
~~~~

## Self-check

The first copy button copies exactly two commands. Changing the language label can change highlighting while the copied characters stay the same.
