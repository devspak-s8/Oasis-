import React, { useState } from 'react';
import { HelpCircle, BotMessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AiChatPanel } from './AiChatPanel';

interface FloatingHelpProps {
  whatsappNumber: string;
  initialContext?: string;
}

export const FloatingHelp: React.FC<FloatingHelpProps> = ({ whatsappNumber, initialContext }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    'Hello Oasis Ray Developments. I would like to speak with an investment advisor regarding property opportunities.'
  )}`;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Popped-up action buttons stacked vertically without card container */}
        <AnimatePresence>
          {isOpenMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-end gap-3 mb-1"
            >
              {/* Option 1 (Top): AI Chat Assistant */}
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.8 }}
                transition={{ duration: 0.18, delay: 0.05 }}
                className="flex items-center gap-2.5 group"
              >
                <span className="text-[11px] font-bold text-white bg-[#000538]/95 border border-[#14288F] px-3 py-1.5 rounded-xl shadow-xl backdrop-blur-md whitespace-nowrap">
                  AI Property Advisor
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpenMenu(false);
                    setIsAiOpen(true);
                  }}
                  className="w-12 h-12 rounded-full bg-[#00097C] hover:bg-[#1A3868] text-[#C8A45D] border border-[#C8A45D]/80 shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none"
                  aria-label="AI Chat Assistant"
                >
                  <BotMessageSquare className="w-5 h-5 text-[#C8A45D]" />
                </button>
              </motion.div>

              {/* Option 2 (Middle): WhatsApp Help */}
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2.5 group"
              >
                <span className="text-[11px] font-bold text-white bg-[#000538]/90 border border-[#14288F] px-2.5 py-1 rounded-lg shadow-lg backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  WhatsApp Advisory
                </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpenMenu(false)}
                  className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none"
                  aria-label="WhatsApp Advisory Desk"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.907.535 3.69 1.464 5.216L2 22l4.896-1.428a10.02 10.02 0 0 0 5.135 1.459h.004c5.535 0 10.031-4.495 10.031-10.031 0-2.678-1.043-5.197-2.937-7.091A9.96 9.96 0 0 0 12.031 2zm0 18.286h-.003a8.27 8.27 0 0 1-4.223-1.157l-.303-.18-3.138.916.923-3.058-.198-.315A8.254 8.254 0 0 1 3.746 12.03c0-4.568 3.717-8.286 8.286-8.286 2.213 0 4.293.862 5.858 2.427a8.232 8.232 0 0 1 2.427 5.86c0 4.569-3.717 8.285-8.286 8.285zm4.542-6.202c-.249-.124-1.472-.726-1.7-.809-.228-.083-.394-.124-.56.124-.166.249-.643.809-.788.975-.145.166-.29.187-.539.062s-1.05-.387-2.001-1.235c-.74-.66-1.24-1.475-1.385-1.724-.145-.249-.016-.384.108-.507.112-.111.249-.29.373-.435.124-.145.166-.29.249-.415.083-.166.041-.311-.021-.435-.062-.124-.56-1.349-.768-1.847-.202-.485-.407-.419-.56-.427l-.477-.008c-.166 0-.435.062-.663.311-.228.249-.871.851-.871 2.075 0 1.224.892 2.407 1.016 2.573.124.166 1.755 2.68 4.252 3.757.594.256 1.058.409 1.42.524.597.19 1.14.163 1.57.099.479-.071 1.472-.602 1.68-1.183.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.29z" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Circular Floating Help Button (Icon Only) */}
        <button
          type="button"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className="relative group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#00097C] hover:bg-[#1A3868] border border-[#C8A45D]/80 text-[#C8A45D] shadow-[0_8px_25px_rgba(200,164,93,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center focus:outline-none shrink-0"
          aria-label="Help and Advisory Desk"
        >
          <span className="absolute inset-0 rounded-full bg-[#C8A45D] opacity-20 animate-ping pointer-events-none group-hover:opacity-40" />

          {isOpenMenu ? (
            <X className="w-6 h-6 text-[#C8A45D] relative z-10 transition-transform duration-200 rotate-90" />
          ) : (
            <HelpCircle className="w-6 h-6 text-[#C8A45D] relative z-10" />
          )}
        </button>
      </div>

      {/* AI Chat Assistant Modal/Drawer Panel */}
      <AiChatPanel
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        initialContext={initialContext}
        whatsappNumber={whatsappNumber}
      />
    </>
  );
};
