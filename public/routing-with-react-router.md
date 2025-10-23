# Routing with React Router

## Introduction

In a traditional multi-page website, navigating to a new URL causes the browser to make a request to the server and load a completely new HTML page. In a **Single-Page Application (SPA)** built with React, we want to create the illusion of multiple pages while remaining on the same HTML page. This is called **client-side routing**.

**React Router** is the standard library for handling routing in React applications. It allows you to synchronize your UI with the URL, enabling navigation between different components while providing a seamless, app-like user experience.

## Core Concepts

React Router provides a collection of components that you use to build your routing logic.

*   `<BrowserRouter>`: The primary component that should wrap your entire application. It uses the HTML5 history API (pushState, replaceState, and the popstate event) to keep your UI in sync with the URL.
*   `<Routes>`: A container for a collection of `<Route>` elements. It looks through its children `<Route>`s to find the best match for the current URL.
*   `<Route>`: The core mapping component. It defines a relationship between a URL `path` and the `element` (component) that should be rendered when that path is matched.
*   `<Link>`: A component used to create navigation links. It's like a standard `<a>` tag, but it prevents a full page reload and instead updates the URL and UI on the client side.

## Code Example

Here's how to set up a basic application with a homepage, an "about" page, and a user profile page that uses a dynamic URL parameter.

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

// --- Page Components ---

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Us</h2>;
}

function UserProfile() {
  // The `useParams` hook lets you access the dynamic parts of the URL
  const { userId } = useParams();
  return <h2>User Profile for User ID: {userId}</h2>;
}

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}


// --- Main App Component with Router Setup ---

function App() {
  return (
    // 1. Wrap the entire app in BrowserRouter
    <BrowserRouter>
      <div>
        {/* 2. Create navigation links */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/users/123">User 123 Profile</Link></li>
          </ul>
        </nav>
        
        <hr />

        {/* 3. Define the routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* The ':' makes `userId` a dynamic parameter */}
          <Route path="/users/:userId" element={<UserProfile />} />
          {/* A wildcard path to catch any non-matching routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

### Explanation:
*   When a user clicks the `<Link to="/about">` link, React Router updates the URL in the browser's address bar to `/about` without causing a page refresh.
*   The `<Routes>` component detects this URL change and finds the matching `<Route path="/about">`.
*   It then renders the corresponding `element`, the `<About />` component.
*   For the `/users/:userId` route, the `:userId` part is a placeholder. If the user navigates to `/users/123`, the `UserProfile` component will be rendered, and the `useParams` hook will return `{ userId: '123' }`.

React Router is an essential part of almost every non-trivial React application, providing the foundation for navigation and application structure.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://reactrouter.com/en/main/start/tutorial" target="_blank" rel="noopener noreferrer">React Router Official Tutorial</a></li>
  <li><a href="https://www.youtube.com/watch?v=Ul3y1LXxzdU" target="_blank" rel="noopener noreferrer">React Router V6 in 10 Minutes (Video)</a></li>
</ul>
</div>