// Safe wrapper for Meta Pixel (fbq) tracking

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Dispatches standard or custom Meta Pixel events safely.
 * @param eventName Name of the event (e.g., 'PageView', 'Lead', 'ScrollDepth')
 * @param params Optional metadata payload
 * @param isCustom Whether it's a custom event (uses trackCustom) or standard (uses track)
 */
export function trackPixelEvent(
  eventName: string,
  params?: Record<string, unknown>,
  isCustom = false
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      if (isCustom) {
        window.fbq("trackCustom", eventName, params);
      } else {
        window.fbq("track", eventName, params);
      }
    } catch (err) {
      console.warn(`[Meta Pixel] Error tracking ${eventName}:`, err);
    }
  }

  // Development logger to easily verify events in DevTools console
  if (import.meta.env.DEV) {
    console.log(`%c[Meta Pixel] ${isCustom ? "trackCustom" : "track"}: ${eventName}`, "color: #1877F2; font-weight: bold;", params || "");
  }
}
