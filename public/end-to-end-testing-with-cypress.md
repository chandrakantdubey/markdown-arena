# End-to-End Testing with Cypress

## Introduction

While unit tests check individual functions and integration tests check how components work together, **End-to-End (E2E) tests** check the entire application flow from start to finish. They simulate a real user's journey through your application to verify that all the integrated pieces work together as expected.

**Cypress** is a modern, all-in-one E2E testing framework designed specifically for web applications. It provides a powerful and developer-friendly experience for writing, running, and debugging E2E tests.

## Why Use Cypress?

*   **All-in-One**: Cypress comes with everything you need out of the box: a test runner, assertion library, mocking and stubbing, and more.
*   **Time Travel**: Cypress takes snapshots of your application as the tests run. This allows you to go back and forth in time to see exactly what happened at each step.
*   **Real-time Reloads**: Cypress automatically reloads and re-runs your tests as you make changes to your code.
*   **Easy Debugging**: You can use your browser's native developer tools to debug your application directly within the Cypress test runner.
*   **Network Control**: Cypress allows you to stub and mock network requests, giving you full control over your application's state for testing purposes.

## How Cypress Works

Cypress runs directly in the browser, alongside your application. This gives it native access to the DOM, your application's code, and the network layer, which is what makes its features so powerful.

## Code Example: A Simple Login Flow Test

Cypress tests are typically written in JavaScript and live in a `cypress/e2e` directory in your project. The syntax is very readable and chainable.

Let's write a test for a simple login form.

```javascript
// cypress/e2e/login.cy.js

describe('Login Page', () => {
  beforeEach(() => {
    // This runs before each test in the block
    // We visit the login page
    cy.visit('/login');
  });

  it('should allow a user to log in and redirect to the dashboard', () => {
    // --- Test setup: Mock the network request ---
    // Intercept the POST request to /api/login and provide a mock response
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token',
        user: { name: 'Test User' },
      },
    }).as('loginRequest'); // Give the intercept an alias

    // --- Test actions: Simulate user interaction ---

    // Find the email input by its label, and type into it
    cy.findByLabelText(/email/i).type('test@example.com');

    // Find the password input and type into it
    cy.findByLabelText(/password/i).type('password123');

    // Find the login button by its role and text, and click it
    cy.findByRole('button', { name: /log in/i }).click();

    // --- Test assertions ---

    // Wait for the 'loginRequest' to complete
    cy.wait('@loginRequest');

    // Assert that the URL has changed to the dashboard
    cy.url().should('include', '/dashboard');

    // Assert that the dashboard now contains a welcome message
    cy.findByRole('heading', { name: /welcome, test user/i }).should('exist');
  });

  it('should show an error message with invalid credentials', () => {
    // Mock a failed login response
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' },
    }).as('loginRequest');

    cy.findByLabelText(/email/i).type('wrong@example.com');
    cy.findByLabelText(/password/i).type('wrongpassword');
    cy.findByRole('button', { name: /log in/i }).click();

    // Assert that the error message is displayed on the page
    cy.findByText(/invalid credentials/i).should('exist');

    // Assert that we are still on the login page
    cy.url().should('include', '/login');
  });
});
```
This test covers both the success and failure cases of a login flow, providing high confidence that this critical user journey is working correctly. E2E tests are at the top of the testing pyramid—they are slower and more brittle than unit tests, but they are invaluable for verifying key user flows.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://docs.cypress.io/guides/getting-started/writing-your-first-test" target="_blank" rel="noopener noreferrer">Cypress Official Documentation - Writing Your First Test</a></li>
  <li><a href="https://www.youtube.com/watch?v=A_6_jMvr_a4" target="_blank" rel="noopener noreferrer">Cypress in 100 Seconds (Video)</a></li>
</ul>
</div>