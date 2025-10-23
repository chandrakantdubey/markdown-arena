# Asynchronous Operations in FastAPI

FastAPI is built on top of the **Starlette** toolkit and runs on an **ASGI** (Asynchronous Server Gateway Interface) server like **Uvicorn**. This means it is designed from the ground up to support asynchronous code using Python's `async` and `await` syntax.

Using `async` allows your server to handle many concurrent requests efficiently, especially for I/O-bound operations, without needing multiple processes or threads.

## `async def` vs. `def`

When you define a path operation function, you can declare it as a normal function with `def` or as an async function with `async def`.

*   **`def` (Synchronous)**: Use this for operations that are CPU-bound or that use libraries that make blocking I/O calls. FastAPI is smart enough to run a normal `def` function in an external thread pool to avoid blocking the main event loop.
*   **`async def` (Asynchronous)**: Use this for operations that are I/O-bound and where you can use `await` for the I/O calls (e.g., waiting for a database response, an API call, or reading a file).

### How it Works

```mermaid
graph TD
    subgraph "Normal `def` function"
        R1[Request] --> TP{Thread Pool};
        subgraph TP
            W1[Worker Thread 1];
        end
        W1 -- "Runs blocking code" --> W1;
        W1 --> Resp1[Response];
    end
    
    subgraph "`async def` function"
        R2[Request] --> EL{Event Loop};
        EL -- "Runs code until `await`" --> EL;
        EL -- "Waits for I/O" --> IO((Database/API));
        note right of EL "Event loop is free to handle other requests."
        IO -- "I/O complete" --> EL;
        EL -- "Resumes function" --> EL;
        EL --> Resp2[Response];
    end
```

For a typical web backend that spends most of its time waiting for databases and other APIs, using `async def` is the key to high performance and concurrency.

## Code Example

Let's create an endpoint that simulates a slow network call.

### Blocking (`def`) Version
```python
import time
from fastapi import FastAPI

app = FastAPI()

@app.get("/slow-blocking")
def slow_blocking():
    # `time.sleep()` is a blocking operation.
    # It will block the entire server process.
    time.sleep(5)
    return {"message": "Done sleeping."}
```
If you run this and make a request to `/slow-blocking`, and then immediately try to open another endpoint in a new tab, the second request will have to wait for the first one to finish. FastAPI helps by running this in a thread pool, but it's still less efficient than the async approach.

### Non-Blocking (`async def`) Version
To perform an async wait, we need to use `asyncio.sleep()`.

```python
import asyncio
from fastapi import FastAPI

app = FastAPI()

@app.get("/slow-non-blocking")
async def slow_non_blocking():
    # `asyncio.sleep()` is a non-blocking operation.
    # It will "pause" this function and allow the event loop
    # to handle other requests.
    await asyncio.sleep(5)
    return {"message": "Done sleeping asynchronously."}

@app.get("/hello")
async def hello():
    return {"message": "Hello!"}
```
Now, if you make a request to `/slow-non-blocking` and then immediately request `/hello` in another tab, the `/hello` request will be handled and return instantly, even while the first request is still "sleeping." This is the power of non-blocking I/O.

## Working with Async Libraries

To get the full benefit of `async def`, the libraries you use for I/O (like for your database or for making HTTP requests) must also be async-compatible.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="python">Async Database (Databases)</button>
    <button class="tab-button" data-lang="python">Async HTTP Client (HTTPX)</button>
  </div>
  <div class="tab-content active" data-lang="python">
<pre><code class="language-python">
from databases import Database
from fastapi import FastAPI

DATABASE_URL = "postgresql://user:password@localhost/test"
database = Database(DATABASE_URL)
app = FastAPI()

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/notes/")
async def read_notes():
    query = "SELECT * FROM notes"
    # `database.fetch_all` is an awaitable, non-blocking call
    return await database.fetch_all(query)
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
import httpx
from fastapi import FastAPI

app = FastAPI()

@app.get("/call-other-api")
async def call_other_api():
    async with httpx.AsyncClient() as client:
        # `client.get` is an awaitable, non-blocking call
        response = await client.get("https://www.example.com/")
    return {"status": response.status_code}
</code></pre>
  </div>
</div>

**Rule of Thumb**: If your function contains `await`, it must be `async def`. If it involves I/O, you should try to use an async library and `async def` to get the best performance. If your function is purely computational, a normal `def` is fine.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://fastapi.tiangolo.com/async/" target="_blank" rel="noopener noreferrer">FastAPI Tutorial: Async</a></li>
  <li><a href="https://docs.python.org/3/library/asyncio.html" target="_blank" rel="noopener noreferrer">Python Docs: asyncio</a></li>
</ul>
</div>