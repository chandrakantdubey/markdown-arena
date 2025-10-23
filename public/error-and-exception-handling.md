# Python Error and Exception Handling

Errors are an inevitable part of programming. In Python, errors are handled using **exceptions**. An exception is an event, which occurs during the execution of a program, that disrupts the normal flow of the program's instructions. When a Python script raises an exception, it must either be handled immediately or it will terminate the program.

Properly handling exceptions is crucial for building robust and reliable applications.

## The `try` and `except` Blocks

The most basic way to handle exceptions is with a `try...except` block.

*   **`try` block**: The code that might raise an exception is placed inside the `try` block.
*   **`except` block**: If an exception occurs in the `try` block, the interpreter immediately stops executing the `try` block and looks for a matching `except` block. If one is found, its code is executed.

```python
try:
    numerator = 10
    denominator = 0
    result = numerator / denominator # This will raise a ZeroDivisionError
    print("This line will not be executed.")
except ZeroDivisionError:
    print("Error: Cannot divide by zero!")

print("The program continues after the error.")
```
Without the `try...except` block, the `ZeroDivisionError` would have halted the program.

## Handling Specific Exceptions

It's a best practice to catch specific exceptions rather than using a bare `except:` clause. This allows you to handle different errors in different ways and prevents you from accidentally catching errors you didn't intend to.

You can also handle multiple exceptions in a single `except` block by passing them as a tuple.

```python
my_dict = {"a": 1}

try:
    value = my_dict["b"] # This will raise a KeyError
    result = int("hello") # This would raise a ValueError
except (KeyError, ValueError) as e:
    # The 'as e' part assigns the exception object to the variable 'e'
    print(f"An error occurred: {e}")
    print(f"Error type: {type(e)}")
except Exception as e:
    # It's good practice to have a general 'Exception' at the end
    # to catch any other unexpected errors.
    print(f"An unexpected error occurred: {e}")
```

## The `else` and `finally` Clauses

The `try` statement can have two optional clauses.

*   **`else` block**: The code in the `else` block is executed if and only if **no exceptions were raised** in the `try` block.
*   **`finally` block**: The code in the `finally` block is **always executed**, regardless of whether an exception occurred or not. This is commonly used for cleanup actions, like closing a file or a network connection.

```python
try:
    file = open("my_data.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("Error: The file does not exist.")
else:
    # This runs only if the file was opened successfully
    print("File read successfully.")
    print(content)
finally:
    # This runs no matter what
    if 'file' in locals() and not file.closed:
        file.close()
        print("File has been closed.")
```

## Raising Exceptions

You can raise exceptions in your own code using the `raise` keyword. This is useful for signaling that an error condition has occurred based on your program's logic.

```python
def set_age(age):
    if age < 0:
        # Raise a ValueError with a specific message
        raise ValueError("Age cannot be negative.")
    if not isinstance(age, int):
        raise TypeError("Age must be an integer.")
    print(f"Age set to {age}")

try:
    set_age(-5)
except ValueError as e:
    print(e) # Output: Age cannot be negative.
```

## The `with` Statement (Context Managers)

For resources that need to be cleaned up (like files or database connections), Python provides a more elegant syntax called the `with` statement. It ensures that cleanup code is executed automatically.

```python
# The old way (using finally)
# try:
#     file = open("my_data.txt", "r")
#     # ... do stuff with file ...
# finally:
#     file.close()

# The modern, "Pythonic" way
try:
    with open("my_data.txt", "r") as file:
        # The file is automatically closed when this block is exited,
        # even if errors occur inside it.
        content = file.read()
        print(content)
except FileNotFoundError:
    print("File not found.")
```
The `with` statement is the preferred way to work with resources that need to be managed.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://docs.python.org/3/tutorial/errors.html" target="_blank" rel="noopener noreferrer">Python Tutorial: Errors and Exceptions</a></li>
  <li><a href="https://realpython.com/python-exceptions/" target="_blank" rel="noopener noreferrer">Python Exceptions: An Introduction (Real Python)</a></li>
</ul>
</div>