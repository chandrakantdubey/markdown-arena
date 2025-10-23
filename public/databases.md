# Databases

## Introduction

A database is an organized collection of structured information, or data, typically stored electronically in a computer system. For a backend engineer, the database is the heart of the application—it's where the application's state is stored, managed, and retrieved.

The choice of database technology has a profound impact on an application's performance, scalability, and complexity. Broadly, databases can be categorized into two main types: SQL (relational) and NoSQL (non-relational).

## Data Model Comparison: Relational vs. Document

The fundamental difference between SQL and a common type of NoSQL database lies in how they model data. Relational databases use a normalized structure with tables and relationships, while document databases use a denormalized, self-contained structure.

```mermaid
graph TD
    subgraph Relational Model (SQL)
        direction LR
        U[Users Table<br>id (PK), name, email] -->|one-to-many| O[Orders Table<br>id (PK), user_id (FK), date];
        O -->|many-to-many via join table| P[Products Table<br>id (PK), name, price];
    end

    subgraph Document Model (NoSQL)
        direction LR
        Doc[Order Document in Collection<br>{<br>  _id: "order-123",<br>  date: "...",<br>  user: { name: "Alice", email: "..." },<br>  products: [<br>    { name: "Laptop", price: 1200 },<br>    { name: "Mouse", price: 25 }<br>  ]<br>}]
    end
```

## SQL Databases (Relational)

SQL (Structured Query Language) databases store data in tables with predefined schemas. This rigid structure ensures data integrity and consistency.

*   **Key Concepts**: Schema, Tables, Rows, Columns, Primary/Foreign Keys, Normalization, Indexing.
*   **Examples**: PostgreSQL, MySQL, MariaDB, Microsoft SQL Server, Oracle.
*   **ACID Properties**: They are known for guaranteeing **A**tomicity, **C**onsistency, **I**solation, and **D**urability for transactions, which is crucial for reliability.

## NoSQL Databases (Non-Relational)

NoSQL databases emerged to handle large-scale data, high throughput, and flexible data models.

*   **Types of NoSQL Databases**:
    *   **Document Stores**: Store data in flexible, JSON-like documents. (e.g., MongoDB, Couchbase).
    *   **Key-Value Stores**: Store data as simple key-value pairs. Extremely fast for simple lookups. (e.g., Redis, Amazon DynamoDB).
    *   **Columnar Stores**: Store data in columns, not rows. Optimized for large-scale analytics. (e.g., Apache Cassandra, HBase).
    *   **Graph Stores**: Designed to store and navigate complex relationships. (e.g., Neo4j, Amazon Neptune).
*   **BASE Properties**: Many NoSQL systems favor **B**asically **A**vailable, **S**oft state, **E**ventual consistency over ACID, prioritizing availability and scalability.

## Use Case Matching: Choosing the Right Database

The choice is not about which is better, but which is the right tool for the job. Modern systems often use both (polyglot persistence).

| Use Case                        | Best Fit Database Type(s)  | Why?                                                                                                       |
| :------------------------------ | :------------------------- | :--------------------------------------------------------------------------------------------------------- |
| **Financial Transactions**      | Relational (SQL)           | ACID compliance is non-negotiable to ensure data integrity and consistency.                                |
| **E-commerce Product Catalog**  | Document or Relational     | A document store's flexible schema handles products with varying attributes well. SQL is also a strong choice. |
| **User Authentication System**  | Relational (SQL)           | Data is highly structured and relational (users, roles, permissions).                                      |
| **Real-time Chat or Leaderboard**| Key-Value (e.g., Redis)      | Blazing fast in-memory reads and writes are needed. Redis's sorted sets are perfect for leaderboards.    |
| **Content Management / Blogs**  | Document (e.g., MongoDB)   | The flexible, nested structure of documents is ideal for articles with varying fields, tags, and comments. |
| **Social Network Graph**        | Graph (e.g., Neo4j)        | Explicitly designed to handle complex relationships like "friend of a friend" efficiently.                   |
| **Time-Series Data (IoT, Logs)**| Columnar (e.g., Cassandra) | Optimized for high-volume writes and queries over time ranges, which is typical for this kind of data.      |

## Advanced Concepts

### Transactions and Isolation Levels

A **transaction** is a sequence of operations performed as a single logical unit of work. The **ACID** properties guarantee that transactions are processed reliably:
*   **Atomicity**: All operations in a transaction succeed, or none of them do. If one part fails, the entire transaction is rolled back.
*   **Consistency**: A transaction brings the database from one valid state to another.
*   **Isolation**: Concurrent transactions produce the same result as if they were executed serially. This is managed by **isolation levels**:
    *   **Read Uncommitted**: Lowest level. Allows dirty reads (reading uncommitted data).
    *   **Read Committed**: Prevents dirty reads. A transaction can only read data that has been committed.
    *   **Repeatable Read**: Guarantees that if you read the same row multiple times in a transaction, you will get the same result.
    *   **Serializable**: Highest level. Guarantees that transactions are executed as if they were running one after another, preventing all concurrency issues. This comes at a performance cost.
*   **Durability**: Once a transaction has been committed, it will remain so, even in the event of power loss or a crash.

### Scaling Relational Databases
*   **Replication**: Involves creating copies of the database. A common pattern is having one primary (master) database that handles all writes, and multiple read replicas that handle reads. This distributes the read load.
*   **Sharding (Partitioning)**: Involves splitting a large database into smaller, faster, more manageable parts called shards. Data is partitioned horizontally (by rows). For example, users with IDs 1-1,000,000 might be on Shard A, while users 1,000,001-2,000,000 are on Shard B. This is complex to implement but allows for massive horizontal scaling.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://www.mongodb.com/nosql-explained" target="_blank" rel="noopener noreferrer">NoSQL Explained by MongoDB</a></li>
  <li><a href="https://www.postgresql.org/docs/current/tutorial-sql.html" target="_blank" rel="noopener noreferrer">PostgreSQL SQL Tutorial</a></li>
  <li><a href="https://martinfowler.com/bliki/PolyglotPersistence.html" target="_blank" rel="noopener noreferrer">Martin Fowler on Polyglot Persistence</a></li>
</ul>
</div>