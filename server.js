import { server as WebSocketServer } from 'websocket'; // Import WebSocket
import http from 'http'; // Import http module

// Create an HTTP server
const server = http.createServer((request, response) => {
    // Handle HTTP requests here
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
        // Echo the message back to all clients
        webSocketServer.connections.forEach(conn => {
            if (conn !== connection) {
                conn.send(message.utf8Data);
            }
        });
    });

    connection.on('close', (reasonCode, description) => {
        console.log('Client has disconnected.');
    });
});

// Start the server
server.listen(3001, () => {
    console.log('WebSocket server is listening on port 3001');
});
