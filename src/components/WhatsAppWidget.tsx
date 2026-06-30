import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Mic, Smile } from "lucide-react";

type Msg = { id: number; from: "me" | "ai"; text: string; time: string; typing?: boolean };

const suggestions = ["Book a discovery call", "Pricing", "See projects", "Voice AI demo"];

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 1,
      from: "ai",
      text: "Hey 👋 I'm Ahmad's AI assistant. How can I help automate your business today?",
      time: "now",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((m) => [...m, { id: Date.now(), from: "me", text, time: now }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: "ai",
          text:
            "Thanks! I'll relay this to Ahmad. Meanwhile, you can book a free 30-min discovery call from the contact section.",
          time: now,
        },
      ]);
    }, 1400);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_-5px_rgba(37,211,102,0.6)]"
        aria-label="Chat with AI assistant on WhatsApp"
      >
        {open ? <X size={22} /> : <MessageCircle size={26} />}
        {!open && (
          <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-[#00D4FF]" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="glass-strong fixed bottom-24 right-6 z-50 flex h-[520px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-[#0077B6] to-[#03045E] p-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-lg">
                🤖
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">Ahmad's AI Assistant</div>
                <div className="flex items-center gap-1.5 text-[11px] text-accent">
                  <span className="h-2 w-2 rounded-full bg-green-400" /> online · typically replies instantly
                </div>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-2 overflow-y-auto p-3"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 10%, rgba(0,119,182,0.18), transparent 40%), radial-gradient(circle at 80% 90%, rgba(0,212,255,0.12), transparent 40%)",
              }}
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      m.from === "me"
                        ? "rounded-br-sm bg-[#00D4FF] text-[#02031E]"
                        : "rounded-bl-sm bg-white/10 text-foreground"
                    }`}
                  >
                    <div>{m.text}</div>
                    <div className="mt-1 text-right text-[10px] opacity-60">{m.time}</div>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-accent" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:.3s]" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-1 overflow-x-auto px-3 py-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="whitespace-nowrap rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border bg-background/60 p-2"
            >
              <button type="button" className="text-muted-foreground hover:text-foreground">
                <Smile size={18} />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {input.trim() ? (
                <button
                  type="submit"
                  className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"
                  aria-label="Send"
                >
                  <Send size={15} />
                </button>
              ) : (
                <button
                  type="button"
                  className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"
                  aria-label="Voice message"
                >
                  <Mic size={15} />
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
