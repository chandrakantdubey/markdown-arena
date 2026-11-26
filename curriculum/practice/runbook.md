# Write a queue recovery runbook

Use the sample recovery transcript to write a short operator procedure. State the trigger, ordered observations, completion condition and handoff if the backlog stops falling.

## Starter

~~~~markdown
Queue recovery
Workers are back. Watch the chart.
~~~~

## Hint

Distinguish the illustrative numbers from the conditions you would set for a real service.

## Worked solution

~~~~markdown
# Verify a recovering queue

## Start when

Workers have resumed and the queue still contains waiting jobs.

## Observe

1. Record the starting backlog and time.
2. Sample the depth once per minute for four minutes.
3. Compare with the [example recovery transcript](../media/queue-recovery.txt).

## Decide

In the example, the depth falls from 120 to 0. Mark the sample recovery complete at zero. If the depth stays flat or grows for two samples, send the readings and worker status to the on-call owner.
~~~~

## Self-check

A second operator can tell when to start, how frequently to sample and what evidence belongs in a handoff.
