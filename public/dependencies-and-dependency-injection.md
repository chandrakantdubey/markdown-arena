# Dependencies and Dependency Injection in FastAPI

FastAPI has an incredibly powerful and easy-to-use **Dependency Injection** system. A "dependency" is something that your code needs to work, such as a database connection, an authentication token, or a shared configuration object.

Dependency Injection means that your code doesn't create these dependencies itself. Instead, it declares that it *needs* them, and the framework (FastAPI) is responsible for providing them. This leads to code that is much more decoupled, reusable, and easier to test.

## How it Works: `Depends`

The core of FastAPI's DI system is the `Depends` function. You declare a dependency in your path operation function by using a default value of `Depends(your_dependency_function)`.

A dependency is just a function that can take all the same parameters that a path operation function can take (e.g., path parameters, query parameters, request bodies).

### A Simple Dependency

Let's create a simple dependency for common query parameters.

```python
from fastapi import Depends, FastAPI

app = FastAPI()

# 1. This is our dependency function (a "dependable")
async def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}

# 2. "Inject" the dependency into the path operation functions
@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    # The `commons` parameter is the dictionary returned by `common_parameters`
    return {"message": "Fetching items", "params": commons}

@app.get("/users/")
async def read_users(commons: dict = Depends(common_parameters)):
    return {"message": "Fetching users", "params": commons}
```
Now, both `/items/` and `/users/` share the same query parameter logic. If you need to add a new common parameter, you only have to change it in one place: the `common_parameters` function. FastAPI handles calling the dependency, getting the return value, and passing it to your path operation function.

## Classes as Dependencies

Dependencies don't have to be functions; they can also be classes. FastAPI will treat the class itself as a function that it calls to create an instance.

This is a common pattern for managing database connections.

```python
class FakeDB:
    def __init__(self):
        self.db = {"item1": "Foo", "item2": "Bar"}
        print("DB connection opened")

    def get_item(self, item_id: str):
        return self.db.get(item_id)

    def close(self):
        print("DB connection closed")

# This is the dependency function that will be called for each request
# It uses `yield` to create a "context managed" dependency
def get_db():
    db = FakeDB()
    try:
        yield db
    finally:
        db.close()

@app.get("/items/{item_id}")
def get_item(item_id: str, db: FakeDB = Depends(get_db)):
    # `db` is the instance of FakeDB created by `get_db`
    item = db.get_item(item_id)
    return {"item": item}
```
By using `yield`, we can execute code *after* the response has been sent (in the `finally` block). This is the perfect place to clean up resources like a database connection.

## Sub-dependencies

Dependencies can depend on other dependencies. FastAPI will automatically resolve this entire dependency tree.

```python
def query_extractor(q: str | None = None):
    return q

def query_or_cookie_extractor(
    q: str = Depends(query_extractor), last_query: str | None = Cookie(default=None)
):
    if not q:
        return last_query
    return q

@app.get("/items/")
async def read_query(query_or_default: str = Depends(query_or_cookie_extractor)):
    return {"q_or_cookie": query_or_default}
```

## Benefits of Dependency Injection

*   **Code Reuse**: Avoid writing the same code over and over.
*   **Decoupling**: Your path operation logic is decoupled from the logic used to get a database connection or authenticate a user.
*   **Easy Testing**: When testing, you can easily override a dependency to provide a mock version. For example, you can replace a real database dependency with a fake in-memory database for your tests.
*   **Editor Support**: Because everything is based on function signatures and type hints, your editor can provide excellent autocompletion and type checking.

FastAPI's DI system is one of its most defining and powerful features.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://fastapi.tiangolo.com/tutorial/dependencies/" target="_blank" rel="noopener noreferrer">FastAPI Tutorial: Dependencies</a></li>
  <li><a href="https://fastapi.tiangolo.com/tutorial/dependencies/classes-as-dependencies/" target="_blank" rel="noopener noreferrer">FastAPI Tutorial: Classes as Dependencies</a></li>
</ul>
</div>