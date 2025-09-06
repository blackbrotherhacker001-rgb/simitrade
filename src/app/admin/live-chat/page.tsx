
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

type Message = {
  role: 'user' | 'model';
  content: string;
};

const mockUsers = [
  { id: '1', name: 'Alice', online: true },
  { id: '2', name: 'Bob', online: true },
  { id: '3', name: 'Charlie', online: false },
  { id: '4', name: 'David', online: true },
];

const initialMessages: Record<string, Message[]> = {
    '1': [
        { role: 'user', content: 'Hi, I have an issue with my deposit.' },
        { role: 'model', content: 'Hello Alice, I can certainly help you with that. Can you please provide the transaction ID?' },
        { role: 'user', content: '![Uploaded Image](https://placehold.co/200x150/1F2328/FFF?text=Receipt)' },
    ],
    '2': [{ role: 'user', content: 'What\'s the current price of BTC?' }],
    '4': [{ role: 'user', content: 'Can you help me reset my password?' }],
};


export default function LiveChatPage() {
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages[selectedUser.id] || []);
  const [input, setInput] = useState('');
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleUserSelect = (user: typeof mockUsers[0]) => {
    setSelectedUser(user);
    setMessages(initialMessages[user.id] || []);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    const newMessages: Message[] = [...messages, { role: 'model', content: input }];
    setMessages(newMessages);
    setInput('');
  };

  const handleGenerateSuggestion = async () => {
    setLoadingSuggestion(true);
    try {
      const result = await chat({ history: messages });
      setInput(result.reply);
    } catch (error) {
      console.error("Failed to generate suggestion:", error);
      setInput("Sorry, I couldn't generate a response right now.");
    } finally {
      setLoadingSuggestion(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to the bottom.
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
                {mockUsers.map(user => (
                    <div key={user.id} 
                        onClick={() => handleUserSelect(user)}
                        className={cn(
                            "flex items-center gap-3 p-3 cursor-pointer border-b",
                            selectedUser.id === user.id ? "bg-muted" : "hover:bg-muted/50"
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
        </Card>
      </div>
    </div>
  );
}
