# Node.js File System (fs) Module

The `fs` module is a core Node.js module that provides an API for interacting with the file system. It allows you to perform operations like reading from, writing to, and getting information about files and directories.

Nearly all functions in the `fs` module have three forms:
1.  **Asynchronous (Callback-based)**: The standard form. The function takes a callback as its last argument, which is executed upon completion.
2.  **Synchronous**: The function name ends with `Sync`. It blocks the event loop until the operation completes. **This should be avoided in most server-side code.**
3.  **Promise-based**: Available via `require('fs/promises')`. This is the modern, recommended approach.

## Reading Files

### Asynchronous with Promises (`fs/promises`) - Recommended
This is the modern and cleanest way to handle file operations. It works perfectly with `async/await`.

```javascript
import { readFile } from 'fs/promises';

async function readMyFile() {
    try {
        // readFile returns the entire file content as a Buffer
        const data = await readFile('my-file.txt');
        // Use .toString() to convert the Buffer to a string
        console.log(data.toString());
    } catch (error) {
        console.error("Error reading file:", error);
    }
}

readMyFile();
```

### Synchronous (Blocking)
This method blocks the entire application until the file is read. It might be acceptable for a one-time startup script, but it is **terrible for a web server** because it will make the server unresponsive to all other requests.

```javascript
import { readFileSync } from 'fs';

try {
    const data = readFileSync('my-file.txt', 'utf8'); // 'utf8' encoding returns a string directly
    console.log(data);
} catch (error) {
    console.error("Error reading file:", error);
}
console.log("This will only run after the file is read.");
```

## Writing Files

Similar to reading, the promise-based `writeFile` is the recommended approach.

```javascript
import { writeFile } from 'fs/promises';

async function writeMyFile() {
    try {
        const content = "Hello from Node.js!";
        // writeFile will create the file if it doesn't exist,
        // or overwrite it if it does.
        await writeFile('new-file.txt', content);
        console.log("File written successfully.");
    } catch (error) {
        console.error("Error writing file:", error);
    }
}

writeMyFile();
```

## Working with Streams for Large Files

What if you need to process a file that is several gigabytes in size? Reading the entire file into memory with `readFile` would consume a huge amount of RAM and possibly crash your application.

**Streams** are the solution. A stream allows you to read or write data in small, manageable chunks, rather than all at once.

This example shows how to read a large file and write its contents to another file, one chunk at a time, using streams. This uses very little memory, regardless of the file size.

```javascript
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

async function copyLargeFile() {
    try {
        const readableStream = createReadStream('large-input-file.log');
        const writableStream = createWriteStream('large-output-file.log');

        // The `pipeline` function handles piping the data from the readable
        // stream to the writable stream and manages errors and cleanup.
        await pipeline(readableStream, writableStream);

        console.log("Large file copied successfully!");

    } catch (error) {
        console.error("An error occurred during the copy:", error);
    }
}

copyLargeFile();
```
Streams are a core concept in Node.js for handling I/O efficiently.

## Other Common `fs` Operations

The `fs/promises` module provides promise-based versions of most `fs` functions:

*   `appendFile(path, data)`: Appends data to a file.
*   `mkdir(path)`: Creates a new directory.
*   `readdir(path)`: Reads the contents of a directory.
*   `rm(path, { recursive: true, force: true })`: Removes files and directories.
*   `stat(path)`: Gets information about a file or directory (like its size and modification date).

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://nodejs.org/api/fs.html" target="_blank" rel="noopener noreferrer">Node.js Docs: File system</a></li>
  <li><a href="https://nodejs.org/api/stream.html" target="_blank" rel="noopener noreferrer">Node.js Docs: Stream</a></li>
</ul>
</div>