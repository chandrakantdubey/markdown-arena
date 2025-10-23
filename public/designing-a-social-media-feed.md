# Designing a Social Media Feed

Designing a news feed for a social media service like Twitter or Facebook is a common system design question. It involves handling large volumes of data, low-latency reads, and a "fan-out" problem where one user's action needs to be propagated to many followers.

## Step 1: Requirements

*   **Functional Requirements**:
    1.  Users can post content (e.g., tweets, posts).
    2.  Users can follow other users.
    3.  Users can view a "Home Timeline" feed, which contains a reverse-chronological list of posts from the people they follow.
*   **Non-Functional Requirements**:
    1.  **Low Latency**: Generating the feed should be very fast (e.g., < 200ms).
    2.  **High Scalability**: The system should handle millions of users and posts.
    3.  **Eventual Consistency**: It's acceptable if a new post takes a few seconds to appear in followers' feeds.

*   **Back-of-the-Envelope Estimation**:
    *   Assume 500 million Daily Active Users (DAU).
    *   Assume 100 million new posts per day.
    *   Write QPS: `100M / 86400s` ≈ `1200 writes/sec`.
    *   Assume average user has 100 followers.
    *   Feed generation is the main challenge. A naive approach would be very slow.

## Step 2: High-Level Design & Data Model

We need tables for users, followers, and posts.

*   `Users`: `user_id`, `name`, etc.
*   `Follows`: `follower_id`, `followee_id` (composite primary key).
*   `Posts`: `post_id`, `user_id`, `content`, `created_at`.

### The Naive Approach (Pull Model)

When a user requests their feed:
1.  Find all users the current user follows from the `Follows` table.
2.  Get the most recent posts from all those users from the `Posts` table.
3.  Sort these posts by `created_at` and return the top N.

**Problem**: This is incredibly slow and expensive. For a user following 500 people, this would involve many database lookups and a large sort operation *every time* they load their feed. This won't scale.

## Step 3: Deep Dive - The Push Model (Pre-computed Feeds)

To ensure low latency, we need to pre-compute the feeds. This is often called a **"fan-out on write"** approach.

```mermaid
graph TD
    A[User posts content] --> B{Post Service};
    B --> DB[(Posts DB)];
    B --> Q((Message Queue));
    
    Q --> FS{Feed Generation Service (Fan-out)};
    
    FS -- "For each follower" --> Cache[Timeline Cache (Redis)];
    
    C[Follower requests feed] --> GS{Feed Getter Service};
    GS --> Cache;

    style FS fill:#1b263b,stroke:#00f5d4,stroke-width:2px;
    style Cache fill:#1b263b,stroke:#ffc300,stroke-width:2px;
```

**Workflow:**
1.  **User A posts**: The post is written to the `Posts` database.
2.  **Publish Event**: The Post Service publishes an event like `post_created` with `user_id` and `post_id` to a **Message Queue** (e.g., Kafka). Using a queue decouples the posting action from the complex feed generation logic.
3.  **Fan-out Service**: A worker service consumes this event. It looks up all of User A's followers.
4.  **Inject into Timelines**: For each follower, the service injects the new `post_id` into a list stored in a cache (like Redis). We can use a Redis Sorted Set or List, with the key being the follower's `user_id`.
5.  **User B reads feed**: The application fetches the list of `post_id`s directly from the Redis cache for User B's timeline. It then "hydrates" these IDs with the full post content from the `Posts` DB or a post cache.

**Benefits**: Reading the feed is now a single, fast query to a cache.

### The "Celebrity" Problem

What if a user has 30 million followers? Fanning out a post to 30 million timelines would take a very long time and put immense load on the system.

**Solution: A Hybrid Approach**
1.  **For most users (< 10k followers)**: Use the push model described above.
2.  **For "celebrities"**: Do not fan out their posts.
3.  **Feed Generation**: When a regular user requests their feed:
    *   Fetch their pre-computed feed from Redis.
    *   Separately, check if they follow any celebrities.
    *   If so, fetch the latest posts from those celebrities.
    *   Merge the two lists in the application logic before returning to the user.

This hybrid model optimizes for the common case (regular users) while still handling the edge case (celebrities) gracefully.

## Step 4: Final Touches

*   **Caching**: Beyond the timeline cache, we should also cache the post objects themselves (mapping `post_id` to post content) to avoid hitting the main database. This is a crucial part of our **Caching Strategies**.
*   **Database Scaling**: The `Posts` and `Follows` tables will be huge. They will need **Data Partitioning**. `Posts` could be sharded by `user_id`, and `Follows` could be sharded by `follower_id`.
*   **Media**: User-uploaded images and videos should be stored in an object storage service like AWS S3, not in the database.
*   **CDN**: Use a **Content Delivery Network (CDN)** to serve media content and reduce latency.