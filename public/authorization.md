# Authorization

## Introduction

Authorization is the process of determining whether an authenticated user has the permission to access a specific resource or perform a particular action. It follows authentication and answers the question, "What are you allowed to do?".

While authentication is about verifying identity, authorization is about enforcing access control policies. For example, authentication confirms you are "User Alice," while authorization determines if Alice is allowed to view the admin dashboard or delete another user's post. A robust authorization system is crucial for enforcing security, privacy, and business rules within your application.

## Authorization Models: RBAC vs. ABAC

Two of the most common authorization models are Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC). RBAC is simpler and widely used, while ABAC offers more fine-grained, contextual control.

```mermaid
graph TD
    subgraph RBAC (Role-Based Access Control)
        U1(User: Alice) -- assigned to --> R1(Role: Editor);
        R1 -- has --> P1(Permission: create-post);
        R1 -- has --> P2(Permission: edit-own-post);
        
        Action1(Alice tries to edit post) --> Check1{Does Editor role have edit-own-post?};
        Check1 -- Yes --> Allow1(Allow);
        Action2(Alice tries to delete post) --> Check2{Does Editor role have delete-post?};
        Check2 -- No --> Deny1(Deny);
    end

    subgraph ABAC (Attribute-Based Access Control)
        U_Attr(User<br>department: "Marketing")
        A_Attr(Action<br>type: "edit")
        R_Attr(Resource<br>status: "draft")
        
        Policy(Policy: Allow if User.dept == "Marketing"<br>AND Action.type == "edit"<br>AND Resource.status == "draft")
        
        Action3(Marketing user tries to edit draft) --> Check3{Evaluate Policy};
        Check3 -- All conditions met --> Allow2(Allow);
        Action4(Marketing user tries to edit published doc) --> Check4{Evaluate Policy};
        Check4 -- Resource.status != "draft" --> Deny2(Deny);
    end
```

### Role-Based Access Control (RBAC)

*   **How it works**: Permissions are assigned to roles, and roles are assigned to users. The system checks if any of a user's roles contain the required permission.
*   **Pros**: Simple to understand and manage.
*   **Cons**: Can become rigid and lead to "role explosion" if you need granular permissions.

### Attribute-Based Access Control (ABAC)

*   **How it works**: Access decisions are based on attributes of the user, resource, action, and environment.
*   **Pros**: Extremely flexible and powerful for complex, context-aware rules.
*   **Cons**: More complex to design, implement, and debug.

## Implementation Examples

Authorization logic is typically implemented as middleware that runs after authentication. Here are examples of a simple RBAC check.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="nodejs">Node.js (Express)</button>
    <button class="tab-button" data-lang="python">Python (Flask)</button>
    <button class="tab-button" data-lang="go">Go (net/http)</button>
  </div>
  <div class="tab-content active" data-lang="nodejs">
<pre><code class="language-javascript">
// Assumes an authentication middleware has already run and attached
// a user object like { id: 1, roles: ['editor'] } to req.user.

// Middleware factory to check for a specific role
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.roles.includes(role)) {
      // User has the required role, proceed
      return next();
    }
    // User does not have the role, send Forbidden error
    return res.status(403).send('Access denied. Insufficient permissions.');
  };
};

// Applying the authorization middleware to a route
app.get('/admin/dashboard', requireRole('admin'), (req, res) => {
  res.send('Welcome to the admin dashboard!');
});

app.post('/posts', requireRole('editor'), (req, res) => {
    // Logic to create a post
});
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
from functools import wraps
from flask import g, request, abort

# Assumes an authentication function has run and attached
# a user object like {'id': 1, 'roles': ['editor']} to Flask's 'g.user'.

def require_role(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'user' not in g or role not in g.user.get('roles', []):
                abort(403) # Forbidden
            return f(*args, **kwargs)
        return decorated_function
    return decorator

@app.route('/admin/dashboard')
@require_role('admin')
def admin_dashboard():
    return 'Welcome to the admin dashboard!'

@app.route('/posts', methods=['POST'])
@require_role('editor')
def create_post():
    # Logic to create a post
    return 'Post created', 201
</code></pre>
  </div>
  <div class="tab-content" data-lang="go">
<pre><code class="language-go">
package main

import (
	"context"
	"net/http"
)

// User struct representing the authenticated user
type User struct {
	ID    int
	Roles []string
}

// Middleware to check if a user has the required role.
// Assumes an auth middleware has already put the user into the request context.
func requireRole(role string, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		user, ok := r.Context().Value("user").(*User)
		if !ok {
			http.Error(w, "Forbidden", http.StatusForbidden)
			return
		}

		for _, userRole := range user.Roles {
			if userRole == role {
				next.ServeHTTP(w, r)
				return
			}
		}

		http.Error(w, "Forbidden", http.StatusForbidden)
	}
}

// Example usage
func adminDashboardHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome to the admin dashboard!"))
}

func main() {
    // Dummy auth middleware for demonstration
    authMiddleware := func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            // In a real app, you would validate a token and fetch the user
            user := &User{ID: 1, Roles: []string{"editor", "viewer"}}
            ctx := context.WithValue(r.Context(), "user", user)
            next.ServeHTTP(w, r.WithContext(ctx))
        })
    }
    
	mux := http.NewServeMux()
    // This route is protected by the 'admin' role check
	mux.HandleFunc("/admin/dashboard", requireRole("admin", adminDashboardHandler))

	http.ListenAndServe(":8080", authMiddleware(mux))
}
</code></pre>
  </div>
</div>

## Best Practices

*   **Principle of Least Privilege**: By default, deny all access. Only grant the minimum permissions necessary.
*   **Centralize Authorization Logic**: Use middleware or a dedicated authorization service to enforce policies consistently.
*   **Enforce on the Server-Side**: All authorization decisions must be made and enforced on the server. Never trust the client to enforce its own permissions.
*   **Keep it Auditable**: Log all authorization failures. This is crucial for security monitoring.
*   **Separate from Authentication**: Authentication and authorization are distinct concerns and should be handled by separate parts of your system.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer">OWASP Access Control Cheat Sheet</a></li>
  <li><a href="https://www.imperva.com/learn/application-security/rbac-role-based-access-control/" target="_blank" rel="noopener noreferrer">What is RBAC?</a></li>
  <li><a href="https://csrc.nist.gov/projects/abac" target="_blank" rel="noopener noreferrer">NIST Guide to Attribute Based Access Control</a></li>
</ul>
</div>