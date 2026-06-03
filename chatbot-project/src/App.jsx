import { useState, useRef, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import './App.css';
import RobotProfileImage from './assets/robot.png';
import UserProfileImage from './assets/user.png';

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    if (!inputText.trim()) return;

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
      },
    ]);

    setInputText('');
  }

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Send a message to Chatbot"
        value={inputText}
        onChange={saveInputText}
        className="chat-input"
      />

      <button
        onClick={sendMessage}
        className="send-button"
      >
        Send
      </button>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div
      className={
        sender === 'user'
          ? 'chat-message-user'
          : 'chat-message-robot'
      }
    >
      {sender === 'robot' && (
        <img
          src={RobotProfileImage}
          alt="Robot"
          className="chat-message-profile"
        />
      )}

      <div className="chat-message-text">
        {message}
      </div>

      {sender === 'user' && (
        <img
          src={UserProfileImage}
          alt="User"
          className="chat-message-profile"
        />
      )}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const container = chatMessagesRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div
      className="chat-messages-container"
      ref={chatMessagesRef}
    >
      {chatMessages.map((chatMessage) => (
        <ChatMessage
          key={chatMessage.id}
          message={chatMessage.message}
          sender={chatMessage.sender}
        />
      ))}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      message: 'Hello Chatbot',
      sender: 'user',
      id: '1',
    },
    {
      message: 'Hello! How can I help you?',
      sender: 'robot',
      id: '2',
    },
    {
      message: "Can you get me today's date?",
      sender: 'user',
      id: '3',
    },
    {
      message: 'Today is May 18',
      sender: 'robot',
      id: '4',
    },
  ]);

  return (
    <div className="app-container">
      <ChatMessages
        chatMessages={chatMessages}
      />

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;