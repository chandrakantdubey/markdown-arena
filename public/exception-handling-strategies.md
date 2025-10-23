# Exception Handling Strategies

## Introduction

While basic error handling deals with identifying and reporting errors, advanced exception handling strategies focus on building resilience and fault tolerance into your system. In distributed systems, failures are not exceptional; they are expected. Services can become unavailable, networks can be unreliable, and requests can time out.

A robust backend must be designed to handle these transient failures gracefully, ensuring that the system as a whole remains stable and available. This involves implementing patterns that allow the system to automatically recover from or work around temporary issues.

## The Circuit Breaker Pattern

The Circuit Breaker pattern prevents an application from repeatedly trying to execute an operation that is likely to fail, which protects both the client from wasting resources and the downstream service from being overwhelmed.

```mermaid
stateDiagram-v2
    direction LR
    
    state "Requests Flow" as Closed
    state "Requests Blocked" as Open
    state "One Request Allowed" as HalfOpen
    
    [*] --> Closed: Initial State
    
    Closed --> Open: Failure threshold exceeded
    note on link
        e.g., >50% errors
        in last 10 seconds
    end note

    Open --> HalfOpen: After timeout
    note on link
        e.g., wait 30 seconds
    end note
    
    HalfOpen --> Closed: Trial request succeeds
    HalfOpen --> Open: Trial request fails
    
    Closed --> Closed: Requests succeed
```
*   **Closed**: Requests are passed through. If failures exceed a threshold, the circuit "trips" to Open.
*   **Open**: Requests fail immediately for a set timeout period, giving the downstream service time to recover.
*   **Half-Open**: After the timeout, one trial request is let through. Success closes the circuit; failure opens it again.

## Retry with Exponential Backoff and Jitter

This is the most common and effective pattern for handling transient network failures. Instead of retrying immediately, the client waits for an increasing amount of time between attempts.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="nodejs">Node.js</button>
    <button class="tab-button" data-lang="python">Python</button>
    <button class="tab-button" data-lang="go">Go</button>
  </div>
  <div class="tab-content active" data-lang="nodejs">
<pre><code class="language-javascript">
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function callWithRetry(fn, maxRetries = 3, initialDelay = 100) {
  let attempt = 0;
  while (true) {
    try {
      return await fn(); // Attempt the operation
    } catch (error) {
      attempt++;
      if (attempt >= maxRetries || error.isPermanent) {
        console.error("Max retries reached or permanent error. Failing.");
        throw error;
      }
      
      const delay = initialDelay * Math.pow(2, attempt - 1);
      const jitter = delay * 0.2 * (Math.random() - 0.5); // +/- 10% jitter
      const waitTime = delay + jitter;
      
      console.log(`Attempt ${attempt} failed. Retrying in ${waitTime.toFixed(0)}ms...`);
      await wait(waitTime);
    }
  }
}

// Usage:
// const data = await callWithRetry(() => fetch('https://api.example.com/data'));
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
import time
import random

def call_with_retry(fn, max_retries=3, initial_delay=0.1):
    attempt = 0
    while True:
        try:
            return fn() # Attempt the operation
        except Exception as e:
            attempt += 1
            if attempt >= max_retries:
                print("Max retries reached. Failing.")
                raise e

            delay = initial_delay * (2 ** (attempt - 1))
            jitter = delay * 0.2 * (random.random() - 0.5) # +/- 10% jitter
            wait_time = delay + jitter
            
            print(f"Attempt {attempt} failed. Retrying in {wait_time:.2f}s...")
            time.sleep(wait_time)

# Usage:
# import requests
# def fetch_data():
#     response = requests.get('https://api.example.com/data')
#     response.raise_for_status() # Raises an exception for 4xx/5xx errors
#     return response.json()
#
# data = call_with_retry(fetch_data)
</code></pre>
  </div>
  <div class="tab-content" data-lang="go">
<pre><code class="language-go">
package main

import (
	"fmt"
	"math"
	"math/rand"
	"time"
)

func CallWithRetry(fn func() error, maxRetries int, initialDelay time.Duration) error {
	var err error
	for attempt := 0; attempt < maxRetries; attempt++ {
		err = fn()
		if err == nil {
			return nil // Success
		}

		delay := float64(initialDelay) * math.Pow(2, float64(attempt))
		jitter := delay * 0.2 * (rand.Float64() - 0.5) // +/- 10% jitter
		waitTime := time.Duration(delay + jitter)

		fmt.Printf("Attempt %d failed. Retrying in %v...\n", attempt+1, waitTime)
		time.Sleep(waitTime)
	}
	return fmt.Errorf("failed after %d attempts: %w", maxRetries, err)
}

// Usage:
// import "net/http"
// err := CallWithRetry(func() error {
//     resp, err := http.Get("https://api.example.com/data")
//     if err != nil { return err }
//     if resp.StatusCode >= 500 { return fmt.Errorf("server error") }
//     return nil
// }, 3, 100*time.Millisecond)
</code></pre>
  </div>
</div>

## Other Strategies
*   **Graceful Degradation (Fallbacks)**: If a call to a non-essential service fails, provide a default or cached response instead of an error. For example, if a "Recommended Products" service is down, show a generic list of best-sellers instead of crashing the page.
*   **Timeouts**: Never wait forever. Every network request should have a configured timeout to prevent a slow service from holding up resources in your application.

## Best Practices
*   **Combine Patterns**: These strategies work best together. A common combination is to wrap a service call in a Circuit Breaker, and within that, use a Retry with Exponential Backoff policy.
*   **Configure Sensibly**: Tune the thresholds for these patterns (number of retries, timeouts, etc.) based on the specific service's characteristics.
*   **Log and Monitor**: When a circuit breaker opens or a request fails after all retries, it's a significant event that should be logged and potentially trigger an alert.