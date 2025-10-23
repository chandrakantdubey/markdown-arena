# Python Control Flow

Control flow statements are the constructs that allow you to dictate the order in which the statements in your program are executed. Python provides a standard set of control flow structures for handling conditionals and loops.

## Conditional Statements: `if`, `elif`, `else`

Conditional statements allow you to execute a block of code only if a certain condition is true.

*   `if`: The block of code under an `if` statement is executed if its condition is `True`.
*   `elif` (else if): You can have zero or more `elif` blocks. They are checked in order, and the first one whose condition is `True` will have its code block executed.
*   `else`: An optional block that is executed if none of the preceding `if` or `elif` conditions were `True`.

```python
age = 18
has_permission = False

if age >= 18 and has_permission:
    print("Access granted.")
elif age >= 18 and not has_permission:
    print("You are old enough, but need permission.")
elif age < 16:
    print("You are too young.")
else:
    print("You are between 16 and 17.")
```

Python uses indentation (typically 4 spaces) to define code blocks, which is a key feature of the language's syntax.

## Looping Statements

Loops are used to execute a block of code repeatedly.

### `for` Loops
A `for` loop in Python iterates over a sequence (like a list, tuple, dictionary, set, or string).

```python
# Looping through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Looping with range() to get a sequence of numbers
for i in range(5):  # from 0 up to (but not including) 5
    print(i) # 0, 1, 2, 3, 4

# Looping through a dictionary's keys and values
user = {"name": "Alice", "age": 30}
for key, value in user.items():
    print(f"{key}: {value}")
```

### `while` Loops
A `while` loop executes a block of code as long as a specified condition is `True`.

```python
count = 0
while count < 5:
    print(f"Count is {count}")
    count += 1 # It's crucial to have a way to eventually make the condition False

print("Loop finished.")
```
Be careful with `while` loops to avoid infinite loops by ensuring the condition will eventually become false.

### Loop Control Statements
*   `break`: Immediately terminates the loop.
*   `continue`: Skips the rest of the current iteration and proceeds to the next one.

```python
for i in range(10):
    if i == 3:
        continue  # Skip printing 3
    if i == 7:
        break     # Stop the loop when i is 7
    print(i)
# Output: 0, 1, 2, 4, 5, 6
```

## The `match` Statement (Structural Pattern Matching)

Introduced in Python 3.10, the `match` statement is a more powerful and structured version of a `switch` statement from other languages. It allows you to match a value against a series of patterns.

```python
def handle_command(command):
    match command.split():
        case ["quit"]:
            print("Quitting...")
        case ["send", message]:
            print(f"Sending message: {message}")
        case ["receive", *messages]:
            print("Receiving messages:")
            for msg in messages:
                print(f" - {msg}")
        case _: # The wildcard pattern, like a default case
            print("Unknown command.")

handle_command("send Hello World")
handle_command("receive msg1 msg2 msg3")
handle_command("quit")
handle_command("invalid")
```
The `match` statement can match against literal values, variable captures, sequences, and even object structures, making it a very powerful tool for complex conditional logic.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://docs.python.org/3/tutorial/controlflow.html" target="_blank" rel="noopener noreferrer">Python Tutorial: More Control Flow Tools</a></li>
  <li><a href="https://peps.python.org/pep-0636/" target="_blank" rel="noopener noreferrer">PEP 636 – Structural Pattern Matching: Tutorial</a></li>
</ul>
</div>