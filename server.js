// Import necessary modules
import { server as WebSocketServer } from 'websocket';
import http from 'http';

// Get the port from the environment variable (Render dynamically assigns this)
const PORT = process.env.PORT || 3001;

// Create an HTTP server
const server = http.createServer((request, response) => {
    response.writeHead(404);
    response.end();
});

// Create a WebSocket server
const webSocketServer = new WebSocketServer({
    httpServer: server,
});

// Store connected clients
let clients = [];

// Handle WebSocket requests
webSocketServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    const userData = {}; // Store user data

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            const parsedMessage = JSON.parse(message.utf8Data);
            if (parsedMessage.username) {
                userData.username = parsedMessage.username; // Save username
            }

            console.log('Received message:', parsedMessage);

            // Broadcast the message back to all clients
            webSocketServer.connections.forEach(conn => {
                if (conn !== connection) {
                    // Attach the username to the message
                    const broadcastMessage = {
                        ...parsedMessage,
                        username: userData.username, // Attach username to the message
                    };
                    try {
                        conn.send(JSON.stringify(broadcastMessage)); // Send JSON back to all other clients
                    } catch (error) {
                        console.error("Failed to send message:", error);
                    }
                }
            });
        }
    });

    connection.on('close', (reasonCode, description) => {
        console.log('Client has disconnected.');
        // Optional: handle user disconnection
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`WebSocket server is listening on port ${PORT}`);
});
