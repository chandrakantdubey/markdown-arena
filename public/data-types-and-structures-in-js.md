# JavaScript Data Types and Structures

JavaScript is a dynamically typed language. This means you don't have to specify the type of a variable when you declare it. The type is determined automatically at runtime. Understanding JavaScript's data types and how it handles them is crucial for writing correct and bug-free code.

## Primitives vs. Objects

JavaScript's types can be divided into two main categories: **primitives** and **objects**.

*   **Primitives**: Are immutable (their value cannot be changed). They are copied by value.
*   **Objects**: Are mutable (their properties can be changed). They are copied by reference.

### Primitive Types
There are seven primitive types:

1.  **`string`**: A sequence of characters used for text.
    ```javascript
    let name = "Alice";
    ```
2.  **`number`**: Used for both integer and floating-point numbers. There is no separate integer type. Includes special values like `Infinity`, `-Infinity`, and `NaN` (Not-a-Number).
    ```javascript
    let age = 30;
    let pi = 3.14;
    ```
3.  **`boolean`**: Represents a logical entity and can have two values: `true` and `false`.
    ```javascript
    let isActive = true;
    ```
4.  **`undefined`**: A variable that has been declared but not yet assigned a value has the type `undefined`.
    ```javascript
    let x; // x is undefined
    ```
5.  **`null`**: Represents the intentional absence of any object value. It's an assignment value, meaning you explicitly assign `null` to a variable.
    ```javascript
    let user = null; // No user is selected
    ```
6.  **`symbol`**: A unique and immutable primitive value, often used as the key of an object property when you want to avoid name clashes.
    ```javascript
    const id = Symbol('id');
    ```
7.  **`bigint`**: Used for representing whole numbers larger than the maximum safe integer for the `number` type.
    ```javascript
    const largeNumber = 1234567890123456789012345678901234567890n;
    ```
The `typeof` operator can be used to check the type of a variable.
```javascript
typeof "hello" // "string"
typeof 42      // "number"
typeof true    // "boolean"
typeof undefined // "undefined"
typeof null    // "object" (This is a famous, long-standing bug in JS!)
```

## Objects

An object is a collection of key-value pairs (properties). Nearly everything else in JavaScript that is not a primitive is an object.

### The `Object` Type
The most common object type is the plain `Object`, created with curly braces `{}`.
```javascript
const person = {
    name: "Alice",
    age: 30,
    greet: function() {
        console.log("Hello!");
    }
};
```

### The `Array` Type
An array is a special type of object used for storing ordered collections of items.
```javascript
const fruits = ["apple", "banana", "cherry"];
```

### The `Function` Type
Functions in JavaScript are also a special type of object. This "first-class function" property means they can be stored in variables, passed as arguments, and returned from other functions.

## Type Coercion

Type coercion is the automatic or implicit conversion of values from one data type to another. This is one of JavaScript's most powerful and most confusing features.

### String Coercion
The `+` operator triggers string coercion if either operand is a string.
```javascript
"The answer is " + 42; // "The answer is 42"
"5" + 5;                 // "55" (NOT 10)
```

### Boolean Coercion
Boolean coercion happens in logical contexts, like an `if` statement. Values that coerce to `false` are called "falsy". All other values are "truthy".

**The Falsy Values:**
*   `false`
*   `0` (and `-0`)
*   `""` (empty string)
*   `null`
*   `undefined`
*   `NaN`

```javascript
if (0) { /* this code will not run */ }
if ("hello") { /* this code will run */ }
```

### Numeric Coercion
Many operators trigger numeric coercion.
```javascript
"5" - 1;   // 4
"5" * 2;   // 10
"hello" * 2; // NaN
```

## `==` vs. `===` (Equality)

This is a direct consequence of type coercion and a common source of bugs.
*   **`==` (Loose Equality)**: Compares two values for equality **after** performing type coercion.
*   **`===` (Strict Equality)**: Compares two values for equality **without** performing type coercion.

```javascript
5 == "5";   // true (string "5" is coerced to number 5)
5 === "5";  // false (number is not strictly equal to string)

0 == false; // true
0 === false;// false

null == undefined; // true
null === undefined;// false
```
**Best Practice**: Almost always use `===` for equality checks to avoid the unpredictable behavior of type coercion.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures" target="_blank" rel="noopener noreferrer">MDN: JavaScript data types and data structures</a></li>
  <li><a href="https://javascript.info/types" target="_blank" rel="noopener noreferrer">Data types (javascript.info)</a></li>
</ul>
</div>