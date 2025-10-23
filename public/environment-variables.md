# Environment Variables in Node.js

An environment variable is a variable whose value is set outside the program, typically in the operating system or the environment where the program is running. They are a fundamental part of the **Twelve-Factor App** methodology, which states that configuration should be strictly separated from code.

Hard-coding configuration values like API keys, database URLs, or port numbers directly into your source code is a bad practice. It's insecure (leaking secrets into version control) and inflexible (requiring code changes to run the app in a different environment). Environment variables solve this problem.

## Accessing Environment Variables: `process.env`

In Node.js, you can access all environment variables through the global `process.env` object. `process.env` is an object containing all the environment variables that were present when the Node.js process was started.

```javascript
// server.js

// It's a good practice to use a default value with the || operator
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const API_KEY = process.env.API_KEY;

if (!DATABASE_URL || !API_KEY) {
  console.error("Error: DATABASE_URL and API_KEY must be set in the environment.");
  process.exit(1); // Exit the process with an error code
}

// ... use these variables to configure your app ...

console.log(`Connecting to database at ${DATABASE_URL}`);
console.log(`Using API Key: ${API_KEY.substring(0, 4)}...`); // Don't log the full key!

// app.listen(PORT, ...);
```

### Setting Environment Variables
You can set environment variables directly in your terminal when you run your application.

**On macOS/Linux:**
```bash
PORT=8080 DATABASE_URL="my-db-url" API_KEY="my-secret-key" node server.js
```

**On Windows (Command Prompt):**
```bash
set PORT=8080
set DATABASE_URL="my-db-url"
node server.js
```

In a production environment (like Heroku, Vercel, or a Docker container), your hosting provider will have a dedicated interface for setting these environment variables.

## Managing Environment Variables in Development: The `.env` File

Setting many variables in the terminal every time you run your app during development is tedious. The **`dotenv`** package is a popular solution to this problem.

`dotenv` is a zero-dependency module that loads environment variables from a `.env` file into `process.env`.

### `dotenv` Setup
1.  **Install it**:
    ```bash
    npm install dotenv
    ```

2.  **Create a `.env` file** in the root of your project. **This file should NEVER be committed to version control.** Add it to your `.gitignore` file immediately.

    **.env:**
    ```
    PORT=5000
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
    API_KEY="your_development_api_key_here"
    ```
    
    **.gitignore:**
    ```
    node_modules
    .env
    ```

3.  **Load it in your code**: At the very beginning of your application's entry point, require and configure `dotenv`.

    **server.js:**
    ```javascript
    import dotenv from 'dotenv';

    // This line loads the variables from .env into process.env
    dotenv.config();

    // Now you can access the variables just like before
    const PORT = process.env.PORT || 3000;
    
    console.log(`Port from .env is: ${PORT}`); // Port from .env is: 5000
    
    // ... rest of your application ...
    ```

Now, when you run `node server.js`, `dotenv` will automatically populate `process.env` with the values from your `.env` file, making local development much easier. In production, you will set the real environment variables in your hosting environment, and `dotenv` will be gracefully ignored.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://nodejs.org/api/process.html#processenv" target="_blank" rel="noopener noreferrer">Node.js Docs: `process.env`</a></li>
  <li><a href="https://github.com/motdotla/dotenv" target="_blank" rel="noopener noreferrer">`dotenv` package on npm</a></li>
  <li><a href="https://12factor.net/config" target="_blank" rel="noopener noreferrer">The Twelve-Factor App: Config</a></li>
</ul>
</div>