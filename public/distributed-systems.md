# Distributed Systems

## Introduction

A distributed system is a collection of independent computers that appears to its users as a single coherent system. Instead of a single powerful machine (a monolith), a distributed system uses multiple, interconnected computers (nodes) that communicate and coordinate their actions by passing messages to one another.

Most modern, scalable backend applications are distributed systems. Microservice architectures, cloud-native applications, and large-scale databases are all examples of distributed systems. Building them requires a different mindset and presents unique challenges compared to single-machine applications.

## The CAP Theorem

The CAP Theorem is a fundamental principle for distributed data stores. It states that it is impossible for a distributed system to simultaneously provide more than two out of three guarantees: Consistency, Availability, and Partition Tolerance.

```mermaid
graph TD
    subgraph "Choose 2 of 3"
        C(Consistency) --- A(Availability);
        A --- P(Partition Tolerance);
        P --- C;
    end
    
    subgraph "Network Partition Occurs (P is a must)"
        direction LR
        subgraph "CP System (e.g., Finance)"
            CP_A[Node A] -- X -- CP_B[Node B];
            CP_ReadA(Read from A) --> CP_A;
            CP_ReadB(Read from B) --> CP_B;
            note right of CP_B "Node B becomes unavailable<br>to ensure consistency.<br>Favors Consistency over Availability."
        end
        subgraph "AP System (e.g., Social Media)"
            AP_A[Node A<br>Data: X=1] -- X -- AP_B[Node B<br>Data: X=2 (stale)];
            AP_ReadA(Read from A) --> AP_A;
            AP_ReadB(Read from B) --> AP_B;
            note right of AP_B "Node B responds with stale data.<br>It remains available.<br>Favors Availability over Consistency."
        end
    end
```
Since network partitions **(P)** are a fact of life, the real-world trade-off is between Consistency **(C)** and Availability **(A)**.
*   **CP (Consistent, Partition-Tolerant)**: Sacrifices availability to ensure all reads see the most recent data.
*   **AP (Available, Partition-Tolerant)**: Sacrifices consistency to ensure the system always responds, even if with stale data. This leads to **eventual consistency**.

## Resilient Communication Example

A key challenge is handling partial failures. When one service calls another, the call might fail due to a temporary network issue. A robust client must implement retry logic.

Here is a pseudo-code example of a resilient API call with retries, exponential backoff, and jitter.

```javascript
async function callServiceWithRetries(url, options, maxRetries = 3) {
  let attempt = 0;
  
  while (attempt < maxRetries) {
    try {
      // Make the actual API call
      const response = await fetch(url, options);

      if (response.ok) {
        return await response.json(); // Success!
      }

      // If it's a server error (5xx), we should retry
      if (response.status >= 500) {
        throw new Error(`Server error: ${response.status}`);
      }

      // If it's a client error (4xx), don't retry, it's a permanent failure
      return { error: `Client error: ${response.status}` };

    } catch (error) { // Catches network errors or thrown server errors
      attempt++;
      if (attempt >= maxRetries) {
        console.error("Max retries reached. Failing.");
        throw error;
      }
      
      // Calculate exponential backoff with jitter
      const baseDelay = 50 * Math.pow(2, attempt); // 100ms, 200ms, 400ms...
      const jitter = baseDelay * 0.2 * Math.random(); // Add up to 20% jitter
      const delay = baseDelay + jitter;
      
      console.log(`Attempt ${attempt} failed. Retrying in ${delay.toFixed(0)}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

## Common Challenges in Distributed Systems

*   **Network Latency**: Communication over a network is orders of magnitude slower than in-memory.
*   **Partial Failure**: One node can fail while others continue to run. The system must be resilient to these failures (e.g., using retries and circuit breakers).
*   **Time and Ordering**: There is no global clock. Determining the exact order of events across the system is a complex problem.
*   **Consensus**: Getting a group of nodes to agree on a state or value. This is solved by algorithms like **Raft** and **Paxos**.
*   **Data Replication and Partitioning**: Data is often replicated (copied) and partitioned (sharded) across multiple nodes for scalability and fault tolerance, which introduces consistency challenges.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html" target="_blank" rel="noopener noreferrer">A Critique of the CAP Theorem by Martin Kleppmann</a></li>
  <li><a href="https://raft.github.io/" target="_blank" rel="noopener noreferrer">Raft Consensus Algorithm</a></li>
  <li><a href="https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/" target="_blank" rel="noopener noreferrer">Timeouts, retries, and backoff with jitter (AWS Builders' Library)</a></li>
</ul>
</div>