import { MessageCircle } from "lucide-react";
import { site } from "@/lib/content";

/** Persistent WhatsApp button — the primary support channel for DrPhysioAI. */
export function WhatsAppFab() {
  return (
    <a
      href={site.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with DrPhysioAI on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] px-4 py-4 text-white shadow-card transition-all duration-300 hover:gap-2 hover:pr-5"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-white/50" />
        <MessageCircle className="relative h-6 w-6" />
      </span>
      <span className="max-w-0 whitespace-nowrap text-sm font-bold opacity-0 transition-all duration-300 group-hover:max-w-[8rem] group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
