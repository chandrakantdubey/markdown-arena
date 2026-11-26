# Give a rich feature a text fallback

Explain the throughput formula in ordinary text and compute the example for 120 requests in 4 seconds. Keep the math-source example available as literal code.

## Starter

~~~~markdown
$r = n/t$

120 requests, 4 seconds.
~~~~

## Hint

Choose units that make the result meaningful even without typeset math.

## Worked solution

~~~~markdown
Throughput is completed requests divided by elapsed seconds.

`120 / 4 = 30` requests per second.

Math-enabled publishers can typeset `$r = n/t$`.
~~~~

## Self-check

A reader can recover the formula and obtain 30 requests per second in plain text. The preview preserves the dollar-delimited source in a code span.
