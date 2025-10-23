# Python Decorators

A decorator in Python is a design pattern that allows you to add new functionality to an existing object (like a function or a class) without modifying its structure. Decorators are a powerful and expressive feature, often used for logging, timing, and enforcing access control.

Syntactically, decorators are usually applied using the `@` symbol, which is just "syntactic sugar" for a slightly more complex function call.

## The Core Concept: Functions as First-Class Citizens

To understand decorators, you must first understand that in Python, functions are "first-class citizens." This means they can be:
*   Assigned to a variable.
*   Passed as an argument to another function.
*   Returned from another function.

A decorator is essentially a function that takes another function as an argument, adds some functionality, and then returns another function.

## A Simple Decorator Example

Let's build a simple decorator that logs when a function is called.

```python
# 1. This is our decorator function
def log_function_call(func):
    # The wrapper function is what actually gets called
    def wrapper(*args, **kwargs):
        print(f"Calling function: {func.__name__}")
        # Call the original function that was passed in
        result = func(*args, **kwargs)
        print(f"Finished function: {func.__name__}")
        return result
    return wrapper

# 2. Apply the decorator to a function using the '@' syntax
@log_function_call
def say_hello(name):
    print(f"Hello, {name}!")

# 3. Call the decorated function
say_hello("Alice")
```

When `say_hello("Alice")` is called, it's actually the `wrapper` function inside `log_function_call` that gets executed. The `wrapper` prints a log message, calls the original `say_hello` function, prints another log message, and then returns the result.

### The "Syntactic Sugar" Unwrapped

The `@log_function_call` syntax is just a cleaner way of doing the following:

```python
def say_hello(name):
    print(f"Hello, {name}!")

# This is what the '@' symbol does behind the scenes
say_hello = log_function_call(say_hello)

say_hello("Alice") # This now calls the wrapper function
```

## A Practical Example: A Timing Decorator

A common use case for decorators is to time how long a function takes to execute.

```python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Function '{func.__name__}' took {end_time - start_time:.4f} seconds to run.")
        return result
    return wrapper

@timer
def process_data(size):
    print(f"Processing {size} items...")
    time.sleep(2) # Simulate a long-running task
    print("Processing complete.")

process_data(1000)
```
**Output:**
```
Processing 1000 items...
Processing complete.
Function 'process_data' took 2.0012 seconds to run.
```

## Preserving Function Metadata with `functools.wraps`

One issue with the simple decorators above is that they lose the metadata of the original function.

```python
@log_function_call
def say_hello(name):
    """A simple greeting function."""
    print(f"Hello, {name}!")

print(say_hello.__name__)    # Output: wrapper
print(say_hello.__doc__)     # Output: None
```
The decorated function now looks like the `wrapper` function. To fix this, we use the `@functools.wraps` decorator inside our own decorator.

```python
import functools

def log_function_call_fixed(func):
    @functools.wraps(func) # This copies the metadata
    def wrapper(*args, **kwargs):
        print(f"Calling function: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Finished function: {func.__name__}")
        return result
    return wrapper

@log_function_call_fixed
def say_hello_fixed(name):
    """A simple greeting function."""
    print(f"Hello, {name}!")

print(say_hello_fixed.__name__) # Output: say_hello_fixed
print(say_hello_fixed.__doc__)  # Output: A simple greeting function.
```
It is a strong best practice to always use `@functools.wraps` when writing decorators.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://realpython.com/primer-on-python-decorators/" target="_blank" rel="noopener noreferrer">Primer on Python Decorators (Real Python)</a></li>
  <li><a href="https://peps.python.org/pep-0318/" target="_blank" rel="noopener noreferrer">PEP 318 -- Decorators for Functions and Methods</a></li>
</ul>
</div>