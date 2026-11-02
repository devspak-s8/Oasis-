import React, { useState } from 'react';
import { Menu, X, PhoneCall, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '../types';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Developments', path: '/developments' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Investment', path: '/investment' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B1930]/95 backdrop-blur-md border-b border-[#1E3A6E]/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text wordmark with gold signature accent */}
          <button
            onClick={() => handleLinkClick('/')}
            className="group text-left flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45D]"
            aria-label="Oasis Ray Developments Home"
          >
            <div className="w-9 h-9 rounded-md bg-[#102342] border border-[#C8A45D]/50 flex items-center justify-center shrink-0 group-hover:border-[#C8A45D] transition-colors">
              <span className="font-serif-title text-[#C8A45D] font-bold text-lg leading-none">O</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
                OASIS RAY <span className="text-[#C8A45D] font-normal">DEVELOPMENTS</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-0.5">
                LTD.
              </span>
            </div>
          </button>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-white ${
                    isActive ? 'text-[#C8A45D] font-semibold' : 'text-slate-300'
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

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={() => onOpenLeadModal()}
              className="px-5 py-2.5 text-xs font-semibold tracking-wide text-[#0B1930] bg-[#C8A45D] hover:bg-[#DFC07C] transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0 flex items-center gap-2 active:scale-[0.98]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#0B1930]" />
              Speak to an Advisor
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A45D]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1E3A6E] bg-[#0B1930] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#102342] text-[#C8A45D] font-semibold'
                      : 'text-slate-200 hover:bg-[#102342]/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => handleLinkClick('/admin')}
              className="text-left px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-[#C8A45D] hover:bg-[#102342]/60 flex items-center gap-2 mt-2 pt-3 border-t border-[#1E3A6E]/50"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Administrative Portal
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal();
              }}
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#0B1930] bg-[#C8A45D] hover:bg-[#DFC07C] transition-colors rounded-lg flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#0B1930]" />
              Speak to an Advisor
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
