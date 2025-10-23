# Python Functions and Scope

Functions are a fundamental building block in Python. They are reusable blocks of code that perform a specific task. Defining functions allows you to organize your code, make it more readable, and avoid repetition.

## Defining and Calling Functions

You define a function using the `def` keyword, followed by the function name, parentheses `()`, and a colon `:`. The code block within the function is indented.

```python
# A simple function definition
def greet(name):
    """This is a docstring. It explains what the function does."""
    print(f"Hello, {name}!")

# Calling the function
greet("Alice")  # Output: Hello, Alice!
```
A function can `return` a value. If no `return` statement is specified, the function implicitly returns `None`.

```python
def add(a, b):
    return a + b

result = add(5, 3)
print(result) # Output: 8
```

## Function Arguments

Python offers a flexible way to handle function arguments.

*   **Positional Arguments**: The standard arguments that are matched based on their position.
*   **Keyword Arguments**: You can pass arguments by name, which makes the order irrelevant.
*   **Default Arguments**: You can provide a default value for an argument.

```python
def describe_pet(pet_name, animal_type="dog"):
    print(f"I have a {animal_type} named {pet_name}.")

describe_pet("Willie")                # Uses the default animal_type
describe_pet("Harry", "hamster")      # Positional arguments
describe_pet(animal_type="cat", pet_name="Whiskers") # Keyword arguments
```

### Arbitrary Arguments: `*args` and `**kwargs`

*   `*args`: Collects extra positional arguments into a **tuple**.
*   `**kwargs`: Collects extra keyword arguments into a **dictionary**.

```python
def make_pizza(size, *toppings, **customer_info):
    print(f"Making a {size}-inch pizza with the following toppings:")
    for topping in toppings:
        print(f"- {topping}")
    
    print("\nCustomer Info:")
    for key, value in customer_info.items():
        print(f"- {key}: {value}")

make_pizza(16, "mushrooms", "peppers", "onions",
           delivery=True, customer_name="Bob")
```

## Lambda Functions

A lambda function is a small, anonymous function defined with the `lambda` keyword. It can have any number of arguments but can only have one expression.

`lambda arguments: expression`

```python
# A regular function
def square(x):
    return x * x

# The equivalent lambda function
square_lambda = lambda x: x * x

print(square(5))         # Output: 25
print(square_lambda(5))  # Output: 25
```
Lambda functions are often used as arguments to higher-order functions like `map()`, `filter()`, and `sorted()`.

```python
numbers = [1, 2, 3, 4, 5]
# Use a lambda to get the square of each number
squares = list(map(lambda x: x * x, numbers))
print(squares) # Output: [1, 4, 9, 16, 25]
```

## Variable Scope (The LEGB Rule)

Scope determines the visibility of a variable. Python resolves variable names using the **LEGB rule**, in this order:

1.  **L**ocal: The innermost scope, containing local variables inside the current function.
2.  **E**nclosing: The scope of any enclosing functions (e.g., in nested functions).
3.  **G**lobal: The top-most scope in the module.
4.  **B**uilt-in: The scope containing Python's built-in names like `print()`, `len()`, `str`.

```python
x = "global" # Global scope

def outer_function():
    x = "enclosing" # Enclosing scope
    
    def inner_function():
        x = "local" # Local scope
        print(x) # Python finds 'x' in the Local scope first

    inner_function() # Output: local
    print(x) # Python finds 'x' in the Enclosing scope

outer_function() # Output: enclosing
print(x) # Output: global
```
To modify a global variable from within a function, you must use the `global` keyword. To modify a variable in an enclosing scope, you use the `nonlocal` keyword.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://docs.python.org/3/tutorial/controlflow.html#defining-functions" target="_blank" rel="noopener noreferrer">Python Tutorial: Defining Functions</a></li>
  <li><a href="https://realpython.com/python-scope-legb-rule/" target="_blank" rel="noopener noreferrer">Python Scope & the LEGB Rule (Real Python)</a></li>
</ul>
</div>