import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [users, setUsers] = useState([]); // State for users
  const socket = useRef(null); // WebSocket reference

  // Initialize WebSocket connection
  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:3001');

    socket.current.onopen = () => {
      console.log('WebSocket connection established.');
      // Notify when a user joins
      socket.current.send(JSON.stringify({ text: "A new user has joined the chat!", system: true }));
    };

    socket.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    socket.current.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  // Retrieve users from local storage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Send message function
  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() !== '') {
      const message = {
        text: messageInput,
        timestamp: new Date().toISOString(),
      };
      socket.current.send(JSON.stringify(message));
      setMessageInput('');
    }
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([]);
  };

  return (
    <section id="chat">
      <div className="container">
        <div className="row align-items-center justify-content-center h-100">
          <div className="col-lg-4 col-sm-12">
            <ul className="list-group p-3 rounded">
              {users.map((user, username) => (
                <li key={username} className="list-group-item">{user.username}</li>
              ))}
            </ul>
          </div>
          <div className="col-lg-8 col-sm-12">
            <div className="col-3 rounded w-100 mb-3">
              <div className="message-old p-3 border">
                <p>Chat history</p>
                <button onClick={clearChat} className="btn btn-secondary btn-sm mt-2">Clear Chat</button>
              </div>
            </div>
            <div className="chat-messages mb-3 p-3 border rounded" style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
                    onKeyDown={(e) => e.key === 'Enter' ? sendMessage(e) : null} // Enter key to send
                  />
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-primary">Send</button>
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
