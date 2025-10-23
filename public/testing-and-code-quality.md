# Testing and Code Quality

## Introduction

Writing code that works is only the first step. Writing high-quality code that is reliable, maintainable, and easy to understand is what separates professional software engineering from simple programming. A robust testing strategy and a commitment to code quality are essential for building scalable and long-lasting backend systems.

Investing in testing and quality enables you to move faster and with more confidence in the long run.

## The Testing Pyramid

The testing pyramid is a model for a healthy testing strategy. It advocates for having many fast, isolated unit tests at the base, a smaller number of integration tests, and very few slow, end-to-end tests at the top.

```mermaid
graph TD
    subgraph Pyramid
        direction TB
        E2E(End-to-End Tests);
        Integration(Integration Tests);
        Unit(Unit Tests);
    end
    
    note right of E2E "Few, Slow, Brittle<br>Tests the entire system"
    note right of Integration "More, Slower<br>Tests how components work together"
    note right of Unit "Lots, Fast, Isolated<br>Tests a single function/module"

    style Unit fill:#2a9d8f,stroke:#fff
    style Integration fill:#e9c46a,stroke:#fff
    style E2E fill:#e76f51,stroke:#fff
```

## Code Examples

### Unit Test Example
This tests a single function in isolation, "mocking" its dependency (the database) to control the test conditions.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="nodejs">Node.js (Jest)</button>
    <button class="tab-button" data-lang="python">Python (Pytest)</button>
    <button class="tab-button" data-lang="go">Go (testing)</button>
  </div>
  <div class="tab-content active" data-lang="nodejs">
<pre><code class="language-javascript">
// userService.js
class UserService {
  constructor(db) { this.db = db; }
  async getAdmins() {
    const users = await this.db.getAllUsers();
    return users.filter(u => u.role === 'admin');
  }
}

// userService.test.js
test('should return only admin users', async () => {
  // Mock the database dependency
  const mockDb = {
    getAllUsers: jest.fn().mockResolvedValue([
      { name: 'Alice', role: 'admin' },
      { name: 'Bob', role: 'user' },
      { name: 'Charlie', role: 'admin' },
    ]),
  };
  const userService = new UserService(mockDb);
  
  const admins = await userService.getAdmins();
  
  expect(admins).toHaveLength(2);
  expect(admins[0].name).toBe('Alice');
});
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
# user_service.py
class UserService:
    def __init__(self, db):
        self.db = db
    def get_admins(self):
        users = self.db.get_all_users()
        return [u for u in users if u['role'] == 'admin']

# test_user_service.py
from unittest.mock import Mock

def test_returns_only_admin_users():
    # Mock the database dependency
    mock_db = Mock()
    mock_db.get_all_users.return_value = [
        {'name': 'Alice', 'role': 'admin'},
        {'name': 'Bob', 'role': 'user'},
        {'name': 'Charlie', 'role': 'admin'},
    ]
    user_service = UserService(mock_db)
    
    admins = user_service.get_admins()
    
    assert len(admins) == 2
    assert admins[0]['name'] == 'Alice'
</code></pre>
  </div>
  <div class="tab-content" data-lang="go">
<pre><code class="language-go">
// user_service.go
package user

type User struct { Name, Role string }
type UserDB interface { GetAllUsers() []User }
type Service struct { DB UserDB }
func (s *Service) GetAdmins() []User {
	users := s.DB.GetAllUsers()
	var admins []User
	for _, u := range users {
		if u.Role == "admin" { admins = append(admins, u) }
	}
	return admins
}

// user_service_test.go
package user
import "testing"
// Mock the database dependency
type mockUserDB struct{}
func (m *mockUserDB) GetAllUsers() []User {
	return []User{
		{Name: "Alice", Role: "admin"},
		{Name: "Bob", Role: "user"},
		{Name: "Charlie", Role: "admin"},
	}
}
func TestGetAdmins(t *testing.T) {
	service := &Service{DB: &mockUserDB{}}
	admins := service.GetAdmins()
	if len(admins) != 2 { t.Errorf("Expected 2 admins, got %d", len(admins)) }
	if admins[0].Name != "Alice" { t.Errorf("Expected first admin to be Alice") }
}
</code></pre>
  </div>
</div>

### Integration Test Example
This tests an API endpoint by sending a real HTTP request to a running instance of the application and checking the response.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="nodejs">Node.js (Supertest)</button>
    <button class="tab-button" data-lang="python">Python (Requests)</button>
    <button class="tab-button" data-lang="go">Go (httptest)</button>
  </div>
  <div class="tab-content active" data-lang="nodejs">
<pre><code class="language-javascript">
const request = require('supertest');
const app = require('./app'); // Your Express app

describe('GET /users/1', () => {
  it('should return Alice', async () => {
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Alice');
  });
});
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
import requests

BASE_URL = "http://127.0.0.1:5000" # URL of the running test server

def test_get_user_endpoint():
    response = requests.get(f"{BASE_URL}/users/1")
    assert response.status_code == 200
    assert response.json()['name'] == 'Alice'
</code></pre>
  </div>
  <div class="tab-content" data-lang="go">
<pre><code class="language-go">
package main
import (
	"net/http"
	"net/http/httptest"
	"testing"
)
func TestGetUserHandler(t *testing.T) {
    req, _ := http.NewRequest("GET", "/users/1", nil)
    rr := httptest.NewRecorder()
    handler := http.HandlerFunc(GetUserHandler) // Your real handler
    handler.ServeHTTP(rr, req)

    if status := rr.Code; status != http.StatusOK {
        t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
    }
    // ... check response body ...
}
</code></pre>
  </div>
</div>

## Code Quality
*   **Code Linting**: Use a static analysis tool (e.g., ESLint, Flake8/Black, golangci-lint) to automatically check for stylistic errors and common bugs.
*   **Code Reviews**: Have other developers on your team review your code before it's merged. This is a powerful tool for sharing knowledge and improving quality.
*   **Test-Driven Development (TDD)**: A practice where you write a failing test *before* you write the implementation code.
*   **Continuous Integration (CI)**: Automatically run your linters and tests in a CI pipeline on every code push to ensure quality is maintained.