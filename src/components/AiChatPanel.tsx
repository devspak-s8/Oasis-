import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Image as ImageIcon,
  X,
  Maximize2,
  Minimize2,
  BotMessageSquare,
  Bot,
  User,
  Loader2,
  Phone,
  MessageSquare,
  Copy,
  Check,
  Calendar,
  MapPin,
  Building,
  ShieldCheck,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateLocalAdvisorResponse } from '../utils/aiAdvisorEngine';

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
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Welcome to OASIS RAY DEVELOPMENTS LTD.\n\nHow can I assist you with Christos Gardens (Mowe-Ofada) or Havilah City (Abeokuta) today?',
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
        text: `### Active Project Focus: ${initialContext}\n\nI am tracking your interest in **${initialContext}**. Ask me about exact plot pricing, C of O title verification, surrounding landmarks, corner piece fees, or reserving a seat for Tuesday/Saturday site tours!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, systemContextMsg]);
    }
  }, [initialContext]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(label);
    setTimeout(() => setCopiedBank(null), 2500);
  };

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

    let replyText = '';

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

      if (response.ok) {
        const data = await response.json();
        replyText = data.reply || '';
      }
    } catch {
      // Offline or network error - fallback gracefully
    }

    // Zero-failure fallback guarantee
    if (!replyText) {
      const local = generateLocalAdvisorResponse(text, initialContext);
      replyText = local.text;
    }

    const aiReply: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, aiReply]);
    setLoading(false);
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

  // Helper to parse inline markdown (bolding, codes)
  const parseInline = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-white font-bold tracking-tight">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Render text blocks cleanly with formatting
  const renderFormattedMessageText = (raw: string) => {
    const lines = raw.split('\n');
    return (
      <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-200">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1" />;
          }

          if (trimmed.startsWith('###')) {
            const heading = trimmed.replace(/^###\s*/, '');
            return (
              <div
                key={idx}
                className="pt-2 pb-1.5 border-b border-[#1E3A6E]/70 text-sm font-extrabold text-[#C8A45D] flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D]" />
                <span>{heading}</span>
              </div>
            );
          }

          if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const bullet = trimmed.replace(/^[•\-\*]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1.5 my-1">
                <span className="text-[#C8A45D] font-bold text-xs mt-0.5">•</span>
                <div className="flex-1 text-slate-200">{parseInline(bullet)}</div>
              </div>
            );
          }

          return (
            <div key={idx} className="text-slate-200">
              {parseInline(trimmed)}
            </div>
          );
        })}
      </div>
    );
  };

  // Detect which interactive action cards to show alongside the AI message
  const renderInteractiveWidgets = (text: string) => {
    const t = text.toLowerCase();
    const hasChristos = t.includes('christos') || t.includes('mowe') || t.includes('itakana');
    const hasHavilah = t.includes('havilah') || t.includes('ita oshin') || t.includes('ibara orile') || t.includes('3,000 sqms') || t.includes('1 acre');
    const hasBanks = t.includes('2008892202') || t.includes('0128047846') || t.includes('fcmb') || t.includes('wema');
    const hasInspection = t.includes('tuesdays') || t.includes('saturdays') || t.includes('inspection');
    const hasCustomerCare = t.includes('customer care') || t.includes('+234 817 173 1525') || t.includes('hello@oasisraydevelopments.com');

    return (
      <div className="pt-3 space-y-2.5">
        {/* 1. BANK ACCOUNTS WIDGET */}
        {hasBanks && (
          <div className="rounded-xl p-3.5 bg-[#060E1A] border border-[#C8A45D]/40 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#C8A45D] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Corporate Accounts</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                Zero Personal Accounts
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* FCMB */}
              <div className="p-2.5 rounded-lg bg-[#102342] border border-[#1E3A6E] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">FCMB</div>
                  <div className="text-xs font-mono font-black text-[#C8A45D] tracking-wider">2008892202</div>
                </div>
                <button
                  onClick={() => handleCopyText('2008892202', 'fcmb')}
                  className="px-2 py-1 rounded bg-[#060E1A] hover:bg-[#C8A45D] text-white hover:text-[#0B1930] text-[10px] font-semibold border border-[#1E3A6E] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedBank === 'fcmb' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedBank === 'fcmb' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* WEMA */}
              <div className="p-2.5 rounded-lg bg-[#102342] border border-[#1E3A6E] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">WEMA BANK</div>
                  <div className="text-xs font-mono font-black text-[#C8A45D] tracking-wider">0128047846</div>
                </div>
                <button
                  onClick={() => handleCopyText('0128047846', 'wema')}
                  className="px-2 py-1 rounded bg-[#060E1A] hover:bg-[#C8A45D] text-white hover:text-[#0B1930] text-[10px] font-semibold border border-[#1E3A6E] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedBank === 'wema' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedBank === 'wema' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-center">
              Account Name: <strong className="text-white">OASIS RAY DEVELOPMENTS LTD</strong>
            </div>
          </div>
        )}

        {/* 2. CHRISTOS GARDENS ACTION CARD */}
        {hasChristos && !hasBanks && (
          <div className="rounded-xl p-3.5 bg-[#060E1A] border border-[#1E3A6E] space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#C8A45D]" />
                <span>Christos Gardens (Mowe-Ofada)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C8A45D]/10 text-[#C8A45D] border border-[#C8A45D]/30 font-bold">
                Verifiable C of O
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded-lg bg-[#102342] border border-[#1E3A6E]">
                <div className="text-[10px] text-slate-400 font-bold">300 SQM Outright</div>
                <div className="text-xs font-black font-mono text-[#C8A45D]">₦4,500,000</div>
              </div>
              <div className="p-2 rounded-lg bg-[#102342] border border-[#1E3A6E]">
                <div className="text-[10px] text-slate-400 font-bold">500 SQM Outright</div>
                <div className="text-xs font-black font-mono text-[#C8A45D]">₦7,000,000</div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleSendMessage('I would like to reserve a plot at Christos Gardens')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] text-[11px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Reserve Plot</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  'Hello Oasis Ray, I am inquiring for a plot allocation at Christos Gardens (Mowe-Ofada).'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* 3. HAVILAH CITY ACTION CARD */}
        {hasHavilah && !hasBanks && (
          <div className="rounded-xl p-3.5 bg-[#060E1A] border border-[#1E3A6E] space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C8A45D]" />
                <span>Havilah City (Ita Oshin, Abeokuta)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                Registered Survey
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="p-2 rounded-lg bg-[#102342] border border-[#1E3A6E]">
                <div className="text-[9px] text-slate-400 font-bold">300 SQM</div>
                <div className="text-xs font-black font-mono text-[#C8A45D]">₦900K</div>
              </div>
              <div className="p-2 rounded-lg bg-[#102342] border border-[#1E3A6E]">
                <div className="text-[9px] text-slate-400 font-bold">500 SQM</div>
                <div className="text-xs font-black font-mono text-[#C8A45D]">₦1.5M</div>
              </div>
              <div className="p-2 rounded-lg bg-[#102342] border border-[#1E3A6E]">
                <div className="text-[9px] text-slate-400 font-bold">1 Acre Deal</div>
                <div className="text-xs font-black font-mono text-[#C8A45D]">₦8.7M</div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => handleSendMessage('I would like to enquire on Havilah City plots')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] text-[11px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Reserve Plot</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  'Hello Oasis Ray, I am inquiring for plot prices and allocation at Havilah City (Abeokuta).'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* 4. INSPECTION BOOKING CARD */}
        {hasInspection && (
          <div className="rounded-xl p-3.5 bg-[#060E1A] border border-[#C8A45D]/40 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C8A45D]" />
                <span>On-Site Inspection Schedule</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Tuesdays & Saturdays
              </span>
            </div>

            <p className="text-[11px] text-slate-300">
              Complimentary inspection transit provided from our coordination center in Ogun State. Walk the dry table land, inspect survey beacons, and verify titles in person.
            </p>

            <button
              onClick={() => handleSendMessage('Please schedule an on-site inspection for me this week')}
              className="w-full py-2 px-3 rounded-lg bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book My Free Inspection Tour</span>
            </button>
          </div>
        )}

        {/* 5. CUSTOMER CARE DESK CARD */}
        {hasCustomerCare && (
          <div className="rounded-xl p-3.5 bg-[#060E1A] border border-[#1E3A6E] space-y-2.5 shadow-md">
            <div className="text-xs font-bold text-[#C8A45D] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C8A45D]" />
              <span>Direct Customer Care Channels</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <a
                href="tel:+2348171731525"
                className="py-2 px-3 rounded-lg bg-[#102342] hover:bg-[#1A3868] text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#1E3A6E] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C8A45D]" />
                <span>Call: +234 817 173 1525</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live WhatsApp Chat</span>
              </a>
            </div>

            <div className="text-[10px] text-slate-400 pt-1 border-t border-[#1E3A6E]/50">
              Corporate Desk: 3rd Floor, Goldcrest Plaza, Ikota, Lekki, Lagos State, Nigeria.
            </div>
          </div>
        )}
      </div>
    );
  };

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
              isExpanded ? 'h-full sm:h-[95vh] max-w-5xl' : 'h-[85vh] sm:h-[640px] max-w-2xl'
            }`}
          >
            {/* Panel Top Header Bar */}
            <div className="p-4 bg-[#060E1A] flex items-center justify-between shrink-0 border-b border-[#1E3A6E]/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#102342] border border-[#C8A45D]/50 flex items-center justify-center text-[#C8A45D] shadow-sm">
                  <BotMessageSquare className="w-5 h-5 text-[#C8A45D]" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white flex items-center gap-2">
                    <span>Oasis Ray Senior AI Advisor</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Verified Titles, Pricing & Cadastral Evaluation
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
                  href="tel:+2348171731525"
                  className="p-2 text-slate-300 hover:text-white rounded-lg bg-[#102342] hover:bg-[#1A3868] transition-colors"
                  title="Call Customer Care: +234 817 173 1525"
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
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#0B1930]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[92%] sm:max-w-[85%] ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-[#C8A45D] text-[#0B1930]'
                        : 'bg-[#102342] border border-[#C8A45D]/40 text-[#C8A45D]'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div
                      className={`p-4 rounded-2xl shadow-md ${
                        msg.sender === 'user'
                          ? 'bg-[#C8A45D] text-[#0B1930] font-medium rounded-tr-none'
                          : 'bg-[#102342] border border-[#1E3A6E] rounded-tl-none'
                      }`}
                    >
                      {msg.imagePreview && (
                        <div className="mb-3 rounded-lg overflow-hidden max-w-xs border border-[#C8A45D]">
                          <img
                            src={msg.imagePreview}
                            alt="Uploaded property visual"
                            className="w-full h-auto object-cover max-h-48"
                          />
                        </div>
                      )}

                      {msg.sender === 'user' ? (
                        <div className="text-xs sm:text-sm font-semibold">{msg.text}</div>
                      ) : (
                        <div>
                          {renderFormattedMessageText(msg.text)}
                          {renderInteractiveWidgets(msg.text)}
                        </div>
                      )}
                    </div>

                    <div
                      className={`text-[10px] text-slate-400 px-1 ${
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
                  <div className="w-8 h-8 rounded-xl bg-[#102342] border border-[#C8A45D]/40 flex items-center justify-center text-[#C8A45D]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3.5 bg-[#102342] border border-[#1E3A6E] rounded-2xl rounded-tl-none flex items-center gap-2.5">
                    <Loader2 className="w-4 h-4 text-[#C8A45D] animate-spin" />
                    <span className="font-medium text-slate-300">Retrieving verified property dossier & prices...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            {messages.length < 8 && (
              <div className="px-4 py-2.5 bg-[#060E1A]/80 border-t border-[#1E3A6E]/50 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
                <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Prompts:</span>
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-3 py-1.5 text-xs bg-[#102342] hover:bg-[#1A3868] text-slate-200 hover:text-white rounded-xl border border-[#1E3A6E] transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95 shadow-2xs"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Selected Image Preview Box */}
            {selectedImage && (
              <div className="px-4 py-2 bg-[#060E1A] flex items-center justify-between border-t border-[#1E3A6E]">
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
                  className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Input Controls */}
            <div className="p-3 sm:p-4 bg-[#060E1A] border-t border-[#1E3A6E] flex items-center gap-2.5 shrink-0">
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
                className="p-2.5 text-slate-300 hover:text-[#C8A45D] bg-[#102342] hover:bg-[#1A3868] border border-[#1E3A6E] rounded-xl transition-colors shrink-0 cursor-pointer"
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
                placeholder="Ask about Christos Gardens, Havilah City, pricing, bank accounts..."
                className="flex-1 px-4 py-2.5 bg-[#102342] border border-[#1E3A6E] rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#C8A45D]"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={loading || (!inputText.trim() && !selectedImage)}
                className="p-2.5 bg-[#C8A45D] hover:bg-[#DFC07C] text-[#0B1930] rounded-xl font-bold transition-all disabled:opacity-50 shrink-0 flex items-center justify-center shadow-md active:scale-95 cursor-pointer"
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
