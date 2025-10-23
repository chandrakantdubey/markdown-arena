# Automatic API Docs in FastAPI

One of FastAPI's most powerful and beloved features is its ability to automatically generate interactive API documentation. This is not an afterthought; it's a direct result of the framework's design, which is built on open standards.

As you write your code using standard Python type hints and Pydantic models, FastAPI works in the background to generate an **OpenAPI** schema for your entire application. This schema is then used to power two different, beautiful documentation interfaces that are available to you for free: **Swagger UI** and **ReDoc**.

## The Open Standards

*   **OpenAPI Specification**: An open standard for describing, documenting, and consuming RESTful APIs. FastAPI generates an OpenAPI schema for your API, which can be found at `/openapi.json` by default. This JSON file is the machine-readable "source of truth" for your API's structure.
*   **JSON Schema**: An open standard for describing the structure of JSON data. Pydantic models are converted into JSON Schemas, which are then used within the OpenAPI schema.
*   **Swagger UI**: An open-source tool that takes an OpenAPI schema and generates a rich, interactive UI that allows users (and developers) to explore and test the API directly in the browser.
*   **ReDoc**: Another open-source tool that generates a clean, three-panel documentation page from an OpenAPI schema.

## How to Access the Docs

If you have a FastAPI application running, you can access the documentation at these default URLs:

*   **`http://127.0.0.1:8000/docs`**: Provides the interactive **Swagger UI**.
*   **`http://127.0.0.1:8000/redoc`**: Provides the **ReDoc** documentation.

There is no extra setup required. It just works.

## How Your Code Powers the Docs

The documentation is generated directly from your code. Let's look at an example.

```python
from fastapi import FastAPI, Path, Query
from pydantic import BaseModel, Field

app = FastAPI(
    title="My Super API",
    description="This is a very fancy API with auto-documentation.",
    version="1.0.0",
)

class Item(BaseModel):
    name: str = Field(description="The name of the item.")
    price: float = Field(gt=0, description="The price must be greater than zero.")
    is_offer: bool | None = None

@app.post("/items/", response_model=Item, summary="Create a new item")
def create_item(item: Item):
    """
    Create an item with all the information:

    - **name**: each item must have a name
    - **price**: each item must have a price
    - **is_offer**: a boolean indicating if this is an offer
    """
    return item

@app.get("/users/{user_id}", tags=["users"])
def get_user(
    user_id: int = Path(description="The ID of the user to get", gt=0),
    q: str | None = Query(default=None, description="Optional search query")
):
    return {"user_id": user_id, "q": q}
```
This code will generate a rich documentation page with the following features:
*   The API `title`, `description`, and `version` will be displayed at the top.
*   The `get_user` endpoint will be grouped under a "users" tag.
*   The `create_item` endpoint will have the `summary` "Create a new item".
*   The function's docstring for `create_item` will be used as the endpoint's description.
*   For the `get_user` endpoint, the `description` for the `user_id` path parameter and the `q` query parameter will be shown.
*   For the `create_item` endpoint, the `Item` Pydantic model will be used to generate an example request body, and the `description` fields from the model will be displayed. The `response_model` will be used to document the shape of the successful response.

This tight integration between your code and your documentation means your docs are always up-to-date. If you change a Pydantic model or a type hint, the documentation is automatically updated the next time you reload the server. This "documentation-driven development" approach saves a huge amount of time and helps ensure your API is clear and easy to use.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://fastapi.tiangolo.com/tutorial/first-steps/" target="_blank" rel="noopener noreferrer">FastAPI Tutorial: First Steps</a></li>
  <li><a href="https://fastapi.tiangolo.com/tutorial/path-params-numeric-validations/" target="_blank" rel="noopener noreferrer">FastAPI Tutorial: Metadata and Docs URLs</a></li>
  <li><a href="https://swagger.io/tools/swagger-ui/" target="_blank" rel="noopener noreferrer">Swagger UI</a></li>
</ul>
</div>