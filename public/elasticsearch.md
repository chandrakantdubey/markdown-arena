# Elasticsearch

## Introduction

Elasticsearch is a distributed, open-source search and analytics engine built on Apache Lucene. It is designed for horizontal scalability, reliability, and easy management. While it started as a full-text search engine, its speed and scalability have made it a popular choice for a wide range of use cases, including log analytics, application performance monitoring (APM), security information and event management (SIEM), and business analytics.

For a backend engineer, integrating with Elasticsearch allows you to offload complex search and aggregation functionalities from your primary database, providing users with a much faster and more powerful search experience.

## Core Concepts

| Elasticsearch Term | Relational Database Analogy | Description                                                              |
| :----------------- | :-------------------------- | :----------------------------------------------------------------------- |
| **Index**          | Database                    | A collection of documents.                                               |
| **Document**       | Row                         | A basic unit of information, expressed in JSON.                          |
| **Field**          | Column                      | A key-value pair within a document.                                      |
| **Mapping**        | Schema                      | Defines how a document and its fields are stored and indexed.            |

### How it Works: The Inverted Index

The reason Elasticsearch is so fast for text search is its use of a data structure called an **inverted index**. Instead of mapping a document ID to its content, an inverted index maps terms (words) to the documents that contain them, allowing for incredibly fast lookups.

**Example:**
1.  Doc 1: `"Elasticsearch is fast and scalable."`
2.  Doc 2: `"Search is a core feature."`

The inverted index would look like this:

| Term          | Document IDs |
| :------------ | :----------- |
| `elasticsearch` | 1            |
| `is`          | 1, 2         |
| `fast`        | 1            |
| `scalable`    | 1            |
| `search`      | 2            |
| `core`        | 2            |


When you search for "fast search", Elasticsearch can instantly look up `fast` (Doc 1) and `search` (Doc 2) and quickly compute the relevance of each document.

## Code Examples: Indexing and Searching

Here's how to use the official clients to add a document to an index and then search for it.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="nodejs">Node.js (@elastic/elasticsearch)</button>
    <button class="tab-button" data-lang="python">Python (elasticsearch-py)</button>
    <button class="tab-button" data-lang="go">Go (go-elasticsearch)</button>
  </div>
  <div class="tab-content active" data-lang="nodejs">
<pre><code class="language-javascript">
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

async function run() {
  // 1. Index a document
  await client.index({
    index: 'products',
    id: '1',
    document: {
      name: 'Super Fast Laptop',
      description: 'A powerful laptop for all your needs.',
      stock: 15
    }
  });
  console.log('Document indexed.');
  
  // Refresh the index to make the document searchable
  await client.indices.refresh({ index: 'products' });

  // 2. Search for the document
  const { hits } = await client.search({
    index: 'products',
    query: {
      match: { description: 'fast laptop' }
    }
  });

  console.log('Search results:', hits.hits);
}

run().catch(console.error);
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
from elasticsearch import Elasticsearch

client = Elasticsearch("http://localhost:9200")

def run():
    # 1. Index a document
    client.index(
        index="products",
        id="1",
        document={
            "name": "Super Fast Laptop",
            "description": "A powerful laptop for all your needs.",
            "stock": 15,
        },
    )
    print("Document indexed.")

    # Refresh the index to make the document searchable
    client.indices.refresh(index="products")

    # 2. Search for the document
    response = client.search(
        index="products",
        query={
            "match": {"description": "fast laptop"}
        }
    )

    print("Search results:")
    for hit in response['hits']['hits']:
        print(hit['_source'])

if __name__ == "__main__":
    run()
</code></pre>
  </div>
  <div class="tab-content" data-lang="go">
<pre><code class="language-go">
package main

import (
	"context"
	"fmt"
	"strings"
	"github.com/elastic/go-elasticsearch/v8"
)

func main() {
	es, _ := elasticsearch.NewDefaultClient()

	ctx := context.Background()

	// 1. Index a document
	doc := `{
		"name": "Super Fast Laptop",
		"description": "A powerful laptop for all your needs.",
		"stock": 15
	}`
	
	res, err := es.Index("products", strings.NewReader(doc), es.Index.WithDocumentID("1"))
	if err != nil { panic(err) }
	defer res.Body.Close()
	fmt.Println("Document indexed.")

	es.Indices.Refresh(es.Indices.Refresh.WithIndex("products"))

	// 2. Search for the document
	query := `{"query": {"match": {"description": "fast laptop"}}}`
	res, err = es.Search(es.Search.WithIndex("products"), es.Search.WithBody(strings.NewReader(query)))
	if err != nil { panic(err) }
	defer res.Body.Close()

	fmt.Println("Search results:", res)
}
</code></pre>
  </div>
</div>

## Integration with Backend Services

The most common pattern is to keep your primary database (e.g., PostgreSQL) as the source of truth and use Elasticsearch as a secondary data store for search.

**The synchronization process:**
1.  When data is created, updated, or deleted in your primary database, your backend application is responsible for sending the same change to Elasticsearch.
2.  This is often done asynchronously using a message queue or a background job to decouple your main application flow from Elasticsearch's availability.

This way, your main application continues to benefit from the ACID guarantees of your relational database, while your users get a fast, feature-rich search experience powered by Elasticsearch.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html" target="_blank" rel="noopener noreferrer">Elasticsearch Getting Started Guide</a></li>
  <li><a href="https://opensearch.org/docs/latest/" target="_blank" rel="noopener noreferrer">OpenSearch Documentation (A popular open-source fork)</a></li>
  <li><a href="https://www.elastic.co/guide/en/elasticsearch/client/index.html" target="_blank" rel="noopener noreferrer">Official Elasticsearch Clients</a></li>
</ul>
</div>