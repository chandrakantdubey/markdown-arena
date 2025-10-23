# Python Modules and Packages

As your programs grow larger, it becomes essential to organize your code into logical units. Python provides two primary mechanisms for this: **modules** and **packages**.

## Modules

A module is simply a file containing Python definitions and statements. The file name is the module name with the suffix `.py` appended. Modules allow you to logically organize your Python code.

Let's create a module.

**my_math.py:**
```python
"""A simple module with math functions."""

PI = 3.14159

def add(a, b):
    """Returns the sum of two numbers."""
    return a + b

def subtract(a, b):
    """Returns the difference of two numbers."""
    return a - b
```

### The `import` Statement
You can use the definitions from a module in another script by using the `import` statement.

**main.py:**
```python
# Import the entire module
import my_math

sum_result = my_math.add(5, 3)
print(f"The sum is: {sum_result}")
print(f"The value of PI is: {my_math.PI}")

# You can also import specific names from a module
from my_math import subtract

difference_result = subtract(10, 4)
print(f"The difference is: {difference_result}")

# It's also possible to import all names (generally discouraged)
# from my_math import *

# You can give a module or a function an alias
import my_math as mm
from my_math import add as plus

print(mm.PI)
print(plus(1, 1))
```

## Packages

A package is a way of structuring Python's module namespace by using "dotted module names". A package is a directory that contains a special file `__init__.py` (which can be empty) and other modules or sub-packages.

This allows you to group related modules together.

### Package Structure Example

```
my_app/
├── __init__.py
├── main.py
└── utils/
    ├── __init__.py
    ├── string_utils.py
    └── math_utils.py
```
Here, `my_app` is the top-level package, and `utils` is a sub-package. `string_utils.py` and `math_utils.py` are modules within the `utils` package.

### Importing from Packages

You can import modules from packages using dot notation.

**my_app/main.py:**
```python
# Import a module from a sub-package
from utils import string_utils

# Import a specific function from a module in a sub-package
from utils.math_utils import factorial

print(string_utils.reverse("hello"))
print(factorial(5))
```

## The Python Standard Library

Python comes with a huge standard library of modules that provide a wide range of functionality. You can import and use them just like your own modules.

```python
import math # For more advanced math functions
import json # For working with JSON data
import os   # For interacting with the operating system

print(math.sqrt(16))
user = json.loads('{"name": "Alice"}')
print(os.getcwd()) # Get the current working directory
```

## Third-Party Packages and `pip`

The Python ecosystem is vast, with hundreds of thousands of third-party packages available from the **Python Package Index (PyPI)**.

**`pip`** is the standard package manager for Python. You use it to install and manage these third-party packages.

### Common `pip` Commands

*   **Installing a package**:
    ```bash
    pip install requests
    ```
    This downloads and installs the popular `requests` library for making HTTP requests.

*   **Managing Dependencies with `requirements.txt`**:
    It's a best practice to list your project's dependencies in a `requirements.txt` file.
    ```
    # requirements.txt
    requests==2.28.1
    numpy>=1.20.0
    ```
    You can then install all dependencies with a single command:
    ```bash
    pip install -r requirements.txt
    ```

*   **Listing installed packages**:
    ```bash
    pip list
    ```

*   **Uninstalling a package**:
    ```bash
    pip uninstall requests
    ```

### Virtual Environments
It is strongly recommended to use a **virtual environment** for every Python project. A virtual environment is an isolated Python environment that allows you to install packages for a specific project without affecting other projects or the system-wide Python installation.

```bash
# 1. Create a virtual environment
python -m venv my_project_env

# 2. Activate it (on macOS/Linux)
source my_project_env/bin/activate
# (on Windows)
# .\my_project_env\Scripts\activate

# 3. Now you can use pip to install packages into this isolated environment
pip install -r requirements.txt
```

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://docs.python.org/3/tutorial/modules.html" target="_blank" rel="noopener noreferrer">Python Tutorial: Modules</a></li>
  <li><a href="https://packaging.python.org/en/latest/tutorials/installing-packages/" target="_blank" rel="noopener noreferrer">Installing Python Packages (pip)</a></li>
</ul>
</div>