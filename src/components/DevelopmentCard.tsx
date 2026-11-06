import React from 'react';
import { Development } from '../types';
import { formatCurrencyNaira } from '../utils/realEstateCalculators';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface DevelopmentCardProps {
  development: Development;
  onViewDetails: (slug: string) => void;
  onQuickEnquire: (id: string, name: string) => void;
}

export const DevelopmentCard: React.FC<DevelopmentCardProps> = ({
  development,
  onViewDetails,
  onQuickEnquire
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`group rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${
      isDark
        ? 'bg-[#00097C] text-white shadow-xl'
        : 'bg-white text-[#00097C] shadow-sm hover:shadow-lg'
    }`}>
      {/* Property Image with Measured Scrim */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={development.heroImage}
          alt={`${development.name} - ${development.location}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

        {/* Clean availability indicator */}
        <div className="absolute top-4 left-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-white drop-shadow">
            <span className={development.availability === 'Available' ? 'text-emerald-300' : 'text-amber-300'}>
              {development.availability}
            </span>
          </div>
        </div>

        {/* Location line */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-1.5 drop-shadow">
            <MapPin className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span className="font-semibold text-white">{development.location}</span>
          </div>
          <span className="text-slate-200 text-xs drop-shadow font-medium">
            {development.state}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category line */}
          <div className="text-xs text-[#C8A45D] font-semibold tracking-wide mb-1">
            {development.category}
          </div>

          <h3 className={`text-xl font-bold tracking-tight transition-colors ${
            isDark ? 'text-white group-hover:text-[#C8A45D]' : 'text-[#00097C] group-hover:text-[#B38E46]'
          }`}>
            {development.name}
          </h3>

          <p className={`text-xs line-clamp-2 mt-2 leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {development.overview}
          </p>
        </div>

        {/* Minimal Pricing & Action Row */}
        <div className={`pt-4 border-t flex items-center justify-between gap-4 ${
          isDark ? 'border-[#14288F]' : 'border-slate-100'
        }`}>
          <div>
            <span className={`text-[10px] uppercase tracking-wider block font-medium ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Starting From
            </span>
            <span className={`text-base font-bold font-mono ${
              isDark ? 'text-white' : 'text-[#00097C]'
            }`}>
              {formatCurrencyNaira(development.startingPrice)}
            </span>
          </div>

          <button
            onClick={() => onViewDetails(development.slug)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 active:scale-95 ${
              isDark
                ? 'bg-[#1A3868] hover:bg-[#C8A45D] text-white hover:text-[#00097C] border border-[#C8A45D]/40'
                : 'bg-[#000538] hover:bg-[#1A3868] text-white shadow-xs'
            }`}
          >
            <span>View Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A45D]" />
          </button>
        </div>
      </div>
    </div>
  );
};

