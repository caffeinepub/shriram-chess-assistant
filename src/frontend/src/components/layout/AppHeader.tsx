import { Link, useNavigate } from '@tanstack/react-router';
import { MessageSquare, BookOpen, Cloud, Share2, Copy } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { shareOnWhatsApp, copyLinkToClipboard } from '@/lib/share';
import { toast } from 'sonner';

export default function AppHeader() {
  const navigate = useNavigate();

  const handleWhatsAppShare = () => {
    shareOnWhatsApp();
  };

  const handleCopyLink = async () => {
    const success = await copyLinkToClipboard();
    if (success) {
      toast.success('Link copied to clipboard!');
    } else {
      toast.error('Failed to copy link. Please try again.');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/generated/shriram-chess-assistant-logo.dim_512x512.png"
            alt="Shriram Chess Assistant"
            className="h-10 w-10 rounded-lg"
          />
          <span className="text-xl font-semibold tracking-tight">Shriram Chess Assistant</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: '/' })}
            className="hidden sm:inline-flex"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: '/learning' })}
            className="hidden sm:inline-flex"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Learn
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: '/hosting' })}
            className="hidden sm:inline-flex"
          >
            <Cloud className="mr-2 h-4 w-4" />
            Hosting
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleWhatsAppShare}>
                <SiWhatsapp className="mr-2 h-4 w-4" />
                Share on WhatsApp
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyLink}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
