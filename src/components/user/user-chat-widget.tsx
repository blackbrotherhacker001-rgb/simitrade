
'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/use-chat';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, X, MessageSquare, Paperclip, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

export function UserChatWidget() {
  const { isOpen, setOpen, messages, addMessage } = useChat();
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    addMessage({ role: 'user', content: input });
    setInput('');
  };

  const handleImageUpload = () => {
     addMessage({ role: 'user', content: '![Uploaded Image](https://placehold.co/200x150/1F2328/FFF?text=Uploaded+Image)' });
  }

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

  if (!isClient) {
    return null;
  }

  if (!isOpen) {
    return (
        <Button 
            className="fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg"
            onClick={() => setOpen(true)}
        >
            <MessageSquare className="h-8 w-8" />
        </Button>
    )
  }


  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] flex flex-col shadow-2xl z-50">
        <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-lg">Support Agent</CardTitle>
                    <p className="text-xs opacity-80">Online</p>
                </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/80" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
            </Button>
        </CardHeader>
        <CardContent ref={scrollAreaRef} className="flex-grow p-4 overflow-y-auto bg-card">
            <div className="space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={cn("flex items-start gap-3", msg.role === 'model' ? "justify-start" : "justify-end")}>
                        {msg.role === 'model' && (
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>E</AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn(
                            "rounded-lg px-3 py-2 max-w-xs",
                             msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}>
                            {msg.content.startsWith('![') ? (
                                <img src="https://placehold.co/200x150/1F2328/FFF?text=Uploaded+Image" alt="uploaded" className="rounded-md" data-ai-hint="uploaded image"/>
                            ) : (
                                <p className="text-sm">{msg.content}</p>
                            )}
                        </div>
                        {msg.role === 'user' && (
                             <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.walletAddress}`} />
                                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
            </div>
        </CardContent>
        <CardFooter className="p-3 border-t bg-card rounded-b-lg">
             <div className="relative w-full">
              <Textarea
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                 <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleImageUpload}>
                    <ImageIcon className="h-5 w-5"/>
                </Button>
                <Button size="icon" className="h-8 w-8" onClick={handleSendMessage}>
                    <Send className="h-4 w-4"/>
                </Button>
              </div>
            </div>
        </CardFooter>
    </Card>
  );
}
