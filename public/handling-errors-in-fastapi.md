# Handling Errors in FastAPI

When building an API, it's crucial to handle errors gracefully and return clear, meaningful responses to the client. FastAPI provides several mechanisms for error handling, from raising standard HTTP exceptions to creating custom exception handlers.

## `HTTPException`

The most common way to handle expected errors in your application logic is to raise an `HTTPException`.

When you raise an `HTTPException`, FastAPI will stop processing the request, and send an HTTP response to the client with the status code, detail message, and headers you specified.

```python
from fastapi import FastAPI, HTTPException

app = FastAPI()

items = {"foo": "The Foo Wrestlers"}

@app.get("/items/{item_id}")
def read_item(item_id: str):
    if item_id not in items:
        # If the item doesn't exist, raise a 404 Not Found error.
        raise HTTPException(
            status_code=404, 
            detail="Item not found",
            headers={"X-Error": "There goes my error"}, # Optional custom headers
        )
    return {"item": items[item_id]}
```
If you make a request to `/items/bar`, the client will receive a `404 Not Found` status code and a JSON response body like this:
```json
{
    "detail": "Item not found"
}
```
`HTTPException` is the ideal tool for handling predictable business logic errors, like a resource not being found or a user not having the required permissions.

## Automatic Validation Errors

As we've seen, FastAPI provides automatic request validation using Pydantic. If a request contains invalid data (e.g., a wrong data type, a missing required field), FastAPI automatically catches the `ValidationError` from Pydantic and returns a `422 Unprocessable Entity` response. You don't have to write any code for this.

## Overriding Exception Handlers

FastAPI comes with a default exception handler. However, you can override it or add handlers for your own custom exceptions.

### Overriding the `RequestValidationError` handler
You might want to customize the format of the validation error response. You can do this by creating a custom exception handler.

```python
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

app = FastAPI()

# Use the `@app.exception_handler` decorator
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # `exc.errors()` is a list of dicts containing details about the validation errors
    error_details = []
    for error in exc.errors():
        error_details.append(f"Error in '{'.join(map(str, error['loc']))}': {error['msg']}")

    return JSONResponse(
        status_code=400, # You can change the status code
        content={"message": "Validation failed", "errors": error_details},
    )

@app.post("/items/")
async def create_item(item: Item): # Assuming Item is a Pydantic model
    return item
```
Now, if you send an invalid request body, you will get your custom-formatted error response instead of the default `422` response.

### Adding a Custom Exception Handler
You can create your own custom exception classes and then create handlers for them. This is a clean way to handle domain-specific errors.

```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

# 1. Create a custom exception
class UnicornException(Exception):
    def __init__(self, name: str):
        self.name = name

app = FastAPI()

# 2. Create a handler for that exception
@app.exception_handler(UnicornException)
async def unicorn_exception_handler(request: Request, exc: UnicornException):
    return JSONResponse(
        status_code=418,
        content={"message": f"Oops! {exc.name} did something. A unicorn is on its way."},
    )

# 3. Raise the exception in your code
@app.get("/unicorns/{name}")
async def read_unicorn(name: str):
    if name == "yolo":
        raise UnicornException(name=name)
    return {"unicorn_name": name}
```
This pattern allows you to separate your business logic (raising a `UnicornException`) from your web layer concerns (deciding what HTTP response to send), leading to cleaner, more maintainable code.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://fastapi.tiangolo.com/tutorial/handling-errors/" target="_blank" rel="noopener noreferrer">FastAPI Tutorial: Handling Errors</a></li>
</ul>
</div>