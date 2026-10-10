"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { 
  X, 
  Send, 
  Phone,
  RotateCcw,
  Bot,
  User,
  Sparkles,
  ExternalLink,
  GripHorizontal
} from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
  time: string;
}

const INITIAL_GREETING = 
  "Salam & Welcome! 👋\n\n" +
  "I am the AJ AI Assistant. Aap apne project ya AJ Code Team ke baray mein koi bhi maloomat hasil kar sakte hain.\n\n" +
  "How can we assist you today?";

const QUICK_OPTIONS = [
  { label: "Build Custom Web App", prompt: "I want to build a custom Next.js web application." },
  { label: "E-Commerce Store", prompt: "I want to build a high-converting E-Commerce store." },
  { label: "About AJ Code Team", prompt: "AJ Code Team ke baray mein aur services ke baray mein batayein." },
  { label: "Book Consultation", prompt: "I would like to schedule a 1-on-1 project discovery consultation." },
];

// Helper to format basic bold markdown (**text**)
const renderFormattedText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-[#DEBA75] font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dragControls = useDragControls();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: INITIAL_GREETING,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowNotification(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: messageContent,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to connect with assistant server.");
      }

      const data = await response.json();
      const assistantReply: Message = {
        role: "assistant",
        content: data.reply || "Theek hai ji! AJ Code Team aapse jald rabta karegi.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantReply]);
    } catch (error) {
      console.error("Chat error:", error);
      const isEng = /^[a-zA-Z0-9\s.,?!'"-_]+$/.test(messageContent) && (messageContent.includes("I ") || messageContent.includes("the") || messageContent.includes("about") || messageContent.includes("build") || messageContent.includes("want") || messageContent.includes("schedule"));
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isEng
            ? "Thank you! Please click 'Forward to WhatsApp' below to connect with the AJ Code Team."
            : "Bohat shukriya! 'Forward to WhatsApp' par click kar ke apni details share kar dein, AJ Code Team aapse jald rabta karegi.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content: INITIAL_GREETING,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const generateWhatsAppLink = () => {
    const userMessages = messages
      .filter((m) => m.role === "user")
      .map((m) => m.content.trim())
      .filter(Boolean);

    // Pick only the client's direct requirement / demand without messy chat history
    let clientDemand = "a custom web project";
    if (userMessages.length > 0) {
      clientDemand = userMessages[0];
    }

    const formattedText = 
      `Hi AJ Code Team! 👋\n\n` +
      `I want to build a website/project:\n` +
      `"${clientDemand}"\n\n` +
      `Please connect with me to discuss details!`;

    return `https://wa.me/923715909509?text=${encodeURIComponent(formattedText)}`;
  };

  return (
    <div aria-label="Live Project Consultation Assistant" className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-[200] font-sans">
      {/* Floating Prompt Notification */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: 2 }}
            className="absolute bottom-16 right-0 w-64 p-3 bg-[#2E0006] border border-[#DEBA75]/40 rounded-2xl shadow-2xl pointer-events-auto"
          >
            <div className="flex items-start gap-2.5">
              <div className="h-7 w-7 rounded-full bg-[#3B0007] border border-[#DEBA75]/40 flex items-center justify-center text-[#DEBA75] shrink-0 mt-0.5">
                <Bot size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-[#FAF4EC]">
                    AJ AI Assistant
                  </p>
                  <button 
                    type="button" 
                    onClick={(e) => { e.stopPropagation(); setShowNotification(false); }}
                    className="text-[#D4C3B3]/60 hover:text-[#FAF4EC] p-0.5 cursor-pointer ml-1"
                    aria-label="Dismiss message"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p className="text-[9.5px] text-[#DEBA75] mt-0.5 leading-snug">
                  Have a project in mind? Let&apos;s discuss requirements & connect with AJ Code Team.
                </p>
              </div>
            </div>
            {/* Arrow Tip */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#2E0006] border-r border-b border-[#DEBA75]/40 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button (Shown when modal is closed) */}
      {!isOpen && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(true)}
          aria-label="Open project consultation desk"
          className="relative group h-13 w-13 sm:h-14 sm:w-14 rounded-full flex items-center justify-center bg-[#2E0006] border border-[#DEBA75]/40 text-[#FAF4EC] shadow-2xl cursor-pointer"
        >
          {/* Subtle Luxury Rotating Border Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-1 rounded-full border border-dashed border-[#DEBA75]/35 pointer-events-none"
          />

          <div className="relative flex items-center justify-center text-[#DEBA75]">
            <Bot size={22} className="group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DEBA75] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DEBA75]" />
            </span>
          </div>
        </motion.button>
      )}

      {/* Main Interactive Studio Consultation Window with Cursor Drag */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0.1}
            data-assistant-modal="true"
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] md:w-[390px] h-[500px] max-h-[82vh] bg-[#3B0007] border border-[#DEBA75]/35 rounded-[1.8rem] shadow-[0_25px_60px_rgba(20,0,4,0.85)] flex flex-col overflow-hidden z-[210]"
          >
            {/* Draggable Consultation Header with Glassmorphism */}
            <div 
              data-drag-header="true"
              onPointerDown={(e) => dragControls.start(e)}
              title="Click & Drag to move window"
              className="px-4 py-3 bg-[#2E0006]/85 backdrop-blur-xl border-b border-[#DEBA75]/20 flex items-center justify-between shrink-0 cursor-grab active:cursor-grabbing select-none touch-none group transition-colors hover:bg-[#2E0006]/95"
            >
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={handleReset}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="p-1.5 text-[#D4C3B3]/60 hover:text-[#DEBA75] hover:bg-[#3B0007] rounded-full transition-colors cursor-pointer"
              >
                <RotateCcw size={14} />
              </button>

              <div className="flex flex-col items-center justify-center flex-1 px-2 pointer-events-none">
                {/* Drag Handle Bar Indicator */}
                <div className="w-9 h-1 rounded-full bg-[#DEBA75]/30 group-hover:bg-[#DEBA75]/70 transition-colors mb-1" />
                <h2 className="text-[11px] sm:text-xs font-black text-[#FAF4EC] uppercase tracking-[0.25em] text-center select-none">
                  AJ AI ASSISTANT
                </h2>
              </div>

              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => setIsOpen(false)}
                aria-label="Close Assistant"
                className="p-1.5 text-[#D4C3B3]/60 hover:text-[#FAF4EC] hover:bg-[#3B0007] rounded-full transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Consultation Message Stream with Visible Luxury Scrollbar */}
            <div className="flex-1 p-3.5 overflow-y-auto overscroll-contain space-y-3 chat-custom-scroll">
              {messages.map((msg, index) => {
                const isStudio = msg.role === "assistant";
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-2 ${isStudio ? "" : "flex-row-reverse"}`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] ${
                        isStudio
                          ? "bg-[#2E0006] text-[#DEBA75] border border-[#DEBA75]/30"
                          : "bg-[#DEBA75] text-[#3B0007]"
                      }`}
                    >
                      {isStudio ? <Bot size={13} /> : <User size={13} />}
                    </div>

                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[11.5px] leading-relaxed select-text ${
                        isStudio
                          ? "bg-[#2E0006] border border-[#DEBA75]/20 text-[#FAF4EC] rounded-tl-xs whitespace-pre-line"
                          : "bg-[#FAF4EC] text-[#3B0007] font-medium rounded-tr-xs"
                      }`}
                    >
                      <p>{renderFormattedText(msg.content)}</p>

                      {isStudio && index === messages.length - 1 && (
                        msg.content.toLowerCase().includes("whatsapp") ||
                        msg.content.toLowerCase().includes("forward") ||
                        msg.content.toLowerCase().includes("receive") ||
                        msg.content.toLowerCase().includes("register") ||
                        msg.content.toLowerCase().includes("rabta")
                      ) && (
                        <a
                          href={generateWhatsAppLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#DEBA75] text-[#3B0007] text-[10px] font-bold shadow hover:bg-[#FAF4EC] transition-all cursor-pointer"
                        >
                          <span>Forward to WhatsApp 📲</span>
                          <ExternalLink size={10} />
                        </a>
                      )}

                      <span
                        className={`text-[7.5px] font-mono mt-1 block ${
                          isStudio ? "text-[#DEBA75]/50 text-left" : "text-[#3B0007]/50 text-right"
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-[#DEBA75] text-[10px] font-mono p-1.5 bg-[#2E0006]/80 rounded-xl w-fit border border-[#DEBA75]/20"
                >
                  <Bot size={12} />
                  <span>Reviewing requirements...</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Guided Project Inquiry Chips */}
            {messages.length < 4 && (
              <div className="px-3 py-1.5 border-t border-[#DEBA75]/10 flex flex-wrap gap-1 bg-[#2E0006]/40 shrink-0">
                {QUICK_OPTIONS.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(opt.prompt)}
                    className="text-[9.5px] bg-[#2E0006] hover:bg-[#DEBA75] hover:text-[#3B0007] text-[#D4C3B3] px-2.5 py-1 rounded-full border border-[#DEBA75]/25 transition-all cursor-pointer font-medium"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form & Direct WhatsApp Forward */}
            <div className="p-3 bg-[#2E0006] border-t border-[#DEBA75]/20 space-y-1.5 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 bg-[#3B0007] border border-[#DEBA75]/30 rounded-full px-3 py-1 focus-within:border-[#DEBA75] transition-colors"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your project vision or message..."
                  className="flex-1 bg-transparent text-xs text-[#FAF4EC] placeholder-[#D4C3B3]/40 outline-none px-1 py-1"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="h-7 w-7 rounded-full bg-[#FAF4EC] hover:bg-[#DEBA75] text-[#3B0007] disabled:opacity-30 disabled:hover:bg-[#FAF4EC] flex items-center justify-center transition-all cursor-pointer shrink-0"
                >
                  <Send size={12} />
                </button>
              </form>

              {/* Direct WhatsApp Callout */}
              <div className="flex items-center justify-between text-[9px] text-[#D4C3B3]/80 px-1 font-mono">
                <span className="flex items-center gap-1 text-[#DEBA75] font-semibold">
                  <Sparkles size={10} /> AJ Code Studio
                </span>
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3B0007] bg-[#DEBA75] hover:bg-[#FAF4EC] px-2 py-0.5 rounded-full transition-all flex items-center gap-1 font-bold text-[8.5px]"
                >
                  Send to WhatsApp 📲 <ExternalLink size={8} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .chat-custom-scroll {
          overflow-y: auto !important;
          overscroll-behavior: contain !important;
          scrollbar-width: thin !important;
          scrollbar-color: rgba(222, 186, 117, 0.45) transparent !important;
        }
        .chat-custom-scroll::-webkit-scrollbar {
          width: 5px !important;
          display: block !important;
        }
        .chat-custom-scroll::-webkit-scrollbar-track {
          background: transparent !important;
        }
        .chat-custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(222, 186, 117, 0.45) !important;
          border-radius: 9999px !important;
        }
        .chat-custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(222, 186, 117, 0.85) !important;
        }
        [data-assistant-modal] {
          cursor: default !important;
        }
        [data-drag-header] {
          cursor: grab !important;
        }
        [data-drag-header]:active {
          cursor: grabbing !important;
        }
      `}</style>
    </div>
  );
};

export default AIAssistantWidget;
