### API (Application Programming Interface)
An API is a set of rules and protocols that allows different software applications to communicate with each other. In web development, it typically refers to an HTTP-based interface that a server exposes for clients (like a web browser or mobile app) to interact with its data and functionality.

### API Gateway
An API gateway is a server that acts as a single entry point into a system, particularly in a microservices architecture. It accepts all API calls, aggregates the various services required to fulfill them, and returns the appropriate result. It can also handle cross-cutting concerns like authentication, rate limiting, and logging.

### REST (Representational State Transfer)
An architectural style for designing networked applications. RESTful APIs are built around the concept of "resources" (like users or products) which can be manipulated using standard HTTP methods (GET, POST, PUT, DELETE). They are stateless, meaning each request from a client must contain all the information needed to complete it.

### CRUD (Create, Read, Update, Delete)
An acronym for the four basic functions of persistent storage. These are the fundamental operations for managing data in most applications. `POST` is often used for Create, `GET` for Read, `PUT`/`PATCH` for Update, and `DELETE` for Delete.

### JWT (JSON Web Token)
A compact, URL-safe means of representing claims to be transferred between two parties. In authentication, a server can generate a signed JWT after a user logs in. The client then sends this token with every subsequent request to prove its identity. This allows for stateless authentication.

### Middleware
Software that acts as a bridge between an operating system or database and applications, especially on a network. In web frameworks like Express.js, middleware refers to functions that are executed in the middle of the request-response cycle, allowing for tasks like logging, authentication, and error handling.

### Idempotent
An operation is idempotent if it can be applied multiple times without changing the result beyond the initial application. For example, `DELETE /users/123` is idempotent; calling it ten times has the same effect as calling it once. `POST /users`, which creates a new user, is not idempotent. Idempotency is a crucial concept for designing reliable and predictable APIs.

### Stateless
A communication protocol where the server does not store any session state about the client. Each request is treated as an independent transaction and must contain all necessary information. RESTful APIs are stateless, which simplifies server design and improves scalability.

### ACID
An acronym (Atomicity, Consistency, Isolation, Durability) for a set of properties of database transactions intended to guarantee validity even in the event of errors, power failures, etc. Relational databases like PostgreSQL and MySQL are known for their ACID compliance.

### Caching
The process of storing copies of data in a temporary, fast-access storage location (a "cache") to serve future requests for that data more quickly. This is a primary strategy for improving application performance and scalability.

### Caching Strategies
The patterns used to manage data in a cache, including how data is read from, written to, and invalidated in the cache. Common strategies include Cache-Aside (Lazy Loading), Read-Through, Write-Through, and Write-Back.

### CDN (Content Delivery Network)
A geographically distributed network of proxy servers and their data centers. A CDN is used to provide high availability and performance by distributing the service spatially relative to end-users. It is commonly used for caching static assets like images, CSS, and JavaScript files closer to users.

### CAP Theorem
A fundamental principle in distributed systems theory stating that it is impossible for a distributed data store to simultaneously provide more than two out of the following three guarantees: Consistency, Availability, and Partition Tolerance. Since network partitions are a reality, a system must choose between being CP (consistent and partition-tolerant) or AP (available and partition-tolerant).

### Consistent Hashing
A special kind of hashing such that when a hash table is resized, only a small number of keys need to be remapped on average. It is widely used in distributed systems like caches and databases to minimize data movement when servers are added or removed.

### DNS (Domain Name System)
The Internet's system for converting human-readable domain names (like `www.google.com`) into computer-readable Internet Protocol (IP) addresses (like `172.217.10.142`). It functions like a phone book for the internet.

### Index (Database)
A data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space to maintain the index structure. The most common type is a B-Tree index.

### IP Address (Internet Protocol Address)
A unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. It serves two main functions: host identification and location addressing.

### ISP (Internet Service Provider)
A company that provides individuals and organizations access to the internet and other related services.

### Load Balancer
A device or software that acts as a "traffic cop" sitting in front of your servers. It distributes network or application traffic across multiple servers to ensure no single server becomes a bottleneck, thereby improving responsiveness and availability.

### Message Queue
An intermediary component in a distributed system that allows services to communicate asynchronously. A producer service sends a message to the queue, and a consumer service retrieves and processes it. This decouples services, improves reliability, and helps manage load spikes.

### OSI Model
The Open Systems Interconnection (OSI) model is a conceptual framework that standardizes the functions of a telecommunication or computing system into seven abstract layers. Each layer serves the layer above it and is served by the layer below it, from the physical cable (Layer 1) to the application (Layer 7).

### Packet
A small unit of data transmitted over a network. When a large file is sent over the internet, it is broken down into many small packets. Each packet contains a portion of the data, as well as addressing information (like the source and destination IP addresses) and control information.

### Polling
A technique where a client repeatedly sends requests to a server to check for new data. This is a "pull" model and can be inefficient if updates are infrequent, as it generates many requests that may return no new information.

### Proxy
An intermediary server that acts on behalf of another computer. A "forward proxy" is used by clients to access the internet. A "reverse proxy" is used by servers to manage incoming client requests, often for load balancing, caching, or SSL termination.

### Push Model
An architecture where the server sends, or "pushes," data to the client as soon as it's available, without the client having to first request it. Technologies like WebSockets and Server-Sent Events (SSE) enable a push model, which is more efficient for real-time applications than polling.

### Replication
The process of creating and maintaining multiple copies of the same data on different servers. Replication improves data availability, fault tolerance, and read performance, as read requests can be distributed among multiple replicas.

### Router
A networking device that forwards data packets between computer networks. Routers perform the traffic directing functions on the Internet. A data packet is typically forwarded from one router to another through the networks that constitute an internetwork until it reaches its destination node.

### Sharding
A type of database partitioning that separates a very large database into smaller, faster, more easily managed parts called "shards." Each shard is a separate database, and data is partitioned across them (e.g., users A-M go to Shard 1, users N-Z go to Shard 2). This allows for horizontal scaling.

### TCP/IP (Transmission Control Protocol/Internet Protocol)
The foundational suite of communication protocols used to interconnect network devices on the internet. TCP is responsible for providing reliable, ordered, and error-checked delivery of a stream of bytes between applications, while IP is responsible for addressing hosts and routing packets from a source to a destination.

### WebSocket
A communication protocol that provides a full-duplex, persistent communication channel over a single TCP connection. It is used for real-time applications like live chat, multiplayer games, and streaming data, allowing both the client and server to send data to each other at any time.