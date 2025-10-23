# React Performance Optimization

## Introduction

React is generally very fast due to its use of a Virtual DOM. However, as applications grow in complexity, performance can degrade. A common issue is unnecessary re-renders, where a component updates even though its appearance hasn't changed. This can lead to a slow and unresponsive UI.

React provides several powerful hooks and utilities to help you optimize performance by preventing these unnecessary re-renders: `React.memo`, `useCallback`, and `useMemo`.

## The Problem: Unnecessary Re-renders

By default, when a parent component re-renders (because its own state or props changed), it will also re-render all of its child components, even if the props passed to those children haven't changed.

```jsx
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Increment: {count}
      </button>
      <HeavyComponent title="I am a heavy component" />
    </div>
  );
}
```
In this example, every time you click the button, the `count` state changes, and `App` re-renders. As a result, `HeavyComponent` will also re-render, even though its `title` prop never changes. If `HeavyComponent` is slow to render, this will make the whole app feel sluggish.

## `React.memo`

`React.memo` is a Higher-Order Component (HOC) that memoizes your component. It prevents a component from re-rendering if its props have not changed.

```jsx
import React, { memo } from 'react';

const HeavyComponent = memo(function HeavyComponent({ title }) {
  console.log("Rendering HeavyComponent");
  // ... some expensive rendering logic ...
  return <h2>{title}</h2>;
});

// Now, in the App component, HeavyComponent will only render once.
```
`React.memo` performs a shallow comparison of the component's props. It's the simplest and most common optimization tool.

## `useCallback`

`React.memo` can be defeated by non-primitive props, like functions. In JavaScript, a new function is created on every render.

```jsx
function App() {
  const [count, setCount] = useState(0);
  
  // A new `handleClick` function is created every time App renders
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div>
      {/* ... */}
      <MyButton onClick={handleClick} />
    </div>
  );
}

const MyButton = memo(({ onClick }) => {
  // This will re-render on every App re-render because `onClick`
  // is a new function every time, even though its logic is the same.
});
```

The `useCallback` hook solves this. It memoizes a function, returning the exact same function instance between renders as long as its dependencies haven't changed.

```jsx
import { useCallback } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // `useCallback` returns a memoized version of the callback.
  // The empty dependency array `[]` means the function will never be recreated.
  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);

  return (
    <div>
      {/* ... */}
      <MyButton onClick={handleClick} />
    </div>
  );
}
```
Now, `MyButton` will receive the same `onClick` prop and will not re-render unnecessarily.

## `useMemo`

Similar to `useCallback`, `useMemo` memoizes a value. It's used to avoid re-running expensive calculations on every render.

*   `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

```jsx
function TodoList({ todos, filter }) {
  // This expensive filtering logic will run on every re-render of TodoList,
  // even if `todos` or `filter` haven't changed.
  const visibleTodos = filterTodos(todos, filter);
  
  return (/* ... */);
}

// Optimized version with useMemo
import { useMemo } from 'react';

function TodoList({ todos, filter }) {
  // useMemo will only re-run the `filterTodos` function if `todos` or `filter`
  // have changed. Otherwise, it returns the cached result.
  const visibleTodos = useMemo(() => {
    return filterTodos(todos, filter);
  }, [todos, filter]);
  
  return (/* ... */);
}
```

## When to Optimize
Optimization is not free; it adds complexity to your code.
*   **Don't optimize prematurely**: Only apply these techniques when you have identified a real performance bottleneck.
*   **Profile your application**: Use the React DevTools Profiler to find which components are re-rendering unnecessarily and which ones are slow to render.
*   Start with `React.memo`. If that doesn't work because of function or object props, then reach for `useCallback` and `useMemo`.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://react.dev/reference/react/memo" target="_blank" rel="noopener noreferrer">React.memo API Reference</a></li>
  <li><a href="https://react.dev/reference/react/useCallback" target="_blank" rel="noopener noreferrer">useCallback API Reference</a></li>
  <li><a href="https://react.dev/reference/react/useMemo" target="_blank" rel="noopener noreferrer">useMemo API Reference</a></li>
</ul>
</div>