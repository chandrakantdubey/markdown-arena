# GraphQL Integration with Apollo Client

## Introduction

Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. It provides a powerful and convenient way to fetch, cache, and modify application data, while automatically updating your UI.

While you can make GraphQL requests with `fetch` or Axios, Apollo Client offers a much more integrated experience, handling caching, loading and error states, and UI updates for you.

## Core Concepts

*   **`ApolloProvider`**: A React component that uses the Context API to make a configured Apollo Client instance available to all components in your application tree.
*   **`useQuery` Hook**: The primary hook for fetching data. You provide it with a GraphQL query, and it returns an object containing `loading`, `error`, and `data`. Apollo Client automatically handles caching the response.
*   **`useMutation` Hook**: The primary hook for modifying data (e.g., creating, updating, or deleting). It returns a function to trigger the mutation and an object with the mutation's state.
*   **Declarative Data Fetching**: With `useQuery`, you declare the data a component needs, and Apollo Client handles the lifecycle of fetching, caching, and updating that data for you.

## Code Example

Here is an example of a component that fetches and displays a list of books, and another component that allows you to add a new book.

### 1. Set up the `ApolloProvider`
First, wrap your application with the `ApolloProvider` and configure it with the URL of your GraphQL API.

```jsx
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

// Configure the client
const client = new ApolloClient({
  uri: 'https://your-graphql-api.com/graphql', // URL of your GraphQL endpoint
  cache: new InMemoryCache(), // Apollo's powerful caching system
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
```

### 2. Fetching Data with `useQuery`

```jsx
// BooksList.jsx
import React from 'react';
import { gql, useQuery } from '@apollo/client';

// Define the GraphQL query using the `gql` template literal
const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

function BooksList() {
  // Use the `useQuery` hook
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {data.books.map(({ id, title, author }) => (
          <li key={id}>{title} by {author}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 3. Modifying Data with `useMutation`

```jsx
// AddBookForm.jsx
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

function AddBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Use the `useMutation` hook
  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    // Refetch the list of books after the mutation is successful
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ variables: { title, author } });
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... form inputs for title and author ... */}
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Book'}
      </button>
      {error && <p>Error adding book: {error.message}</p>}
    </form>
  );
}
```
Apollo Client's intelligent caching is its killer feature. If you fetch the same data in two different components, Apollo will only make one network request and share the data between the components, automatically keeping them in sync.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://www.apollographql.com/docs/react/get-started" target="_blank" rel="noopener noreferrer">Apollo Client for React - Official Docs</a></li>
  <li><a href="https://www.youtube.com/watch?v=11e6S7_L_Q0" target="_blank" rel="noopener noreferrer">Apollo Client in 100 Seconds (Video)</a></li>
</ul>
</div>