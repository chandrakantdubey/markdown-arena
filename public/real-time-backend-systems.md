# Real-time Backend Systems

## Introduction

Traditional web interactions follow a request-response model: the client sends a request, and the server sends a response. This is not suitable for applications that require immediate, "real-time" updates, where the server needs to push information to the client without the client explicitly asking for it.

Real-time backend systems enable instantaneous, bi-directional communication, powering applications like live chat, real-time collaboration tools, multiplayer games, and live location tracking.

## Real-time Technology Comparison

```mermaid
graph TD
    subgraph "WebSocket (Full-Duplex)"
        direction LR
        C1[Client] <=> S1[Server];
        note right of S1 "Single, persistent, two-way connection.<br>Lowest latency."
    end

    subgraph "Server-Sent Events (SSE)"
        direction LR
        C2[Client] --> S2[Server];
        S2 -- events --> C2;
        note right of S2 "Persistent, one-way connection.<br>Server can push to client."
    end
    
    subgraph "Long Polling (Simulated Push)"
        direction TD
        C3[Client] -- "1. Request" --> S3[Server];
        S3 -- "2. Hold connection open..." --> S3;
        S3 -- "3. Data available, respond" --> C3;
        C3 -- "4. Immediately re-request" --> S3;
        note right of S3 "High latency, high overhead.<br>A fallback option."
    end
```

**WebSockets** are the most powerful and common technology for true, low-latency, bi-directional real-time communication.

## Code Examples: A Simple WebSocket Chat Server

These examples create a simple chat server that broadcasts any message it receives to all other connected clients.

<div class="code-tabs">
  <div class="tab-buttons">
    <button class="tab-button active" data-lang="nodejs">Node.js (ws)</button>
    <button class="tab-button" data-lang="python">Python (websockets)</button>
    <button class="tab-button" data-lang="go">Go (gorilla/websocket)</button>
  </div>
  <div class="tab-content active" data-lang="nodejs">
<pre><code class="language-javascript">
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Client connected.');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('Received: %s', data);

    // Broadcast the message to all other clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});

console.log('WebSocket server started on port 8080');
</code></pre>
  </div>
  <div class="tab-content" data-lang="python">
<pre><code class="language-python">
import asyncio
import websockets
import json

# Keep track of all connected clients
CONNECTED_CLIENTS = set()

async def chat_handler(websocket, path):
    CONNECTED_CLIENTS.add(websocket)
    print("Client connected.")
    try:
        async for message in websocket:
            print(f"Received: {message}")
            
            # Broadcast the message to all other clients
            for client in CONNECTED_CLIENTS:
                if client != websocket:
                    await client.send(message)
    finally:
        CONNECTED_CLIENTS.remove(websocket)
        print("Client disconnected.")

async def main():
    async with websockets.serve(chat_handler, "localhost", 8080):
        print("WebSocket server started on port 8080")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
</code></pre>
  </div>
  <div class="tab-content" data-lang="go">
<pre><code class="language-go">
package main

import (
	"log"
	"net/http"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}
var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan []byte)

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil { log.Fatal(err) }
	defer ws.Close()
	clients[ws] = true
	log.Println("Client connected.")

	for {
		_, msg, err := ws.ReadMessage()
		if err != nil {
			log.Printf("Client disconnected: %v", err)
			delete(clients, ws)
			break
		}
		log.Printf("Received: %s", msg)
		broadcast <- msg
	}
}

func handleMessages() {
	for {
		msg := <-broadcast
		for client := range clients {
			err := client.WriteMessage(websocket.TextMessage, msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}

func main() {
	http.HandleFunc("/ws", handleConnections)
	go handleMessages()
	log.Println("WebSocket server started on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil { log.Fatal("ListenAndServe: ", err) }
}
</code></pre>
  </div>
</div>

## Challenges in Real-Time Systems

1.  **State Management**: Servers must manage state for thousands of concurrent connections (e.g., which user is on which connection, what chat rooms they are in). An in-memory store like **Redis** is often used for this.
2.  **Scalability**: A single server can only handle a finite number of persistent connections. To scale horizontally, you need a **backplane** (like Redis Pub/Sub or Kafka) so that servers can broadcast messages to each other. For example, if User A is on Server 1 and User B is on Server 2, Server 1 receives the message and publishes it to the backplane. Server 2 receives it from the backplane and sends it to User B.
3.  **Authentication**: Auth must happen when the connection is established (e.g., via a token in the handshake).
4.  **Resilience**: Clients will inevitably get disconnected. The system needs to handle reconnections gracefully, possibly replaying missed messages.

<div class="further-reading">
<h3>Further Reading</h3>
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" target="_blank" rel="noopener noreferrer">MDN WebSockets API</a></li>
  <li><a href="https://socket.io/docs/v4/" target="_blank" rel="noopener noreferrer">Socket.IO Documentation (a popular WebSocket library)</a></li>
  <li><a href="https://ably.com/topic/scaling-websockets" target="_blank" rel="noopener noreferrer">Scaling WebSockets</a></li>
</ul>
</div>