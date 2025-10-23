# Streams in Node.js

Streams are one of the fundamental concepts that power Node.js applications. They are a way of handling reading or writing data in a continuous, memory-efficient manner. Instead of reading an entire file into memory before processing it, streams allow you to read data in smaller, manageable **chunks**.

This makes streams incredibly powerful for working with large amounts of data, such as reading a multi-gigabyte file from disk or streaming a video over the network.

## The Four Types of Streams

There are four basic types of streams in Node.js:

1.  **Readable Streams**: Streams from which data can be read. Examples include `fs.createReadStream()`, and the `request` object on an HTTP server.
2.  **Writable Streams**: Streams to which data can be written. Examples include `fs.createWriteStream()`, and the `response` object on an HTTP server.
3.  **Duplex Streams**: Streams that are both Readable and Writable. Examples include a TCP socket.
4.  **Transform Streams**: A type of Duplex stream where the output is computed based on the input. An example is a stream that compresses data with `zlib`.

## The Power of `pipe()`

The real magic of streams comes from the `.pipe()` method. The `pipe()` method takes a Readable stream and connects its output to a Writable stream. It's a concept taken from the Unix command line (`cat file.txt | grep 'error'`).

`pipe()` automatically handles the flow of data, including backpressure. **Backpressure** is a crucial mechanism where the Readable stream will pause reading if the Writable stream is too busy and can't keep up, preventing memory from being overwhelmed.

### Example: Copying a Large File

This example demonstrates how to copy a large file efficiently without loading the whole file into memory.

```javascript
import { createReadStream, createWriteStream } from 'fs';

const source = createReadStream('large-video.mp4');
const destination = createWriteStream('video-copy.mp4');

// Connect the readable stream (source) to the writable stream (destination)
source.pipe(destination);

source.on('end', () => {
    console.log('File copy complete.');
});

source.on('error', (err) => {
    console.error('An error occurred in the readable stream:', err);
});

destination.on('error', (err) => {
    console.error('An error occurred in the writable stream:', err);
});
```
This code uses a tiny amount of memory, no matter how large `large-video.mp4` is.

## Example: An HTTP Server Streaming a File

You can use the same principle to efficiently serve a large file over HTTP.

```javascript
import { createServer } from 'http';
import { createReadStream } from 'fs';

const server = createServer((req, res) => {
    // The `res` object is a Writable stream
    const readableStream = createReadStream('large-video.mp4');
    
    // Pipe the file stream directly to the HTTP response
    readableStream.pipe(res);
});

server.listen(3000, () => {
    console.log('Server listening on port 3000. Visit http://localhost:3000 to stream the file.');
});
```
When you access this server, the video will start streaming to your browser immediately, without Node.js having to load the entire video into RAM first.

## `stream/promises` for Cleaner Code

Modern Node.js provides a `pipeline` function in the `stream/promises` module, which is a cleaner and safer way to pipe streams, as it handles error cleanup automatically.

```javascript
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

async function copyFileWithPipeline() {
    try {
        await pipeline(
            createReadStream('large-video.mp4'),
            createWriteStream('video-copy.mp4')
        );
        console.log('Pipeline succeeded.');
    } catch (err) {
        console.error('Pipeline failed.', err);
    }
}

copyFileWithPipeline();
```

Understanding streams is key to writing high-performance, memory-efficient I/O code in Node.js.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://nodejs.org/api/stream.html" target="_blank" rel="noopener noreferrer">Node.js Docs: Stream</a></li>
  <li><a href="https://nodesource.com/blog/understanding-streams-in-nodejs/" target="_blank" rel="noopener noreferrer">Understanding Streams in Node.js (NodeSource)</a></li>
</ul>
</div>