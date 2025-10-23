# Logging, Monitoring, and Observability

## Introduction

In modern backend systems, especially distributed ones, understanding what's happening inside your application is crucial for debugging, maintaining performance, and ensuring reliability. Logging, Monitoring, and Observability are related but distinct disciplines that provide this necessary insight.

-   **Logging**: Recording discrete, timestamped events. Logs answer "What happened at this specific moment?".
-   **Monitoring**: Collecting quantitative data about a system over time to watch for known failure modes. Monitoring answers "Is the system healthy?".
-   **Observability**: A measure of how well you can understand a system's internal state from its external outputs. It enables you to ask new questions about your system to debug unknown problems.

## The Three Pillars of Observability

Observability is often described as being built upon three main types of telemetry data.

```mermaid
graph TD
    O(Observability<br><em>Understanding your system</em>) --> L[Logs];
    O --> M[Metrics];
    O --> T[Traces];

    subgraph L [Logs]
        direction LR
        L1(Event<br>with context);
    end
    subgraph M [Metrics]
        direction LR
        M1(Aggregatable<br>Numeric Data);
    end
    subgraph T [Traces]
        direction LR
        T1(Request<br>Lifecycle);
    end

    note right of L "Detailed, specific events.<br>e.g., 'User 123 failed to login'"
    note right of M "High-level health indicators.<br>e.g., 'Login error rate is 5%'"
    note right of T "End-to-end request flow.<br>e.g., 'Login took 500ms, with 400ms spent in the Auth Service'"
```

### Structured Logging Examples

Plain text logs are hard for machines to parse. **Structured logs** (usually JSON) are the foundation of good logging.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="nodejs">Node.js (Pino)</button>
    <button class="tab-button" data-lang="python">Python (structlog)</button>
    <button class="tab-button" data-lang="go">Go (zerolog)</button>
  </div>
  <div class="tab-content active" data-lang="nodejs">
<pre><code class="language-javascript">
const pino = require('pino');
const logger = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
});

const userId = 123;
const orderId = 'abc-456';

// Log with context
logger.info({ userId, orderId }, 'User successfully placed an order.');
logger.warn({ userId }, 'User password is about to expire.');

// Produces JSON output like:
// {"level":30,"time":"...","pid":...,"hostname":"...","userId":123,"orderId":"abc-456","msg":"User successfully placed an order."}
// {"level":40,"time":"...","pid":...,"hostname":"...","userId":123,"msg":"User password is about to expire."}
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
import structlog

# Configure structlog to output JSON
structlog.configure(
    processors=[
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer(),
    ]
)
log = structlog.get_logger()

user_id = 123
order_id = "abc-456"

# Log with context
log.info("user_placed_order", user_id=user_id, order_id=order_id)
log.warning("password_expiry", user_id=user_id)

# Produces JSON output like:
# {"event": "user_placed_order", "user_id": 123, "order_id": "abc-456", "level": "info", "timestamp": "..."}
# {"event": "password_expiry", "user_id": 123, "level": "warning", "timestamp": "..."}
</code></pre>
  </div>
  <div class="tab-content" data-lang="go">
<pre><code class="language-go">
package main

import (
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"os"
)

func main() {
	// Use console writer for pretty printing in dev,
	// but default JSON logger in prod.
	// log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix

	userId := 123
	orderId := "abc-456"
	
	// Log with context
	log.Info().
		Int("userId", userId).
		Str("orderId", orderId).
		Msg("User successfully placed an order.")

	log.Warn().
		Int("userId", userId).
		Msg("User password is about to expire.")
}
// Produces JSON output like:
// {"level":"info","time":...,"userId":123,"orderId":"abc-456","message":"User successfully placed an order."}
// {"level":"warning","time":...,"userId":123,"message":"User password is about to expire."}
</code></pre>
  </div>
</div>

### The Four Golden Signals

A good starting point for **monitoring** a service:
1.  **Latency**: The time it takes to serve a request.
2.  **Traffic**: How much demand is being placed on your system (e.g., requests per second).
3.  **Errors**: The rate of requests that fail.
4.  **Saturation**: How "full" your service is (e.g., CPU utilization).

### Distributed Tracing
**Tracing** follows a single request as it travels through multiple microservices, helping pinpoint bottlenecks. When a request enters the system, it's assigned a unique **Trace ID**, which is propagated through all subsequent service calls.

## Best Practices
*   **Use Structured Logging**: Always log in JSON.
*   **Centralize Your Logs**: Ship logs from all services to a central platform (e.g., ELK Stack, Datadog).
*   **Add Context**: Include relevant IDs (request ID, user ID, trace ID) in every log message.
*   **Alert on Symptoms, Not Causes**: Alert on user-facing problems (e.g., "the site is slow") rather than underlying causes (e.g., "CPU is high").
*   **Instrument Your Code**: Adopt a framework like OpenTelemetry to add metrics and traces to your application.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://opentelemetry.io/docs/" target="_blank" rel="noopener noreferrer">OpenTelemetry Documentation</a></li>
  <li><a href="https://sre.google/sre-book/monitoring-distributed-systems/" target="_blank" rel="noopener noreferrer">Monitoring Distributed Systems (Google SRE Book)</a></li>
  <li><a href="https://prometheus.io/docs/introduction/overview/" target="_blank" rel="noopener noreferrer">Prometheus Documentation</a></li>
</ul>
</div>