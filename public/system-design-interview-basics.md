# System Design Interview Basics

## Introduction

A system design interview is a conversation where you are asked to design a large-scale system, such as a social media feed, a URL shortener, or a ride-sharing service. The goal is not to produce a perfect, detailed blueprint. Instead, the interviewer wants to evaluate your ability to:

*   **Gather Requirements**: Ask clarifying questions and define the scope of the problem.
*   **Structure a Problem**: Break down a large, ambiguous problem into smaller, manageable components.
*   **Trade-offs Analysis**: Discuss the pros and cons of different technologies and architectural choices.
*   **Broad Technical Knowledge**: Demonstrate your understanding of core concepts like scalability, reliability, and performance.
*   **Communication**: Clearly articulate your ideas and justify your decisions.

## A 4-Step Framework for Any System Design Question

Following a structured approach will help you stay on track and ensure you cover all the important aspects.

### Step 1: Understand the Problem and Establish Design Scope (5-10 minutes)

This is the most critical step. Do not jump into designing a solution. First, you must clarify the problem.

*   **Clarify Functional Requirements**: What are the core features of the system?
    *   *Example (for a URL shortener)*: "Should we just support creating and redirecting short URLs, or do we also need features like custom URLs and analytics?"
    *   *Example (for a chat app)*: "Is this a 1-on-1 chat, a group chat, or both? Do we need to support features like online status and typing indicators?"
*   **Clarify Non-Functional Requirements**: What are the system's expected characteristics?
    *   **Scale**: How many users will we have? (e.g., 100 million daily active users)
    *   **Performance/Latency**: How fast should the system be? (e.g., redirects should happen in under 100ms)
    *   **Availability**: Does the system need to be highly available? (e.g., 99.99% uptime)
    *   **Consistency**: Is strong consistency or eventual consistency acceptable?
*   **Perform Back-of-the-Envelope Estimation**: Use the scale requirements to estimate traffic, storage, and bandwidth. This will inform your design choices later.

### Step 2: High-Level Design (10-15 minutes)

Outline the main components of your system and how they interact. Draw a simple box-and-arrow diagram.

*   **Identify Core Components**: What are the main services or layers? (e.g., Client, API Gateway, Application Servers, Load Balancer, Database, Cache).
*   **API Design**: Define the primary API endpoints.
    *   *Example (URL shortener)*:
        *   `POST /api/v1/shorten` - Creates a short URL.
        *   `GET /{short_url}` - Redirects to the long URL.
*   **Data Model**: Sketch out the basic database schema.
    *   *Example (URL shortener)*: A simple table with `short_url` (primary key), `long_url`, `user_id`, and `created_at`.
*   **Initial Diagram**:
    ```mermaid
    graph TD
        User --> LB[Load Balancer];
        LB --> AppServers[Application Servers];
        AppServers <--> Cache[Cache (e.g., Redis)];
        AppServers --> DB[(Database)];
    ```

### Step 3: Deep Dive into Specific Components (15-20 minutes)

This is where you'll spend the bulk of the interview. The interviewer will likely guide you toward a specific area of interest. Be prepared to discuss the trade-offs of your choices.

*   **Database Choice**: Why did you choose SQL vs. NoSQL? How will you handle scaling the database (e.g., replication, sharding)?
*   **Scaling the Application Layer**: How will you handle millions of concurrent users? (Stateless servers, horizontal scaling, load balancing).
*   **Caching Strategy**: Where would you introduce a cache? What data would you cache? What are the cache invalidation or eviction strategies?
*   **Specific Algorithms**: For a URL shortener, how do you generate a unique short code? For a social feed, how do you generate the feed for a user?
*   **Communication**: Will services communicate synchronously (REST, gRPC) or asynchronously (message queues)?

### Step 4: Identify Bottlenecks and Wrap Up (5 minutes)

*   **Identify Potential Issues**: Acknowledge the potential bottlenecks in your design (e.g., a single point of failure, a database that might get overloaded).
*   **Discuss Further Improvements**: Mention how you would address these issues in the future.
    *   "To improve availability, we could add read replicas for our database."
    *   "To reduce latency for global users, we could use a CDN."
    *   "We would need to add robust logging, monitoring, and alerting to understand the system's health in production."
*   **Summarize**: Briefly recap your design and the key decisions you made.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://github.com/donnemartin/system-design-primer" target="_blank" rel="noopener noreferrer">System Design Primer on GitHub</a></li>
  <li><a href="https://www.youtube.com/c/GauravSensei" target="_blank" rel="noopener noreferrer">Gaurav Sen's System Design YouTube Channel</a></li>
</ul>
</div>
