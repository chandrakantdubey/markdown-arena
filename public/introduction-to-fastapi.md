# Introduction to FastAPI

FastAPI is a modern, high-performance web framework for building APIs with Python 3.7+ based on standard Python type hints. It was created by Sebastián Ramírez and has rapidly gained popularity in the Python community.

## Key Features

1.  **Fast**: FastAPI is one of the fastest Python frameworks available, on par with Node.js and Go. This performance comes from **Starlette** (for the web parts) and **Pydantic** (for the data parts).
2.  **Fast to code**: It's designed to increase the speed of development. Features like automatic data validation and documentation mean you write less boilerplate code.
3.  **Type Hints and Editor Support**: FastAPI uses Python type hints extensively. This provides incredible editor support, with autocompletion and type checking everywhere, leading to fewer bugs.
4.  **Automatic Data Validation**: By using Pydantic, FastAPI automatically parses and validates incoming request data (from request bodies, query parameters, headers, etc.). If the data is invalid, it returns a clear JSON error response.
5.  **Automatic API Documentation**: FastAPI automatically generates interactive API documentation for your application using open standards: **OpenAPI** (formerly Swagger) and **JSON Schema**. You get a Swagger UI and a ReDoc interface for free, just by writing your code.
6.  **Asynchronous Support**: It's built on top of the `asyncio` framework, allowing you to use `async` and `await` in your path operations for high-performance, non-blocking I/O.

## "Hello World" in FastAPI

Creating a web server with FastAPI is incredibly simple.

```python
# main.py
from fastapi import FastAPI

# Create an instance of the FastAPI class
app = FastAPI()

# Define a "path operation decorator"
# This tells FastAPI that the function below is responsible for
# handling GET requests to the "/" URL
@app.get("/")
def read_root():
    return {"Hello": "World"}

# Another path operation
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    # FastAPI uses the type hints for validation.
    # If item_id is not an integer, it will return an error.
    # `q` is an optional query parameter.
    return {"item_id": item_id, "q": q}
```

### How to Run It

1.  **Install FastAPI and a server**:
    ```bash
    pip install fastapi "uvicorn[standard]"
    ```
    (Uvicorn is an ASGI server that runs your FastAPI application).

2.  **Run the server**:
    ```bash
    uvicorn main:app --reload
    ```
    *   `main`: refers to the file `main.py`.
    *   `app`: refers to the object `app = FastAPI()` created inside `main.py`.
    *   `--reload`: makes the server restart after code changes.

### Interactive API Docs

Now, if you go to `http://127.0.0.1:8000/docs` in your browser, you will see an interactive Swagger UI documentation for your API, generated automatically from your code.

If you go to `http://127.0.0.1:8000/redoc`, you will see an alternative documentation format.

This automatic documentation is a killer feature that greatly improves developer experience and makes it easy for others to consume your API.

FastAPI combines the best features of other frameworks: the performance of Starlette, the data validation of Pydantic, the dependency injection system inspired by Angular, and the ease of use of frameworks like Flask, to create a truly modern and powerful tool for API development.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://fastapi.tiangolo.com/tutorial/" target="_blank" rel="noopener noreferrer">FastAPI Official Tutorial</a></li>
  <li><a href="https://www.youtube.com/watch?v=7t2alSnE2-I" target="_blank" rel="noopener noreferrer">FastAPI in 100 Seconds (Video)</a></li>
</ul>
</div>