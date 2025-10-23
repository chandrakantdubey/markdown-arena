# Request Context

## Introduction

In a backend application, a single request often travels through multiple layers and functions—from middleware, to controllers, to services, and data access layers. A "request context" is a pattern used to carry data relevant to the entire lifecycle of that single request, such as a user's session or a unique request ID for tracing.

The primary goal is to make this data available throughout the call stack **without** having to manually pass it as an argument through every single function, a practice known as "prop drilling."

## Context Propagation

Modern languages provide mechanisms to carry a context that is implicitly available throughout the asynchronous call chain of a single request.

```mermaid
graph TD
    A[Request In] --> B{Middleware};
    B -- Creates context with<br>RequestID & User --> C[Controller];
    C -- Calls service --> D[Service];
    D -- Calls repository --> E[Repository];
    E -- Calls logger --> F[Logging Function];
    
    subgraph "Implicitly Available Context"
        direction LR
        Ctx(Context<br>{reqID: 'xyz', user: 'Alice'})
    end

    B -- accesses --> Ctx;
    C -- accesses --> Ctx;
    D -- accesses --> Ctx;
    E -- accesses --> Ctx;
    F -- accesses --> Ctx;

    style B fill:#1b263b,stroke:#00f5d4,stroke-width:2px;
```
Any function in the call stack can access the context without it being explicitly passed as a parameter, cleaning up function signatures and decoupling business logic from web-layer concerns.

## Code Examples

Here's how to implement and use an ambient request context in different languages.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="nodejs">Node.js (AsyncLocalStorage)</button>
    <button class="tab-button" data-lang="python">Python (ContextVars)</button>
    <button class="tab-button" data-lang="go">Go (context.Context)</button>
  </div>
  <div class="tab-content active" data-lang="nodejs">
<pre><code class="language-javascript">
const { AsyncLocalStorage } = require('async_hooks');
const als = new AsyncLocalStorage();

// 1. Middleware to create and populate the context
function contextMiddleware(req, res, next) {
  const store = new Map();
  store.set('requestId', crypto.randomUUID());
  store.set('user', { id: 123 }); // From a real auth middleware
  
  als.run(store, () => next());
}

// 2. A deep function that needs the context
function log(message) {
  const store = als.getStore();
  const requestId = store ? store.get('requestId') : 'no-request-id';
  console.log(`[${requestId}] ${message}`);
}

// 3. Service layer can now access context without prop drilling
class ProductService {
  getProduct(productId) {
    const store = als.getStore();
    const user = store.get('user');
    log(`User ${user.id} is fetching product ${productId}.`);
    // ... permission checks and db calls ...
  }
}
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
from contextvars import ContextVar
import uuid

# 1. Create global context variables
request_id_var = ContextVar('request_id', default=None)
user_var = ContextVar('user', default=None)

# 2. Middleware to create and populate the context (e.g., in Flask)
@app.before_request
def before_request():
    request_id_var.set(str(uuid.uuid4()))
    user_var.set({'id': 123}) # From a real auth middleware

# 3. A deep function that needs the context
def log(message):
    request_id = request_id_var.get()
    print(f"[{request_id}] {message}")

# 4. Service layer can now access context
class ProductService:
    def get_product(self, product_id):
        user = user_var.get()
        log(f"User {user['id']} is fetching product {product_id}.")
        # ... permission checks and db calls ...
</code></pre>
  </div>
  <div class="tab-content" data-lang="go">
<pre><code class="language-go">
package main
import ("context"; "net/http"; "log")

// A custom type for our context keys to avoid collisions
type contextKey string
const userKey contextKey = "user"
const requestIDKey contextKey = "requestID"

// 1. Middleware to create and populate the context
func ContextMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		ctx = context.WithValue(ctx, requestIDKey, "xyz-123")
		ctx = context.WithValue(ctx, userKey, "Alice")
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// 2. A deep function that needs the context
func Log(ctx context.Context, message string) {
	requestID, _ := ctx.Value(requestIDKey).(string)
	log.Printf("[%s] %s", requestID, message)
}

// 3. Service layer accepts the context as the first argument (Go convention)
type ProductService struct {}
func (s *ProductService) GetProduct(ctx context.Context, productID int) {
	user, _ := ctx.Value(userKey).(string)
	Log(ctx, "Fetching product for user "+user)
	// ...
}
</code></pre>
  </div>
</div>

## What to Store in the Context
*   **Request ID**: Crucial for distributed tracing and correlating logs.
*   **Authentication Information**: The current user object, their roles, and permissions.
*   **Tenant Information**: In a multi-tenant application, the ID of the current tenant.
*   **Database Transaction Object**: To allow different service methods to participate in the same transaction.
*   **Localization Information**: The user's preferred language or locale.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://nodejs.org/api/async_hooks.html#class-asynclocalstorage" target="_blank" rel="noopener noreferrer">Node.js AsyncLocalStorage Docs</a></li>
  <li><a href="https://docs.python.org/3/library/contextvars.html" target="_blank" rel="noopener noreferrer">Python contextvars Docs</a></li>
  <li><a href="https://pkg.go.dev/context" target="_blank" rel="noopener noreferrer">Go context Package Docs</a></li>
</ul>
</div>