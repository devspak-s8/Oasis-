import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  onNavigate: (path: string) => void;
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, settings }) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 bg-[#000538] text-slate-200 border-t border-[#14288F] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          {/* Column 1: Corporate Identity & Tagline Quote */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#00097C] border border-[#C8A45D] flex items-center justify-center shrink-0 shadow-md">
                <span className="font-serif-title text-[#C8A45D] font-bold text-xl leading-none">O</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-white">
                  OASIS RAY <span className="text-[#C8A45D] font-normal">DEVELOPMENTS</span>
                </span>
                <span className="text-[11px] text-slate-300 font-semibold tracking-widest uppercase">
                  LTD.
                </span>
              </div>
            </div>

            <p className="text-sm text-[#C8A45D] font-serif italic tracking-wide font-medium pl-1 border-l-2 border-[#C8A45D]/60 py-1">
              "{settings.tagline}"
            </p>
          </div>

          {/* Column 2: Key Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-[#C8A45D] uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-200">
              <li>
                <button onClick={() => handleNav('/advisory')} className="hover:text-[#C8A45D] transition-colors text-left flex items-center gap-1.5 group font-bold text-[#C8A45D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] group-hover:scale-125 transition-transform" />
                  <span>Speak to an Advisor</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/developments')} className="hover:text-[#C8A45D] transition-colors text-left flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] group-hover:scale-125 transition-transform" />
                  <span>Our Developments</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-[#C8A45D] transition-colors text-left flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] group-hover:scale-125 transition-transform" />
                  <span>About & Vision</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/investment')} className="hover:text-[#C8A45D] transition-colors text-left flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] group-hover:scale-125 transition-transform" />
                  <span>Investment Plans</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-[#C8A45D] transition-colors text-left flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] group-hover:scale-125 transition-transform" />
                  <span>Contact Advisory</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Concise Address & Contact Desk */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-[#C8A45D] uppercase">
              Corporate Desk
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-200 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="leading-snug text-white font-semibold">{settings.officeAddress}</div>
                  <div className="text-[11px] text-slate-300">Project Sites: Mowe-Ofada & Abeokuta Axes, Ogun State</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#C8A45D] text-white font-semibold transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#C8A45D] text-slate-200 transition-colors">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 border-t border-[#14288F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-300">
          <div>
            © {new Date().getFullYear()} OASIS RAY DEVELOPMENTS LTD. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => handleNav('/privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-[#14288F]">|</span>
            <button
              onClick={() => handleNav('/admin')}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#C8A45D] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8A45D]" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
