# Node.js HTTP Module

Before the existence of frameworks like Express.js, the core `http` module was the primary way to build web servers in Node.js. While you will almost always use a framework for real applications, understanding the `http` module is valuable for seeing how Node.js handles requests at a fundamental level.

The `http` module provides the functionality to create both HTTP clients and servers.

## Creating a Basic HTTP Server

The most common use case is `http.createServer()`. This method takes a callback function that is executed for each incoming request. This callback receives two arguments: a `request` object and a `response` object.

```javascript
// Import the core http module
import http from 'http';

const PORT = 3000;

// The request listener function
const requestListener = (req, res) => {
    // `req` is an instance of http.IncomingMessage. It contains all the
    // information about the client's request, such as the URL, method, and headers.
    console.log(`Received request: ${req.method} ${req.url}`);
    
    // `res` is an instance of http.ServerResponse. You use it to build
    // and send the response back to the client.

    // 1. Set the status code and headers
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // 2. Write the response body
    res.write('Hello, World!\n');
    res.write('This is a basic Node.js HTTP server.');

    // 3. End the response. This is a required step.
    res.end();
};

// Create the server
const server = http.createServer(requestListener);

// Start listening for connections on the specified port
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
```

To run this, save it as `server.js` and run `node server.js`. If you visit `http://localhost:3000` in your browser, you will see the "Hello, World!" message.

## Simple Routing

The `request` object's `url` property can be used to perform simple routing.

```javascript
import http from 'http';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Simple routing based on the URL path
    if (req.url === '/') {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Welcome to the homepage!' }));

    } else if (req.url === '/api/users') {
        res.writeHead(200);
        const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
        res.end(JSON.stringify(users));

    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

## Handling Request Bodies

Handling a request body (like from a `POST` request) is more complex with the `http` module because the body arrives in chunks as a stream. You have to listen for `data` events to collect the chunks and an `end` event to know when the body has been fully received.

```javascript
import http from 'http';

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/echo') {
        let body = '';
        
        // Listen for the 'data' event to receive chunks of the body
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        // Listen for the 'end' event, which fires when the body is fully received
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            try {
                const parsedBody = JSON.parse(body);
                res.end(JSON.stringify({ youSent: parsedBody }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });

    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(3000);
```

## Why Use a Framework?

As you can see, even simple tasks like routing and parsing request bodies require a lot of boilerplate code with the native `http` module. This is why the vast majority of Node.js applications use a web framework like **Express.js**, **Fastify**, or **Koa**.

These frameworks provide a much higher-level, cleaner abstraction for:
*   Routing
*   Middleware
*   Request and response parsing
*   Error handling

They handle all the low-level complexity of the `http` module for you, allowing you to focus on your application's logic.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://nodejs.org/api/http.html" target="_blank" rel="noopener noreferrer">Node.js Docs: HTTP</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework" target="_blank" rel="noopener noreferrer">MDN: Set up a Node.js server without a framework</a></li>
</ul>
</div>