import { server as WebSocketServer } from 'websocket'; // Import WebSocket
import http from 'http'; // Import http module

// Create an HTTP server
const server = http.createServer((request, response) => {
    response.writeHead(404);
    response.end();
});

// Create a WebSocket server
const webSocketServer = new WebSocketServer({
    httpServer: server,
});

// Handle WebSocket requests
webSocketServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    console.log('Client connected');

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.log('Received message:', message.utf8Data);

            // Broadcast the message back to all clients
            webSocketServer.connections.forEach(conn => {
                if (conn !== connection) {
                    // Parse the message and add any needed properties
                    try {
                        const parsedMessage = JSON.parse(message.utf8Data);
                        conn.send(JSON.stringify(parsedMessage)); // Send JSON back
                    } catch (error) {
                        console.error("Failed to parse message:", error);
                    }
                }
            });
        }
    });

    connection.on('close', (reasonCode, description) => {
        console.log('Client has disconnected.');
    });
});

// Start the server
server.listen(3001, () => {
    console.log('WebSocket server is listening on port 3001');
});
