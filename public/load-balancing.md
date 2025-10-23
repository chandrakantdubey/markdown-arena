# Load Balancing

## Introduction

A load balancer is a critical component in most scalable architectures. It acts as a "traffic cop" for your servers. It sits in front of your server fleet and routes client requests across all servers capable of fulfilling those requests in a manner that maximizes speed and capacity utilization and ensures that no one server is overworked, which could degrade performance.

If a single server goes down, the load balancer redirects traffic to the remaining online servers. When a new server is added to the server group, the load balancer automatically starts to send requests to it.

```mermaid
graph TD
    subgraph "Without Load Balancer"
        U1(User 1) --> S1[Server (Overloaded)];
        U2(User 2) --> S1;
        U3(User 3) --> S1;
    end
    
    subgraph "With Load Balancer"
        U4(User 4) --> LB{Load Balancer};
        U5(User 5) --> LB;
        U6(User 6) --> LB;
        LB --> S2[Server A];
        LB --> S3[Server B];
        LB --> S4[Server C];
    end
```

In short, a load balancer performs the following functions:
*   Distributes client requests efficiently across multiple servers.
*   Ensures high availability and reliability by sending requests only to servers that are online.
*   Provides the flexibility to add or subtract servers as demand dictates (enabling horizontal scaling).

## L4 vs. L7 Load Balancing

Load balancers are often categorized based on the OSI model layer at which they operate. The two most common types are L4 and L7.

*   **Layer 4 (Transport Layer) Load Balancer**:
    *   **How it works**: Makes routing decisions based on information from the transport layer, primarily the source/destination IP addresses and ports from a TCP packet. It doesn't inspect the content of the traffic.
    *   **Pros**: Very fast and simple.
    *   **Cons**: Not "content-aware." It cannot make routing decisions based on the type of request (e.g., route `/api/videos` to video servers and `/api/images` to image servers).

*   **Layer 7 (Application Layer) Load Balancer**:
    *   **How it works**: Makes routing decisions based on application-layer information, such as the HTTP method, path, headers, or cookies. It can inspect the content of the message.
    *   **Pros**: Much more intelligent. Can implement advanced routing rules. Can also handle tasks like SSL termination and cookie-based session persistence.
    *   **Cons**: Slower than L4 because it has to do more work.
    *   **This is the most common type used for modern web applications.**

## Load Balancing Algorithms

Load balancers use various algorithms to decide which backend server to send a request to.

*   **Round Robin**: Distributes requests to servers sequentially. The first request goes to Server A, the second to Server B, the third to Server C, the fourth back to A, and so on. It's simple but doesn't account for server load.
*   **Least Connection**: Sends the next request to the server that currently has the fewest active connections. This is a smarter approach than Round Robin, as it accounts for the fact that some requests may take longer than others.
*   **IP Hash**: A hash of the client's IP address is calculated to determine which server receives the request. This ensures that a user will consistently connect to the same server, which can be useful for stateful applications (though stateless is preferred).
*   **Least Response Time**: Sends the request to the server with the fewest active connections and the lowest average response time.

## Health Checks

A load balancer should not send traffic to a server that is unhealthy or offline. To manage this, load balancers continuously perform **health checks**. They periodically send a small request (e.g., pinging a `/health` endpoint) to each server. If a server fails to respond correctly, the load balancer temporarily removes it from the pool of available servers until it becomes healthy again.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://www.nginx.com/resources/glossary/load-balancing/" target="_blank" rel="noopener noreferrer">What is Load Balancing? by NGINX</a></li>
  <li><a href="https://aws.amazon.com/what-is/load-balancing/" target="_blank" rel="noopener noreferrer">What is Load Balancing? by AWS</a></li>
</ul>
</div>