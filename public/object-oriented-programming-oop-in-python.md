# Object-Oriented Programming (OOP) in Python

Object-Oriented Programming is a programming paradigm based on the concept of "objects," which can contain data in the form of fields (often known as attributes or properties) and code in the form of procedures (often known as methods).

Python is a multi-paradigm language, but it has strong support for OOP. Understanding OOP principles is key to writing structured, reusable, and maintainable Python code.

## Classes and Objects

*   **Class**: A blueprint for creating objects. It defines a set of attributes and methods that the created objects will have.
*   **Object (or Instance)**: A specific instance of a class.

You define a class using the `class` keyword.

```python
class Dog:
    # This is a class attribute, shared by all instances of the class
    species = "Canis familiaris"

    # The initializer method (constructor)
    def __init__(self, name, age):
        # These are instance attributes, unique to each object
        self.name = name
        self.age = age

    # This is an instance method
    def bark(self):
        return "Woof!"

# Create two Dog objects (instances)
dog1 = Dog("Buddy", 3)
dog2 = Dog("Lucy", 5)

print(f"{dog1.name} is {dog1.age} years old.") # Buddy is 3 years old.
print(dog1.bark()) # Woof!
print(dog1.species) # Canis familiaris
```
*   `__init__`: This special method, called a "dunder" (double underscore) method, is the constructor. It's called automatically when you create a new instance of the class.
*   `self`: The `self` parameter is a reference to the current instance of the class. It is used to access the attributes and methods of the class. It must be the first parameter of any instance method.

## The Four Pillars of OOP

### 1. Encapsulation
Encapsulation is the bundling of data (attributes) and the methods that operate on that data into a single unit (a class). It also involves restricting direct access to an object's components, which is known as information hiding.

Python doesn't have true `private` variables like Java or C++. By convention, attributes prefixed with a single underscore (`_`) are treated as "protected" (for internal use), and those with a double underscore (`__`) are "mangled" to be harder to access from outside.

### 2. Inheritance
Inheritance allows a new class (the child or subclass) to inherit attributes and methods from an existing class (the parent or superclass). This promotes code reuse.

```python
# Parent class
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclass must implement abstract method")

# Child class inheriting from Animal
class Cat(Animal):
    def speak(self):
        return "Meow"

# Another child class
class Dog(Animal):
    def speak(self):
        return "Woof"

my_cat = Cat("Whiskers")
print(my_cat.speak()) # Output: Meow
```

### 3. Polymorphism
Polymorphism means "many forms." In OOP, it refers to the ability of different classes to be treated as instances of the same parent class, often by sharing a common method name. In the example above, both `Cat` and `Dog` have a `speak` method. We can call `animal.speak()` without knowing whether `animal` is a `Cat` or a `Dog`.

```python
animals = [Cat("Fluffy"), Dog("Rover")]

for animal in animals:
    # We can call .speak() on any object that is a subclass of Animal
    print(f"{animal.name} says: {animal.speak()}")
```

### 4. Abstraction
Abstraction involves hiding the complex implementation details and showing only the essential features of the object. In Python, this is often achieved by defining classes with clear, high-level methods that hide the complex logic within them.

## Special (Dunder) Methods

Python classes have a rich set of special methods that you can implement to allow your objects to interact with built-in Python syntax.

*   `__str__(self)`: Defines the string representation of an object (what's shown when you `print()` it).
*   `__len__(self)`: Allows your object to be used with the `len()` function.
*   `__eq__(self, other)`: Defines the behavior of the equality operator (`==`).

```python
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def __str__(self):
        return f'"{self.title}" by {self.author}'
    
    def __len__(self):
        return self.pages

my_book = Book("The Hobbit", "J.R.R. Tolkien", 310)

print(my_book)  # Calls __str__: "The Hobbit" by J.R.R. Tolkien
print(len(my_book)) # Calls __len__: 310
```

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://docs.python.org/3/tutorial/classes.html" target="_blank" rel="noopener noreferrer">Python Tutorial: Classes</a></li>
  <li><a href="https://realpython.com/python3-object-oriented-programming/" target="_blank" rel="noopener noreferrer">Object-Oriented Programming (OOP) in Python 3 (Real Python)</a></li>
</ul>
</div>