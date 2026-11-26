# Write a reproducible issue

A sample search UI shows an old result count after Clear. Give a maintainer the smallest repeatable procedure, an expected result and the observed result. Use fictitious data.

## Starter

~~~~markdown
Clear is broken. I searched for a word and the number looked wrong.
~~~~

## Hint

Name a visible symptom in the title. Include just enough initial state to make the result repeatable.

## Worked solution

~~~~markdown
# Clear leaves the previous result count visible

## Environment

Example app 1.4, fresh session, sample index with two documents containing `fern`.

## Steps

1. Search for `fern` and confirm the result count is 2.
2. Select **Clear**.
3. Inspect the count above the empty result list.

**Expected:** The count resets to 0.

**Observed:** The list clears but the count stays at 2.
~~~~

## Self-check

Hand the steps to someone with the sample index. They should know what to type, where to look, and exactly which value distinguishes success from failure.
