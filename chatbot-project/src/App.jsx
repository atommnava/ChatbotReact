import { useState } from 'react';
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages';
import './App.css';

function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      message: 'Bonjour! Chatbot',
      sender: 'user',
      id: '1',
    },
    {
      message: 'Hola! ¿Cómo puedo asistirte?',
      sender: 'robot',
      id: '2',
    },
    {
      message: "Podrías darme la fecha de hoy?",
      sender: 'user',
      id: '3',
    },
    {
      message: 'Hoy es 3 de Junio',
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