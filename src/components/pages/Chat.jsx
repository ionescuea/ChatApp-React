import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getStoredUsers } from '/utilities/usersLS.js'; // Adjust the import as necessary

function Chat() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [chatUsers, setChatUsers] = useState([]);
    const socket = useRef(null);
    const [loggedInUsername, setLoggedInUsername] = useState(''); // State for logged-in username

    // Fetching chat users from local storage
    useEffect(() => {
        const users = getStoredUsers(); // Fetch users from local storage
        setChatUsers(users); // Set the chat users in state

        // Retrieve the logged-in username from local storage
        const currentUser = localStorage.getItem('currentUser'); // Retrieve from local storage
        if (currentUser) {
            setLoggedInUsername(currentUser); // Set the logged-in username
        }
    }, []);

    // WebSocket connection setup
    useEffect(() => {
        socket.current = new WebSocket('ws://127.0.0.1:3001');

        socket.current.onopen = () => {
            console.log('WebSocket connection established.');
            socket.current.send(JSON.stringify({ text: "A new user has joined the chat!", system: true }));
        };

        socket.current.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        };

        socket.current.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        socket.current.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, []);

    // Function to send messages
    const sendMessage = (e) => {
        e.preventDefault();
        if (messageInput.trim()) {
            const message = { text: messageInput, timestamp: new Date().toISOString() };
            socket.current.send(JSON.stringify(message));
            setMessageInput(''); // Clear input after sending
        }
    };

    return (
        <section id="chat">
            <div className="container">
                <div className="row align-items-center justify-content-center h-100">
                    <div className="chat-list col-lg-4 col-sm-12">
                        <ul className="list-group p-3 rounded">
                            {chatUsers
                                .filter(user => user.username !== loggedInUsername) // Filter out the logged-in user
                                .map(user => (
                                    <li key={user.username} className="list-group-item">
                                        {user.username}
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="col-lg-8 col-sm-12">
                        <div className="chat-messages mb-3 p-3 border rounded">
                            {messages.map((message, index) => (
                                <div key={index} className="message">
                                    <strong>{message.system ? "System" : new Date(message.timestamp).toLocaleTimeString()}:</strong> {message.text}
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-8 col-sm-12 p-3 rounded">
                            <form className="row g-3" onSubmit={sendMessage}>
                                <div className="col-auto">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Write message"
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' ? sendMessage(e) : null}
                                    />
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn btn-primary btn-send">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Chat;
