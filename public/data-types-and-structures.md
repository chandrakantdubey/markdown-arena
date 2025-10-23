# Python Data Types and Structures

Python has a rich set of built-in data types and data structures that form the building blocks of any program. Understanding their characteristics and when to use each one is fundamental to writing effective Python code.

## Primitive Data Types

These are the simplest, most basic data types.

*   **Integers (`int`)**: Whole numbers, positive or negative (e.g., `10`, `-3`, `0`).
*   **Floating-Point Numbers (`float`)**: Numbers with a decimal point (e.g., `3.14`, `-0.01`, `2.0`).
*   **Strings (`str`)**: Sequences of Unicode characters, used for text. They can be enclosed in single (`'...'`), double (`"..."`), or triple (`"""..."""`) quotes. Strings are **immutable**, meaning they cannot be changed after creation.
*   **Booleans (`bool`)**: Represent truth values. The two possible values are `True` and `False`.

```python
# Examples of primitive types
my_integer = 42
my_float = 3.14159
my_string = "Hello, Python!"
is_active = True
```

## Built-in Data Structures

These are container types used to group and organize other data.

### Lists (`list`)

A list is an ordered, mutable collection of items. This means you can change, add, and remove items after the list is created.

*   **Characteristics**: Ordered, mutable, allows duplicate items.
*   **Syntax**: `[item1, item2, ...]`

```python
# List example
fruits = ["apple", "banana", "cherry"]
print(fruits[1])  # Access by index: "banana"

fruits.append("orange")   # Add an item to the end
fruits[0] = "strawberry"  # Modify an item
print(fruits)             # ['strawberry', 'banana', 'cherry', 'orange']
```

### Tuples (`tuple`)

A tuple is an ordered, **immutable** collection of items. Once a tuple is created, you cannot change its contents.

*   **Characteristics**: Ordered, immutable, allows duplicate items.
*   **Syntax**: `(item1, item2, ...)`

```python
# Tuple example
coordinates = (10.0, 20.0)
print(coordinates[0])  # Access by index: 10.0

# This would cause an error:
# coordinates[0] = 5.0  # TypeError: 'tuple' object does not support item assignment
```
Tuples are often used for data that should not change, like a fixed set of coordinates or a record from a database.

### Dictionaries (`dict`)

A dictionary is an unordered collection of key-value pairs. As of Python 3.7+, dictionaries are insertion-ordered. They are optimized for retrieving a value when you know the key.

*   **Characteristics**: Ordered (as of 3.7+), mutable, keys must be unique and immutable.
*   **Syntax**: `{key1: value1, key2: value2, ...}`

```python
# Dictionary example
user = {
    "name": "Alice",
    "age": 30,
    "email": "alice@example.com"
}
print(user["name"])  # Access by key: "Alice"

user["age"] = 31              # Modify a value
user["city"] = "New York"     # Add a new key-value pair
print(user)
```

### Sets (`set`)

A set is an unordered, mutable collection of **unique** items. They are highly optimized for membership testing (checking if an item is in the set) and for mathematical set operations like union, intersection, and difference.

*   **Characteristics**: Unordered, mutable, does not allow duplicate items.
*   **Syntax**: `{item1, item2, ...}`

```python
# Set example
unique_numbers = {1, 2, 3, 3, 4, 2}
print(unique_numbers)  # Output: {1, 2, 3, 4} (duplicates are automatically removed)

unique_numbers.add(5)
print(2 in unique_numbers)  # Membership testing is very fast: True

set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1.union(set2))       # {1, 2, 3, 4, 5}
print(set1.intersection(set2)) # {3}
```

## Choosing the Right Data Structure

| Use Case                                  | Best Choice | Why?                                                     |
| :---------------------------------------- | :---------- | :------------------------------------------------------- |
| A sequence of items that may change       | `list`      | It's mutable and ordered.                                |
| A fixed sequence of items that won't change| `tuple`     | It's immutable, providing data integrity.                |
| Storing properties of an object (key-value) | `dict`      | Perfect for mapping names to values.                     |
| Storing a collection of unique items      | `set`       | Automatically handles uniqueness and is fast for lookups. |

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://docs.python.org/3/tutorial/datastructures.html" target="_blank" rel="noopener noreferrer">Python Tutorial: Data Structures</a></li>
  <li><a href="https://realpython.com/python-data-structures/" target="_blank" rel="noopener noreferrer">Python Data Structures (Real Python)</a></li>
</ul>
</div>