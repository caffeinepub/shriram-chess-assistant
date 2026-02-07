import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Cloud, Globe, Share2, CheckCircle2, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HostingView() {
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.origin);
    }
  }, []);

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Hosting Information</h1>
        <p className="mt-2 text-muted-foreground">
          Learn how your Shriram Chess Assistant is hosted and how to share it with friends
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-primary" />
              <CardTitle>Internet Computer Hosting</CardTitle>
            </div>
            <CardDescription>Your app runs on the decentralized Internet Computer blockchain</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              The Shriram Chess Assistant is deployed as a <strong>canister</strong> on the Internet Computer (IC).
              A canister is a smart contract that combines code and state, running entirely on-chain in a decentralized manner.
            </p>
            <p className="text-sm leading-relaxed">
              This means your chess assistant is:
            </p>
            <ul className="ml-6 list-disc space-y-2 text-sm">
              <li>Accessible 24/7 from anywhere in the world</li>
              <li>Running on decentralized infrastructure (no single point of failure)</li>
              <li>Served directly from the blockchain without traditional web servers</li>
              <li>Tamper-proof and transparent</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle>Your Public URL</CardTitle>
            </div>
            <CardDescription>How to access and share your deployed application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">
              Once deployed, your canister receives a unique URL that looks like:
            </p>
            <Alert>
              <AlertDescription className="font-mono text-xs">
                https://[canister-id].icp0.io
              </AlertDescription>
            </Alert>
            {currentUrl && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Current App URL:</p>
                <Alert>
                  <AlertDescription className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs break-all">{currentUrl}</span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </AlertDescription>
                </Alert>
                <p className="text-xs text-muted-foreground">
                  This is the URL that will be shared when you use the Share menu in the header.
                </p>
              </div>
            )}
            <p className="text-sm leading-relaxed">
              You can find your canister ID and URL after running the deployment command. The URL is permanent and can be
              shared with anyone who wants to use your chess assistant.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              <CardTitle>Sharing with Friends</CardTitle>
            </div>
            <CardDescription>Easy ways to share your chess assistant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">WhatsApp Sharing</p>
                  <p className="text-sm text-muted-foreground">
                    Use the "Share" button in the header to open WhatsApp with a pre-filled message containing your app link.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Copy Link</p>
                  <p className="text-sm text-muted-foreground">
                    Click "Copy Link" from the Share menu to copy the URL to your clipboard, then paste it anywhere.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Direct Sharing</p>
                  <p className="text-sm text-muted-foreground">
                    Simply share your canister URL via email, social media, or any messaging platform.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deployment Steps</CardTitle>
            <CardDescription>Quick reference for deploying your application</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="ml-6 list-decimal space-y-2 text-sm">
              <li>Ensure you have the DFINITY SDK (dfx) installed</li>
              <li>Run <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">dfx deploy</code> in your project directory</li>
              <li>Note the canister ID displayed after successful deployment</li>
              <li>Access your app at <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">https://[canister-id].icp0.io</code></li>
              <li>Share the URL with your friends!</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
