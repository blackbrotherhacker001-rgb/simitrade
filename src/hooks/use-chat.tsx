
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
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

const CHATS_COLLECTION = 'chats';

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();
  
  const chatDocumentId = user ? user.walletAddress : null;

  useEffect(() => {
    if (!chatDocumentId) {
        // If there's no user, we don't need to fetch from firestore.
        // We can show a generic welcome message.
        setMessages([{ role: 'model', content: 'Hello! Please log in to start a chat.' }]);
        return;
    };

    const docRef = doc(db, CHATS_COLLECTION, chatDocumentId);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            setMessages(data.messages || []);
        } else {
            // Document doesn't exist, so create it with an initial message.
            const initialMessage = [{ role: 'model', content: 'Hello! How can I help you today?' }];
            setMessages(initialMessage);
            setDoc(docRef, { messages: initialMessage });
        }
    }, (error) => {
        console.error("Error listening to chat document:", error);
        // Handle error case, e.g. show an error message in chat.
        setMessages([{ role: 'model', content: 'Could not load chat history.' }]);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();

  }, [chatDocumentId]);


  const addMessage = useCallback(async (message: Message) => {
    if (!chatDocumentId) return;
    
    // Optimistically update the UI
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);

    // Persist to Firestore
    const docRef = doc(db, CHATS_COLLECTION, chatDocumentId);
    await setDoc(docRef, { messages: updatedMessages });
    
    // If the message is from the user, get a reply from the AI
    if (message.role === 'user') {
      try {
        const result = await chat({ history: updatedMessages });
        const finalMessages = [...updatedMessages, { role: 'model', content: result.reply }];
        setMessages(finalMessages);
        await setDoc(docRef, { messages: finalMessages });
      } catch (error) {
        console.error("Failed to get AI reply:", error);
        const errorMessages = [...updatedMessages, { role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." }];
        setMessages(errorMessages);
        await setDoc(docRef, { messages: errorMessages });
      }
    }
  }, [messages, chatDocumentId]);

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
