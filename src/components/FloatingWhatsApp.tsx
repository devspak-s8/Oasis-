import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const chatUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    'Hello Oasis Ray Developments. I would like to enquire about your property investment opportunities.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Floating Tooltip / Help Bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-2 bg-[#060E1A] text-white text-xs px-3.5 py-2 rounded-xl border border-[#1E3A6E] shadow-2xl backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Direct Advisory Desk</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white ml-1"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <a
        href={chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        aria-label="Direct WhatsApp Advisory Desk"
      >
        {/* Subtle breathing radar ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none group-hover:opacity-50" />

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-current relative z-10"
          aria-hidden="true"
        >
          <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.907.535 3.69 1.464 5.216L2 22l4.896-1.428a10.02 10.02 0 0 0 5.135 1.459h.004c5.535 0 10.031-4.495 10.031-10.031 0-2.678-1.043-5.197-2.937-7.091A9.96 9.96 0 0 0 12.031 2zm0 18.286h-.003a8.27 8.27 0 0 1-4.223-1.157l-.303-.18-3.138.916.923-3.058-.198-.315A8.254 8.254 0 0 1 3.746 12.03c0-4.568 3.717-8.286 8.286-8.286 2.213 0 4.293.862 5.858 2.427a8.232 8.232 0 0 1 2.427 5.86c0 4.569-3.717 8.285-8.286 8.285zm4.542-6.202c-.249-.124-1.472-.726-1.7-.809-.228-.083-.394-.124-.56.124-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062s-1.05-.387-2.001-1.235c-.74-.66-1.24-1.475-1.385-1.724-.145-.249-.016-.384.108-.507.112-.111.249-.29.373-.435.124-.145.166-.249.249-.415.083-.166.041-.311-.021-.435-.062-.124-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.435.062-.663.311-.228.249-.871.851-.871 2.075 0 1.224.892 2.407 1.016 2.573.124.166 1.755 2.68 4.252 3.757.594.256 1.058.409 1.42.524.597.19 1.14.163 1.57.099.479-.071 1.472-.602 1.68-1.183.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.29z" />
        </svg>
      </a>
    </div>
  );
};
