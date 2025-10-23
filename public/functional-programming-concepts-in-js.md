# Functional Programming Concepts in JS

Functional Programming (FP) is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.

JavaScript is a multi-paradigm language, and it has excellent support for functional programming concepts. Adopting FP principles can lead to code that is more predictable, easier to test, and less prone to bugs.

## Core Concepts

### 1. Pure Functions

A pure function is a function that meets two criteria:
1.  **Given the same input, it will always return the same output.**
2.  **It produces no side effects.** A side effect is any interaction with the outside world from within the function. This includes modifying a global variable, changing the input arguments, logging to the console, or making a network request.

```javascript
// Impure function: It modifies a variable outside its own scope (a side effect)
let total = 0;
function addToTotal(x) {
    total += x;
    return total;
}

// Pure function: Predictable and has no side effects
function add(x, y) {
    return x + y;
}
```
Pure functions are like mathematical functions. `add(2, 3)` will *always* be `5`. This predictability makes them very easy to reason about and to test.

### 2. Immutability

Immutability means that once a data structure is created, it cannot be changed. Instead of modifying an existing object or array, you create a new one with the updated values.

This prevents a whole class of bugs where one part of your application unintentionally changes an object that another part of the application is relying on.

```javascript
// Mutable approach (BAD)
const user = { name: 'Alice', age: 30 };
function celebrateBirthday(person) {
    person.age++; // This mutates the original `user` object
    return person;
}
celebrateBirthday(user);
// console.log(user.age); // 31 - The original object has been changed!

// Immutable approach (GOOD)
const userImmutable = { name: 'Alice', age: 30 };
function celebrateBirthdayImmutable(person) {
    // Create a new object with the updated property
    return { ...person, age: person.age + 1 };
}
const olderUser = celebrateBirthdayImmutable(userImmutable);
// console.log(userImmutable.age); // 30 - The original is unchanged
// console.log(olderUser.age);   // 31
```
The spread syntax (`...`) is a powerful tool for creating new arrays and objects immutably.

### 3. First-Class Functions and Higher-Order Functions

In JavaScript, functions are "first-class citizens." This means they can be treated like any other variable:
*   They can be assigned to variables.
*   They can be passed as arguments to other functions.
*   They can be returned from other functions.

A **higher-order function** is a function that either takes another function as an argument, returns a function, or both.

The built-in `Array` methods are classic examples of higher-order functions.

*   **`map()`**: Creates a new array by applying a function to each element of the original array.
*   **`filter()`**: Creates a new array with all elements that pass the test implemented by the provided function.
*   **`reduce()`**: Executes a "reducer" function on each element of the array, resulting in a single output value.

```javascript
const numbers = [1, 2, 3, 4, 5];

// `map` takes a function as an argument
const doubled = numbers.map(n => n * 2);
// doubled is [2, 4, 6, 8, 10]

// `filter` takes a function as an argument
const evens = numbers.filter(n => n % 2 === 0);
// evens is [2, 4]

// `reduce` takes a function and an initial value
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
// sum is 15
```
These methods are declarative (you say *what* you want, not *how* to do it) and produce new arrays instead of mutating the original, aligning perfectly with FP principles.

### Function Composition

Function composition is the process of combining two or more functions to produce a new function. The output of one function becomes the input of the next.

```javascript
const compose = (f, g) => (x) => f(g(x));

const toUpperCase = (str) => str.toUpperCase();
const exclaim = (str) => `${str}!`;

const shout = compose(exclaim, toUpperCase);

console.log(shout("hello")); // "HELLO!"
```
This pattern allows you to build complex functionality by combining small, reusable, pure functions.

Adopting these functional concepts can significantly improve the quality and maintainability of your JavaScript code.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function" target="_blank" rel="noopener noreferrer">MDN: First-class Function</a></li>
  <li><a href="https://dr-boolean.gitbooks.io/mostly-adequate-guide-to-functional-programming/content/" target="_blank" rel="noopener noreferrer">Mostly adequate guide to Functional Programming</a></li>
</ul>
</div>