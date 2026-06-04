import { useState } from 'react';
import { Chatbot } from 'supersimpledev';

export function ChatInput({ chatMessages, setChatMessages }) {
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
  