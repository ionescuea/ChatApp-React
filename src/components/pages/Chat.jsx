import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getStoredUsers } from '/utilities/usersLS.js'; // Adjust the import as necessary

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [chatUsers, setChatUsers] = useState([]);
  const socket = useRef(null);
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const endOfMessagesRef = useRef(null); // Ref for the end of messages div

  // Fetching chat users from local storage and initializing logged-in user
  useEffect(() => {
    const users = getStoredUsers(); // Fetch users from local storage
    setChatUsers(users); // Set the chat users in state

    const currentUser = localStorage.getItem('currentUser'); // Retrieve from local storage
    if (currentUser) {
      setLoggedInUsername(currentUser); // Set the logged-in username
    }

    // Load messages from local storage
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    setMessages(savedMessages);
  }, []);

  // WebSocket connection setup
  useEffect(() => {
    if (!loggedInUsername) return; // Prevent connecting if not logged in

    socket.current = new WebSocket('wss://chatapp-react-pi8n.onrender.com');

    socket.current.onopen = () => {
      console.log('WebSocket connection established.');
      // Send a message indicating a user has joined
      socket.current.send(JSON.stringify({
        text: `${loggedInUsername} has joined the chat!`,
        username: loggedInUsername,
        system: true
      }));
    };

    socket.current.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log('Received message:', receivedMessage); // Log received messages
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, receivedMessage];
        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages)); // Save updated messages to local storage
        return updatedMessages;
      });
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
  }, [loggedInUsername]); // Ensure this effect runs whenever loggedInUsername changes

  // Function to send messages
  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      const message = {
        text: messageInput,
        username: loggedInUsername, // Include the logged-in username
        timestamp: new Date().toISOString()
      };
      // Immediately add the sent message to the messages array
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message]; // Add sent message to the list
        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages)); // Save updated messages to local storage
        return updatedMessages;
      });
      socket.current.send(JSON.stringify(message)); // Send message to the WebSocket server
      setMessageInput(''); // Clear input after sending
    }
  };

  // Scroll to the last message whenever messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Display "User not online" message if the user is not logged in
  if (!loggedInUsername) {
    return (
      <div className="container">
        <h5 className="text-center">User not online. Please log in to chat.</h5>
      </div>
    );
  }

  return (
    <section id="chat">
      <div className="container-chat">
        <div className="row h-100">
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
            <div className="chat-messages mb-3 p-5">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.username === loggedInUsername ? 'sent' : 'received'}`}>
                  {message.system ? 'System: ' : `${message.username}: `} {message.text}
                </div>
              ))}
              <div ref={endOfMessagesRef} /> {/* Empty div for scrolling to the end */}
            </div>
            <div className="message-input col-lg-8 col-sm-12 rounded">
              <form className="d-flex flex-row g-3" onSubmit={sendMessage}>
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
                <div className="col-auto ms-auto">
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
