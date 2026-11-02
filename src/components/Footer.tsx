import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, ShieldCheck, ArrowUpRight } from 'lucide-react';
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

  const whatsappDeskUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Oasis Ray Developments. I would like to enquire about your property investment opportunities.'
  )}`;

  return (
    <footer className="bg-[#060E1A] text-slate-300 border-t border-[#1E3A6E]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Column 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#102342] border border-[#C8A45D]/60 flex items-center justify-center">
                <span className="font-serif-title text-[#C8A45D] font-bold text-xl leading-none">O</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">
                  OASIS RAY <span className="text-[#C8A45D] font-normal">DEVELOPMENTS</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase">
                  LTD.
                </span>
              </div>
            </div>

            <p className="text-sm text-[#C8A45D] font-medium italic">
              "{settings.tagline}"
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              OASIS RAY DEVELOPMENTS LTD. is a corporate real estate development, investment, and property marketing firm. We structure high-integrity property opportunities across high-velocity growth corridors in Nigeria.
            </p>

            <div className="pt-2">
              <a
                href={whatsappDeskUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#102342] text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-400 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Investor WhatsApp Desk</span>
                <ArrowUpRight className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          {/* Column 3: Developments */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Developments
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('/developments/christos-gardens')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Christos Gardens <span className="text-slate-400 block text-[11px]">Mowe-Ofada, Ogun State</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/developments/havilah-city')}
                  className="text-slate-400 hover:text-white transition-colors text-left mt-2"
                >
                  Havilah City <span className="text-slate-400 block text-[11px]">Ita Oshin, Abeokuta</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/developments')}
                  className="text-[#C8A45D] hover:text-[#DFC07C] transition-colors inline-flex items-center gap-1 mt-2 font-medium"
                >
                  All Developments →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('/about')} className="hover:text-white transition-colors">
                  About Us & Leadership
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/services')} className="hover:text-white transition-colors">
                  Core Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/investment')} className="hover:text-white transition-colors">
                  Investment Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/contact')} className="hover:text-white transition-colors">
                  Contact Advisory Team
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/privacy')} className="hover:text-white transition-colors">
                  Privacy Policy & Compliance
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Info Placeholders */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
              Corporate Office
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C8A45D] shrink-0 mt-0.5" />
                <span>{settings.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-slate-400">
                {settings.workingHours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1E3A6E]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} OASIS RAY DEVELOPMENTS LTD. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('/privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">·</span>
            <button
              onClick={() => handleNav('/admin')}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#C8A45D] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8A45D]" />
              Staff CMS Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
