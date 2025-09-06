
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, Send, Sparkles, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chat } from '@/ai/flows/chat-flow';
import { useToast } from '@/hooks/use-toast';
import { collection, doc, onSnapshot, setDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Message = {
  role: 'user' | 'model';
  content: string;
};

type ChatUser = {
  id: string; // walletAddress
  name: string;
  online: boolean;
};

const CHATS_COLLECTION = 'chats';

export default function LiveChatPage() {
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch all users with chat history
    const fetchChatUsers = async () => {
        try {
            const chatsSnapshot = await getDocs(collection(db, CHATS_COLLECTION));
            const usersWithChats: ChatUser[] = [];

            for (const chatDoc of chatsSnapshot.docs) {
                const userDoc = await getDoc(doc(db, 'users', chatDoc.id));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    usersWithChats.push({
                        id: chatDoc.id,
                        name: userData.name || 'Unknown User',
                        online: true, // Simplified for this demo
                    });
                }
            }
            setChatUsers(usersWithChats);
            if (usersWithChats.length > 0) {
              setSelectedUser(usersWithChats[0]);
            }
        } catch (error) {
            console.error("Error fetching chat users:", error);
            toast({
                variant: 'destructive',
                title: 'Error Loading Chats',
                description: 'Could not fetch user chat sessions from Firestore.'
            });
        }
    };
    fetchChatUsers();
  }, [toast]);


  // Effect to load messages and listen for real-time updates
  useEffect(() => {
    if (!selectedUser) {
        setMessages([]);
        return;
    };

    const chatDocRef = doc(db, CHATS_COLLECTION, selectedUser.id);
    const unsubscribe = onSnapshot(chatDocRef, (docSnap) => {
        if (docSnap.exists()) {
            setMessages(docSnap.data().messages || []);
        } else {
            setMessages([]);
        }
    }, (error) => {
        console.error("Error listening to chat document:", error);
    });

    return () => unsubscribe();
  }, [selectedUser]);

  const handleUserSelect = (user: ChatUser) => {
    setSelectedUser(user);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '' || !selectedUser) return;
    const newMessages: Message[] = [...messages, { role: 'model', content: input }];
    setMessages(newMessages);

    const chatDocRef = doc(db, CHATS_COLLECTION, selectedUser.id);
    await setDoc(chatDocRef, { messages: newMessages }, { merge: true });

    setInput('');
  };

  const handleGenerateSuggestion = async () => {
    setLoadingSuggestion(true);
    try {
      const result = await chat({ history: messages });
      setInput(result.reply);
    } catch (error) {
      console.error("Failed to generate suggestion:", error);
       toast({
        variant: "destructive",
        title: "AI Error",
        description: "Sorry, I couldn't generate a response right now.",
      });
    } finally {
      setLoadingSuggestion(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        setTimeout(() => {
             if(scrollAreaRef.current) {
                scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
             }
        }, 100)
    }
  }, [messages]);
  

  return (
    <div className="container mx-auto p-4 md:p-6 h-[calc(100vh-100px)]">
      <div className="grid grid-cols-12 gap-6 h-full">
        <Card className="col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Active Chats</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <ScrollArea className="h-full">
                {chatUsers.length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">No active chats found.</div>
                )}
                {chatUsers.map(user => (
                    <div key={user.id} 
                        onClick={() => handleUserSelect(user)}
                        className={cn(
                            "flex items-center gap-3 p-3 cursor-pointer border-b",
                            selectedUser?.id === user.id ? "bg-muted" : "hover:bg-muted/50"
                        )}
                    >
                        <Avatar>
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <p className="font-semibold">{user.name}</p>
                        </div>
                        {user.online && <div className="h-2 w-2 rounded-full bg-green-500" />}
                    </div>
                ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="col-span-9 flex flex-col h-full">
            {selectedUser ? (
                <>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${selectedUser.id}`} />
                            <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {selectedUser.name}
                    </CardTitle>
                    <Button variant="ghost" size="icon">
                        <Bot />
                    </Button>
                </CardHeader>

                <CardContent ref={scrollAreaRef} className="flex-grow overflow-y-auto p-4">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                        <div key={index} className={cn("flex items-end gap-2", msg.role === 'model' ? "justify-end" : "justify-start")}>
                            {msg.role === 'user' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${selectedUser.id}`} />
                                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn(
                                "rounded-lg px-3 py-2 max-w-sm",
                                msg.role === 'model' ? "bg-primary text-primary-foreground" : "bg-muted"
                            )}>
                            {msg.content.startsWith('![') ? (
                                <img src="https://placehold.co/200x150/1F2328/FFF?text=Receipt" alt="uploaded" className="rounded-md max-w-full h-auto" data-ai-hint="receipt image" />
                            ) : (
                                <p className="text-sm">{msg.content}</p>
                            )}
                            </div>
                            {msg.role === 'model' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                        ))}
                    </div>
                </CardContent>
                <CardContent className="pt-4 border-t">
                    <div className="relative">
                    <Textarea
                        placeholder="Type your message..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
                        className="pr-24"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                        <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={handleGenerateSuggestion} 
                            disabled={loadingSuggestion}
                            className="text-primary hover:text-primary"
                            >
                            <Sparkles className={cn("mr-2 h-4 w-4", loadingSuggestion && "animate-spin")}/>
                            Suggest
                        </Button>
                        <Button size="sm" onClick={handleSendMessage}>
                            Send <Send className="ml-2 h-4 w-4"/>
                        </Button>
                    </div>
                    </div>
                </CardContent>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <MessageSquare className="h-16 w-16 mb-4" />
                    <h3 className="text-lg font-semibold">Select a chat</h3>
                    <p className="text-sm">Choose a user from the list to view their conversation.</p>
                </div>
            )}
        </Card>
      </div>
    </div>
  );
}
