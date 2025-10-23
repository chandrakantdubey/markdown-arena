# CRUD Operations

## Introduction

CRUD is an acronym that stands for the four basic functions of persistent storage: **Create**, **Read**, **Update**, and **Delete**. These four operations are the fundamental building blocks for interacting with any data resource, whether it's records in a database, files in a storage system, or objects served by an API.

For a backend engineer, implementing CRUD operations is a core and frequent task. A significant portion of most applications involves managing resources through these four essential actions.

## Mapping CRUD to APIs and Databases

CRUD operations have a direct correspondence with both RESTful API conventions (using HTTP methods) and SQL database commands.

| Operation | Description                                                              | RESTful HTTP Method(s)              | SQL Command(s)                                    |
| :-------- | :----------------------------------------------------------------------- | :---------------------------------- | :------------------------------------------------ |
| **Create**  | Create a new resource.                                                   | `POST /resources`                   | `INSERT`                                          |
| **Read**    | Retrieve one or more resources.                                          | `GET /resources`, `GET /resources/:id` | `SELECT`                                          |
| **Update**  | Modify an existing resource.                                             | `PUT` / `PATCH /resources/:id`      | `UPDATE`                                          |
| **Delete**  | Remove an existing resource.                                             | `DELETE /resources/:id`             | `DELETE`                                          |

## Code Examples: A Simple User API

Here are practical examples of a complete CRUD API for managing users. We'll use a simple in-memory array as a database for demonstration purposes.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="nodejs">Node.js (Express)</button>
    <button class="tab-button" data-lang="python">Python (Flask)</button>
    <button class="tab-button" data-lang="go">Go (net/http)</button>
  </div>
  <div class="tab-content active" data-lang="nodejs">
<pre><code class="language-javascript">
const express = require('express');
const app = express();
app.use(express.json());

let users = [{ id: 1, name: 'Alice' }];
let nextId = 2;

// CREATE
app.post('/users', (req, res) => {
    const newUser = { id: nextId++, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// READ (all)
app.get('/users', (req, res) => {
    res.json(users);
});

// READ (one)
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// UPDATE (PATCH)
app.patch('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    user.name = req.body.name || user.name;
    res.json(user);
});

// DELETE
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('User not found');
    users.splice(index, 1);
    res.status(204).send();
});

app.listen(3000);
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
from flask import Flask, request, jsonify, Response

app = Flask(__name__)

users = [{'id': 1, 'name': 'Alice'}]
next_id = 2

# CREATE
@app.route('/users', methods=['POST'])
def create_user():
    global next_id
    data = request.get_json()
    new_user = {'id': next_id, 'name': data['name']}
    users.append(new_user)
    next_id += 1
    return jsonify(new_user), 201

# READ (all)
@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)

# READ (one)
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((u for u in users if u['id'] == user_id), None)
    if not user:
        return 'User not found', 404
    return jsonify(user)

# UPDATE (PATCH)
@app.route('/users/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    user = next((u for u in users if u['id'] == user_id), None)
    if not user:
        return 'User not found', 404
    data = request.get_json()
    user['name'] = data.get('name', user['name'])
    return jsonify(user)

# DELETE
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global users
    user_found = any(u['id'] == user_id for u in users)
    if not user_found:
        return 'User not found', 404
    users = [u for u in users if u['id'] != user_id]
    return Response(status=204)

if __name__ == '__main__':
    app.run(port=5000)
</code></pre>
  </div>
  <div class="tab-content" data-lang="go">
<pre><code class="language-go">
package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"sync"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

var (
	users   = make(map[int]User)
	nextID  = 2
	usersMu sync.Mutex
)

func usersHandler(w http.ResponseWriter, r *http.Request) {
	usersMu.Lock()
	defer usersMu.Unlock()
	
	idStr := r.URL.Path[len("/users/"):]
	id, _ := strconv.Atoi(idStr)

	switch r.Method {
	case "POST": // CREATE
		var user User
		json.NewDecoder(r.Body).Decode(&user)
		user.ID = nextID
		users[nextID] = user
		nextID++
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(user)
	case "GET": // READ
		if id > 0 { // one
			user, ok := users[id]
			if !ok { http.NotFound(w, r); return }
			json.NewEncoder(w).Encode(user)
		} else { // all
			var userList []User
			for _, u := range users { userList = append(userList, u) }
			json.NewEncoder(w).Encode(userList)
		}
	case "PATCH": // UPDATE
		user, ok := users[id]
		if !ok { http.NotFound(w, r); return }
		var updates map[string]string
		json.NewDecoder(r.Body).Decode(&updates)
		user.Name = updates["name"]
		users[id] = user
		json.NewEncoder(w).Encode(user)
	case "DELETE":
		if _, ok := users[id]; !ok { http.NotFound(w, r); return }
		delete(users, id)
		w.WriteHeader(http.StatusNoContent)
	default:
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}
}

func main() {
    users[1] = User{ID: 1, Name: "Alice"}
	http.HandleFunc("/users", usersHandler) // For POST and GET all
	http.HandleFunc("/users/", usersHandler) // For GET one, PATCH, DELETE
	http.ListenAndServe(":8080", nil)
}
</code></pre>
  </div>
</div>

## Best Practices
*   **Use Transactions for Atomicity**: Operations that involve multiple database writes should be wrapped in a database transaction to ensure data integrity.
*   **Separate Concerns**: Implement CRUD logic within a well-defined architecture (e.g., Controller-Service-Repository pattern).
*   **Validate Everything**: Always validate incoming data for both `Create` and `Update` operations.
*   **Soft Deletes**: Consider "soft deleting" (marking a record as inactive) instead of hard deleting to preserve data history.
*   **Secure Your Endpoints**: Ensure proper authentication and authorization checks are in place for all CRUD operations.