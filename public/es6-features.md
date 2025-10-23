# ES6+ Features

ES6 (officially ECMAScript 2015) was the most significant update to JavaScript since its creation. It introduced a host of new syntax and features that make writing JavaScript more powerful, concise, and readable. Modern JavaScript development is built on these features.

## `let` and `const`
These replaced `var` for variable declaration, introducing **block scope** and preventing many common bugs.
*   `let`: Declares a mutable, block-scoped variable.
*   `const`: Declares an immutable, block-scoped variable (the reference cannot be changed).
(See "Variables, Scope, and Hoisting" for a full explanation).

## Arrow Functions
A more concise syntax for writing function expressions. They also have a different behavior for the `this` keyword (they inherit it from their surrounding scope).

```javascript
// Old syntax
function square(x) {
    return x * x;
}

const numbers = [1, 2, 3];
numbers.map(function(n) {
    return n * 2;
});

// New arrow function syntax
const squareArrow = x => x * x;

numbers.map(n => n * 2);
```

## Template Literals
Template literals provide an easier way to create strings and include variables within them, using backticks (`` ` ``) instead of quotes.

```javascript
// Old way
var name = "Alice";
var greeting = "Hello, " + name + "!";

// New way with template literals
const name = "Alice";
const greeting = `Hello, ${name}!`; // Variables are embedded with ${}
```
They also support multi-line strings without needing `\n`.

## Destructuring Assignment
A syntax that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

```javascript
// Object destructuring
const person = { firstName: 'John', lastName: 'Doe', age: 30 };
const { firstName, age } = person; // Creates `firstName` and `age` variables
// console.log(firstName); // "John"
// console.log(age); // 30

// Array destructuring
const [first, second] = ['apple', 'banana', 'cherry'];
// console.log(first); // "apple"
// console.log(second); // "banana"
```
Destructuring is heavily used in modern React for unpacking props and state.

## Spread and Rest Operators (`...`)
The `...` syntax is used for two different but related purposes.

### Spread Operator
The spread operator "expands" an iterable (like an array or object) into its individual elements. It's great for making shallow copies or merging.

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5] (copying and adding)

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 } (copying and adding)
```

### Rest Parameter
The rest parameter collects multiple arguments into a single array. It must be the last parameter in a function definition.

```javascript
function sum(...numbers) {
    // `numbers` is an array of all arguments passed to the function
    return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3); // 6
sum(10, 20); // 30
```

## Modules (`import`/`export`)
ES6 introduced a native module system to JavaScript, finally providing a standard way to organize code into reusable files.

**utils.js**
```javascript
export const PI = 3.14;
export default function square(x) {
    return x * x;
}
```

**main.js**
```javascript
// Import the default export and a named export
import square, { PI } from './utils.js';

console.log(PI); // 3.14
console.log(square(5)); // 25
```

## Other Notable Features
*   **Classes**: A cleaner syntax for creating objects and handling inheritance.
*   **Promises**: A native way to handle asynchronous operations.
*   **Default Parameters**: `function greet(name = 'Guest') { ... }`
*   **`for...of` loop**: A simpler way to iterate over iterables like arrays and strings.

These features form the foundation of modern JavaScript and are used extensively in libraries like React and frameworks like Node.js.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference" target="_blank" rel="noopener noreferrer">MDN: JavaScript reference</a></li>
  <li><a href="https://es6-features.org/" target="_blank" rel="noopener noreferrer">ES6 Features Overview</a></li>
</ul>
</div>