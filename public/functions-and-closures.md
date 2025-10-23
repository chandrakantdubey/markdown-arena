# JavaScript Functions and Closures

Functions are a fundamental building block in JavaScript. They are reusable blocks of code that can be passed around, returned from other functions, and stored in variables. Understanding how they work, especially the concepts of `this` and closures, is key to mastering JavaScript.

## Defining Functions

### Function Declaration
A function declaration is hoisted, meaning you can call it before it's defined in the code.
```javascript
greet("Alice"); // Works due to hoisting

function greet(name) {
    console.log(`Hello, ${name}!`);
}
```

### Function Expression
A function expression is not hoisted. It's often used to create anonymous functions.
```javascript
// greetExpression("Bob"); // TypeError: greetExpression is not a function

const greetExpression = function(name) {
    console.log(`Hello, ${name}!`);
};

greetExpression("Bob");
```

### Arrow Functions (ES6)
Arrow functions provide a more concise syntax and have a different behavior for the `this` keyword.
```javascript
const add = (a, b) => {
    return a + b;
};

// For a single expression, the return is implicit
const subtract = (a, b) => a - b;
```

## The `this` Keyword

The value of the `this` keyword depends on how a function is called. Its behavior is one of the most confusing parts of JavaScript.

1.  **Global Context**: Outside of any function, `this` refers to the global object (`window` in browsers).
2.  **As a Method**: When a function is called as a method of an object, `this` refers to that object.
    ```javascript
    const person = {
        name: 'Alice',
        greet: function() {
            // `this` refers to the `person` object
            console.log(`Hello, my name is ${this.name}`);
        }
    };
    person.greet(); // "Hello, my name is Alice"
    ```
3.  **As a Function**: In non-strict mode, a regular function call sets `this` to the global object. In strict mode (`'use strict'`), `this` is `undefined`.
    ```javascript
    function showThis() {
        console.log(this);
    }
    showThis(); // `window` in browser (non-strict)
    ```
4.  **With `call`, `apply`, `bind`**: These methods allow you to explicitly set the value of `this`.
5.  **Arrow Functions**: Arrow functions do not have their own `this` binding. Instead, they inherit `this` from the enclosing (lexical) scope. This is often the behavior you want, especially in event handlers or callbacks inside methods.

    ```javascript
    const personWithArrow = {
        name: 'Bob',
        hobbies: ['reading', 'hiking'],
        printHobbies: function() {
            this.hobbies.forEach(hobby => {
                // `this` here is the same `this` as in printHobbies,
                // so it correctly refers to the personWithArrow object.
                console.log(`${this.name} likes ${hobby}`);
            });
        }
    };
    personWithArrow.printHobbies();
    ```

## Closures

A closure is one of JavaScript's most powerful features. A closure is the combination of a function and the lexical environment within which that function was declared. In simpler terms, **a closure gives you access to an outer function's scope from an inner function**, even after the outer function has finished executing.

```javascript
function createCounter() {
    let count = 0; // `count` is part of the lexical environment of createCounter

    // The inner function `increment` "closes over" the `count` variable
    function increment() {
        count++;
        console.log(count);
    }

    return increment; // Return the inner function
}

const counter1 = createCounter(); // `createCounter` has finished executing
const counter2 = createCounter();

// But the returned `increment` function still has access to its `count` variable
counter1(); // 1
counter1(); // 2
counter1(); // 3

counter2(); // 1 (counter2 has its own separate `count` variable)
```

### How does this work?
When `createCounter` is called, it creates a new execution context with its own `count` variable. When it returns the `increment` function, JavaScript ensures that `increment` maintains a reference to its parent's scope (its lexical environment). This is why `counter1` and `counter2` each have their own independent, persistent `count` state.

Closures are the mechanism that enables many common JavaScript patterns, including private variables and data encapsulation.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures" target="_blank" rel="noopener noreferrer">MDN: Closures</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this" target="_blank" rel="noopener noreferrer">MDN: The `this` keyword</a></li>
</ul>
</div>