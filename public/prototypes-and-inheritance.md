# JavaScript Prototypes and Inheritance

JavaScript is often described as a **prototype-based language**. This means that objects can inherit properties and methods from other objects. This is different from class-based languages like Java or C++, where inheritance is defined between classes.

Every object in JavaScript has a hidden internal property, `[[Prototype]]`, which is either `null` or a reference to another object. This other object is called the "prototype." When you try to access a property on an object, if the property isn't found on the object itself, the JavaScript engine looks for it on the object's prototype, then on the prototype's prototype, and so on, until it finds the property or reaches the end of the chain (`null`). This is called the **prototype chain**.

## The Prototype Chain in Action

```mermaid
graph TD
    A[Object: dog] -- `[[Prototype]]` --> B[Prototype: animal];
    B -- `[[Prototype]]` --> C[Prototype: Object.prototype];
    C -- `[[Prototype]]` --> D[null];
    
    note right of A "Properties:<br>name: 'Buddy'"
    note right of B "Properties:<br>speak()"
    note right of C "Properties:<br>toString(), hasOwnProperty()"
```

Let's see this in code.

```javascript
const animal = {
    isAlive: true,
    speak: function() {
        console.log("Some generic animal sound");
    }
};

// Create a new object `dog` and set its prototype to `animal`
const dog = Object.create(animal);
dog.name = "Buddy";

// `name` is an "own property" of `dog`
console.log(dog.name); // "Buddy"

// `speak` is not on `dog`, so JS looks up the prototype chain to `animal`
dog.speak(); // "Some generic animal sound"

// `toString` is not on `dog` or `animal`, so JS looks further up to `Object.prototype`
console.log(dog.toString()); // "[object Object]"
```

## Constructor Functions

Before ES6 classes, the primary way to emulate "classes" and create objects with a shared prototype was through **constructor functions**. By convention, they are capitalized.

```javascript
// A constructor function
function Dog(name, age) {
    this.name = name;
    this.age = age;
}

// Add a method to the Dog's prototype.
// This is efficient because all Dog instances will share this one function.
Dog.prototype.bark = function() {
    return "Woof!";
};

// The `new` keyword is crucial. It does four things:
// 1. Creates a new empty object.
// 2. Sets the new object's prototype to `Dog.prototype`.
// 3. Calls the `Dog` function with `this` set to the new object.
// 4. Returns the new object.
const dog1 = new Dog("Buddy", 3);
const dog2 = new Dog("Lucy", 5);

console.log(dog1.name);      // "Buddy"
console.log(dog1.bark());    // "Woof!"
console.log(dog1.bark === dog2.bark); // true (they share the same function)
```
This pattern is the foundation of how inheritance worked in JavaScript for many years.

## The `class` Syntax (ES6)

ES6 introduced the `class` keyword, which provides a much cleaner and more familiar syntax for creating objects and handling inheritance. However, it's important to understand that **JavaScript classes are primarily "syntactic sugar" over the existing prototype-based inheritance**. It doesn't introduce a new object-oriented inheritance model to JavaScript.

Here's the same example using the `class` syntax:

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

// The `extends` keyword sets up the prototype chain
class Dog extends Animal {
    constructor(name, breed) {
        // `super` calls the parent class's constructor
        super(name);
        this.breed = breed;
    }

    // This overrides the parent's speak method
    speak() {
        console.log(`${this.name} barks.`);
    }
}

const myDog = new Dog("Buddy", "Golden Retriever");
myDog.speak(); // "Buddy barks."
```
This code is much easier to read and write for developers coming from class-based languages, but underneath, it is still manipulating prototypes just like the constructor function example.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" target="_blank" rel="noopener noreferrer">MDN: Inheritance and the prototype chain</a></li>
  <li><a href="https://javascript.info/prototype-inheritance" target="_blank" rel="noopener noreferrer">Prototypal inheritance (javascript.info)</a></li>
</ul>
</div>