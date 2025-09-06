
'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  useEffect,
} from 'react';
import { chat } from '@/ai/flows/chat-flow';
import { useAuth } from './use-auth';

type Message = {
    role: 'user' | 'model';
    content: string;
}

interface ChatContextType {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  messages: Message[];
  addMessage: (message: Message) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();
  
  useEffect(() => {
      if (!user) {
        setMessages([{ role: 'model', content: 'Hello! Please log in to start a chat.' }]);
      } else {
        setMessages([{ role: 'model', content: `Hello ${user.name}! How can I help you today?` }]);
      }
  }, [user]);


  const addMessage = useCallback(async (message: Message) => {
    // Optimistically update the UI
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    
    // If the message is from the user, get a reply from the AI
    if (message.role === 'user') {
      try {
        const result = await chat({ history: updatedMessages });
        setMessages(prev => [...prev, { role: 'model', content: result.reply }]);
      } catch (error) {
        console.error("Failed to get AI reply:", error);
        setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." }]);
      }
    }
  }, [messages]);

  return (
    <ChatContext.Provider value={{ isOpen, setOpen, messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
