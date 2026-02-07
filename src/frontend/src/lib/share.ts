/**
 * Share utilities for WhatsApp and clipboard functionality.
 * Guards against non-browser environments to prevent build-time errors.
 */

/**
 * Gets the canonical app URL (origin/root) for sharing.
 * This ensures we always share the main app URL, not nested routes.
 */
function getAppUrl(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.location.origin;
}

/**
 * Opens WhatsApp share dialog with the app's root URL.
 * Safe to call in any environment - no-op if window is unavailable.
 */
export function shareOnWhatsApp(): void {
  // Guard against SSR/build-time execution
  if (typeof window === 'undefined') {
    return;
  }

  const url = getAppUrl();
  const text = `Check out the Shriram Chess Assistant! Learn chess rules and improve your game: ${url}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  
  // Open in new tab/window
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Copies the app's root URL to clipboard.
 * Returns true on success, false on failure.
 * Safe to call in any environment.
 */
export async function copyLinkToClipboard(): Promise<boolean> {
  // Guard against SSR/build-time execution
  if (typeof window === 'undefined') {
    return false;
  }

  const url = getAppUrl();

  // Try modern clipboard API first (requires HTTPS or localhost)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      console.error('Clipboard API failed:', error);
      // Fall through to fallback method
    }
  }

  // Fallback method for older browsers or insecure contexts
  try {
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch (error) {
    console.error('Fallback copy failed:', error);
    return false;
  }
}
