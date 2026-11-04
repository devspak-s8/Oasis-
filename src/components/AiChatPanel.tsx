import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, X, Maximize2, Minimize2, BotMessageSquare, Bot, User, Loader2, Phone, PhoneCall, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  imagePreview?: string;
  timestamp: string;
}

interface AiChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: string;
  whatsappNumber: string;
}

export const AiChatPanel: React.FC<AiChatPanelProps> = ({
  isOpen,
  onClose,
  initialContext,
  whatsappNumber
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Welcome to OASIS RAY DEVELOPMENTS LTD.\n\nI am your official AI Senior Property Advisor. I have complete, verified records for **Christos Gardens** (Mowe-Ofada) and **Havilah City** (Abeokuta), including C of O titles, plot prices (300 SQM, 500 SQM, 1 Acre deals), statutory fees, corner piece premiums, and official corporate bank accounts.\n\nHow can I assist your real estate investments today? You can also upload a land photo or survey document for instant evaluation.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialContext) {
      const systemContextMsg: ChatMessage = {
        id: `ctx-${Date.now()}`,
        sender: 'ai',
        text: `I noticed you are currently reviewing **${initialContext}**. Feel free to ask me about exact plot pricing, C of O title status, landmarks, cornerpiece fees, or inspection schedules for this property!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, systemContextMsg]);
    }
  }, [initialContext]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Please select an image smaller than 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text && !selectedImage) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      imagePreview: selectedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const previousHistory = messages.slice(-10).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      text: m.text
    }));

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    const currentImg = selectedImage;
    setSelectedImage(null);
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          image: currentImg || undefined,
          context: initialContext,
          history: previousHistory
        })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to get response');
      }

      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'I apologize, but our advisory server experienced a momentary hiccup. For urgent assistance or unlisted information, please contact our Customer Care Desk directly:\n\n📞 **Phone:** +234 (0) 803 000 0000\n💬 **WhatsApp Desk:** +2348030000000\n📧 **Email:** info@oasisraydevelopments.com',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const quickPrompts = [
    'Christos Gardens: 300 & 500 SQM pricing',
    'Havilah City: 1 Acre deal & residential plots',
    'Official corporate bank accounts',
    'Book site inspection (Tuesdays & Saturdays)',
    'Speak to Customer Care desk'
  ];

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Oasis Ray Advisory Desk. I was chatting with your AI Advisor and would like to speak directly with an advisor.'
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:p-4 bg-black/60 backdrop-blur-xs">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={`w-full bg-[#0B1930] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col transition-all duration-300 overflow-hidden ${
              isExpanded ? 'h-full sm:h-[95vh] max-w-5xl' : 'h-[85vh] sm:h-[620px] max-w-2xl'
            }`}
          >
            {/* Panel Top Header Bar - Clean & Borderless */}
            <div className="p-4 bg-[#060E1A] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#102342] flex items-center justify-center text-[#C8A45D]">
                  <BotMessageSquare className="w-5 h-5 text-[#C8A45D]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Oasis Ray AI Advisor</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Smart Property & Visual Land Analysis
                  </div>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center gap-1.5 text-xs font-semibold transition-colors shadow-xs"
                  title="Chat directly with Customer Care Desk on WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Customer Care</span>
                </a>

                <a
                  href="tel:+2348030000000"
                  className="p-2 text-slate-300 hover:text-white rounded-lg bg-[#102342] hover:bg-[#1A3868] transition-colors"
                  title="Call Customer Care: +234 (0) 803 000 0000"
                  aria-label="Call Customer Care"
                >
                  <Phone className="w-4 h-4 text-[#C8A45D]" />
                </a>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg bg-[#102342] transition-colors"
                  title={isExpanded ? 'Collapse panel' : 'Expand full page'}
                  aria-label={isExpanded ? 'Collapse panel' : 'Expand full page'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white rounded-lg bg-[#102342] transition-colors"
                  aria-label="Close AI panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Conversation Scroll View */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#0B1930]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[88%] sm:max-w-[80%] ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      msg.sender === 'user'
                        ? 'bg-[#C8A45D] text-[#0B1930]'
                        : 'bg-[#102342] text-[#C8A45D]'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1">
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#C8A45D] text-[#0B1930] font-medium rounded-tr-none'
                          : 'bg-[#102342] text-slate-100 rounded-tl-none whitespace-pre-wrap'
                      }`}
                    >
                      {msg.imagePreview && (
                        <div className="mb-2.5 rounded-lg overflow-hidden max-w-xs">
                          <img
                            src={msg.imagePreview}
                            alt="Uploaded property visual"
                            className="w-full h-auto object-cover max-h-48"
                          />
                        </div>
                      )}
                      <div>{msg.text}</div>
                    </div>
                    <div
                      className={`text-[10px] text-slate-500 px-1 ${
                        msg.sender === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <div className="w-7 h-7 rounded-full bg-[#102342] flex items-center justify-center text-[#C8A45D]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 bg-[#102342] rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-[#C8A45D] animate-spin" />
                    <span>Analyzing real estate documents & specs...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            {messages.length < 5 && (
              <div className="px-4 py-2 bg-[#060E1A]/40 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
                <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Quick:</span>
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-3 py-1.5 text-[11px] bg-[#102342] hover:bg-[#1A3868] text-slate-300 hover:text-white rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Selected Image Preview Box */}
            {selectedImage && (
              <div className="px-4 py-2 bg-[#060E1A] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <img
                    src={selectedImage}
                    alt="Preview before sending"
                    className="w-10 h-10 object-cover rounded-md border border-[#C8A45D]"
                  />
                  <span>Land photo attached</span>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Floating Input Controls - Borderless */}
            <div className="p-3 sm:p-4 bg-transparent flex items-center gap-2 shrink-0">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 text-slate-300 hover:text-[#C8A45D] bg-[#102342] hover:bg-[#1A3868] rounded-xl transition-colors shrink-0"
                title="Attach land photo or survey document"
                aria-label="Attach photo"
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder="Ask about properties, pricing, or land surveys..."
                className="flex-1 px-4 py-2.5 bg-[#102342] rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C8A45D]"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={loading || (!inputText.trim() && !selectedImage)}
                className="p-2.5 bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] rounded-xl font-bold transition-all disabled:opacity-50 shrink-0 flex items-center justify-center shadow-md active:scale-95"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
