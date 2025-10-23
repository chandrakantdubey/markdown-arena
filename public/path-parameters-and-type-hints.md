# Path Parameters and Type Hints in FastAPI

FastAPI leverages Python's type hints to provide powerful validation and editor support. One of the first places you'll encounter this is with **path parameters**.

A path parameter is a variable part of a URL path. It's a common way to identify a specific resource, like a user's ID.

## Defining Path Parameters

You declare path parameters using the same format that Python f-strings use: curly braces `{}`.

The value of the path parameter is then passed as an argument to your path operation function. Crucially, you use a **Python type hint** to declare the type of the parameter.

```python
from fastapi import FastAPI

app = FastAPI()

# The `{item_id}` part is a path parameter.
@app.get("/items/{item_id}")
def read_item(item_id: int):
    # FastAPI uses the `int` type hint to convert and validate the path parameter.
    return {"item_id": item_id}
```
In this example:
*   If you go to `/items/5`, the function will receive `item_id=5` (as an integer).
*   If you go to `/items/foo`, FastAPI will automatically return a `422 Unprocessable Entity` error with a clear JSON body explaining that the path parameter `item_id` is not a valid integer.

This automatic validation is a core feature of FastAPI.

## Order Matters

FastAPI evaluates routes in the order they are defined. If you have a path for `/users/me` and another for `/users/{user_id}`, you must declare the fixed path `/users/me` first.

```python
from fastapi import FastAPI

app = FastAPI()

# This route must be declared first.
@app.get("/users/me")
def read_current_user():
    return {"user_id": "the current logged-in user"}

@app.get("/users/{user_id}")
def read_user(user_id: str):
    return {"user_id": user_id}
```
If `/users/{user_id}` were declared first, a request to `/users/me` would be matched by that path, with the function receiving `user_id="me"`.

## Predefined Path Parameters with Enums

If you have a path parameter that can only take one of a few predefined values, you can use a standard Python `Enum`.

```python
from enum import Enum
from fastapi import FastAPI

class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"

app = FastAPI()

@app.get("/models/{model_name}")
def get_model(model_name: ModelName):
    # The `model_name` parameter will be an instance of the ModelName enum.
    if model_name is ModelName.alexnet:
        return {"model_name": model_name, "message": "Deep Learning FTW!"}

    if model_name.value == "lenet":
        return {"model_name": model_name, "message": "LeCNN all the images"}

    return {"model_name": model_name, "message": "Have some residuals"}
```
FastAPI will use the enum to validate that the path parameter is one of the allowed values. The automatic API docs will also reflect this, showing a dropdown of the available options.

## Path Parameters Containing Paths

If you need a path parameter to contain a file path itself (which includes slashes `/`), you can use a special `path` converter.

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/files/{file_path:path}")
def read_file(file_path: str):
    # `file_path` will now match everything after `/files/`
    return {"file_path": file_path}
```
A request to `/files/home/johndoe/myfile.txt` will result in the function receiving `file_path="home/johndoe/myfile.txt"`.

By using standard Python type hints, FastAPI provides a developer experience that is both intuitive and robust, catching common data errors before your code even runs.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://fastapi.tiangolo.com/tutorial/path-params/" target="_blank" rel="noopener noreferrer">FastAPI Tutorial: Path Parameters</a></li>
  <li><a href="https://docs.python.org/3/library/enum.html" target="_blank" rel="noopener noreferrer">Python Docs: `enum`</a></li>
</ul>
</div>