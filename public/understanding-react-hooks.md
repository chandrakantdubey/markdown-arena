# Understanding React Hooks

## Introduction

Hooks are a feature introduced in React 16.8 that let you use state and other React features without writing a class. Before hooks, managing state and side effects in functional components was not possible, forcing developers to use more complex class components. Hooks revolutionized how React components are written, making them simpler, more reusable, and easier to reason about.

## The Rules of Hooks

There are two fundamental rules you must follow when using hooks:
1.  **Only Call Hooks at the Top Level**: Don't call hooks inside loops, conditions, or nested functions. This ensures that hooks are always called in the same order on every render, which is how React preserves the state of hooks between calls.
2.  **Only Call Hooks from React Functions**: Call them from within React functional components or from custom hooks.

## Core Hooks

### `useState`

The `useState` hook is the most basic hook. It allows you to add a piece of state to a functional component.

*   **What it does**: It declares a "state variable."
*   **What it returns**: An array containing two elements: the current state value, and a function that lets you update it.

```jsx
import React, { useState } from 'react';

function Counter() {
  // Here, `count` is our state variable, initialized to 0.
  // `setCount` is the function we use to update it.
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
When `setCount` is called, React re-renders the `Counter` component, and the new value of `count` is displayed.

### `useEffect`

The `useEffect` hook lets you perform **side effects** in functional components. Side effects are operations that affect something outside of the component itself, such as:
*   Fetching data from an API
*   Setting up a subscription
*   Manually changing the DOM

*   **How it works**: You pass `useEffect` a function. This function will run *after* React has rendered the component to the screen.

```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // This is the side effect: fetching data
    fetch(`https://api.example.com/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // The dependency array

  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}
```
The **dependency array** (`[userId]`) is crucial. It tells React to re-run the effect only if the values in this array have changed since the last render.
*   `[userId]`: The effect will run again if `userId` changes.
*   `[]` (empty array): The effect will run only once, after the initial render.
*   No array: The effect will run after *every* render (this is often a bug!).

### `useContext`

The `useContext` hook allows a component to consume a value from a React Context, providing a way to pass data through the component tree without having to pass props down manually at every level (prop drilling).

```jsx
// 1. Create a context
const ThemeContext = React.createContext('light');

// 2. A component that provides the context value
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. A child component that consumes the context
function ThemedButton() {
  // useContext reads the context and subscribes to its changes
  const theme = React.useContext(ThemeContext);
  
  return <button className={theme}>I am a {theme} button</button>;
}
```
Any component inside the `ThemeContext.Provider` can now access the `value` ("dark") without it being passed as a prop.

Other common hooks include `useRef`, `useMemo`, and `useCallback`, which are essential for performance optimizations.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://react.dev/reference/react" target="_blank" rel="noopener noreferrer">React Hooks API Reference</a></li>
  <li><a href="https://www.youtube.com/watch?v=dpw9EHDh2bM" target="_blank" rel="noopener noreferrer">React Hooks Explained in 10 Minutes (Video)</a></li>
</ul>
</div>