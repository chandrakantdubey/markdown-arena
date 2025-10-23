# API Rate Limiting and Throttling

## Introduction

Rate limiting and throttling are crucial mechanisms for controlling the amount of incoming traffic to an API. They are essential for protecting your backend services from abuse, ensuring fair usage among all clients, and maintaining the stability and availability of your application.

-   **Rate Limiting**: The practice of controlling the rate of requests sent or received by a network interface controller. It's about setting a hard limit on how many requests a client can make in a given time window.
-   **Throttling**: The process of controlling the usage of an API by managing the rate of request processing. While similar to rate limiting, throttling often implies smoothing out traffic spikes to ensure the server can process requests at a steady pace.

In practice, these terms are often used interchangeably to describe techniques for controlling API traffic.

## Core Concepts and Strategies

### Why Implement Rate Limiting?

1.  **Prevent Abuse**: Malicious actors or poorly configured clients can flood your API with requests, leading to a Denial-of-Service (DoS) attack. Rate limiting is a primary defense.
2.  **Ensure Fair Usage**: In a multi-tenant system, you want to prevent a single user from consuming all the resources and degrading the service for others.
3.  **Manage Costs**: Many backend services (databases, third-party APIs) have usage-based pricing. Rate limiting helps control these costs by capping the number of operations.
4.  **Maintain Performance**: By preventing traffic spikes from overwhelming your servers, you ensure a stable and predictable performance for your application.

### The Token Bucket Algorithm

The Token Bucket algorithm is a popular and effective way to implement rate limiting. It allows for bursts of traffic while still enforcing an average rate.

```mermaid
graph TD
    A[Requests] --> B{Token Bucket};
    C(Token Refill) -- at fixed rate --> B;
    
    subgraph "Request Processing"
        direction LR
        B -- "Token available?" --> D{Decision};
        D -- "Yes" --> E[Accept Request & Decrement Token];
        D -- "No" --> F[Reject Request (429)];
    end

    style B fill:#1b263b,stroke:#ffc300,stroke-width:2px;
    style E fill:#2a9d8f20,stroke:#2a9d8f;
    style F fill:#e76f5120,stroke:#e76f51;
```
*   **How it works**: A "bucket" has a certain capacity of tokens. Each incoming request consumes one token. If the bucket is empty, the request is rejected. Tokens are replenished at a fixed rate, up to the bucket's capacity.

## Implementation Examples

Here are simple examples of an in-memory rate limiter implemented as middleware. For production, you would use a distributed store like Redis to share the rate limit state across multiple servers.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="nodejs">Node.js (Express)</button>
    <button class="tab-button" data-lang="python">Python (Flask)</button>
    <button class="tab-button" data-lang="go">Go (net/http)</button>
  </div>
  <div class="tab-content active" data-lang="nodejs">
<pre><code class="language-javascript">
const express = require('express');
const app = express();

const requests = new Map();
const RATE_LIMIT = 100; // max requests
const TIME_WINDOW = 60 * 1000; // 1 minute in ms

const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    const userRequests = requests.get(ip) || [];
    // Filter out requests that are outside the time window
    const requestsInWindow = userRequests.filter(ts => ts > now - TIME_WINDOW);
    
    if (requestsInWindow.length >= RATE_LIMIT) {
        return res.status(429).send('Too Many Requests');
    }
    
    // Add current request timestamp
    requestsInWindow.push(now);
    requests.set(ip, requestsInWindow);
    
    next();
};

app.use(rateLimiter);

app.get('/', (req, res) => {
    res.send('You have reached the API.');
});

app.listen(3000, () => console.log('Server running on port 3000'));
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
import time
from flask import Flask, request, abort
from collections import defaultdict

app = Flask(__name__)

requests = defaultdict(list)
RATE_LIMIT = 100  # max requests
TIME_WINDOW = 60  # 1 minute in seconds

@app.before_request
def rate_limiter():
    ip = request.remote_addr
    now = time.time()
    
    user_requests = requests[ip]
    # Filter out requests that are outside the time window
    requests_in_window = [ts for ts in user_requests if ts > now - TIME_WINDOW]
    
    if len(requests_in_window) >= RATE_LIMIT:
        abort(429)  # Too Many Requests
        
    requests_in_window.append(now)
    requests[ip] = requests_in_window

@app.route('/')
def index():
    return 'You have reached the API.'

if __name__ == '__main__':
    app.run(port=5000)
</code></pre>
  </div>
  <div class="tab-content" data-lang="go">
<pre><code class="language-go">
package main

import (
	"fmt"
	"net/http"
	"sync"
	"time"
)

var (
	requests      = make(map[string][]int64)
	mu            sync.Mutex
	RateLimit     = 100
	TimeWindowSec = 60
)

func rateLimiter(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		mu.Lock()
		defer mu.Unlock()

		ip := r.RemoteAddr
		now := time.Now().Unix()

		userRequests, ok := requests[ip]
		if !ok {
			userRequests = []int64{}
		}

		// Filter out requests that are outside the time window
		var requestsInWindow []int64
		for _, ts := range userRequests {
			if ts > now-int64(TimeWindowSec) {
				requestsInWindow = append(requestsInWindow, ts)
			}
		}

		if len(requestsInWindow) >= RateLimit {
			http.Error(w, "Too Many Requests", http.StatusTooManyRequests)
			return
		}

		requestsInWindow = append(requestsInWindow, now)
		requests[ip] = requestsInWindow

		next.ServeHTTP(w, r)
	})
}

func mainHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("You have reached the API."))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", mainHandler)

	fmt.Println("Server running on port 8080")
	http.ListenAndServe(":8080", rateLimiter(mux))
}
</code></pre>
  </div>
</div>

### Communicating Limits to Clients

It's a best practice to inform clients about the rate limits. This is typically done via HTTP response headers:
*   `X-RateLimit-Limit`: The total number of requests allowed in the current window.
*   `X-RateLimit-Remaining`: The number of requests remaining in the current window.
*   `X-RateLimit-Reset`: The time (in UTC epoch seconds) when the limit will reset.
*   `Retry-After`: When a client is rate-limited (receives a `429 Too Many Requests` status), this header can tell them how long to wait before trying again.

## Best Practices
*   **Use a `429 Too Many Requests` Status Code**: This is the standard HTTP response for rate limiting.
*   **Use a Distributed Datastore**: For production systems with multiple server instances, use a fast, centralized store like Redis to track request counts.
*   **Implement in a Centralized Layer**: Use an API Gateway or a dedicated middleware to apply rate limiting consistently.
*   **Have Different Tiers**: Consider offering different rate limits for different user tiers (e.g., free vs. paid plans).
*   **Combine with a Backoff Strategy**: When clients get rate-limited, they should implement an exponential backoff strategy to reduce the frequency of their retries.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://konghq.com/blog/how-to-design-and-implement-a-restful-api-rate-limiting-strategy" target="_blank" rel="noopener noreferrer">API Rate Limiting Strategy by Kong</a></li>
  <li><a href="https://cloud.google.com/architecture/rate-limiting-strategies-techniques" target="_blank" rel="noopener noreferrer">Google Cloud: Rate Limiting Strategies</a></li>
</ul>
</div>