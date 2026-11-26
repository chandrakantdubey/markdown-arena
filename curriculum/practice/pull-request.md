# Prepare a PR for review

The example patch resets the result count when a search is cleared. Write a reviewer-facing summary, name one edge case, and supply a verification procedure.

## Starter

~~~~markdown
Reset count

Tests pass.
~~~~

## Hint

Separate behavioral evidence from the implementation summary. A reviewer should be able to repeat the check.

## Worked solution

~~~~markdown
# Reset the count when search is cleared

## Behavior

Clear now empties the result list and resets its count in the same update.

## Verify

1. Search a sample index for a term with two matches.
2. Clear the search. Both the list and count should be empty or zero respectively.
3. Clear again. The count should remain zero.

## Review focus

Check that a pending result from the previous search cannot restore a stale count.
~~~~

## Self-check

Does the description tell the reviewer which behavior changed, how to see it, and which asynchronous edge case deserves attention?
