
'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { chat } from '@/ai/flows/chat-flow';

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

const initialMessages: Message[] = [
    { role: 'model', content: 'Hello! How can I help you today?' },
];

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const addMessage = useCallback(async (message: Message) => {
    setMessages(prev => [...prev, message]);
    
    // If the message is from the user, get a reply from the AI
    if (message.role === 'user') {
      const newHistory = [...messages, message];
      try {
        const result = await chat({ history: newHistory });
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
