# Concurrency in Python

Concurrency is the task of running and managing multiple computations at the same time. Python provides several ways to achieve concurrency, each with its own trade-offs. The three main approaches are **threading**, **multiprocessing**, and **asyncio**.

The choice between them largely depends on whether your task is **I/O-bound** (spends most of its time waiting for network or disk) or **CPU-bound** (spends most of its time doing computations).

## The Global Interpreter Lock (GIL)

A crucial concept in Python concurrency is the **Global Interpreter Lock (GIL)**. The GIL is a mutex (a lock) that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at the same time. This means that even on a multi-core processor, only one thread can be executing Python code at any given moment.

**Effect of the GIL**:
*   **Threading** is great for **I/O-bound** tasks. While one thread is waiting for a network response, the GIL is released, and another thread can run.
*   **Threading** does not provide a speed-up for **CPU-bound** tasks, because only one thread can do computational work at a time.
*   **Multiprocessing** is the solution for **CPU-bound** tasks, as it sidesteps the GIL by running each process with its own Python interpreter and memory space.

## 1. Threading

Used for running multiple I/O-bound tasks concurrently.

```python
import threading
import time
import requests

def download_site(url):
    print(f"Starting download for {url}")
    response = requests.get(url)
    print(f"Finished download for {url}, size: {len(response.content)}")

def run_with_threading():
    sites = ["https://www.python.org", "https://www.google.com"]
    threads = []
    for site in sites:
        thread = threading.Thread(target=download_site, args=(site,))
        threads.append(thread)
        thread.start()

    # Wait for all threads to complete
    for thread in threads:
        thread.join()

start_time = time.time()
run_with_threading()
end_time = time.time()
print(f"Threading took {end_time - start_time:.2f} seconds")
```
In this example, the two download requests happen concurrently, so the total time is roughly the time of the longest single download, not the sum of both.

## 2. Multiprocessing

Used for running multiple CPU-bound tasks in parallel to take advantage of multiple CPU cores.

```python
import multiprocessing
import time

def cpu_heavy_task(n):
    print(f"Starting task for {n}")
    count = 0
    for i in range(n):
        count += i
    print(f"Finished task for {n}")

def run_with_multiprocessing():
    numbers = [10_000_000, 10_000_000]
    processes = []
    for num in numbers:
        process = multiprocessing.Process(target=cpu_heavy_task, args=(num,))
        processes.append(process)
        process.start()
    
    for process in processes:
        process.join()

start_time = time.time()
run_with_multiprocessing()
end_time = time.time()
print(f"Multiprocessing took {end_time - start_time:.2f} seconds")
```
If this were run with threading, it would take roughly double the time of a single task because of the GIL. With multiprocessing, the tasks run in parallel on different cores, leading to a significant speed-up.

## 3. `asyncio` (Asynchronous I/O)

`asyncio` is a modern approach to concurrency that is used to write single-threaded concurrent code using **coroutines**. It is ideal for high-performance I/O-bound applications that need to handle thousands of concurrent connections.

It uses an **event loop** model. Instead of threads, `asyncio` uses `async` and `await` syntax to "pause" a function when it's waiting for I/O and allow other functions to run.

```python
import asyncio
import aiohttp # An async HTTP client library

async def download_site_async(session, url):
    print(f"Starting download for {url}")
    async with session.get(url) as response:
        content = await response.read()
        print(f"Finished download for {url}, size: {len(content)}")

async def run_with_asyncio():
    sites = ["https://www.python.org", "https://www.google.com"]
    async with aiohttp.ClientSession() as session:
        tasks = [download_site_async(session, url) for url in sites]
        # asyncio.gather runs the coroutines concurrently
        await asyncio.gather(*tasks)

start_time = time.time()
asyncio.run(run_with_asyncio())
end_time = time.time()
print(f"Asyncio took {end_time - start_time:.2f} seconds")
```
`asyncio` is often the most performant option for I/O-bound workloads but requires using async-compatible libraries.

## Summary

| Approach          | Best For     | When to Use                                                          |
| :---------------- | :----------- | :------------------------------------------------------------------- |
| **Threading**     | I/O-bound    | Simpler I/O-bound tasks, when using libraries that are not async.      |
| **Multiprocessing**| CPU-bound    | Parallelizing computationally intensive tasks to use all CPU cores.  |
| **`asyncio`**     | I/O-bound    | High-performance network applications with many concurrent connections.|

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://docs.python.org/3/library/asyncio.html" target="_blank" rel="noopener noreferrer">asyncio — Asynchronous I/O</a></li>
  <li><a href="https://realpython.com/python-concurrency/" target="_blank" rel="noopener noreferrer">An Intro to Threading in Python (Real Python)</a></li>
</ul>
</div>