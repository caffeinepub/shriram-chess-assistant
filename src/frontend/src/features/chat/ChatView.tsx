import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import ChatMessageList from './ChatMessageList';
import ChatComposer from './ChatComposer';
import { useRulesAssistant } from '@/hooks/useRulesAssistant';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Hello! I\'m the Shriram Chess Assistant. Ask me anything about chess rules, from basic moves to advanced tournament regulations. I can help with castling, en passant, stalemate, time controls, and much more!',
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { getAnswer } = useRulesAssistant();
  const navigate = useNavigate();

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      const answer = await getAnswer(content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your question. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShowExample = () => {
    navigate({ to: '/learning' });
  };

  return (
    <div className="container max-w-4xl py-8">
      <Card className="flex h-[calc(100vh-12rem)] flex-col">
        <div className="flex-1 overflow-hidden">
          <ChatMessageList messages={messages} />
        </div>

        <div className="border-t border-border/40 p-4">
          <div className="mb-3 flex justify-center">
            <Button variant="outline" size="sm" onClick={handleShowExample}>
              <BookOpen className="mr-2 h-4 w-4" />
              Show me an example on the board
            </Button>
          </div>
          <ChatComposer onSend={handleSendMessage} disabled={isProcessing} />
        </div>
      </Card>
    </div>
  );
}
