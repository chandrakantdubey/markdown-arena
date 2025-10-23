# Authentication and Security in FastAPI

FastAPI includes a set of tools in its `fastapi.security` module to handle security and authentication. It's designed to work with standard protocols like **OAuth2** and HTTP Basic/Bearer authentication.

The security system is built on top of the **Dependency Injection** system, allowing you to easily add authentication requirements to your endpoints.

## OAuth2 with Password Flow and JWTs

A very common authentication setup for a modern API is the **OAuth2 "Password Flow"**. In this flow:
1.  A user sends their username and password to a special `/token` endpoint.
2.  The server verifies the credentials.
3.  If they are valid, the server returns a **JWT (JSON Web Token)**.
4.  The client then includes this JWT in the `Authorization` header (as a "Bearer token") for all subsequent requests to protected endpoints.

FastAPI provides helpers to implement this flow.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="python">main.py (Example)</button>
    <button class="tab-button" data-lang="sh">Installation</button>
  </div>
  <div class="tab-content active" data-lang="python">
<pre><code class="language-python">
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
# You would use a real JWT library and password hashing library
# from jose import JWTError, jwt
# from passlib.context import CryptContext

app = FastAPI()

# This is the dependency that will look for the `Authorization: Bearer <token>` header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None

# --- Fake Database and Utilities (for demonstration) ---
fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "fakehashedpassword",
        "disabled": False,
    }
}
def get_user(db, username: str):
    if username in db:
        return User(**db[username])

# --- Dependencies ---
# This dependency decodes the token and gets the current user
async def get_current_user(token: str = Depends(oauth2_scheme)):
    # In a real app, you would:
    # 1. Decode the JWT
    # 2. Extract the username/user_id from the payload
    # 3. Fetch the user from the database
    user = get_user(fake_users_db, "johndoe") # Simplified for example
    if not user:
        raise HTTPException(status_code=401, detail="Invalid auth credentials")
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# --- Path Operations ---

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # OAuth2PasswordRequestForm is a dependency that parses the x-www-form-urlencoded body
    # with `username` and `password` fields.
    user = get_user(fake_users_db, form_data.username)
    if not user: # or if password doesn't match
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    
    # In a real app, you would create a JWT token here
    access_token = "fake-jwt-token-for-" + user.username
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    # By adding `Depends(get_current_active_user)`, this endpoint is now protected.
    # FastAPI will first run the dependency. If the token is missing or invalid,
    # the dependency will raise an HTTPException, and this function will never be called.
    return current_user
</code></pre>
  </div>
  <div class="tab-content" data-lang="sh">
<pre><code class="language-sh">
# You need a few extra libraries for this to work
pip install "python-jose[cryptography]" "passlib[bcrypt]" "python-multipart"
</code></pre>
  </div>
</div>

### How it Works
1.  **`OAuth2PasswordBearer(tokenUrl="token")`**: We create an instance of this class. It's a dependency that knows how to find a bearer token in the `Authorization` header. `tokenUrl` tells the automatic API docs where to go to get a token.
2.  **`/token` Endpoint**: This is where the client sends a username and password to log in. It uses `OAuth2PasswordRequestForm` to get the form data. Upon successful authentication, it should return a JWT.
3.  **`get_current_user` Dependency**: This is our core security dependency.
    *   It itself depends on `oauth2_scheme`. This means FastAPI will first call `oauth2_scheme` to extract the token string from the header.
    *   It then receives this token string as its `token` argument.
    *   It would then decode and validate the token and fetch the corresponding user from the database.
4.  **Protected Endpoint**: The `/users/me` endpoint depends on `get_current_active_user`.
    *   To resolve this, FastAPI first calls `get_current_active_user`.
    *   `get_current_active_user` in turn depends on `get_current_user`.
    *   This dependency chain ensures that a valid, active user must be present for the endpoint's code to run.

This system is powerful because it's completely integrated with the dependency injection system, allowing you to add fine-grained security rules to your endpoints in a clean and reusable way.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://fastapi.tiangolo.com/tutorial/security/first-steps/" target="_blank" rel="noopener noreferrer">FastAPI Security Tutorial</a></li>
  <li><a href="https://jwt.io/" target="_blank" rel="noopener noreferrer">Introduction to JSON Web Tokens (JWT)</a></li>
</ul>
</div>