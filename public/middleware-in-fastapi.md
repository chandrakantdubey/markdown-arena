# Middleware in FastAPI

Middleware is a function that works with every request before it is processed by any specific path operation, and also with every response before it's returned. It provides a powerful mechanism for adding cross-cutting concerns to your application.

Common use cases for middleware include:
*   Logging every request.
*   Adding a custom header to every response (e.g., `X-Process-Time`).
*   Handling CORS (Cross-Origin Resource Sharing).
*   Gzip compression.
*   Handling authentication or session management.

## Creating Middleware

In FastAPI, a middleware is added using the `@app.middleware("http")` decorator on an `async` function, or by using `app.add_middleware()`. The function receives the `request` object and a `call_next` function.

The middleware function must:
1.  Take `request` and `call_next` as arguments.
2.  Call `await call_next(request)` at some point to pass the request to the next step (either another middleware or the actual path operation).
3.  Return the `response` object that `call_next` returns.

### Example: A Process Time Middleware

This is a classic example that calculates how long a request took to process and adds it to a custom response header.

```python
import time
from fastapi import FastAPI, Request

app = FastAPI()

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    # 1. Code to be executed before the request is processed
    start_time = time.time()
    
    # 2. Pass the request to the next handler in the chain
    response = await call_next(request)
    
    # 3. Code to be executed after the response is generated
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    
    # 4. Return the response
    return response

# A sample path operation
@app.get("/")
async def main():
    return {"message": "Hello World"}
```
When you make a request to `/`, you will see an `X-Process-Time` header in the response, e.g., `X-Process-Time: 0.000123`.

## CORS Middleware

A very common use case is handling CORS. FastAPI provides a built-in `CORSMiddleware` to make this easy.

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# List of origins that are allowed to make cross-origin requests
origins = [
    "http://localhost",
    "http://localhost:3000", # e.g., for a React frontend
]

# Add the middleware to the application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods
    allow_headers=["*"], # Allow all headers
)

@app.get("/")
async def main():
    return {"message": "Hello World"}
```
This middleware will automatically handle the necessary CORS preflight requests (`OPTIONS`) and add the correct headers to your responses, allowing your frontend application running on `localhost:3000` to make requests to your API.

## Order of Middleware

Middleware in FastAPI is processed in the order it is added. The first middleware added will be the first to process the request and the last to process the response.

```python
app = FastAPI()

# This will run first on the request, and last on the response
@app.middleware("http")
async def first_middleware(request: Request, call_next): ...

# This will run second on the request, and first on the response
@app.middleware("http")
async def second_middleware(request: Request, call_next): ...
```

FastAPI's middleware system, inherited from its underlying Starlette framework, provides a simple yet powerful way to hook into the request-response lifecycle.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://fastapi.tiangolo.com/tutorial/middleware/" target="_blank" rel="noopener noreferrer">FastAPI Tutorial: Middleware</a></li>
  <li><a href="https://fastapi.tiangolo.com/tutorial/cors/" target="_blank" rel="noopener noreferrer">FastAPI Tutorial: CORS</a></li>
  <li><a href="https://www.starlette.io/middleware/" target="_blank" rel="noopener noreferrer">Starlette Middleware Documentation</a></li>
</ul>
</div>