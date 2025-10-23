# Back-of-the-Envelope Estimation

## Introduction

Back-of-the-envelope estimation is the practice of using simplified assumptions and calculations to quickly arrive at a rough estimate of a system's capacity needs. In a system design interview, this demonstrates your ability to think quantitatively and make data-informed decisions.

The goal is not to be perfectly accurate, but to be in the right "order of magnitude." These quick calculations will guide your choice of architecture, technology, and scaling strategies.

## Key Numbers to Know

You don't need to be a human calculator, but knowing a few key numbers will make your estimations much faster.

### Powers of 2
*   `2^10` = 1,024 ≈ 1 thousand (Kilo)
*   `2^20` = 1,048,576 ≈ 1 million (Mega)
*   `2^30` ≈ 1 billion (Giga)
*   `2^40` ≈ 1 trillion (Tera)

### Latency Numbers Every Programmer Should Know
*   Read 1 MB from memory: ~250 microseconds
*   Read 1 MB from SSD: ~1,000 microseconds (1 millisecond)
*   Round trip within same datacenter: ~500 microseconds (0.5 milliseconds)
*   Read 1 MB from disk: ~20,000 microseconds (20 milliseconds)
*   Round trip CA to Netherlands: ~150,000 microseconds (150 milliseconds)

**Key takeaway**: Reading from memory is thousands of times faster than reading from disk. Network calls within a datacenter are fast, but calls across continents are slow.

### Scale Numbers
*   **Users**: 1 million Daily Active Users (DAU) is a common starting point.
*   **Requests per second (RPS)**: A day has `24 * 60 * 60` ≈ 86,400 seconds ≈ 100,000 seconds.
*   **Storage Sizes**:
    *   `Integer`: 4 bytes
    *   `Character`: 1 byte (ASCII), 2-4 bytes (UTF-8)
    *   `Image`: ~200 KB
    *   `Video`: ~1 MB per minute

## Example: Estimating for a Twitter-like Service

Let's design a simple Twitter clone.

### Step 1: Clarify Assumptions
*   **Functional Requirements**: Users can post tweets (up to 280 chars) and view a timeline.
*   **Scale**:
    *   Total users: 500 million
    *   Daily Active Users (DAU): 100 million
    *   A user posts 2 tweets per day on average.
    *   A user reads 200 tweets per day on average.
*   **Data Retention**: Tweets are stored forever.

### Step 2: Calculate Traffic Estimates (QPS - Queries Per Second)

*   **Write QPS**:
    *   Total tweets per day = `100M users * 2 tweets/user/day` = `200M tweets/day`
    *   Write QPS = `200M tweets / 100,000 seconds/day` = `2,000 writes/sec`
*   **Read QPS**:
    *   Total tweet views per day = `100M users * 200 tweets/user/day` = `20B views/day`
    *   Read QPS = `20B views / 100,000 seconds/day` = `200,000 reads/sec`

*   **Read/Write Ratio**: `200,000 / 2,000` = `100:1`. The system is **read-heavy**. This immediately tells you that optimizing for reads (e.g., with aggressive caching) is critical.

### Step 3: Calculate Storage Estimates

*   **Size of a single tweet**:
    *   `tweet_id` (long): 8 bytes
    *   `user_id` (long): 8 bytes
    *   `text` (280 chars UTF-8): ~560 bytes
    *   `media_url` (string): ~100 bytes
    *   `timestamp`, etc: ~24 bytes
    *   **Total per tweet**: ~700 bytes ≈ `1 KB`
*   **Storage per day**:
    *   `200M tweets/day * 1 KB/tweet` = `200 GB/day`
*   **Storage after 5 years**:
    *   `200 GB/day * 365 days/year * 5 years` = `365,000 GB` = `365 TB`

### Step 4: Use the Estimates to Make Design Decisions

*   **Read-Heavy Nature**: A 100:1 read/write ratio screams for a caching layer. We should cache the home timelines for active users in something like Redis to avoid hitting the database for every timeline request.
*   **Storage Scale**: 365 TB is a lot of data. A single database server won't handle this. We'll need to use a distributed database and consider **sharding** the data (e.g., by `user_id` or `tweet_id`).
*   **Write QPS**: 2,000 writes/sec is significant but manageable for a sharded database.
*   **Read QPS**: 200,000 reads/sec is very high. This confirms that the database cannot serve this traffic directly. The cache must handle the vast majority of these reads.

These simple, rough calculations have already given us a clear high-level architecture: a write-through caching system in front of a sharded database.
