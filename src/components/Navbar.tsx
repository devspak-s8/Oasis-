import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, MessageSquare, Phone, ArrowRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SiteSettings } from '../types';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenLeadModal: (initialDevelopment?: string, initialPlotSize?: string) => void;
  settings: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenLeadModal,
  settings
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Developments', path: '/developments', desc: 'Christos Gardens & Havilah City' },
    { label: 'Advisory Desk', path: '/advisory', desc: 'Speak to an Investment Advisor' },
    { label: 'About', path: '/about', desc: 'Vision, Mission & Leadership' },
    { label: 'Services', path: '/services', desc: '8 Core Advisory Disciplines' },
    { label: 'Investment', path: '/investment', desc: 'Land Banking & Structured Capital' },
    { label: 'Contact', path: '/contact', desc: 'General Inquiries & Office' }
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappDeskUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Oasis Ray Developments. I would like to speak with an investment advisor.'
  )}`;

  const isDark = theme === 'dark';

  return (
    <>
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors shadow-xs ${
        isDark
          ? 'bg-[#060E1A]/90 border-slate-800/80 text-white'
          : 'bg-white/95 border-slate-200/80 text-slate-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Single text wordmark with gold signature accent */}
            <button
              onClick={() => handleLinkClick('/')}
              className="group text-left flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45D]"
              aria-label="Oasis Ray Developments Home"
            >
              <div className="w-9 h-9 rounded-md bg-[#0B1930] border border-[#C8A45D]/70 flex items-center justify-center shrink-0 group-hover:bg-[#102342] transition-colors shadow-sm">
                <span className="font-serif-title text-[#C8A45D] font-bold text-lg leading-none">O</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-base sm:text-lg font-bold tracking-tight whitespace-nowrap ${
                  isDark ? 'text-white' : 'text-[#0B1930]'
                }`}>
                  OASIS RAY <span className="text-[#C8A45D] font-normal">DEVELOPMENTS</span>
                </span>
                <span className={`text-[10px] font-semibold tracking-wider uppercase -mt-0.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  LTD.
                </span>
              </div>
            </button>

            {/* Zone 2: Desktop navigation links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                      isActive
                        ? 'text-[#C8A45D] font-bold'
                        : isDark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-700 hover:text-[#0B1930]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8A45D] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary action + Theme switch toggle */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                className={`p-2.5 rounded-lg border transition-all flex items-center gap-2 text-xs font-semibold ${
                  isDark
                    ? 'bg-[#102342] border-slate-700 text-[#C8A45D] hover:bg-[#1A3868]'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-[#0B1930]'
                }`}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-[#C8A45D]" />
                    <span className="hidden lg:inline text-slate-300 text-[11px]">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-700" />
                    <span className="hidden lg:inline text-slate-600 text-[11px]">Dark</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onOpenLeadModal()}
                className="px-5 py-2.5 text-xs font-bold tracking-wide text-white bg-[#0B1930] hover:bg-[#1A3868] border border-[#C8A45D]/40 transition-all rounded-lg shadow-xs whitespace-nowrap shrink-0 flex items-center gap-2 active:scale-[0.98]"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C8A45D]" />
                <span>Speak to an Advisor</span>
              </button>
            </div>

            {/* Mobile menu trigger + theme toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                className={`p-2 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-[#102342] border-slate-700 text-[#C8A45D]'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`p-2.5 rounded-lg border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45D] ${
                  isDark
                    ? 'bg-[#102342] border-slate-700 text-white hover:text-[#C8A45D]'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-[#0B1930]'
                }`}
                aria-label="Open navigation sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Animated Right-Side Sidebar Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-900/75 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Right-Side Off-Canvas Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-xs shadow-2xl flex flex-col justify-between overflow-y-auto border-l transition-colors ${
                isDark
                  ? 'bg-[#0B1930] text-white border-slate-800'
                  : 'bg-white text-slate-900 border-slate-200'
              }`}
            >
              {/* Drawer Header */}
              <div className={`p-5 border-b flex items-center justify-between ${
                isDark ? 'bg-[#060E1A] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-[#0B1930] border border-[#C8A45D]/60 flex items-center justify-center">
                    <span className="font-serif-title text-[#C8A45D] font-bold text-base leading-none">O</span>
                  </div>
                  <span className={`text-sm font-bold tracking-tight leading-tight ${
                    isDark ? 'text-white' : 'text-[#0B1930]'
                  }`}>
                    OASIS RAY
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${
                      isDark
                        ? 'bg-[#102342] border-slate-700 text-[#C8A45D]'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                    title="Toggle light/dark theme"
                  >
                    {isDark ? <Sun className="w-4 h-4 text-[#C8A45D]" /> : <Moon className="w-4 h-4 text-slate-700" />}
                  </button>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                    aria-label="Close sidebar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Navigation Links */}
              <div className="px-4 py-6 flex-1 space-y-1.5 overflow-y-auto">
                {navLinks.map((link, idx) => {
                  const isActive = currentPath === link.path;
                  return (
                    <motion.button
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * (idx + 1), duration: 0.25 }}
                      onClick={() => handleLinkClick(link.path)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                        isActive
                          ? isDark
                            ? 'bg-[#102342] border border-[#C8A45D]/60 text-[#C8A45D] font-bold'
                            : 'bg-slate-100 border border-[#C8A45D]/50 text-[#0B1930] font-bold'
                          : isDark
                          ? 'hover:bg-[#102342]/60 text-slate-300 hover:text-white font-medium'
                          : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium'
                      }`}
                    >
                      <span className="text-sm tracking-tight">{link.label}</span>
                      <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        isActive ? 'text-[#C8A45D]' : isDark ? 'text-slate-500' : 'text-slate-400'
                      }`} />
                    </motion.button>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className={`p-5 border-t space-y-3 ${
                isDark ? 'bg-[#060E1A] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <a
                  href={whatsappDeskUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors rounded-xl flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Direct WhatsApp Desk</span>
                </a>

                <div className={`flex items-center justify-center gap-2 text-xs pt-1 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <Phone className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                  <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#C8A45D] transition-colors">
                    {settings.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

