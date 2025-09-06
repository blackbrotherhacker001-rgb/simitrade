
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

const CHAT_STORAGE_PREFIX = 'chat-history-';

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();
  
  const storageKey = user ? `${CHAT_STORAGE_PREFIX}${user.walletAddress}` : null;

  useEffect(() => {
    if (!user || !storageKey) {
        // If there's no user, we can default to a welcome message, but not save it.
        setMessages([{ role: 'model', content: 'Hello! Please log in to start a chat.' }]);
        return;
    };
    try {
        const storedMessages = localStorage.getItem(storageKey);
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        } else {
             // Set a default initial message for a new chat
            const initialMessage = [{ role: 'model', content: 'Hello! How can I help you today?' }];
            setMessages(initialMessage);
            localStorage.setItem(storageKey, JSON.stringify(initialMessage));
        }
    } catch(e) {
        console.error("Could not process chat history from localStorage", e);
        setMessages([{ role: 'model', content: 'Hello! How can I help you today?' }]);
    }
  }, [user, storageKey]);


  const addMessage = useCallback(async (message: Message) => {
    if (!storageKey) return;
    
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem(storageKey, JSON.stringify(updatedMessages));
    
    // If the message is from the user, get a reply from the AI
    if (message.role === 'user') {
      try {
        const result = await chat({ history: updatedMessages });
        const finalMessages = [...updatedMessages, { role: 'model', content: result.reply }];
        setMessages(finalMessages);
        localStorage.setItem(storageKey, JSON.stringify(finalMessages));
      } catch (error) {
        console.error("Failed to get AI reply:", error);
        const errorMessages = [...updatedMessages, { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." }];
        setMessages(errorMessages);
        localStorage.setItem(storageKey, JSON.stringify(errorMessages));
      }
    }
  }, [messages, storageKey]);

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
