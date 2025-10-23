# JavaScript Variables, Scope, and Hoisting

Understanding how variables are declared, where they are accessible (scope), and how declarations are processed (hoisting) is fundamental to avoiding common bugs in JavaScript.

## `var`, `let`, and `const`

Modern JavaScript (ES6+) provides three keywords for declaring variables, each with different scoping rules.

### `var` (The Old Way)
Before ES6, `var` was the only way to declare a variable. `var` declarations are **function-scoped**. This means the variable is accessible anywhere within the function it's declared in, regardless of block scope (`{...}`).

```javascript
function myFunction() {
    var x = 10;
    if (true) {
        var x = 20; // This re-declares the same 'x'
        console.log(x); // 20
    }
    console.log(x); // 20 (The value from inside the if block leaked out)
}
```
This behavior can lead to unexpected bugs. It is generally recommended to **avoid using `var`** in modern JavaScript.

### `let` (The Modern `var`)
`let` was introduced in ES6 and is **block-scoped**. A variable declared with `let` is only accessible within the block (`{...}`) it was declared in.

```javascript
function myLetFunction() {
    let y = 10;
    if (true) {
        let y = 20; // This is a new, different 'y' scoped to the if block
        console.log(y); // 20
    }
    console.log(y); // 10 (The value from the outer scope is unaffected)
}
```
This is much more predictable and is the preferred way to declare a variable whose value may need to change.

### `const` (For Constants)
`const` is also **block-scoped**, just like `let`. The key difference is that a variable declared with `const` cannot be *reassigned*. It must be initialized at the time of declaration.

```javascript
const PI = 3.14159;
PI = 3; // This will throw a TypeError

// IMPORTANT: `const` does not make objects or arrays immutable.
// You can still change the properties of a const object.
const myObject = { name: 'Alice' };
myObject.name = 'Bob'; // This is allowed
console.log(myObject.name); // 'Bob'

myObject = { name: 'Charlie' }; // This is NOT allowed (reassignment)
```
**Best practice**: Use `const` by default. Only use `let` when you know you need to reassign the variable.

## Scope

Scope determines the accessibility of variables. JavaScript has three types of scope:

1.  **Global Scope**: Variables declared outside of any function or block are in the global scope and are accessible from anywhere in your program. It's a best practice to minimize the use of global variables.
2.  **Function Scope**: Variables declared with `var` inside a function are accessible anywhere within that function.
3.  **Block Scope**: Variables declared with `let` and `const` inside a block (`{...}`, e.g., in an `if` statement or a `for` loop) are only accessible within that block.

## Hoisting

Hoisting is JavaScript's default behavior of moving declarations to the top of their scope before code execution. This means you can use a variable or function before it's declared in the code.

### `var` Hoisting
Declarations using `var` are hoisted to the top of their scope, and their initial value is `undefined`.

```javascript
console.log(myVar); // undefined (NOT a ReferenceError)
var myVar = 5;
console.log(myVar); // 5

// The code is interpreted by the engine like this:
// var myVar;
// console.log(myVar);
// myVar = 5;
// console.log(myVar);
```

### `let` and `const` Hoisting
`let` and `const` declarations are also hoisted, but they are not initialized. They are in a "Temporal Dead Zone" (TDZ) from the start of the block until the declaration is encountered. Accessing them before the declaration results in a `ReferenceError`.

```javascript
console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = 10;
```
This behavior is much safer as it prevents you from accidentally using a variable before its value is assigned.

### Function Hoisting
*   **Function declarations** are fully hoisted. You can call them before they appear in the code.
*   **Function expressions** are not. If they are assigned to a `var` variable, the variable declaration is hoisted, but the function body is not.

```javascript
// Function Declaration
hoistedFunction(); // "This works!"

function hoistedFunction() {
    console.log("This works!");
}

// Function Expression
notHoistedFunction(); // TypeError: notHoistedFunction is not a function

var notHoistedFunction = function() {
    console.log("This will fail!");
};
```

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations" target="_blank" rel="noopener noreferrer">MDN: JavaScript Declarations</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Glossary/Hoisting" target="_blank" rel="noopener noreferrer">MDN: Hoisting</a></li>
</ul>
</div>