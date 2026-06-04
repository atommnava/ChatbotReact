import { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';

export function ChatMessages({ chatMessages }) {
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

export default ChatMessages;
  