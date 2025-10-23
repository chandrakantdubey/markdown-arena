# Error Handling in JavaScript

Error handling is the process of responding to and recovering from error conditions in your program. In JavaScript, errors disrupt the normal flow of execution. If an error is not handled (or "caught"), the program will terminate. Proper error handling is essential for building robust and user-friendly applications.

## The `try...catch...finally` Statement

The primary mechanism for handling runtime errors in JavaScript is the `try...catch` block.

*   **`try` block**: Contains the code that might throw an error.
*   **`catch` block**: If an error occurs within the `try` block, the execution of the `try` block is stopped, and the code inside the `catch` block is executed. The `catch` block receives an **error object** as an argument.
*   **`finally` block** (optional): This block is **always** executed, regardless of whether an error was thrown or not. It's typically used for cleanup code, like closing a file or a network connection.

```javascript
function divide(a, b) {
    try {
        console.log("Attempting to divide...");
        if (b === 0) {
            // Use the `throw` statement to create a user-defined error
            throw new Error("Division by zero is not allowed.");
        }
        const result = a / b;
        console.log("Division successful.");
        return result;

    } catch (error) {
        // This block runs only if an error was thrown
        console.error("An error occurred:", error.message);
        // The error object typically has `name` and `message` properties
        // console.error("Error name:", error.name);
        return null; // Return a fallback value

    } finally {
        // This block always runs
        console.log("Division attempt finished.");
    }
}

divide(10, 2);  // Returns 5
divide(10, 0);  // Returns null and logs the error
```

## The `Error` Object

When an error is thrown, JavaScript creates an `Error` object. This object has several useful properties for debugging:

*   `name`: The type of the error (e.g., `Error`, `SyntaxError`, `TypeError`).
*   `message`: A human-readable description of the error.
*   `stack`: A string containing the stack trace, showing where the error occurred in the code.

## Asynchronous Error Handling

Handling errors in asynchronous code requires a different approach depending on whether you are using callbacks, Promises, or `async/await`.

### With Callbacks
The common convention is the "error-first" callback, where the first argument to the callback function is reserved for an error object.

```javascript
function readFileAsync(path, callback) {
    // ... logic to read file
    if (fileNotFound) {
        callback(new Error("File not found."), null);
    } else {
        callback(null, fileContent);
    }
}
```

### With Promises
Promises have a built-in mechanism for error handling: the `.catch()` method. A promise chain can have a single `.catch()` at the end to handle any rejection that happens in the chain.

```javascript
fetch('https://api.example.com/invalid-url')
    .then(response => {
        if (!response.ok) {
            // Throwing an error inside a .then will trigger the .catch
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        // Catches both network errors and the error we threw
        console.error("Fetch failed:", error.message);
    });
```

### With `async/await`
`async/await` allows you to use the standard `try...catch` block for asynchronous code, which makes error handling much cleaner and more intuitive.

```javascript
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/invalid-url');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Fetch failed:", error.message);
    }
}
```

## Custom Errors

For better error handling in larger applications, it's a good practice to create your own custom error classes that extend the base `Error` class. This allows you to differentiate between different types of application-specific errors.

```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}

try {
    // ... some logic
    if (inputIsInvalid) {
        throw new ValidationError("Invalid user input.");
    }
} catch (error) {
    if (error instanceof ValidationError) {
        // Handle this specific error type
        showUserErrorMessage(error.message);
    } else {
        // Handle other unexpected errors
        logGenericError(error);
    }
}
```

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch" target="_blank" rel="noopener noreferrer">MDN: try...catch</a></li>
  <li><a href="https://javascript.info/error-handling" target="_blank" rel="noopener noreferrer">Error handling, "try...catch" (javascript.info)</a></li>
</ul>
</div>