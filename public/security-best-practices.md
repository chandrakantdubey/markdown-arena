# Security Best Practices

## Introduction

Backend security is a vast and critical domain. A security breach can lead to data loss, financial damage, and loss of user trust. As a backend engineer, you are on the front lines of defense, and it's your responsibility to build security into your application from the ground up.

Security is not a feature to be added later; it's a continuous process and a mindset that must be applied throughout the entire development lifecycle.

## Core Principles

### 1. Data Encryption

*   **Encryption in Transit**: Always use **TLS (HTTPS)** for all communication. This prevents eavesdropping and man-in-the-middle attacks.
*   **Encryption at Rest**: Encrypt sensitive data in your database and object storage. Most cloud providers offer this by default.
*   **Password Hashing**: Never store passwords in plaintext. Use a strong, slow, one-way hashing algorithm with a unique salt for each user.
    *   **What to do**: Use a well-vetted library to handle hashing and verification.
    ```javascript
    // Using bcrypt in Node.js
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    // Store hashedPassword in the database

    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    ```

### 2. Input Validation and Sanitization

**Never trust user input.** This is the golden rule. All data from external sources must be rigorously validated.
*   **Prevent Injection Attacks**: The #1 threat to web applications.
    *   **What to do**: Use **prepared statements (parameterized queries)** with your ORM or database driver. NEVER build queries by concatenating strings with user input.
    ```javascript
    // BAD: Vulnerable to SQL Injection
    const query = `SELECT * FROM users WHERE email = '${userInput.email}'`;

    // GOOD: The database driver safely handles the user input
    const query = 'SELECT * FROM users WHERE email = ?';
    db.execute(query, [userInput.email]);
    ```
*   **Use Validation Libraries**: Define a strict schema for all incoming data.
    ```javascript
    // Using a library like Joi or Zod
    const userSchema = Joi.object({
        email: Joi.string().email().required(),
        role: Joi.string().valid('user', 'guest').default('user')
    });
    // Validate request body against this schema at the controller level.
    ```

### 3. Strong Authentication and Authorization

*   **Strong Authentication**: Enforce strong password policies, implement rate limiting on login endpoints, and require Multi-Factor Authentication (MFA).
*   **Principle of Least Privilege**: A user should only have access to what they are explicitly permitted to. Default to denying access.
    *   **What to do**: Implement authorization checks in a centralized way, like middleware.
    ```javascript
    // Example of an authorization middleware in Express.js
    function requireRole(role) {
        return function(req, res, next) {
            // Assumes user is attached to req by an auth middleware
            if (req.user && req.user.roles.includes(role)) {
                next(); // User has the required role, proceed
            } else {
                res.status(403).send('Forbidden'); // Deny access
            }
        }
    }
    // Apply to a route: app.get('/admin', requireRole('admin'), ...);
    ```

### 4. Prevent Cross-Site Scripting (XSS)

*   **Backend Role**: The backend must prevent *Stored XSS* by sanitizing user input before storing it, and by setting correct response headers.
*   **What to do**:
    1.  **Escape Output**: Ensure the frontend framework or templating engine you use escapes HTML by default.
    2.  **Set a Content-Security-Policy (CSP) Header**: This is a powerful defense. It tells the browser which sources of content are trusted.
    ```http
    Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com;
    ```

### 5. Prevent Cross-Site Request Forgery (CSRF)

*   **What it is**: An attack that tricks a logged-in user into submitting a malicious request they didn't intend to.
*   **What to do**:
    1.  **Use Anti-CSRF Tokens**: The server generates a unique token for each session. This token must be included in all state-changing requests. Most web frameworks have built-in support for this.
    2.  **Use SameSite Cookies**: Set the `SameSite=Strict` or `SameSite=Lax` attribute on your session cookies. This is a strong, modern browser-level defense.

### 6. Secure Infrastructure and Dependencies

*   **Secrets Management**: Never hard-code secrets (API keys, credentials) in your source code. Use environment variables or a secrets management service (like HashiCorp Vault or AWS Secrets Manager).
*   **Least Privilege in Infrastructure**: The principle applies to your services too. Your application's database user should only have the `SELECT, INSERT, UPDATE` permissions it needs, not admin rights. Your application running in the cloud should have a tightly scoped IAM role, not full access.
*   **Dependency Scanning**: Keep third-party libraries updated. Use tools like `npm audit`, Snyk, or GitHub's Dependabot to scan for known vulnerabilities.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer">OWASP Node.js Security Cheat Sheet</a></li>
  <li><a href="https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer">OWASP REST Security Cheat Sheet</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP" target="_blank" rel="noopener noreferrer">Content Security Policy (MDN)</a></li>
</ul>
</div>