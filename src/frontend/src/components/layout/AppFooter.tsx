import { Heart } from 'lucide-react';

export default function AppFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container flex h-14 items-center justify-center text-sm text-muted-foreground">
        <p className="flex items-center gap-1">
          © 2026. Built with{' '}
          <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" /> using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
