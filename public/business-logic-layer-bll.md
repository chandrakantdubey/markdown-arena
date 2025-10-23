# Business Logic Layer (BLL)

## Introduction

The Business Logic Layer (BLL), often referred to as the "service layer," is a core component of a well-architected backend application. Its primary responsibility is to encapsulate the application's business rules, logic, and workflows. It acts as an intermediary between the presentation layer (e.g., API controllers) and the data access layer (e.g., ORMs, database repositories).

By separating business logic from other concerns, you create a system that is more organized, maintainable, testable, and reusable.

## Architecture: Separating Concerns

A typical request flow in an application with a BLL follows a 3-tier structure. The key principle is that layers should only communicate with adjacent layers.

```mermaid
graph TD
    A[Client Request] --> B{Controller Layer};
    B -- "1. Parses HTTP Request<br>2. Validates Input<br>3. Calls Service" --> C{Service Layer (BLL)};
    C -- "4. Executes Business Logic<br>5. Orchestrates Data Access" --> D{Data Access Layer (Repository)};
    D -- "6. Interacts with Database" --> E[(Database)];
    E -- "7. Returns Data" --> D;
    D -- "8. Returns Data Models" --> C;
    C -- "9. Returns Business Objects / DTOs<br>10. Throws Business Errors" --> B;
    B -- "11. Formats HTTP Response<br>12. Maps Errors to Status Codes" --> F[Client Response];
    
    style B fill:#1b263b,stroke:#00f5d4,stroke-width:2px;
    style C fill:#1b263b,stroke:#ffc300,stroke-width:2px;
    style D fill:#1b263b,stroke:#415a77,stroke-width:2px;
```
*   **Controller**: Handles HTTP-specific tasks. It knows nothing about the database.
*   **Service (BLL)**: Contains the core application logic. It knows nothing about HTTP.
*   **Repository (DAL)**: Handles all database communication. It knows nothing about business rules.

## Example: User Registration Workflow

Let's see how each layer participates in a user registration process.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="nodejs">Node.js</button>
    <button class="tab-button" data-lang="python">Python</button>
    <button class="tab-button" data-lang="go">Go</button>
  </div>
  <div class="tab-content active" data-lang="nodejs">
<pre><code class="language-javascript">
// --- Controller Layer (user.controller.js) ---
class UserController {
  constructor(userService) { this.userService = userService; }
  async register(req, res) {
    // 1. Basic input validation
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Missing fields');
    
    try {
      // 2. Call the service layer
      const newUser = await this.userService.register(email, password);
      // 5. Format HTTP response
      return res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof UserExistsError) {
        return res.status(409).send(error.message);
      }
      return res.status(500).send('Internal Server Error');
    }
  }
}

// --- Service Layer (user.service.js) ---
class UserService {
  constructor(userRepo, emailService) {
    this.userRepo = userRepo;
    this.emailService = emailService;
  }
  async register(email, password) {
    // 3. Execute business logic
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) throw new UserExistsError('Email already in use.');
    
    const hashedPassword = await hashPassword(password);
    const newUser = { email, password: hashedPassword };
    
    const createdUser = await this.userRepo.create(newUser);
    
    // 4. Orchestrate with other services
    await this.emailService.sendWelcomeEmail(email);
    
    delete createdUser.password;
    return createdUser;
  }
}

// --- Data Access Layer (user.repository.js) ---
class UserRepository {
  constructor(db) { this.db = db; }
  async findByEmail(email) {
    return this.db.query('SELECT * FROM users WHERE email = ?', [email]);
  }
  async create(user) {
    return this.db.query('INSERT INTO users SET ?', user);
  }
}
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
# --- Controller Layer (user_controller.py) ---
class UserController:
    def __init__(self, user_service):
        self.user_service = user_service
    
    def register(self, request_data):
        email = request_data.get('email')
        password = request_data.get('password')
        if not email or not password:
            return {'error': 'Missing fields'}, 400
        
        try:
            new_user = self.user_service.register(email, password)
            return new_user, 201
        except UserExistsError as e:
            return {'error': str(e)}, 409
        except Exception:
            return {'error': 'Internal Server Error'}, 500

# --- Service Layer (user_service.py) ---
class UserService:
    def __init__(self, user_repo, email_service):
        self.user_repo = user_repo
        self.email_service = email_service
        
    def register(self, email, password):
        if self.user_repo.find_by_email(email):
            raise UserExistsError('Email already in use.')
        
        hashed_password = hash_password(password)
        new_user = {'email': email, 'password': hashed_password}
        
        created_user = self.user_repo.create(new_user)
        self.email_service.send_welcome_email(email)
        
        created_user.pop('password', None)
        return created_user

# --- Data Access Layer (user_repository.py) ---
class UserRepository:
    def __init__(self, db_connection):
        self.db = db_connection
        
    def find_by_email(self, email):
        # Executes: SELECT * FROM users WHERE email = %s
        pass # implementation details
        
    def create(self, user_data):
        # Executes: INSERT INTO users ...
        pass # implementation details
</code></pre>
  </div>
  <div class="tab-content" data-lang="go">
<pre><code class="language-go">
// --- Controller Layer (user_controller.go) ---
type UserController struct {
    UserService services.UserService
}
func (c *UserController) Register(w http.ResponseWriter, r *http.Request) {
    var reqBody struct { Email string; Password string }
    if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    newUser, err := c.UserService.Register(r.Context(), reqBody.Email, reqBody.Password)
    if err != nil {
        if errors.Is(err, services.ErrUserExists) {
            http.Error(w, err.Error(), http.StatusConflict)
            return
        }
        http.Error(w, "Internal Server Error", http.StatusInternalServerError)
        return
    }
    
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(newUser)
}

// --- Service Layer (user_service.go) ---
type UserService struct {
    UserRepo     repositories.UserRepository
    EmailService *EmailService
}
func (s *UserService) Register(ctx context.Context, email, password string) (*User, error) {
    existing, _ := s.UserRepo.FindByEmail(ctx, email)
    if existing != nil {
        return nil, ErrUserExists
    }
    
    hashedPassword, _ := hashPassword(password)
    newUser := &User{Email: email, Password: hashedPassword}
    
    createdUser, err := s.UserRepo.Create(ctx, newUser)
    if err != nil { return nil, err }
    
    go s.EmailService.SendWelcomeEmail(email) // Non-blocking
    
    createdUser.Password = "" // Don't return the hash
    return createdUser, nil
}

// --- Data Access Layer (user_repository.go) ---
type UserRepository struct {
    DB *sql.DB
}
func (r *UserRepository) FindByEmail(ctx context.Context, email string) (*User, error) {
    // Executes: SELECT id, email, password FROM users WHERE email = $1
    return nil, nil // implementation details
}
func (r *UserRepository) Create(ctx context.Context, user *User) (*User, error) {
    // Executes: INSERT INTO users (email, password) VALUES ($1, $2)
    return nil, nil // implementation details
}
</code></pre>
  </div>
</div>

## Benefits of a BLL

*   **Maintainability**: Business logic is centralized, making it easier to find, understand, and modify.
*   **Testability**: You can test the business logic in isolation without needing to simulate HTTP requests or a live database.
*   **Reusability**: The same business logic can be reused by different entry points, such as a REST API controller, a GraphQL resolver, or a background job worker.

## Best Practices
*   **Use Dependency Injection**: Inject dependencies (like repositories) into services instead of having services create them. This makes testing much easier.
*   **Services Should be Stateless**: A service method should not depend on any state stored within the service instance itself.
*   **Define Clear Contracts**: Use Data Transfer Objects (DTOs) to pass structured data between layers.
*   **Use Custom Errors**: Throw custom, specific errors from the service layer to represent business rule violations (e.g., `UserExistsError`).