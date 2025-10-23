# Introduction to Express.js

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is the de-facto standard framework for Node.js and has been for many years.

Express provides a thin layer of fundamental web application features, without obscuring the Node.js features that you know and love. It makes handling requests, routing, and middleware much simpler than using the native `http` module.

## Core Features

*   **Routing**: A powerful routing system that allows you to map HTTP methods and URL patterns to handler functions.
*   **Middleware**: The core concept of Express. A request passes through a chain of middleware functions, allowing you to perform tasks like logging, authentication, and body parsing.
*   **Request/Response Helpers**: Provides convenient methods on the `request` and `response` objects to simplify tasks like parsing query parameters or sending JSON responses.
*   **Templating Engine Integration**: Easily integrates with templating engines like Pug or EJS to render dynamic HTML pages on the server.

## "Hello World" in Express

Compare this to the boilerplate required with the native `http` module.

```javascript
// 1. Import express
import express from 'express';

// 2. Create an express app
const app = express();
const PORT = 3000;

// 3. Define a route handler for the root URL
// app.get(path, handler)
app.get('/', (req, res) => {
  // `req` and `res` are enhanced versions of Node's native objects
  res.send('Hello World from Express!');
});

// 4. Start the server
app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
```

## Routing

Express's router is one of its main features.

```javascript
const app = express();

// A handler for GET requests to /users
app.get('/users', (req, res) => {
    // `res.json()` automatically stringifies the object and sets the Content-Type header
    res.json([{ id: 1, name: 'Alice' }]);
});

// A handler for POST requests to /users
app.post('/users', (req, res) => {
    // (Requires a body-parsing middleware to access req.body)
    console.log('Creating user:', req.body);
    res.status(201).json({ status: 'created' });
});

// A route with a URL parameter
app.get('/users/:userId', (req, res) => {
    // Access parameters via the `req.params` object
    const { userId } = req.params;
    res.send(`Fetching user with ID: ${userId}`);
});

// A route with query parameters (e.g., /search?q=books)
app.get('/search', (req, res) => {
    // Access query params via the `req.query` object
    const { q } = req.query;
    res.send(`Searching for: ${q}`);
});
```

## Middleware

Middleware functions are functions that have access to the `request` object (`req`), the `response` object (`res`), and the `next` function in the application's request-response cycle. The `next` function is a function that, when invoked, executes the next middleware in the stack.

```javascript
const app = express();

// A simple logging middleware
const loggingMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next(); // Pass control to the next middleware
};

// A simple authentication middleware
const authMiddleware = (req, res, next) => {
    if (req.headers['authorization'] === 'my-secret-token') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

// --- Applying Middleware ---

// Use the logging middleware for all requests
app.use(loggingMiddleware);

// Built-in middleware to parse JSON request bodies
// This populates `req.body`
app.use(express.json());

// A public route
app.get('/', (req, res) => {
    res.send('Public route');
});

// A protected route
// The authMiddleware is applied only to this specific route
app.get('/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route.');
});

// Centralized error handling middleware (must be last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(3000);
```
Express's un-opinionated and minimalist nature, combined with its powerful middleware and routing system, has made it the foundation of the Node.js web development ecosystem for years.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://expressjs.com/en/starter/installing.html" target="_blank" rel="noopener noreferrer">Express.js Official "Getting Started" Guide</a></li>
  <li><a href="https://expressjs.com/en/guide/routing.html" target="_blank" rel="noopener noreferrer">Express Routing Guide</a></li>
  <li><a href="https://expressjs.com/en/guide/using-middleware.html" target="_blank" rel="noopener noreferrer">Express Middleware Guide</a></li>
</ul>
</div>