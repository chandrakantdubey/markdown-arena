# Request Body and Pydantic Models in FastAPI

When you need to send data from a client to your API (e.g., to create a new item), you typically send it as a **request body**. A request body is data sent by the client with the request, most commonly in JSON format.

FastAPI uses the **Pydantic** library to define, parse, and validate the structure of these request bodies. You create a model that inherits from Pydantic's `BaseModel` to define the shape of your data.

## Creating a Pydantic Model

A Pydantic model is a class that inherits from `BaseModel`. You define the fields of your data as attributes of the class, using standard Python type hints.

```python
from fastapi import FastAPI
from pydantic import BaseModel

# 1. Define your data model as a class that inherits from BaseModel
class Item(BaseModel):
    name: str
    description: str | None = None # An optional attribute with a default of None
    price: float
    tax: float | None = None
```
With this `Item` model, you have declared a JSON object (or Python dict) that should have:
*   A required `name` that is a string.
*   An optional `description` that is a string.
*   A required `price` that is a float.
*   An optional `tax` that is a float.

## Using the Model in a Path Operation

To use this model, you declare it as a parameter in your path operation function, just like you would for path or query parameters.

```python
app = FastAPI()

# 2. Declare it as a parameter in your path operation function
@app.post("/items/")
def create_item(item: Item):
    # FastAPI does all the work:
    # 1. Reads the body of the request as JSON.
    # 2. Converts the types (e.g., from string to float if necessary).
    # 3. Validates the data against the `Item` model.
    #    - If invalid, returns a 422 error with a clear message.
    # 4. If valid, populates the `item` parameter with an instance of the `Item` model.

    print(f"Received item: {item.name}, Price: {item.price}")
    
    # You can access the data as attributes of the model instance
    item_dict = item.dict()
    if item.tax:
        price_with_tax = item.price + item.tax
        item_dict.update({"price_with_tax": price_with_tax})
        
    return item_dict
```

### How it Works
When you send a `POST` request to `/items/` with a JSON body like this:
```json
{
    "name": "Super Laptop",
    "price": 1299.99,
    "tax": 104.0
}
```
FastAPI will automatically parse this JSON, validate it against your `Item` model, and your `create_item` function will receive a beautiful, typed `item` object that you can work with. Your editor will also provide autocompletion for `item.name`, `item.price`, etc.

If you send invalid data, like making `price` a string:
```json
{
    "name": "Super Laptop",
    "price": "a-lot-of-money"
}
```
FastAPI will automatically respond with a `422 Unprocessable Entity` status code and a JSON body detailing the error, without your function ever being called.

```json
{
  "detail": [
    {
      "loc": [
        "body",
        "price"
      ],
      "msg": "value is not a valid float",
      "type": "type_error.float"
    }
  ]
}
```

## Combining Path, Query, and Request Body

You can declare path parameters, query parameters, and a request body all in the same function. FastAPI is smart enough to figure out which is which:
*   Parameters declared in the path are path parameters.
*   Parameters that are of a singular type (like `int`, `str`) are interpreted as query parameters.
*   Parameters that are declared to be of a Pydantic model type are interpreted as the request body.

```python
from fastapi import FastAPI
from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item, q: str | None = None):
    # item_id: Path parameter
    # item: Request body
    # q: Optional query parameter
    result = {"item_id": item_id, **item.dict()}
    if q:
        result.update({"q": q})
    return result
```

This integration of Pydantic for data validation and serialization is one of FastAPI's most powerful and developer-friendly features.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://fastapi.tiangolo.com/tutorial/body/" target="_blank" rel="noopener noreferrer">FastAPI Tutorial: Request Body</a></li>
  <li><a href="https://docs.pydantic.dev/latest/" target="_blank" rel="noopener noreferrer">Pydantic Documentation</a></li>
</ul>
</div>