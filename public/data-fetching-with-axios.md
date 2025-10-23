# Data Fetching with Axios

## Introduction

Axios is a popular, promise-based HTTP client for the browser and Node.js. While the browser's native `fetch` API is powerful, Axios provides a more convenient and feature-rich API for making network requests in your React applications.

Key features of Axios include:
*   Automatic transformation of request and response data to JSON.
*   Client-side protection against Cross-Site Request Forgery (XSRF).
*   The ability to intercept requests and responses to transform data or add headers.
*   Better error handling for HTTP status codes outside the 2xx range.

## Core Concepts

In a React component, data fetching is a side effect. Therefore, it should be performed within a `useEffect` hook. A typical data fetching component needs to manage three pieces of state:
1.  **The data itself**: What you fetched from the API.
2.  **A loading state**: To show the user that a request is in progress.
3.  **An error state**: To show the user if the request failed.

## Code Example

This example shows how to build a component that fetches a list of users from an API using Axios and manages the loading and error states.

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We define the async function inside the effect
    const fetchUsers = async () => {
      try {
        // Make the GET request using Axios
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        
        // Axios automatically parses the JSON and puts it in the `data` property
        setUsers(response.data);
      } catch (err) {
        // Axios throws an error for non-2xx status codes
        setError(err);
      } finally {
        // This will run regardless of success or failure
        setLoading(false);
      }
    };

    // Call the function
    fetchUsers();
    
  }, []); // The empty dependency array means this effect runs once on mount

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error fetching users: {error.message}</p>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

### Creating an Axios Instance

For larger applications, it's a good practice to create a reusable Axios instance with a base URL and default headers.

```javascript
// api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  // You can also add interceptors here
});

export default apiClient;

// MyComponent.jsx
import apiClient from './api';

// ...
const response = await apiClient.get('/products');
// ...
```

While Axios is a great low-level tool, for more complex data fetching scenarios involving caching, re-fetching, and synchronization, consider using a dedicated library like **React Query** or **SWR**, which often use Axios or `fetch` under the hood.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://axios-http.com/docs/intro" target="_blank" rel="noopener noreferrer">Axios Official Documentation</a></li>
  <li><a href="https://react.dev/learn/synchronizing-with-effects#fetching-data" target="_blank" rel="noopener noreferrer">React Docs: Fetching data with Effects</a></li>
</ul>
</div>