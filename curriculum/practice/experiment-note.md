# Publish an experiment note

A documentation team measured time to find an installation command. Three readers tried the original page and three different readers tried a revision. Their times in seconds were 42, 60, 48 and 30, 28, 35 respectively. Report the question, method, raw observations, median and one limitation. Propose a next experiment that addresses the limitation.

## Starter

~~~~markdown
# Results

The new page is faster.
~~~~

## Hint

Sort each set of three values to find its middle observation. Keep the measured difference separate from the explanation for it.

## Worked solution

~~~~markdown
# Can readers find the install command?

## Method

Six readers each started on one version of the README. Timing stopped when the reader selected the install command. Each group had three readers.

| Version | Times (seconds) | Median (seconds) |
| --- | --- | ---: |
| Original | 42, 60, 48 | 48 |
| Revised | 30, 28, 35 | 30 |

The observed median was 18 seconds lower on the revision. The groups were small and used different readers, so prior experience could explain part of the difference.

## Next trial

Recruit more readers, record experience levels and randomly assign the page version before measuring the same task.
~~~~

## Self-check

Another reader can recompute both medians from the page and explain why this trial alone does not establish causation.
