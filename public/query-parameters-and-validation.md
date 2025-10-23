# Query Parameters and Validation in FastAPI

Query parameters are a set of key-value pairs appended to the end of a URL. They are a common way to pass optional data to an endpoint, such as for filtering, sorting, or pagination.

They appear after a `?` in the URL and are separated by `&`. For example: `http://example.com/items?skip=0&limit=10`.

## Declaring Query Parameters

In FastAPI, query parameters are declared as function parameters that are **not** part of the path.

```python
from fastapi import FastAPI

app = FastAPI()

# A database of items for the example
fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

# `skip` and `limit` are query parameters.
# They are not in the path string "/items".
@app.get("/items/")
def read_items(skip: int = 0, limit: int = 10):
    # FastAPI uses the default values (0 and 10) if they are not provided in the URL.
    # It also uses the type hints (`int`) for conversion and validation.
    return fake_items_db[skip : skip + limit]
```
If you go to `/items/?skip=0&limit=2`, the function will receive `skip=0` and `limit=2`. If you go to `/items/`, it will use the default values.

## Optional Parameters

You can declare optional query parameters by using `| None = None` (in Python 3.10+) or `Optional[str] = None` (older versions).

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
def read_item(item_id: str, q: str | None = None, short: bool = False):
    # `q` is an optional string.
    # `short` is an optional boolean.
    item = {"item_id": item_id}
    if q:
        item.update({"q": q})
    if not short:
        item.update(
            {"description": "This is an amazing item that has a long description"}
        )
    return item
```
FastAPI is smart about converting boolean values: `True`, `true`, `on`, `yes`, and `1` are all converted to `True`.

## Advanced Validation with `Query`

For more advanced validation, such as setting a maximum length for a string, you can use the `Query` function from FastAPI.

```python
from fastapi import FastAPI, Query

app = FastAPI()

@app.get("/items/")
async def read_items(
    q: str | None = Query(
        default=None, 
        min_length=3, 
        max_length=50, 
        pattern="^fixedquery$" # A regular expression
    )
):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```
Here, we've declared that the optional query parameter `q` must have a minimum length of 3 and a maximum length of 50. FastAPI will enforce this and return a validation error if the rules are not met. `Query` allows for many validation options, including adding descriptions and examples for the automatic API docs.

## Required Query Parameters

If you declare a query parameter without a default value, it becomes required.

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
def read_user_item(item_id: str, needy: str):
    # `needy` is a required query parameter.
    # A request to `/items/foo-item` without `?needy=...` will fail.
    item = {"item_id": item_id, "needy": needy}
    return item
```

## Receiving a List of Values

If you declare a parameter with a `list` type hint, FastAPI will correctly parse a list of values from the query string.

URL: `/items/?q=foo&q=bar`

```python
from fastapi import FastAPI, Query

app = FastAPI()

@app.get("/items/")
async def read_items(q: list[str] = Query(default=[])):
    # The function will receive `q` as `['foo', 'bar']`.
    query_items = {"q": q}
    return query_items
```

FastAPI's powerful and declarative approach to handling query parameters saves a significant amount of boilerplate code that you would otherwise have to write manually.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://fastapi.tiangolo.com/tutorial/query-params/" target="_blank" rel="noopener noreferrer">FastAPI Tutorial: Query Parameters</a></li>
  <li><a href="https://fastapi.tiangolo.com/tutorial/query-params-str-validations/" target="_blank" rel="noopener noreferrer">FastAPI Tutorial: String Validations</a></li>
</ul>
</div>