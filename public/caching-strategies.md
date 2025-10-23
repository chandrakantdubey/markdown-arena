# Caching Strategies

## Introduction

Caching is arguably the single most important technique for improving the performance and scalability of a system. The core idea is simple: store the results of expensive operations and reuse them for subsequent, identical requests. By serving data from a fast, temporary storage layer (the cache), you can dramatically reduce latency and decrease the load on your backend systems.

A well-designed caching strategy involves multiple layers. Thinking about caching is not just about having a single Redis instance; it's about applying caching at every appropriate level of your application stack.

## The Cache Pyramid: Where to Cache

Data can be cached at various points between the user and the database. The closer the cache is to the user, the faster the response.

```mermaid
graph TD
    User --> Browser[1. Browser Cache];
    Browser --> CDN[2. Content Delivery Network (CDN)];
    CDN --> LB[3. Load Balancer / Reverse Proxy Cache];
    LB --> App[4. Application Layer Cache];
    App --> DB[5. Database Cache];
    App --> DS[(Data Source)];
```

### 1. Browser Cache
*   **What**: The user's own web browser can store copies of static assets (images, CSS, JS) and API responses.
*   **How**: Controlled by HTTP response headers sent from your server, primarily `Cache-Control`. For example, `Cache-Control: public, max-age=3600` tells the browser it can cache the response for one hour.
*   **Best for**: Static assets and data that doesn't change frequently.

### 2. Content Delivery Network (CDN)
*   **What**: A geographically distributed network of servers that cache content close to users.
*   **How**: When a user requests a file, they are directed to the nearest CDN "edge location." If the edge location has the file cached, it's served immediately. If not, the CDN fetches it from your origin server and caches it for future requests.
*   **Best for**: Static assets (the primary use case), and increasingly, for API responses that are the same for all users.

### 3. Web Server / Reverse Proxy Cache
*   **What**: A reverse proxy like Nginx or a dedicated cache server like Varnish can sit in front of your application servers and cache common responses.
*   **How**: Similar to a CDN, it intercepts requests and serves cached responses directly without hitting the application logic.
*   **Best for**: Caching entire pages or API responses for frequently accessed, non-personalized content.

### 4. Application Cache
*   **What**: Caching data within the application layer itself. This is the most common type of caching backend engineers work with.
*   **Types**:
    *   **In-Memory Cache (Local)**: Each application server maintains its own cache in its own memory. It's extremely fast but the cache is not shared between servers, leading to inconsistencies and redundant storage.
    *   **Distributed Cache (Remote)**: A separate, shared cache service that all application servers connect to. **Redis** and **Memcached** are the most popular choices. This is the standard for scalable systems.
*   **Best for**: The results of expensive database queries, computationally intensive results, or session data.

### 5. Database Cache
*   **What**: Your database itself has multiple layers of internal caching. For example, it caches frequently accessed data in memory to avoid slower disk reads.
*   **How**: This is mostly managed automatically by the database system, but you can influence it by ensuring you have enough RAM and by designing your queries efficiently.

## Core Caching Patterns
For a detailed look at implementation patterns like Cache-Aside, Write-Through, and cache eviction policies, please refer to the main **Caching** topic. The key decision is how to keep the cache consistent with the source of truth (the database). The most common pattern is **Cache-Aside with explicit invalidation**:
1.  **Read**: The application checks the cache. If data is present (hit), return it. If not (miss), fetch from the database, store in the cache, and then return.
2.  **Write**: The application updates the database *first*, and then sends a command to *delete* the corresponding entry from the cache. The next read will be a miss, which then repopulates the cache with fresh data.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://aws.amazon.com/caching/" target="_blank" rel="noopener noreferrer">What is Caching? by AWS</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching" target="_blank" rel="noopener noreferrer">HTTP Caching (MDN)</a></li>
</ul>
</div>