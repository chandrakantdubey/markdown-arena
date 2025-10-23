# Modules in Node.js (CJS vs ESM)

A module system allows you to organize your code into separate files and share code between them. For a long time, Node.js used its own module system called **CommonJS (CJS)**. However, the JavaScript language itself now has a standardized module system called **ES Modules (ESM)**.

Modern Node.js supports both systems, and understanding the differences is crucial for writing and managing a Node.js project.

## CommonJS (CJS)

This is the original module system that has been in Node.js since its inception.

*   **Keywords**: `require` and `module.exports`.
*   **Loading**: Modules are loaded **synchronously**. When `require('./my-module.js')` is called, Node.js stops execution, loads the file from disk, parses it, executes it, and then returns the `module.exports` object.
*   **Syntax**: `require` is a function, and `module.exports` is an object.

### CJS Example

**math.js:**
```javascript
// This file is a CommonJS module

function add(a, b) {
    return a + b;
}

const PI = 3.14159;

// To export, you assign to the `module.exports` object.
// You can export a single item or an object with multiple items.
module.exports = {
    add,
    PI
};
```

**app.js:**
```javascript
// Use the `require` function to import the module.
// The `.js` extension is optional.
const myMath = require('./math');

const sum = myMath.add(5, 10);
console.log(`The sum is ${sum}`);
console.log(`Pi is ${myMath.PI}`);
```

## ES Modules (ESM)

This is the standard module system for the JavaScript language, introduced in ES6 (2015). It's the native module system in browsers and is now fully supported in Node.js.

*   **Keywords**: `import` and `export`.
*   **Loading**: Modules are loaded **asynchronously**. The module loader parses files and resolves the dependency tree before any code is executed.
*   **Syntax**: `import` and `export` are language-level keywords, not functions or objects.

### ESM Example

**math.mjs:** (Note the `.mjs` extension, which tells Node.js to treat this file as an ES Module)
```javascript
// This file is an ES Module

export function add(a, b) {
    return a + b;
}

export const PI = 3.14159;

// You can also have a single "default" export
// export default function someFunction() { ... }
```

**app.mjs:**
```javascript
// Use the `import` keyword.
// The file extension is typically required for local files.
import { add, PI } from './math.mjs';

// If there was a default export:
// import myDefaultFunction from './math.mjs';

const sum = add(5, 10);
console.log(`The sum is ${sum}`);
console.log(`Pi is ${PI}`);
```

## How to Use ESM in Node.js

Node.js will treat your JavaScript files as CommonJS by default. To tell Node.js to use ES Modules, you can do one of two things:

1.  **Use the `.mjs` file extension**: Name your files with `.mjs` instead of `.js`.
2.  **Set `"type": "module"` in `package.json`**: Add this field to your project's `package.json` file. This tells Node.js that all `.js` files in your project should be treated as ES Modules. If you do this, you can name CommonJS files with a `.cjs` extension if you need to mix them.

```json
{
  "name": "my-esm-project",
  "version": "1.0.0",
  "type": "module", // This makes .js files ESM by default
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  }
}
```

## Key Differences Summarized

| Feature             | CommonJS (`require`)                                    | ES Modules (`import`)                                      |
| :------------------ | :------------------------------------------------------ | :--------------------------------------------------------- |
| **Loading**         | Synchronous                                             | Asynchronous                                               |
| **Syntax**          | `require()` is a function call.                         | `import`/`export` are keywords.                            |
| **`this` in global** | Refers to `module.exports`.                             | `undefined`.                                               |
| **Where it runs**   | Original Node.js standard.                              | JavaScript standard. Native in browsers and modern Node.js.|
| **Interoperability**| You can `require()` ESM modules (in some cases).        | You **cannot** `require()` CJS modules. You can `import` them. |

## Which Should You Use?

For new Node.js projects, it is generally recommended to use **ES Modules**. It is the official standard for JavaScript, and the entire ecosystem is moving in this direction. While CommonJS is still widely used and supported, ESM offers benefits like top-level `await` and better static analysis capabilities for tools.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://nodejs.org/api/modules.html" target="_blank" rel="noopener noreferrer">Node.js Docs: Modules</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" target="_blank" rel="noopener noreferrer">MDN: JavaScript modules</a></li>
</ul>
</div>