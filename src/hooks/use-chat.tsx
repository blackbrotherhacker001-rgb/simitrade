
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

const getChatHistoryKey = (userId: string) => `chat_history_${userId}`;

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();
  
  // Load messages from localStorage when user changes
  useEffect(() => {
    if (user) {
        const chatKey = getChatHistoryKey(user.walletAddress);
        const storedHistory = localStorage.getItem(chatKey);
        if (storedHistory) {
            setMessages(JSON.parse(storedHistory));
        } else {
            const initialMessage = { role: 'model', content: `Hello ${user.name}! How can I help you today?` };
            setMessages([initialMessage]);
            localStorage.setItem(chatKey, JSON.stringify([initialMessage]));
        }
    } else {
        setMessages([{ role: 'model', content: 'Hello! Please log in to start a chat.' }]);
    }
  }, [user]);

  // Sync messages with localStorage when they change
  useEffect(() => {
    if (user) {
        const chatKey = getChatHistoryKey(user.walletAddress);
        const storedHistory = localStorage.getItem(chatKey);
        const currentHistory = JSON.stringify(messages);
        
        // Prevent overwriting initial state or empty arrays from other tabs
        if(storedHistory !== currentHistory && messages.length > 0) {
            localStorage.setItem(chatKey, currentHistory);
        }
    }
  }, [messages, user]);


  const addMessage = useCallback(async (message: Message) => {
    if (!user) return; // Don't add messages if user is not logged in

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
  }, [messages, user]);

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
